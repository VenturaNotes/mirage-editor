## 0.1.0-alpha.4 - 2026-10-02

### Added
- **Progress Planner Plugin**: A comprehensive project, goal, and task management suite integrated into the workspace:
  - **Goals Graph Dashboard**: An interactive, force-directed canvas that visualizes relationships between high-level goals, projects, and subtasks. Features sunflower-spiral child placement, topological leveling, directed arrowheads, impact level color coding (high, medium, low), and sub-tree frontier expansion (`⋯N`) and folding (`⌃`).
  - **Agenda Calendar View**: Week and month views for time-scheduled and recurring tasks (`RRULE`). Features a 24-hour time grid, real-time "now" indicator line, drag-and-drop rescheduling with 15-minute snapping, and an overdue task inspector.
  - **Active Task Tracking**: Pin any checkbox task line directly to the status bar chip (`⚡ Active: ...`). Automatically tracks task text, auto-clears when checked off, and opens the note directly in VaporNote on click.
  - **Task Notifications & Chimes**: Automated reminder service that checks due times, plays a synthesized audio chime via the Web Audio API, and delivers system notifications.
  - **Assign Date, Time & Recurrence Modal**: A quick-input modal featuring high-contrast native pickers for assigning due dates, times, and recurrence rules to markdown checkbox items.
- **Global Vault Search & Tag Explorer**: Full text search across all notes in the vault with direct line jumping, alongside a dedicated tag browser that ranks tags by frequency and allows instant vault-wide tag filtering.
- **Native Full-Width Status Bar**: Added a permanent bottom status bar to anchor workspace indicators, plugin status chips, and active task tracking.
- **Interactive Markdown Tag Pills**: Inline `#tags` in the Live Preview editor now render as interactive badge pills that initiate a vault-wide tag search with a single click.
- **Dynamic Tab Reordering & Split-to-Leaf Dragging**: Drag tabs horizontally within the tab bar for smooth, live reordering, or drag a tab down into edge drop zones (top, bottom, left, right) to split panes and move tabs seamlessly.
- **Custom View Tab Framework**: Added an extensible view architecture allowing plugins to mount dedicated custom views (such as the Goals Graph and Agenda) with full state persistence across app restarts.

### Changed
- **Redesigned Web Viewer Chrome**: Modernized the in-app browser header with a dark pill address bar, SSL lock indicator, and custom minimalist navigation controls, removing native OS button styling.
- **Fast O(1) Wikilink Resolution**: Rebuilt link and backlink resolution with exact path and basename index maps, substantially accelerating link clicks and graph parsing in large vaults.
- **Asynchronous Chunked Cache Loading**: Vault cache disk reads now process in non-blocking batches of 2,500 entries, preventing UI stuttering and thread locking on startup.
- **Multi-Line YAML Frontmatter Support**: Frontmatter parsing now natively supports multi-line YAML lists, array syntax, booleans, and list-style aliases.
- **Software Layout-Aware Shortcuts**: Keyboard chord dispatching now strictly adheres to the active software keyboard layout (such as Dvorak or Colemak) instead of physical hardware key codes.
- **Hub Node Collapsing**: Graph nodes with a large number of children automatically collapse lower-impact subtasks into informative `+N` badges to keep dense project graphs legible.
- **Streamlined Indexing Notifications**: Progress notifications are now suppressed during small background updates, displaying toast notifications only when re-indexing large batches of notes.
- **Quick Switcher Locale Formatting**: Search result badges and vault item totals in Quick Switcher modals now format large numbers with locale digit separators.

### Fixed
- **Sidebar Scrollbar Bleed**: Fixed an issue where the file tree scrollbar thumb remained visible on the left window edge when the sidebar was collapsed.
- **Plugin Toggle Persistence**: Resolved a bug where disabled core plugins could re-enable themselves on application restart.
- **URL Bar Out-of-Sync State**: Fixed the browser address bar failing to reflect the current URL when pages redirected or changed titles dynamically.
- **Chromium Window Reload Interception**: Prevented native browser reload events from refreshing the entire application window, properly delegating the command to workspace actions.

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
