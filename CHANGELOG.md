## 0.1.0-alpha.9 - 2026-10-07

### Added

- **Sidebar File & Folder Context Menu**:
  - **Move to Trash**: Right-clicking any file or folder in the sidebar now lets you safely move it to your system Trash (macOS) or Recycle Bin (Windows).
  - **Reveal in File Manager**: Added a native "Reveal in Finder" / "Show in File Manager" option to quickly jump to any note or asset in your operating system's file browser.
  - **Smart Cleanup**: Trashing a file or folder automatically closes any open editor tabs referencing it across both the main workspace and VaporNote, keeping your workspace clean.
- **Custom Stable Scrollbar for Markdown**:
  - **Overhauled Scroll Ergonomics**: Replaced inconsistent native browser scrollbars with a custom, fluid scrollbar designed specifically for the Markdown editor.
  - **Edge Snapping**: Dragging the scrollbar thumb to the extreme top or bottom edge now cleanly snaps the viewport to the absolute beginning or end of your document in a single, smooth drag.
  - **Dynamic Layout Sync**: The scrollbar automatically recalibrates its size and position as images load, math blocks (KaTeX) render, headings fold, or tabs switch—eliminating jumpy scroll behavior in long notes.
  - **Jump-Free Dragging**: Clicking and dragging the thumb preserves your relative cursor offset, preventing unexpected position shifts when grabbing the scrollbar.

### Changed

- **Google Sign-In Support in Web Viewer**:
  - Enhanced network request headers during Google authentication (`accounts.google.com`). This resolves the *"This browser or app may not be secure"* block, allowing seamless login to Google accounts and services directly inside Web Viewer tabs.
- **Trash-Aware "Reopen Closed Tab"**:
  - Reopening closed tabs (`Cmd/Ctrl+Shift+T`) now checks whether files still exist on disk. Any notes or folders that were moved to the trash or deleted externally are skipped automatically rather than failing to load.
  - Moving a note to the trash immediately purges it from your closed tab history.
- **Safer Document Autosave**:
  - The editor now verifies that a note still exists in the vault before saving background changes, preventing trashed or deleted files from being accidentally recreated by lingering editor buffers.
- **Folder Change Detection**:
  - Improved real-time vault file watching to actively monitor folder creation and removal, ensuring the sidebar stays synchronized when directories are moved or altered outside the app.

### Fixed

- **Eliminated Scrollbar Jumps on Tab Switching**:
  - Fixed an issue where switching between workspace tabs or unhiding VaporNote could cause editor scroll positions to misalign before the layout finished rendering.
- **Prevented Ghost Tab Restoration**:
  - Fixed an issue where pressing the reopen tab shortcut after deleting files could restore broken, empty editor panes.

## 0.1.0-alpha.8 - 2026-10-06

### Added
- **Smart Hotkey Conflict Prevention**:
  - **Collision Protection**: Assigning a shortcut that is already in use will no longer silently overwrite your existing command. Both commands now retain the shortcut, but execution is safely paused to prevent unintended actions until the conflict is resolved.
  - **Visual Conflict Badges**: The Hotkeys settings panel now highlights overlapping shortcuts with a warning banner and inline `⚠️ Conflict (Disabled)` badges.
  - **Helpful Alerts**: If you press a shortcut that has multiple assigned commands, a notification will pop up explaining which commands are conflicting so you can easily update them.
### Changed
- **Seamless VaporNote Opacity**:
  - Web and PDF tabs inside VaporNote now fade uniformly alongside the rest of the window when adjusting the opacity slider. Newly opened web tabs also inherit your current transparency level immediately.
- **Reliable Notification Popups**:
  - Notification popups will no longer get clipped or cut off when resizing the app window or switching in and out of fullscreen mode.
  - Repeated alerts with the same message (such as duplicate hotkey warnings) will now refresh cleanly in place instead of cluttering your screen with duplicate cards.
- **Cleaner Command Palette**:
  - Streamlined command subtitles in the palette by removing redundant labels, keeping the focus entirely on the command names and shortcut hints.
### Fixed
- **VaporNote Tab Overlap on Drag/Resize**:
  - Fixed an issue where switching from a Web or PDF tab to a Markdown or image note could cause the hidden web view to pop back into view when moving or resizing the VaporNote window.

