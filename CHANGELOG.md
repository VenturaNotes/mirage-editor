## 0.1.0-alpha.3 - 2026-10-02

### Added
- **VaporNote Companion (`Alt + M`)**: A dedicated floating, translucent, multi-tab companion window for side-by-side note taking and web browsing. Features an opacity slider, 8-directional edge resizing, fullscreen toggle (`Alt + F`), and full state persistence across restarts.
- **Quick Switcher Plugin (`Cmd + O`)**: A redesigned quick switcher engine supporting search prefixes, note aliases (`↪ Alias`), token highlighting, extension badges, and instant note creation (`Cmd + Shift + Enter`).
- **Heading Switcher (`Cmd + Shift + H`)**: Quickly jump between sections in the current note. Features visual hierarchy bullets based on heading level (`#` to `######`), live match counts, and `Tab` to cycle between search results.
- **Focus Address Bar (`Cmd + L`)**: Quickly jump directly into the active browser tab's address bar to enter a new URL or search query.
- **URL Bar Context Menu**: Added a right-click context menu to browser URL bars supporting native Cut, Copy, Paste, and Select All actions.

### Changed
- **Modal Layering Above Web Views**: Moved Tab Groups prompts (create, switch, delete space) to the dedicated top-level modal stage, ensuring modals never get hidden behind active webviews.
- **VaporNote Tab Shortcuts**: Added full keyboard navigation to VaporNote tabs—cycle tabs with `Cmd + Option + Left / Right`, close tabs with `Cmd + W`, and restore recently closed tabs with `Cmd + Shift + T`.
- **Quick Switcher Prefix Rules**: Configure custom folder scopes, excluded extensions, and default destination folders per symbol prefix directly in Settings -> Quick Switcher.
- **VaporNote Minimize Options**: Added an **Invisible Minimize** setting to hide VaporNote completely (0% opacity) rather than collapsing into a 36×36px floating restore icon.
- **Checked Task Styling**: Checked task items (`- [x]`) now cleanly dim to muted grey without intrusive strikethroughs, maintaining markdown readability.
- **Dedicated Webpage Reload (`Cmd + R`)**: Rebound and isolated browser page reloads so they can be remapped independently in Settings -> Hotkeys without interfering with the editor window.

### Fixed
- **Embedded Web Restriction Headers**: Stripped restrictive `X-Frame-Options` and `Content-Security-Policy` headers to allow sites that normally refuse to load inside app frames to render properly.
- **Window Close Glitch (`Cmd + W`)**: Resolved an issue where pressing `Cmd + W` on an empty tab state or inside an overlay could close the main application window.
- **Modal Click Dead Zones**: Fixed modal bounds lingering after closing, which previously blocked clicks from reaching underlying workspace tabs.
- **Cross-Surface File Sync**: Edits made to Markdown notes inside VaporNote now immediately sync to open tabs in the main workspace and update the global file cache in real time.

## 0.1.0-alpha.2 - 2026-09-30

### Added
- **Web Viewer Plugin**: The in-app browser is now a dedicated core plugin with full search engine customization.
- **Smart Web Search (`Cmd + Shift + S`)**: Quickly search the web or jump to a URL from anywhere using a fast overlay prompt.
- **Configurable Search Engines**: Choose your default search engine in Settings (Google, DuckDuckGo, Bing, Brave, Ecosia, Kagi, or a custom search URL).
- **Customizable Start Page**: Set a default home page for new browser tabs (`Cmd + Shift + N`), or leave it set to your default search provider.
- **In-Tab Web Inspector**: Added a DevTools button (`🛠`) directly in the web navigation bar to inspect web pages with a single click.

### Changed
- **Recent Commands in Palette**: The Command Palette (`Cmd + P`) now remembers what you use most and pins your recently executed commands to the top.
- **Smart Hotkey Rebinding**: Assigning an existing shortcut to a new command now automatically clears the old binding instead of throwing a conflict error.
- **Better Link Handling**: Links set to open in a new window now open directly as adjacent tabs in your workspace instead of being blocked.
- **Cleaner Shortcut Labels**: Hotkeys throughout menus and the Command Palette now display clear, platform-native symbols (`Cmd`, `Opt`, `Ctrl`, `Shift`).
- **Smoother Pane Resizing**: Eliminated white flashes and unnecessary repaints when resizing or switching between web tabs.
- **Terminal Shortcut Cleanup**: Removed the default `Cmd + R` shortcut from the floating terminal to prevent conflicts with standard browser reloads.

### Fixed
- **Google Sheets Stability**: Fixed frequent crashes, blank screens, and formula calculation freezes when working inside Google Sheets and complex web apps.
- **Web Account Logins**: Fixed compatibility issues with third-party authentication and sign-in services inside embedded browser tabs.
- **DevTools Reload Glitch**: Pressing `Cmd + R` while inside the Developer Tools console no longer reloads the entire editor window.
- **Tab Focus Glitch**: Fixed an issue where switching between web tabs could occasionally cause the view to flicker or get stuck in a focus loop.

## 0.1.0-alpha.1 - 2026-09-29

### Added
- **CodeMirror 6 Live Preview**:
  - Interactive markdown rendering (headings, checkboxes, lists, images).
  - Offline, zero-flicker LaTeX math formulas powered natively by KaTeX.
  - Interactive wiki backlinks using `[[Note Name|Alias]]` syntax with bidirectional tracking.
  - Frontmatter cards with an interactive inline property editor.
- **Multi-Pane Workspace & Native Web Browser**:
  - 4-directional split panes (Top, Bottom, Left, Right).
  - Native WebBrowser tabs (`WebContentsView`) directly inside workspace panes.
  - Dynamic layout sync to preserve pane layouts, active tabs, and scroll positions across sessions.
- **Floating Background Terminal**:
  - Main-process native PTY session via `node-pty`.
  - Floats above notes/tabs with 8-direction resizing and zero repainting.
- **Workspace Spaces & Tab Groups**:
  - Virtual tab spaces (`Default`, `Work`, `Research`) switchable via fuzzy search (`Cmd + Shift + P`).
- **In-Memory File Encryption (`.mdenc`)**:
  - AES-256-GCM encryption with PBKDF2 (210,000 iterations). Plaintext is never written unencrypted to disk.
- **Vault Configuration & Quick Restart**:
  - Per-vault configuration stored at `<vault>/.mirage-editor/config.json`.
  - Sub-100ms cold start indexing via two-phase stat scanning.
  - Quick app restart via `Cmd + Shift + Alt + R` (preserves macOS fullscreen mode).
