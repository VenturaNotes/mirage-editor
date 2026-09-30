# Mirage Editor

Welcome to the initial alpha preview of Mirage Editor, a unified research environment for notes, web exploration, and terminal workflows.

> **Alpha Status**: This is an early preview release intended for testing and feedback. While core stability is high, features and APIs are actively evolving.

---

## Key Highlights

### CodeMirror 6 Live Preview
- **Interactive Markdown**: Seamlessly renders headings, checkboxes, bullet/numbered lists, and images in-place.
- **Offline Math**: Synchronous, zero-flicker LaTeX math formulas powered natively by KaTeX without any CDN dependencies.
- **Interactive Wiki Backlinks**: Link between notes using `[[Note Name|Alias]]` syntax with bidirectional backlink tracking.
- **Frontmatter Cards**: Interactive YAML properties card rendered at the top of notes with an inline property editor.

### Multi-Pane Workspace & Native Web Browser
- **4-Directional Split Panes**: Split leaves in any direction (Top, Bottom, Left, Right) to arrange your notes side-by-side.
- **Native WebBrowser Tabs**: Open full-featured browser tabs (`WebContentsView`) directly inside workspace panes alongside your markdown notes.
- **Dynamic Layout Sync**: Preserves active leaf layouts, tabs, and scroll positions across sessions.

### Built-in Core Plugins (Enabled by Default)
1. **Integrated Floating Terminal**:
   - Spawns a native background PTY session directly in the main process using `node-pty`.
   - Floats cleanly on top of both Markdown notes and WebBrowser tabs with zero screen repainting (Neovim stays alive in the background).
   - Fully resizable in 8 directions with header drag-and-drop.
2. **Workspace Spaces & Tab Groups**:
   - Isolate different projects into virtual tab spaces (`Default`, `Work`, `Research`).
   - Switch between spaces instantly with fuzzy-search query switcher (`Cmd + Shift + P`).
   - Move active tabs between spaces without cluttering your workspace.
3. **In-Memory File Encryption (`.mdenc`)**:
   - Protect sensitive notes using industry-standard **AES-256-GCM** encryption with PBKDF2 key derivation (210,000 iterations).
   - Unlocks in-memory so plaintext is never written unencrypted to disk.
   - Automatically re-encrypts on auto-save.

### Performance & Architecture
- **In-Vault Configuration**: Each opened vault stores its own settings, spaces, hotkeys, and tabs inside `<vault>/.mirage-editor/config.json`.
- **Sub-100ms Indexing**: Two-phase stat scanning caches file metadata to ensure instant startups even on large vaults.
- **Native App Restart**: Restart the application cleanly with `Cmd + Shift + Alt + R` (preserves macOS fullscreen mode automatically).

> **Note:** Mirage Editor is currently in early alpha and not yet notarized. If macOS blocks it on first launch, you can allow it under **System Settings → Privacy & Security → Open Anyway**.