## 0.1.0-alpha.7 - 2026-10-05

### Added

- **Isolated WebContentsView PDF Architecture**:
  - **Process & RAM Isolation**: Migrated the PDF viewer from an in-renderer DOM custom view to isolated `WebContentsView` instances across both the main workspace and VaporNote. Tab destruction now completely disposes of guest views and immediately releases physical memory back to the OS.
  - **LRU Canvas Caching**: Implemented a Least-Recently-Used (LRU) canvas eviction policy limiting high-DPI rendered canvases in GPU memory (capped at 18 pages). Off-screen canvases are unloaded dynamically while preserving the underlying text selection layer.
  - **Native Chromium Find in Page (`Cmd/Ctrl+F`)**: Added a floating search bar integrated with Chromium’s native `findInPage` engine, featuring active match ordinal counters (e.g., `3/12`), next/previous result navigation, and full keyboard navigation.
  - **Draggable Anchor Relocation**: Hold `Cmd` or `Ctrl` while dragging any anchor pin marker across a PDF page to interactively reposition it; updated coordinates are automatically written back to referencing Markdown notes across the vault.
- **VaporNote Multi-Format Tabs (PDF & Image Viewer)**:
  - **Isolated PDF Tabs in VaporNote**: Opened PDFs now render inside dedicated VaporNote tabs with full support for dark mode inversion, anchor drawers, and page navigation.
  - **Integrated Image Viewer**: Added native image tab rendering for common image formats (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`, etc.), featuring click-to-zoom toggling between container-fit and natural dimensions, image context menu support, and missing file fallback states.
  - **Intelligent Wikilink Routing**: Wikilinks opened within VaporNote now parse target file extensions to automatically route into Markdown, PDF, or image tabs.
- **Universal Quick Switcher Search**:
  - Enhanced the Quick Switcher to index all files within the vault (including PDFs and images) alongside cached Markdown documents, allowing non-text assets to be searched and opened directly from the palette.

### Changed

- **Element-Anchored PDF Zoom**: Overhauled zooming algorithms to lock to cursor percentage coordinates on the active page shell, completely eliminating CSS gap drift and layout jumps during step and pinch zooming.
- **Inertia-Safe Pinch Zoom**: Trackpad pinch-to-zoom is now strictly bound to `Ctrl + Wheel` (excluding `Meta`), preventing accidental inertia and gesture-based over-zooming.
- **Vault File Listing API**: Updated `Vault.listFiles` and `Vault.listFilesAsync` to accept empty filter arrays or wildcard `*` patterns to retrieve all vault files regardless of extension.
- **Unified PDF Shortcut Forwarding**: Implemented input event interception inside isolated PDF views to transparently forward global workspace shortcuts, tab navigation chords, and tab closure (`Cmd/Ctrl+W`).
- **VaporNote State & Bounds Management**: Refactored VaporNote window management logic to handle drag deltas, edge resizing, state persistence, and bounds synchronization seamlessly across minimized, normal, and fullscreen states.

### Fixed

- **PDF Memory Retention**: Resolved memory leaks on tab closure by properly aborting active render tasks, destroying PDF.js worker instances, and unhooking resize observers.
- **Multi-Tab WebContentsView Clipping**: Fixed visibility state transitions in VaporNote and split panes to ensure underlying WebContentsViews are cleanly hidden or restored when switching between Markdown, Image, PDF, and Web tabs.
- **PDF Anchor Link Navigation**: Fixed a timing issue when navigating directly to PDF coordinates from Markdown wikilinks by coordinating bounds rendering with anchor beacon triggers.

## 0.1.0-alpha.6 - 2026-10-04

### Added

- **AirSketch Plugin**: Complete live bidirectional sketching and stylus drawing companion for iPad, tablets, and external devices:
  - **Embedded Local Server & Private Pairing**: Built-in HTTP server with Server-Sent Events (SSE) broadcasting, local network URL sharing, optional private security token authentication, and configurable port settings.
  - **Touch & Stylus-Optimized Canvas**: High-performance tablet canvas distinguishing Apple Pencil/stylus from finger input, enabling seamless palm rejection, finger panning, and pinch-to-zoom.
  - **Comprehensive Drawing Toolset**: Includes Pen, Eraser, Text, Marquee Box Select, Freeform Lasso Select, Hand/Pan tool, Fill toggle, and parametric vector Shapes (rectangles, squares, circles, ellipses, lines, and directional arrows).
  - **Non-Destructive SVG Architecture**: Drawings are serialized into clean, standard SVGs embedded with JSON state metadata (`data-state`), allowing drawings to render natively as images while maintaining full vector editability.
  - **Bidirectional Markdown Integration**: Run the `Create and Embed New Drawing at Cursor` command to generate an SVG drawing directly into your active note. Holding `Cmd` or `Ctrl` while clicking any embedded drawing in Markdown instantly loads that file onto the connected iPad.
- **Web Viewer Suite (Video Enhancer, Ad Blocker & Incognito Mode)**:
  - **Video Enhancer (YouTube & TikTok)**: Injected playback controls featuring keyboard shortcuts: `D` / `S` for variable speed stepping (0.1x), `R` to toggle/reset playback speed, `H` to hide player chrome, and `F` for seamless in-window pseudo-fullscreen without window detachment. Includes a floating speed badge overlay.
  - **Integrated Ad Blocker**: Network-level blocking of ad tracking domains combined with client-side cosmetic filter injection and automatic 16x accelerated video ad skipping on YouTube.
  - **Incognito Browsing Mode**: Optional ephemeral in-memory browsing session (`incognito-web`) that prevents caching of cookies, logins, and session history across tabs.
- **Script Runner Core Plugin**:
  - Migrated custom user script management into a modular core plugin (`script-runner`).
  - Automatically watches the vault for changes to `.js` files to reload automation scripts in real time.
  - Added dedicated commands and desktop notification feedback for reload and execution errors.

### Changed

- **PDF Selectable Text Layer**: Implemented a native PDF.js text layer overlay across all pages, enabling precise text selection, cursor highlighting, and clipboard copying.
- **PDF Hyperlinks & Document Destinations**: Added interactive annotation link handling for PDFs. External URLs automatically open in an adjacent Web Viewer tab within the current split pane, while internal references navigate directly to the target destination page.
- **PDF Direct Page Jump & Indicator**: Introduced a numeric `[ Page ] of Total` toolbar control supporting direct page entry on `Enter` alongside instant, non-animated page jumping.
- **Live Cursor-Anchored PDF Zoom**: Added interactive mouse-wheel and pinch zooming anchored to the cursor position, utilizing instant GPU layout scaling debounced before high-resolution rasterization.
- **Unified Address Bar Navigation (`Cmd/Ctrl+L`)**: Global address bar shortcut now contextually focuses and selects URL text in either the active split workspace webview or VaporNote depending on surface focus.
- **VaporNote Refinements**:
  - Updated default window opacity to 1.0 (opaque) and streamlined background styles.
  - Enabled right-click context menu handling on the URL input.
  - Relaxed tab deduplication constraints so duplicate web queries and URLs can be opened across multiple tabs.
  - Search queries now format dynamically in tab titles (e.g., `query - Search`).
- **Dynamic Settings Modal Navigation**: The settings sidebar now dynamically reflects enabled core plugins, displaying dedicated configuration tabs for User Scripts and AirSketch only when active.
- **Automated Config Migrations**: Updated configuration schema versioning (`configVersion: 4`) with automatic migrations to register newly introduced core plugins (`script-runner` and `airsketch`).

### Fixed

- **PDF.js Worker & Document Destruction**: Fixed an error caused by calling the deprecated `pdfDoc.destroy()` method by adopting proper `loadingTask.destroy()` and `cleanup()` lifecycle routines to prevent memory leaks and orphaned worker processes.
- **PDF Viewport Coordinate Deprecation**: Replaced deprecated `convertToViewportRectangle` coordinate calls with safe viewport affine transformation matrix calculations.
- **Modal Mounting Flicker**: Eliminated a visual flash and layout pop during modal rendering by maintaining `visibility: hidden` until the stage DOM layout is prepared.
- **VaporNote CSS Path Resolution**: Fixed broken relative asset paths in `vapornote.html` pointing to core main, workspace, and KaTeX stylesheets.
- **Live Preview Checkbox Sizing**: Added explicit width, height, and SVG fill/stroke constraints to checkbox widgets to prevent checkmark paths from rendering as large filled shapes if stylesheet rules fail to apply.
- **Split Pane Bounds Desync on Fullscreen Exit**: Added a bound resynchronization handler (`wcv:restore-bounds`) ensuring webviews restore their exact split pane positions after exiting in-window video fullscreen.

## 0.1.0-alpha.5 - 2026-10-03

### Added
- **PDF Anchor Plugin**: Precision spatial PDF reading and deep-linking suite natively integrated into the workspace via PDF.js:
  - **Precision Spatial Anchors**: Link exact two-dimensional coordinates on any PDF page using normalized `pt=x,y` syntax (`[[document.pdf#p=3&pt=420,680]]`). Includes instant cursor drop (`Cmd+Shift+P`), interactive crosshair placement, and automatic wikilink copying to the clipboard.
  - **Interactive On-Page Pins & Proximity Clustering**: Visual pill badges anchored directly over PDF pages. Closely grouped annotations (within 3% proximity) automatically collapse into clustered count badges.
  - **Drag-to-Relocate Link Syncing**: Hold `Cmd` or `Ctrl` while dragging any anchor pin on the canvas to reposition it. Mirage automatically finds and updates the coordinate references across all citing Markdown notes in your vault.
  - **Zotero-Style Slide-Out Drawer**: A collapsible panel listing all vault citations grouped by page number, featuring instant real-time search across note titles, cited snippets, and page numbers.
  - **Chalkboard Dark Mode**: High-contrast, inverted dark reading mode (`Alt+D`) tailored for reading light PDFs in dark environments.
  - **Glowing Ripple Beacon**: Navigating to an anchor or creating a new pin triggers an animated, 2-second glowing ripple beacon over the exact target coordinates.
  - **Non-Blocking Streaming Resolution**: Backlink indexing scans notes in background micro-batches (30 files/tick), maintaining a fluid 60 FPS even across vaults with thousands of citations. Includes per-tab job cancellation and automatic memory eviction upon tab close.
- **Split-Pane Multi-Webview Support**: Rewrote `WebContentsView` lifecycle management to support true multi-pane browsing. You can now tile independent browser tabs side-by-side across split leaves without panes hiding or hijacking visibility from one another.

### Changed
- **Co-Located Plugin Architecture**: Restructured plugins (`terminal`, `vapornote`, `quickSwitcher`, `progressPlanner`, and `pdfAnchor`) into self-contained directory modules. The build pipeline now automatically bundles scripts and mirrors co-located HTML and CSS assets directly to `dist/plugins/`.
- **Deep-Link Wikilink Routing**: Wikilinks targeting PDF pages and coordinates (`#p=X&pt=X,Y`) are now intercepted vault-wide, opening the PDF custom view, scrolling smoothly to the point, and pulsing the coordinate beacon.
- **Automated Config Migrations**: Introduced schema versioning (`configVersion: 2`) to the app configuration. Automatically injects newly introduced core plugins into existing installations without overriding user-disabled plugin preferences.
- **Virtualized PDF Canvas Rendering**: PDF page rendering is now driven by an `IntersectionObserver` with upfront viewport dimension reservation, eliminating layout jumping and vertical flex squashing during fast scrolling.
- **Pixel-Snapped Webview Bounds**: Rounded all WebContentsView bounds to exact integer coordinates, eliminating subpixel layout blurriness in high-DPI split views.

### Fixed
- **Split Pane Webview Occlusion**: Fixed an issue where switching tabs in one split pane broadcasted a global hide signal, causing active browser views in adjacent leaves to disappear.
- **Inactive Tab Display Overrides**: Removed conflicting `!important` CSS rules from `.webview-holder`, ensuring `.hidden` correctly suppresses inactive webview tabs across split leaves.
- **Orphaned WebContents Destruction**: Fixed an issue where recreating existing webview tabs could leave duplicate, orphaned `WebContentsView` instances attached to the main window.
- **Plugin Stage Bundle Paths**: Fixed broken asset and stage bundle paths for Terminal and VaporNote overlays following the co-located plugin reorganization.

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
