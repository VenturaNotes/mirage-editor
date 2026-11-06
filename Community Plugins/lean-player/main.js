const fs = require('fs');
const path = require('path');
const os = require('os');
const { ipcRenderer } = require('electron');

const SUPPORTED_EXTENSIONS = new Set(['.mp3', '.m4a', '.flac', '.wav', '.ogg', '.aac']);

const DEFAULT_SETTINGS = {
  musicDirectory: '~/Music',
  showStatusBar: true,
  volume: 0.8,
  recentTracks: [],
  endOfTrackAction: 'next', // 'next' | 'repeat' | 'stop'
  maxResults: 40
};

function expandHomeDir(p) {
  if (p && p.startsWith('~')) {
    return path.join(os.homedir(), p.slice(1));
  }
  return p || '';
}

function getAudioMimeType(ext) {
  switch ((ext || '').toLowerCase().replace('.', '')) {
    case 'mp3': return 'audio/mpeg';
    case 'm4a':
    case 'aac': return 'audio/mp4';
    case 'flac': return 'audio/flac';
    case 'wav': return 'audio/wav';
    case 'ogg': return 'audio/ogg';
    default: return 'audio/mpeg';
  }
}

module.exports = class LeanPlayerPlugin {
  constructor(app, manifest) {
    this.app = app;
    this.manifest = manifest;
    this.settings = Object.assign({}, DEFAULT_SETTINGS);
    this.library = [];
    this.currentTrack = null;
    this.isPlaying = false;
    this.isScanning = false;
    this.audio = new Audio();
    this.currentBlobUrl = null;
    this.statusBarEl = null;
    this._cleanups = [];
  }

  async onload() {
    // 1. Load saved settings and cached track library from data.json (instant startup)
    const saved = await this.loadData();
    if (saved) {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, saved);
      if (Array.isArray(saved.cachedTracks)) {
        this.library = saved.cachedTracks;
      }
    }

    // 2. Audio Engine Configuration
    this.audio.volume = Math.max(0, Math.min(1, Number(this.settings.volume) || 0.8));

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateStatusBar();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateStatusBar();
    });

    this.audio.addEventListener('ended', () => {
      switch (this.settings.endOfTrackAction) {
        case 'repeat':
          this.audio.currentTime = 0;
          this.audio.play();
          break;
        case 'stop':
          this.stopPlayback();
          break;
        case 'next':
        default:
          this.playNextTrack();
          break;
      }
    });

    // 3. Register Commands (Prefix is "Player")
    this.addCommand({
      id: 'lean-player:search-and-play',
      name: 'Search and Play Music',
      callback: () => this.openSearchModal()
    });

    this.addCommand({
      id: 'lean-player:view-queue',
      name: 'View Queue / Up Next',
      callback: () => this.openQueueModal()
    });

    this.addCommand({
      id: 'lean-player:toggle-play-pause',
      name: 'Toggle Play/Pause',
      callback: () => this.togglePlayPause()
    });

    this.addCommand({
      id: 'lean-player:next-track',
      name: 'Play Next Track',
      callback: () => this.playNextTrack()
    });

    this.addCommand({
      id: 'lean-player:prev-track',
      name: 'Play Previous Track',
      callback: () => this.playPrevTrack()
    });

    this.addCommand({
      id: 'lean-player:stop',
      name: 'Stop Playback',
      callback: () => this.stopPlayback()
    });

    // 4. Modal Event Listeners (Mirage Editor switcher integration)
    const onModalAction = (data) => {
      if (!data || data.cancelled) return;
      if (data.actionId === 'lean-player:select-track' && data.item) {
        const track = this.library.find((t) => t.fullPath === data.item.id);
        if (track) {
          this.playTrack(track);
        }
      }
    };

    if (this.app.events) {
      const unsub = this.app.events.on('modal-stage:action', onModalAction);
      this.registerEvent ? this.registerEvent(unsub) : this._cleanups.push(unsub);
    }

    // 5. Status Bar Item
    if (this.app.statusBar) {
      this.statusBarEl = this.app.statusBar.addItem('lean-player', { alignment: 'right', priority: 50 });
      if (this.statusBarEl) {
        this.statusBarEl.className = 'status-bar-item lean-player-status-bar';
        this.statusBarEl.title = 'Lean Player: Click to toggle Play/Pause';
        this.statusBarEl.onclick = () => this.togglePlayPause();
      }
    }
    this.updateStatusBar();

    // 6. Settings Tab Registration
    this.addSettingTab({
      name: 'Lean Player',
      description: 'Local music library and playback configuration.',
      settings: [
        {
          key: 'musicDirectory',
          name: 'Music Directory',
          description: 'Absolute path to your local music directory (e.g. ~/Music).',
          type: 'text',
          placeholder: '~/Music'
        },
        {
          key: 'maxResults',
          name: 'Max Search Results',
          description: 'Maximum songs shown in the search and browse modal (default: 40).',
          type: 'number',
          placeholder: '40'
        },
        {
          key: 'volume',
          name: 'Volume',
          description: 'Playback volume percentage (0 to 100).',
          type: 'number',
          placeholder: '80'
        },
        {
          key: 'showStatusBar',
          name: 'Show in Status Bar',
          description: 'Display currently playing song in the bottom status bar.',
          type: 'toggle'
        },
        {
          key: 'endOfTrackAction',
          name: 'When Song Ends',
          description: 'Action to take when the current song finishes.',
          type: 'dropdown',
          options: [
            { label: 'Play next song in list', value: 'next' },
            { label: 'Repeat current song', value: 'repeat' },
            { label: 'Stop playback', value: 'stop' }
          ]
        },
        {
          key: 'scanButton',
          name: 'Library Scan',
          description: 'Scan or refresh your local music directory.',
          type: 'button',
          buttonLabel: 'Scan Library Now',
          action: 'scan-library'
        }
      ]
    });

    console.log(`[LeanPlayer] Loaded with ${this.library.length} cached tracks.`);
  }

  onunload() {
    this.stopPlayback();
    if (this.currentBlobUrl) {
      try { URL.revokeObjectURL(this.currentBlobUrl); } catch (_) {}
      this.currentBlobUrl = null;
    }
    if (this.app.statusBar && this.statusBarEl) {
      this.app.statusBar.removeItem('lean-player');
      this.statusBarEl = null;
    }
    if (Array.isArray(this._cleanups)) {
      this._cleanups.forEach((c) => {
        try { c(); } catch (_) {}
      });
      this._cleanups = [];
    }
  }

  onSettingChange(key, value) {
    this.settings[key] = value;
    if (key === 'volume') {
      const v = Math.max(0, Math.min(100, Number(value) || 0)) / 100;
      this.audio.volume = v;
      this.settings.volume = v;
    } else if (key === 'showStatusBar') {
      this.updateStatusBar();
    }
    this.saveData(Object.assign({}, this.settings, { cachedTracks: this.library }));
  }

  onSettingAction(action) {
    if (action === 'scan-library') {
      this.scanLibrary();
    }
  }

  async scanLibrary() {
    if (this.isScanning) {
      this.app.notify({
        id: 'lean-player-scan',
        title: 'Lean Player',
        body: 'Library scan is already running in background.',
        type: 'info'
      });
      return;
    }

    const targetDir = expandHomeDir((this.settings.musicDirectory || '~/Music').trim());
    if (!targetDir || !fs.existsSync(targetDir)) {
      this.library = [];
      this.updateStatusBar();
      this.app.notify({
        title: 'Lean Player',
        body: 'Music directory not found: ' + targetDir,
        type: 'warning'
      });
      return;
    }

    this.isScanning = true;
    this.app.notify({
      id: 'lean-player-scan',
      title: 'Lean Player',
      body: 'Scanning music library in background...',
      type: 'info'
    });

    try {
      const counter = { val: 0 };
      const raw = await this.recursiveScanAsync(targetDir, targetDir, counter);

      this.library = raw.sort((a, b) => {
        const folderCmp = a.folderPath.localeCompare(b.folderPath);
        if (folderCmp !== 0) return folderCmp;
        return a.name.localeCompare(b.name);
      });

      // Cache scanned tracks in data.json so startups are instantaneous
      await this.saveData(Object.assign({}, this.settings, { cachedTracks: this.library }));
      this.updateStatusBar();

      // Brief 250ms pause so ultra-fast scans have visual transition persistence
      await new Promise((resolve) => setTimeout(resolve, 250));

      this.app.notify({
        id: 'lean-player-scan',
        title: 'Lean Player',
        body: `Library scan complete: ${this.library.length} tracks found.`,
        type: 'success'
      });
    } catch (err) {
      console.error('[Lean Player] Error scanning directory:', err);
      this.app.notify({
        id: 'lean-player-scan',
        title: 'Lean Player',
        body: 'Failed to scan music directory: ' + (err.message || String(err)),
        type: 'error'
      });
    } finally {
      this.isScanning = false;
    }
  }

  async recursiveScanAsync(dir, baseDir, counter) {
    let results = [];
    try {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true });

      // Yield back to the browser event loop periodically so the UI never freezes
      counter.val++;
      if (counter.val % 30 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }

      for (const entry of entries) {
        if (entry.name.startsWith('.')) continue;
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          const sub = await this.recursiveScanAsync(fullPath, baseDir, counter);
          results = results.concat(sub);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (SUPPORTED_EXTENSIONS.has(ext)) {
            const relFolder = path.relative(baseDir, dir).replace(/\\/g, '/');
            results.push({
              name: path.basename(entry.name, ext),
              fullPath: fullPath,
              folderPath: relFolder || '',
              ext: ext.replace('.', ''),
            });
          }
        }
      }
    } catch (_) {}
    return results;
  }

  playTrack(track) {
    try {
      if (this.currentBlobUrl) {
        URL.revokeObjectURL(this.currentBlobUrl);
        this.currentBlobUrl = null;
      }

      const buffer = fs.readFileSync(track.fullPath);
      const mime = getAudioMimeType(track.ext);
      const blob = new Blob([buffer], { type: mime });
      this.currentBlobUrl = URL.createObjectURL(blob);

      this.audio.src = this.currentBlobUrl;
      this.audio.play().catch((e) => console.warn('[Lean Player] Audio play error:', e));

      this.currentTrack = track;
      this.isPlaying = true;

      const recents = Array.isArray(this.settings.recentTracks) ? this.settings.recentTracks : [];
      this.settings.recentTracks = [
        track.fullPath,
        ...recents.filter((p) => p !== track.fullPath)
      ].slice(0, 50);

      this.saveData(Object.assign({}, this.settings, { cachedTracks: this.library }));
      this.updateStatusBar();
    } catch (err) {
      this.app.notify({
        title: 'Lean Player',
        body: 'Failed to play track: ' + (err.message || String(err)),
        type: 'error'
      });
    }
  }

  togglePlayPause() {
    if (!this.currentTrack && this.library.length > 0) {
      this.playTrack(this.library[0]);
      return;
    }

    if (!this.audio.src) return;

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(() => {});
    }
  }

  playNextTrack() {
    if (this.library.length === 0) return;
    if (!this.currentTrack) {
      this.playTrack(this.library[0]);
      return;
    }

    const idx = this.library.findIndex((t) => t.fullPath === this.currentTrack.fullPath);
    const nextIdx = (idx + 1) % this.library.length;
    const nextTrack = this.library[nextIdx];
    if (nextTrack) this.playTrack(nextTrack);
  }

  playPrevTrack() {
    if (this.library.length === 0) return;
    if (!this.currentTrack) {
      this.playTrack(this.library[0]);
      return;
    }

    const idx = this.library.findIndex((t) => t.fullPath === this.currentTrack.fullPath);
    const prevIdx = (idx - 1 + this.library.length) % this.library.length;
    const prevTrack = this.library[prevIdx];
    if (prevTrack) this.playTrack(prevTrack);
  }

  stopPlayback() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
    this.currentTrack = null;
    this.updateStatusBar();
  }

  updateStatusBar() {
    if (!this.statusBarEl) return;

    if (!this.settings.showStatusBar || !this.currentTrack) {
      this.statusBarEl.textContent = '';
      this.statusBarEl.style.display = 'none';
      return;
    }

    this.statusBarEl.style.display = 'inline-flex';
    const icon = this.isPlaying ? '▶' : '⏸';
    this.statusBarEl.innerHTML = `
      <span class="lean-player-status-icon">${icon}</span>
      <span class="lean-player-status-text">${this.currentTrack.name}</span>
    `;
  }

  openSearchModal() {
    if (this.isScanning) {
      this.app.notify({
        title: 'Lean Player',
        body: 'Library scan is in progress. Please wait a moment...',
        type: 'info'
      });
      return;
    }

    if (this.library.length === 0) {
      this.app.notify({
        title: 'Lean Player',
        body: 'No tracks in library. Click "Scan Library Now" in settings.',
        type: 'info'
      });
      return;
    }

    const maxResults = Math.max(1, Number(this.settings.maxResults) || 40);
    const items = [];
    const seen = new Set();

    if (this.currentTrack) {
      items.push({
        id: this.currentTrack.fullPath,
        title: `▶ ${this.currentTrack.name}`,
        subtitle: `[Now Playing] ${this.currentTrack.folderPath || 'Library Root'} • ${this.currentTrack.ext.toUpperCase()}`
      });
      seen.add(this.currentTrack.fullPath);
    }

    const recents = Array.isArray(this.settings.recentTracks) ? this.settings.recentTracks : [];
    for (const p of recents) {
      if (seen.has(p)) continue;
      const track = this.library.find((t) => t.fullPath === p);
      if (track) {
        items.push({
          id: track.fullPath,
          title: track.name,
          subtitle: `[Recent] ${track.folderPath || 'Library Root'} • ${track.ext.toUpperCase()}`
        });
        seen.add(track.fullPath);
      }
    }

    for (const track of this.library) {
      if (seen.has(track.fullPath)) continue;
      items.push({
        id: track.fullPath,
        title: track.name,
        subtitle: `${track.folderPath || 'Library Root'} • ${track.ext.toUpperCase()}`
      });
      seen.add(track.fullPath);
    }

    ipcRenderer.send('modal-stage:open', {
      mode: 'switcher',
      actionId: 'lean-player:select-track',
      title: 'Lean Player',
      placeholder: 'Search songs, artists, albums... (Enter to play)',
      badge: `${this.library.length} tracks`,
      maxResults: maxResults,
      items: items
    });
  }

  openQueueModal() {
    if (this.library.length === 0) return;

    const total = this.library.length;
    const currentIdx = this.currentTrack
      ? this.library.findIndex((t) => t.fullPath === this.currentTrack.fullPath)
      : 0;

    const items = [];

    // Up to 3 previous tracks
    if (this.currentTrack && total > 1) {
      for (let i = 3; i >= 1; i--) {
        const prevIdx = (currentIdx - i + total) % total;
        const prevTrack = this.library[prevIdx];
        if (prevTrack && prevTrack.fullPath !== this.currentTrack.fullPath) {
          items.push({
            id: prevTrack.fullPath,
            title: prevTrack.name,
            subtitle: `[Prev -${i}] ${prevTrack.folderPath || 'Library Root'} • ${prevTrack.ext.toUpperCase()}`
          });
        }
      }
    }

    // Now Playing
    if (this.currentTrack) {
      items.push({
        id: this.currentTrack.fullPath,
        title: `▶ ${this.currentTrack.name}`,
        subtitle: `[Now Playing] ${this.currentTrack.folderPath || 'Library Root'} • ${this.currentTrack.ext.toUpperCase()}`
      });
    }

    // Next 15 tracks
    const nextLimit = Math.min(15, total - 1);
    for (let i = 1; i <= nextLimit; i++) {
      const nextIdx = (currentIdx + i) % total;
      const nextTrack = this.library[nextIdx];
      if (nextTrack) {
        items.push({
          id: nextTrack.fullPath,
          title: nextTrack.name,
          subtitle: `[Next +${i}] ${nextTrack.folderPath || 'Library Root'} • ${nextTrack.ext.toUpperCase()}`
        });
      }
    }

    ipcRenderer.send('modal-stage:open', {
      mode: 'switcher',
      actionId: 'lean-player:select-track',
      title: 'Playback Queue',
      placeholder: 'Select a track in queue to skip to it...',
      maxResults: 25,
      items: items
    });
  }
};