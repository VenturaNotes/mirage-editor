## 0.1.0-alpha.39 - 2026-11-22

### New Features

- **Progress Planner Constellation View**:
  - **Physics-Based Dependency Constellation**: Reimagined the default Graph view into an organic, force-directed constellation layout that automatically organizes your `#today` tasks, untangles dependency lines, and bundles complex connections.
  - **Quick Jump & Search Bar**: Added a top search bar to the Graph view allowing you to instantly filter, select, and cycle through actionable tasks using dedicated **Prev** and **Next** buttons.
  - **Floating Task HUD**: Hovering or clicking any node displays an overlay card at the bottom of the canvas showing task status, category pillar, direct blockers, unlocked downstream tasks, and note origins.
  - **Dedicated Left-to-Right Mode**: Preserved the structured column hierarchy under a dedicated **L→R** view mode button, letting you seamlessly switch between the new Constellation layout, classic tiered columns, and the standard checklist.

### Improvements

- **Task Graph & Canvas Controls**:
  - **Hide Completed Tasks**: Added a **Hide Done** toggle to both Graph and L→R canvas views, instantly clearing finished work and repositioning remaining tasks for a cleaner focus space.
  - **Direct Note Jump**: Holding `⌘` (or `Ctrl`) while clicking any task node in the graph now opens the corresponding file and jumps directly to that task's line number in the editor.
  - **Pillar-Based Color Coding**: Tasks and indicator dots are now color-coded by category pillar (e.g., health, development), providing immediate visual distinction across different life and project areas.
  - **Polished Lineage & Edge Visuals**: Updated dependency highlight paths with animated dashed flows and distinct color schemes—sky blue for upstream blockers, pink for downstream unlocks, and vibrant yellow for immediately actionable (Ready) tasks.
  - **Line Crossing Bridges**: Canvas connectors now draw arched hops over intersecting dependency edges to prevent visual clutter in interconnected graphs.
  - **Smart Viewport & Auto-Fit**: Improved camera centering and zoom behavior with automatic workspace resize detection, smooth focus panning, and an instant **Fit** button.

### Fixes

- **Panel Lifecycle & Resource Management**:
  - **Smoother Animations & Focus Retention**: Ensured active physics simulation frames, drag handlers, resize observers, and camera jump timers are properly released when switching views or refreshing tasks, preventing background UI stutter.

## 0.1.0-alpha.38 - 2026-11-21

### New Features

- **Progress Planner**:
  - **Whole-Note Task Support**: You can now designate entire notes as actionable items in your daily planner by including `#today` tags in the YAML frontmatter. The planner automatically recognizes note titles and completion statuses alongside regular checklist items.
  - **Tag-Based Dependency Linking**: Multi-task dependencies and subtasks are now managed seamlessly through structured `#today` tags (e.g., `#today/<pillar>/<id>-<parents>`). This replaces intrusive block IDs with clean, standardized metadata.

### Improvements

- **Progress Planner**:
  - **Flat Suggested Tasks Organization**: AI-suggested tasks and subtasks are now added directly into a single, clean list within `SuggestedTasks.md`, eliminating cluttered subtask subheadings while preserving full dependency relationships in the visual planner.
  - **Seamless Dependency Editing**: Adding or removing blocker relationships in the DAG view instantly updates the corresponding `#today` tag parameters without modifying the text of your tasks.
- **Editor Live Preview**:
  - **Missing Image Indicators**: When an embedded image cannot be found on disk or fails to load, Live Preview displays a helpful inline badge (`[Image not found: ...]`) instead of leaving an empty space or broken image element.
  - **Robust Image Path Resolution**: Image widgets now resolve paths using vault link caching and standards-compliant file URLs, ensuring images with special characters or relative attachment paths render reliably.
- **VaporNote**:
  - **Enhanced Image Loading & Error States**: Image viewing tabs in VaporNote now load via standardized file URLs and display an explicit error alert if the underlying file has been moved or deleted.

### Fixes

- **Workspace & Tab Restoration**:
  - **Automatic Pruning of Missing Files**: Restoring a saved workspace layout now automatically ignores files that have been deleted or moved from the vault, preventing broken or blank editor tabs on launch.
  - **History Navigation for Deleted Files**: Navigating backward or forward through tab history now detects missing vault files and smoothly skips over them to the next available entry.
  - **PDF History Retention**: Fixed an issue where tab navigation history was lost when navigating to PDF documents.
- **VaporNote Session Recovery**:
  - **Stale Tab Cleanup**: VaporNote now checks whether local files exist before reopening previous tabs on startup, cleanly skipping nonexistent files and focusing the nearest valid tab.

## 0.1.0-alpha.37 - 2026-11-20

### New Features

- **Execution DAG & Interactive Graph View**:
  - **Visual Left-to-Right Execution Graph**: Switch between a standard task checklist and a full-height interactive dependency graph (DAG) in the AI Planner to instantly see what is ready now and what is blocked.
  - **Lineage Highlighting & Canvas Navigation**: Smoothly pan, zoom, and auto-fit your graph canvas. Hovering or clicking any task spotlights its upstream blockers (blue) and downstream unlocked tasks (amber) with animated dependency paths.
  - **Inline Dependency Editor**: Inspect and edit task dependencies directly inside the panel. Quickly add prerequisites, unlink blockers, toggle completion, set active focus, or Cmd/Ctrl+Click to jump straight to the source note.

- **AI Subtask Breakdowns & Suggested Tasks Note**:
  - **Dedicated Suggested Tasks Storage**: Brand-new proposed tasks and AI-generated subtask breakdowns are now appended to a dedicated vault note (`SuggestedTasks.md` inside your planner context folder by default, customizable in settings).
  - **Structured Subtask Linking**: Indented subtasks generated in AI planning chats are automatically grouped under dedicated parent headers with back-links, cleanly establishing parent-child execution order.
  - **Cross-Task Blocker Syntax**: Full support for multi-parent blockers using natural `[after: <task>]` syntax and vault-safe block references (`^td-...`), keeping dependent tasks locked until prerequisites are checked off.

### Improvements

- **AI Planner Workflow & Layout**:
  - **Collapsible Overview Drawer**: Summary details, pillar balances, and daily anchors can now be collapsed behind an expandable drawer, maximizing vertical space for your active execution graph or list.
  - **Blocked Task Badges**: Checklist view now displays prominent lock indicators detailing exactly which incomplete tasks are blocking progress.
  - **Direct Graph Shortcuts**: Added a dependency link button to each checklist item to immediately jump into that task's relationship view in the graph.
  - **Vault-Wide Clear Completed**: Easily strip `#today` tags from completed tasks across all vault notes in a single click.
  - **Live Vault Synchronization**: Today's Focus now derives its state directly from live `#today` tags across the vault rather than maintaining separate, duplicative task records.

- **Live Preview Tag Polish**:
  - **Pillar Subtag Rendering**: Specific pillar tags such as `#today/health` or `#today/writing` now render as clean `#today` pills in the editor while preserving the full pillar tag on hover.

- **Task Archiving & Cache Hygiene**:
  - **Clean Archive Stripping**: Archiving finished task trees automatically cleans up `#today/<pillar>` tags and temporary execution blocker markers (`^td-...`).
  - **Pillar Tracking via Tags**: Pillar balances now dynamically detect `#today/<pillar-name>` tags to track progress without requiring manual configuration.

### Fixes

- **Planner Settings & Cache Synchronization**:
  - **Startup Cache Alignment**: Fixed an issue where planner configuration updates were not immediately propagated to the background task cache on initial vault load.
  - **Task Title Sanitization**: Resolved an issue where dependency symbols and temporary block identifiers could leak into task titles in the planner cache.

## 0.1.0-alpha.36 - 2026-11-19

### New Features

- **Daily Anchors (Deterministic Routine System)**:
  - **Template-Driven Daily Tasks**: Define routine tasks across one or more notes or specific headings (e.g., `Tasks/Routine.md#Template`) to generate your daily checklist without cluttering your core project files.
  - **Automatic Rollover & Archiving**: Use the **Refresh Daily** button or run the `Refresh Daily Anchors` command to automatically move completed items into your monthly archive, roll over unfinished tasks without creating duplicates, and respawn fresh template items.
  - **Inline Sidebar Management**: Track progress, toggle completions, or jump straight to the source file directly from the new collapsible Daily Anchors section in the Today tab.
  - **Customizable Target Note**: Choose where active daily anchor checklists live in your vault (defaults to `Daily Anchors.md`) via **Settings → Progress Planner**.

- **Chat Check-Ins & AI File Requests**:
  - **One-Click Chat Check-In**: Use the **Copy Check-In** button in the Today tab to copy a concise snapshot of your live Daily Anchors, focus queue, and pillar progress into an active AI chat without re-uploading entire vault bundles.
  - **Automated Context Expansion**: When an AI model requests additional omitted notes via `### Request Files`, Mirage identifies valid vault files and provides a **Copy Requested Files** button to copy their content to your clipboard.

### Improvements

- **AI Planner Bundle Customization**:
  - **Custom "Since" Date Picker**: Replace fixed time presets with a customizable date selector accompanied by an intuitive relative-time badge (e.g., *Today*, *3d ago*, *2w ago*) to select notes modified on or after a chosen date.
  - **Real-Time Note Filtering & Selection**: Added an instant search bar to find specific task notes, alongside **All** and **None** quick-selection controls.
  - **Optional Archive Inclusions**: Toggle whether completions from your monthly archive folder are included in the bundle.
  - **Advanced Completed Task Modes**: Collapse or expand the **Advanced** menu to customize completed tasks in bundled notes—keep all, exclude all, or specify an exact completion date range.
  - **Persistent Preferences**: Bundle filters, date cutoffs, and archive toggles are now remembered across sessions.

- **Streamlined Workflow & Navigation**:
  - **Focused Tab Structure**: Streamlined the AI Planner interface down to three primary tabs: **Today**, **1. Bundle**, and **2. Apply**.
  - **Clear Action Indicators**: Refreshed bundle actions with clear descriptions distinguishing starting a new chat from updating an ongoing session.

### Fixes

- **AI Planner Response Parsing**:
  - **Resilient Content Block Extraction**: Fixed parsing issues where AI responses containing inner code fences, markdown blocks, or nested headings could fail to import into continuity context notes.

## 0.1.0-alpha.35 - 2026-11-19

### New Features

- **AI Goal & Task Planner**:
  - **Right Sidebar Integration**: Switch effortlessly between the Extension Workbench and the new AI Planner using the dedicated mode tabs at the top of the right sidebar.
  - **Today Queue & Pillar Tracking**: Track your daily focus alongside high-level goal pillars (e.g., career, fitness, projects) with visual progress chips, one-click task completion, and active task launching.
  - **Smart Context & Task Bundler**: Generate LLM-ready context packages combining personal memory files (`AboutMe.md`, `GoalsAndRules.md`, `SessionState.md`) and open vault tasks. Includes live token estimates, presets for recent or open tasks, and direct 1-click launch to Google AI Studio.
  - **One-Click Apply & Sync**: Copy an AI response and click **Apply & Reload** to automatically sync your Today Queue, manage `#today` tags across vault files, and update persistent session state notes.
  - **Safety Checkpoints & Rollback**: Automatically creates snapshots before applying any AI plan (retaining up to 30 history points), allowing you to restore context and vault states at any time.

- **Task Archiving**:
  - **Archive Completed Tasks Command**: Clean up cluttered notes using the new **Archive Completed Tasks in Active Note** command (`progress:archive-completed`), which automatically migrates completed tasks and their nested subtasks into monthly archive files (e.g., `(Archive) YYYY-MM.md`).
  - **Heading & Tree Preservation**: Maintains your document's original heading structure and source note title inside the archive file, keeping your task history organized and contextual.
  - **Customizable Archiving Rules**: Configure a custom archive folder path and toggle strict heading hierarchy rules in **Settings → Progress Planner**.

- **Time Range Scheduling**:
  - **Duration-Based Time Ranges**: Schedule tasks and calendar events with both start and end times (e.g., `⏰ 1:00PM-2:30PM`, `9:00 AM – 10:15 AM`, or `14:00 to 15:30`) via markdown syntax or frontmatter properties.
  - **Assign Date & Time Modal**: Easily select both start and end times directly from the updated time picker modal.

### Improvements

- **Agenda & Week Grid View**:
  - **Proportional Time Blocking**: Timed tasks and iCloud CalDAV calendar events with duration now render with proportional card heights on the week grid to accurately represent blocked time.
  - **Duration-Preserving Drag & Drop**: Dragging a time-ranged task to a new time slot or day automatically recalculates the end time to preserve the event's duration.
  - **Clear Range Badges**: Item cards and inspection details now clearly display full time spans (e.g., `10:00AM – 11:30AM`) across all calendar views.

- **Active Task Bar**:
  - **Ad-Hoc & Routine Support**: The status bar active task indicator now supports ad-hoc steps and daily routine items directly from the AI Planner, even when not bound to a physical markdown file.

- **Settings & Vault Customization**:
  - **Planner Context Folder**: Choose whether AI Planner context files remain hidden in `.mirage-editor/planner/` or live in a visible vault folder of your choice for direct note-taking.

### Fixes

- **Editor & Cursor Stability**:
  - **Cursor & Scroll Position Retention**: Archiving completed tasks directly within an active editor document now cleanly updates the document without jumping the viewport scroll position or resetting your cursor.
  - **Code Block & Frontmatter Protection**: Completed checklist items or headings located inside code blocks and YAML frontmatter comments are now safely ignored during task scanning and archiving.
  - **Block Anchor Preservation**: Rescheduling tasks from the agenda or toggling `#today` tags now reliably preserves block reference anchors (e.g., `^task-anchor-id`) at the end of the line.

## 0.1.0-alpha.34 - 2026-11-18

### New Features

- **Extension Publishing**:
  - **Originality & Duplicate Verification**: Mirage now checks extension code against the community catalog before opening the publishing workflow. If an extension is identical to existing catalog entries—or differs only by whitespace and comments—Mirage highlights what is required to make meaningful improvements before submission.
  - **Smart Fork Review**: When publishing a fork of an existing community extension, Mirage compares your work against the upstream baseline using a compact diff. The publishing assistant evaluates code changes to ensure genuine enhancements (such as bug fixes, new commands, or UX upgrades) while ensuring proper attribution to the original author.

### Improvements

- **Extension Management & Settings**:
  - **Fork Status Badges**: Added contextual badges (such as `Forked from @author • Unmodified`) directly on extension cards in Settings, giving you immediate visibility into whether a local fork has been customized.
  - **Contextual Publish Guidance**: The Publish button is now intelligently disabled when attempting to publish an unmodified clone or duplicate, complete with helpful hover tooltips explaining how to proceed.
  - **Automatic Upstream Snapshots**: Forking an extension now automatically caches the original source baseline locally, making diff calculations and change tracking seamless as you develop.
  - **Faster Catalog Syncing**: Streamlined community catalog synchronization to use compressed updates and verify code integrity more efficiently in the background.

## 0.1.0-alpha.33 - 2026-11-18

### New Features

- **Extension Fork Provenance**:
  - **Source Attribution Badges**: Forking a community extension locally now preserves its origin, displaying a clear "Forked from @author" badge on personal extension cards in Settings.
  - **Isolated Local Metadata**: Forked extensions automatically register as local extensions while retaining upstream version and checksum details to help you track modifications.

- **Math & Live Preview**:
  - **Dash Macros in Equations**: Math blocks in Live Preview now support `\textemdash` (—) and `\textendash` (–) KaTeX macros, rendering typographic dashes cleanly within formulas without syntax errors.

### Improvements

- **Notification Layering & Timing**:
  - **Visible Above Modals**: Notification toasts now render above open settings modals and dialog overlays, ensuring key alerts (such as GitHub device activation codes) remain visible and accessible.
  - **Sequence-Guarded Lifecycle**: Notification timers and cleanup sequences now track active toasts properly, preventing newer toasts from being prematurely dismissed when older ones expire.
  - **Background Responsiveness**: Notifications no longer freeze or delay their dismiss animations when Mirage is running in the background.

- **Settings Navigation & UX**:
  - **Live Sidebar Updates**: The Extension Settings navigation list now updates dynamically in real time whenever extensions are installed, enabled, or removed, without requiring you to close and reopen Settings.
  - **Author Disambiguation Sublabels**: When multiple installed extensions share identical names, the settings sidebar now displays the author handle beneath the title to help differentiate them.
  - **Immediate Install Feedback**: Extension cards in the Explore and Installed tabs now provide immediate visual feedback ("Installing..." / "Updating...") and refresh instantly upon completion rather than relying on delayed polling.

### Fixes

- **Extension Lifecycle & Reliability**:
  - **Duplicate Instance Prevention**: Resolved an issue where repeated catalog scans or concurrent loads could trigger duplicate active instances of the same extension.
  - **Automatic Deletion Cleanup**: Extensions removed from your vault directory are now automatically unloaded and deregistered on subsequent scans.
  - **Failed Load Notifications**: Added an explicit error notification if a community extension successfully downloads but fails its initial load or execution.

- **Settings & Publishing Integrity**:
  - **Accurate Publication Checks**: Fixed local extension publication badges so status indicators verify against your currently logged-in GitHub account instead of conflicting with unrelated ledger records.
  - **Graceful Navigation Fallback**: If an extension whose settings panel is currently open gets removed or unloaded, Settings will safely fall back to the main Extensions overview rather than displaying a blank view.

## 0.1.0-alpha.32 - 2026-11-17

### New Features

- **Sidebar Global Vault Search**:
  - **Dedicated Search Panel**: Added a new tab switcher in the left sidebar to seamlessly toggle between the File Explorer and full-vault search without taking you out of your workflow.
  - **Non-Blocking Background Scanning**: Vault searches now process in the background, keeping the editor completely fluid and responsive even across large vaults.
  - **Advanced Query Syntax**: Search effortlessly using arbitrary substrings, exact quoted phrases (`"exact phrase"`), exclusion operators (`-archived`), `tag:` queries (with nested tag support), `path:` filters, and `file:` filters.
  - **Search Controls & Regex Mode**: Easily toggle case sensitivity (`Aa`), regular expression matching (`.*`), and expand/collapse states for all result groups.
  - **Interactive Match Browser**: View matched files grouped with directory paths and hit counters. Each match displays its exact line number and highlighted snippet, allowing you to click directly to that line in your document.
  - **Streamed & Paginated Results**: Large query results stream into the view progressively with real-time status indicators and a convenient "Show More Results" option.

- **VaporNote In-Page Search**:
  - **Web & PDF Find Bar**: Introduced an in-page search bar for VaporNote Web and PDF tabs, accessible via standard `Ctrl/Cmd + F`.
  - **Search Navigation & Live Match Counter**: Displays real-time match counters (e.g., `3/15`) with quick keyboard navigation (`Enter` for next, `Shift + Enter` for previous, and `Escape` to close).
  - **Dynamic View Layout**: Automatically adjusts web and document viewports when the search bar opens to prevent controls from obscuring page content.

### Improvements

- **Global Search Workflow**:
  - **Direct Sidebar Routing**: Invoking global search or clicking tags across notes now automatically expands the left sidebar, focuses the search panel, and populates your query immediately instead of relying on a transient modal switcher.

- **Extension Settings Management**:
  - **Author Badges & Provenance**: Community extension settings tabs now feature clear author tags (e.g., `@author` or `LOCAL`) and full plugin identifier paths.
  - **Duplicate Name Disambiguation**: The settings navigation now displays author sublabels when multiple installed extensions share identical or similar display names.

### Fixes

- **Extension System**:
  - **Command Collision Prevention**: Extension command IDs are now properly namespaced by author and plugin ID, preventing conflicts between different plugins and ensuring clean command registration and cleanup.
  - **Targeted Settings Routing**: Fixed an issue where changing settings on extensions with matching IDs could affect the wrong plugin by routing updates through unique plugin keys.

## 0.1.0-alpha.31 - 2026-11-17

### New Features

- **Custom Extension Forking**:
  - **Dedicated Fork Modal**: Forking a community extension to your personal local directory now opens an interactive modal instead of a basic confirmation prompt.
  - **Customizable Folder Names**: Choose a custom folder name for your local fork, complete with a live destination preview and instant validation against reserved or duplicate names.
  - **Automatic ID & Workspace Sync**: Mirage automatically updates the extension’s internal manifest, unloads the community version, activates your personal copy, and updates the sidebar without requiring an app reload.

### Improvements

- **Extension Management & Combination**:
  - **Smoother Merge Selection**: Selecting extensions to combine into a new extension now toggles instantly without re-rendering the whole page or jumping your scroll position.
  - **Streamlined Catalog Cards**: Removed the redundant "Remix" button from catalog cards in the Explore tab to keep extension actions clean and focused.
  - **Polished Modal Layout**: Extension subtabs now feature custom scrollbars matching the rest of the dark interface and keep the action dock cleanly positioned.

- **Community & Web Navigation**:
  - **In-App GitHub Viewer**: Clicking "GitHub" on any community extension now opens the repository directly inside Mirage's built-in web viewer rather than launching an external browser window.

- **Workspace & Navigation**:
  - **Clarified Sidebar Controls**: Renamed the sidebar toggle command and tab header button to "Toggle Left Sidebar" to distinguish it clearly from right-side panels.

### Fixes

- **Extension Catalog**:
  - **Explore Infinite Scrolling**: Fixed an issue where scrolling through the community extensions catalog failed to detect the scroll boundary, ensuring additional catalog pages load seamlessly.
  - **Settings Memory & Scroll Reset**: Resolved an issue where scrolling styles and background event listeners could persist when navigating away from the Extensions settings section.

## 0.1.0-alpha.30 - 2026-11-17

### New Features

- **Source Mode & Live Preview Toggle**:
  - **Raw Markdown Editing**: Switch between Live Preview and a dedicated Source Mode that exposes raw Markdown syntax, code, and YAML frontmatter without rich widgets or cursor clamping.
  - **Quick Keyboard Toggle**: Use `Cmd+E` (or `Ctrl+E`) to instantly flip between Source Mode and Live Preview across your active notes without losing your current scroll position.
  - **Status Bar Mode Chip**: A new status bar indicator in the bottom-right corner displays the active editor mode and allows one-click switching.
  - **Workspace & VaporNote Sync**: Your chosen view mode is saved per vault and automatically synchronized across all open split leaves, tabs, and VaporNote windows.

- **Auto-Surround Text Selection**:
  - **Bracket & Delimiter Wrapping**: Typing quotes (`'`, `"`), asterisks (`*`), square brackets (`[`), tildes (`~`), parentheses (`(`), curly braces (`{`), or backticks (`` ` ``) while text is highlighted now wraps the selection instead of replacing it.
  - **Rapid Markdown & Link Authoring**: Pressing `[` twice around selected text creates double-bracket `[[wikilinks]]`, while pressing `*` twice quickly applies `**bold**` styling.
  - **Multi-Cursor Support**: Works seamlessly across single selections, reverse selections, and multi-cursor workflows while maintaining your exact cursor position and selection boundaries.

- **Extension Updates & Organization**:
  - **Installed Extensions Filtering**: Easily organize your installed extensions with new **All**, **Local**, and **Community** filter tabs that display real-time count badges.
  - **Update All Banner**: A notification banner now appears at the top of the Installed Extensions tab whenever community updates are detected, featuring a one-click **Update All** button.
  - **Inline Update Buttons**: Community extension cards with newer releases available now show an inline `⬆ Update to v...` button for fast, targeted updates.

### Improvements

- **Live Preview Inline Formatting**:
  - **Rich Syntax Styling**: Bold (`**bold**`), italic (`*italic*`), and strikethrough (`~~strikethrough~~`) now render with true typography styling in Live Preview, hiding markdown syntax delimiters until the cursor approaches them.
  - **Protected Spans & Math**: Formatting asterisks and tildes are strictly ignored inside inline code, math equations, tags, and wikilinks to prevent visual layout breakage.
  - **Nested Styling & Task Lists**: Supports complex nested formatting (such as bold-italic `***text***` or bold-strikethrough) and ensures completed checkboxes display clean, legible strikethrough text.

- **Community Extension Catalog**:
  - **Last Synced Indicator**: The Explore Catalog view now shows when the extension directory was last synced from GitHub (e.g., "Synced 5m ago") with full timestamp details on hover.
  - **Background Catalog Synchronization**: The extension catalog and security revocation lists automatically update in the background every 6 hours.
  - **Real-Time Install Feedback**: Installation and update buttons now show immediate status feedback ("Installing..." / "Updating...") and cleanly refresh extension state once complete.

### Fixes

- **Performance & Background Sync**:
  - **Eliminated UI Stutters**: Catalog database downloads and delta updates are now decompressed asynchronously in the background, preventing interface lag during refreshes.
  - **Database Lock Prevention**: Added automatic busy timeouts to extension cache queries to prevent locking contention between concurrent operations.

- **Lifecycle & Cleanups**:
  - **Safe Extension Unloading**: Hardened extension cleanup routines to verify document availability, preventing errors when extensions are unloaded in headless or background contexts.

## 0.1.0-alpha.29 - 2026-11-16

### New Features

- **Community Extension Catalog**:
  - **Instant Full-Text Search & Filtering**: Explore community extensions effortlessly with debounced search and granular capability filters powered directly by an optimized local database.
  - **Smooth Infinite Scrolling**: Browse extensive catalogs seamlessly with paginated batch loading and a "Load More" indicator, eliminating modal freezing.

- **Extension Publishing & Status Tracking**:
  - **Publication Status Badges**: Installed extensions now clearly display their release status (`Published`, `Modified`, `PR Open`, `Merged`, or `Not Published`), making it easy to see when local changes haven't been pushed.
  - **Interactive Submission Queue**: The publishing wizard now detects pending GitHub submissions, giving you one-click shortcuts to view active pull requests or close stuck reviews before initiating a new release.
  - **Custom Repository Targets**: Added support for choosing and customizing target GitHub repository names when releasing standalone or personal collection extensions.

- **Security Killswitch**:
  - **Automated Revocation Enforcement**: Revoked extensions are detected automatically upon catalog sync and unloaded from memory immediately, accompanied by an in-app security notification.

### Improvements

- **Fast & Bandwidth-Efficient Catalog Sync**:
  - **Incremental Delta Updates**: The extension catalog now downloads compressed sequence patches instead of repeatedly fetching full databases, significantly reducing data usage and speeding up refresh times.
  - **Instant Offline Availability**: Extensions and security blocklists load immediately from local cache on startup before running background updates.

- **AI-Powered Release Preparation**:
  - **Accurate SemVer Recommendations**: The publishing assistant now recognizes whether an extension is an initial draft or an update, preventing unintended version bumps on first releases while recommending suitable patch, minor, or major increments for updates.
  - **Code-Verified Documentation**: README generation now produces fully fleshed-out guides (Overview, Features, Trigger Commands, and Usage) based strictly on inspected source code instead of placeholder templates.
  - **Precise Capability Tagging**: Capabilities such as network access, status bar usage, or vault-only permissions are rigorously cross-checked against actual code calls.
  - **Polished Markdown Previews**: README previews in the publish wizard now render styled multi-line code blocks, cleaner headings, and lists.

### Fixes

- **Extension Registry Submissions**:
  - **Duplicate PR Prevention**: Mirage now blocks submitting overlapping pull requests under the same author account, preventing registry race conditions and broken review queues.
  - **Atomic Cache Writes**: Safeguarded local catalog updates with atomic file operations to eliminate database corruption during aborted downloads or sudden shutdowns.

## 0.1.0-alpha.28 - 2026-11-15

### New Features

- **Extension Overlays & Native Switcher**:
  - **Floating Extension Overlays**: Extensions can now create isolated floating UI overlays that render cleanly above Web Viewer, PDF, and VaporNote views—supporting full-window sizing, automatic window resize tracking, Escape-to-close, app shortcut forwarding, and automatic cleanup when an extension unloads.
  - **Native Switcher Modals**: Extensions can now open Mirage's top-level switcher modal to present searchable lists of items directly over any open view, including Web Viewer and PDF tabs.

- **Cross-Workspace Extension Bridges**:
  - **Web Viewer, PDF & VaporNote Awareness**: Extensions can now inspect open Web Viewer and PDF tabs (both standard and VaporNote) and interact with Web Viewer, PDF, and VaporNote tabs directly from custom workflows.

- **Extension Authoring Experience**:
  - **Automatic Type Definitions (`mirage.d.ts`)**: Mirage now writes an up-to-date `mirage.d.ts` contract directly into your vault's `.mirage-editor/extensions/` directory on startup, giving extension creators instant autocomplete and type checking in their code editor.

### Improvements

- **Extension Modify & History**:
  - **Descriptive Change Summaries**: Applying patches in the Extension Modify sidebar now displays a concise summary of the overall change, per-file descriptions, and added/removed line counts in the activity log.
  - **Clearer Restore Checkpoints**: Extension history checkpoints now store longer, cleaner labels (up to 140 characters, trimmed at word boundaries) so it is easier to tell restore points apart.
  - **Updated Extension SDK Prompts**: Generated modification bundles now document the new overlay, switcher, and cross-workspace APIs for cleaner extension generation.

### Fixes

- **Settings & Configuration Reliability**:
  - **Protected Custom Hotkeys & Vault Settings**: Settings and global state files now save atomically and retry interrupted reads. If a configuration file becomes temporarily unreadable or corrupted on disk, Mirage falls back to the last valid configuration in memory and refuses to overwrite your file with blank defaults.
  - **Accurate Vault Targeting**: Fixed issues where changing settings in the Settings modal or switching vaults through VaporNote could target the wrong vault path when saving configuration changes.

- **Modal & Overlay Focus**:
  - **Clean Switcher Dismissal**: Dismissing a switcher modal without selecting an item (such as pressing `Escape` or clicking outside) now properly cancels the action instead of leaving the request unresolved.
  - **Focus Restoration**: Hiding or closing a focused extension overlay now automatically returns keyboard focus to the main Mirage window or active tab.

## 0.1.0-alpha.27 - 2026-11-15

### New Features

- **Extension Workbench (Right Sidebar)**:
  - **Dedicated AI Modification Sidebar**: Added a collapsible, drag-resizable right sidebar for building and iterating on your local extensions side-by-side with your notes and AI chats, with your preferred sidebar width remembered across sessions.
  - **Quick Access & Shortcuts**: Open or collapse the workbench anytime using the new sidebar toggle button in the top-right tab bar, the `Cmd+Shift+\` (`Toggle Right Sidebar`) shortcut, or the new **Modify** button on any local extension in Settings.
  - **Smart Context Bundler & Token Meter**: Pick exactly which extension files to include using `All` / `None` quick toggles and a live estimated token counter before bundling them with the Mirage Extension SDK reference.
  - **One-Click AI & Terminal Workflows**: Use **Bundle & Open Google AI Studio** to copy your bundle (as an attachable `.md` file on macOS or text fallback), open or focus AI Studio, and switch straight to the Apply tab. You can also use **Copy Bundle File** for any external AI chat or **Open in Internal Terminal** to start a CLI session directly inside your extension's folder.
  - **Safe Apply & Hot-Reload**: Click **Apply & Reload** to read an AI patch directly from your clipboard, verify JSON and JavaScript syntax before touching any files, apply updates, hot-reload the extension, and review a clear step-by-step log.
  - **Automatic Checkpoints & Rollback**: A built-in **History** tab automatically saves up to 10 snapshots before every applied patch or terminal session, letting you restore any previous version and reload the extension in one click.

### Improvements

- **Multi-File Extension Publishing & Security**:
  - **Full Directory Publishing**: Publishing a local extension to the catalog now packages all source files and nested subdirectories (automatically skipping runtime `data.json` and prompt files), rather than only `main.js` and `styles.css`.
  - **Expanded Security Audits**: Running an AI Security Audit on community extensions in the Explore catalog now fetches and inspects all JavaScript files across subdirectories instead of only `main.js`.
  - **Per-File Integrity Checks**: Installing remote extensions now validates SHA-256 checksums for every catalog-listed file and blocks unsafe file paths or accidental `data.json` overwrites.
- **Extension Creation & Runtime**:
  - **Unified Local Extension Workflow**: The Extension Synthesizer and terminal remix workflow now consistently target `.mirage-editor/extensions/local/<extension-id>/` with an updated, comprehensive Extension SDK reference.
  - **Consistent Vault Secrets Access**: Standardized class-based extensions so vault secret helpers (`getSecrets` and `getSecret`) are reliably available across extensions.
- **Editor & Workspace Polish**:
  - **Cleaner Folded Lists**: Removed the `⋯` fold placeholder pill from collapsed list items in the Markdown editor for a cleaner writing experience.
  - **Adaptive Webview Layout**: Embedded webview tabs automatically resize and realign smoothly when opening, closing, or resizing the right sidebar.

### Fixes

- **Merge Selection Conflicts**: Fixed an issue in Settings where selecting extensions to merge tracked only the extension ID, which could cause selection collisions between extensions from different authors sharing the same ID.
- **Extension Stylesheet Collisions**: Fixed an issue where injected extension styles could overwrite one another if author or extension IDs contained special characters.
- **Clipboard & Input Focus**: Improved reliability when reading patches from the system clipboard and ensured embedded webviews release focus properly when interacting with buttons, dropdowns, and inputs in the right sidebar.

## 0.1.0-alpha.26 - 2026-11-14

### New Features

- **List Folding & Indentation Guides**:
  - **Collapsible Nested Lists**: Added interactive fold and unfold chevrons beside parent items in bulleted lists, numbered lists, and task lists across both the main editor and VaporNote. Hovering a parent item reveals the toggle, and collapsed sections remain marked with an accent-highlighted arrow and a clickable `⋯` badge to expand them again.
  - **Vertical Indentation Guides**: Added subtle vertical guide lines aligned beneath parent markers for nested list items and indented continuation lines, making multi-level outlines easier to scan at a glance.

### Improvements

- **Nested List Formatting**:
  - **Flexible Indentation Detection**: Improved list nesting so both 2-space and 4-space (or tab) indentation levels align consistently with indentation guides, without mistakenly styling horizontal rules (`---`) as list items.
  - **Refined Editor Margins**: Slightly expanded horizontal editor padding in both the main workspace and VaporNote so top-level list fold controls sit cleanly in the margin.
- **Alternative Keyboard Layout Support**:
  - **Software-Layout Shortcut Handling**: Updated shortcut recording in Settings and hotkey dispatch across the main workspace and VaporNote to respect your active software keyboard layout (such as Programmer Dvorak and other non-QWERTY layouts) rather than physical hardware key positions, automatically refreshing when your layout changes or the app regains focus.

### Fixes

- **Keyboard Shortcuts & Modifier Keys**:
  - **Reliable Option/Alt & Shift Shortcuts**: Fixed an issue where `Alt`/`Option` combinations that output accented characters or dead keys—as well as `Shift` combinations on number or top-row punctuation keys—could fail to record or trigger the intended shortcut.
- **Modal & Palette Transitions**:
  - **Seamless Backdrop Continuity**: Prevented the dimmed background overlay from briefly flashing or disappearing when an action transitions directly into another dialog—such as opening Settings from the Command Palette or confirming a selection in the Quick Switcher, Heading Switcher, or input/confirmation prompts.
  - **Clean Dismissal & Focus Restoration**: Ensured keyboard focus returns smoothly to your active editor or workspace when an action completes without opening another modal, while keeping Escape, Cancel, and clicking outside a dialog closing immediately.

## 0.1.0-alpha.25 - 2026-11-13

### Improvements

- **VaporNote OS-Wide Floating Performance**:
  - **Instant Window Transitions**: Eliminated macOS window animation lag and container opacity fade delays when showing, hiding, minimizing, resizing, or toggling fullscreen for the floating VaporNote window and its quick-action modals.
  - **Reliable Editor Focus on Summon**: Triggering your global VaporNote shortcut while the window is already open in the background now brings it forward and places keyboard focus directly inside the note editor so you can start typing immediately.

- **VaporNote Viewport & Editing Continuity**:
  - **Scroll & Cursor Preservation**: Minimizing and restoring VaporNote now remembers your exact scroll position, cursor placement, and text selection across Markdown tabs instead of resetting the editor view.

- **Hotkey & Shortcut Recording**:
  - **Improved macOS Option-Key Support**: Upgraded shortcut capture to recognize physical keys when holding `Option` (`Alt`) on macOS, making combinations like `Option+Space`, `Option+Letter`, `Option+Number`, and `Option+Punctuation` work seamlessly instead of registering alternate symbols or non-breaking spaces.

### Fixes

- **VaporNote Opacity & Visibility Glitches**:
  - **Hidden Opacity Protection**: Fixed an issue where adjusting VaporNote opacity settings while the floating window was hidden could inadvertently affect its hidden state, and ensured the configured opacity is cleanly applied upon restore or position reset.
  - **Independent Window Hiding**: Hiding VaporNote in OS-wide floating mode now reliably remembers its last position and dimensions without interfering with the main Mirage Editor window.
- **Invalid Shortcut Protection**:
  - **Modifier & Dead-Key Filtering**: Prevented incomplete modifier presses, dead keys, and unconvertible special characters from being saved as broken global shortcuts.

## 0.1.0-alpha.24 - 2026-11-13

### New Features

- **GitHub Account Integration**:
  - **In-App Device Authorization**: Connect your GitHub account directly from the Extensions tab in Settings without manually generating personal access tokens.
  - **Streamlined Activation Flow**: Starting the connection automatically copies your one-time activation code to the clipboard, displays a persistent reminder toast, and opens the GitHub verification page right inside a workspace Web Viewer tab.
  - **Account Status Bar**: View your connected GitHub username and avatar at the top of the Extensions panel, with one-click disconnect support.

- **One-Click Extension Publishing Wizard**:
  - **Publish Local Extensions**: Local extensions now feature a **Publish** button to package and submit your work directly to the Mirage community registry.
  - **AI-Assisted Pre-Flight Review**: Uses Gemini to inspect your extension code and suggest an appropriate semantic version bump, catalog card summary, search keywords, capability tags, and a formatted `README.md` with a live Preview/Edit toggle.
  - **Local Metadata Sync**: Save generated updates directly to your local `manifest.json` and `README.md` before publishing.
  - **Automated GitHub Dispatch**: Automatically configures your target repository (Collection or Standalone), commits extension files, creates a tagged GitHub Release with attached assets, and opens a Pull Request to the community catalog with real-time step-by-step progress tracking.
  - **Version Compatibility Gate**: Verifies you are running the latest version of Mirage Editor before publishing, offering a one-click shortcut to the latest release page if an update is required.

- **AI Security Audit for Community Extensions**:
  - **Pre-Install Code Inspection**: Click the new **Audit** button on any extension in the Explore Catalog to inspect its source code with Gemini before installing.
  - **Detailed Security Report**: Displays an overall Risk Rating (`LOW`, `MEDIUM`, or `HIGH`), a plain-English summary of what the extension does, vault access scope, detected external network destinations, and specific warnings—with an option to install directly after reviewing.

- **Extension Integrity & Security Killswitch**:
  - **SHA-256 Verification**: Community extensions are now downloaded in memory and verified against catalog-verified SHA-256 hashes before any files are written to your vault.
  - **Remote Security Blocklist**: Automatically checks the community blocklist on startup and prevents revoked or malicious extensions from loading, notifying you immediately if a conflict is detected.

### Improvements

- **Explore Catalog Browsing & Filtering**:
  - **Sorting Controls**: Sort community extensions by **Top Downloads**, **Recently Added**, **Recently Updated**, or alphabetically (**A–Z**).
  - **Capability Filtering**: Filter the catalog by **Vault-Only**, **Network**, **Audio**, or **Status Bar** capabilities.
  - **Richer Extension Cards**: Cards now display download counts and updated capability badges (including Network and Terminal indicators), while matching single-character search tokens more accurately.
  - **Local Catalog Caching**: Catalog data is now cached locally in your vault for faster loading and more reliable browsing.
- **Release Asset Downloads**: Remote extensions with tagged releases now install directly from verified GitHub Release assets.
- **Settings Modal Layout**: Expanded the Settings modal dimensions slightly to better accommodate the Extensions publishing and auditing workflows.

### Fixes

- **Safe Extension Rollback**: Failed downloads or SHA-256 integrity mismatches during an extension update now abort cleanly without overwriting or corrupting your existing working installation.
- **Misleading Web Viewer Notifications**: Fixed an issue where opening release links from modals inside a Web Viewer tab could display an unrelated "Google AI Studio" toast notification.
- **Vault Settings & Listener Cleanup**: Fixed Settings loading to properly read the active vault's configuration and ensured GitHub authentication listeners are cleanly removed when closing the Settings modal.

## 0.1.0-alpha.23 - 2026-11-10

### New Features

- **Real-Time Workspace & VaporNote Synchronization**:
  - **Live Bidirectional Delta Sync**: Edits made to a note in the main editor or inside the floating VaporNote window now synchronize instantly between all active tabs in real time without waiting for manual saves or file reloads.
  - **Echo-Free Cursor Preservation**: Remote edits merge smoothly in the background without resetting cursor locations or creating echoing update loops.

- **Embedded Google AI Studio Extension Workflow**:
  - **Integrated Workspace Web Tab**: Launching Google AI Studio from the extension synthesis modal now opens directly inside an editor web tab rather than kicking out to an external browser window.
  - **Automated Clipboard Hand-off**: Automatically copies the synthesized extension prompt to your clipboard and notifies you upon tab launch for immediate pasting.

### Improvements

- **Typing Performance on Large Documents**:
  - **Deferred Save Extraction**: The auto-save system now defers full-text document string reads until typing stops, eliminating keystroke latency and memory overhead while typing in long notes.

- **Extension Studio & Remixing UI**:
  - **Interactive Action Cards**: Replaced standard buttons with distinct, themed action cards featuring clear descriptions, visual feedback, and directional indicators.
  - **Precise Token Estimation**: Prompt token estimates in the Combine dock and Remix modal are now measured directly against the fully generated prompt payload for accurate context-window planning.
  - **Simplified Catalog Search**: Streamlined the community extensions view by removing redundant type filters to focus on fast, unified search across all extensions.

- **Quick Switcher & Command Palette**:
  - **Instant Initial Render**: Command lists and synchronous search items now render immediately upon invocation, removing initial delay when opening the palette.
  - **Decluttered Interface**: Simplified header icons and badges for a cleaner, distraction-free search layout.

### Fixes

- **Cross-Platform Path Resolution**:
  - **Multi-Tab File Matching**: Fixed an issue where open tabs or VaporNote instances failed to match the active document due to Windows path separators, leading dot notations, or path casing variations.

## 0.1.0-alpha.22 - 2026-11-10

### New Features

- **Unified Extensions System**:
  - **Single Cohesive Platform**: Replaces separate "Plugins" and "Scripts" workflows with a unified extension model located under `.mirage-editor/extensions/`, supporting both full-fledged plugins and lightweight automation scripts.
  - **Environment & Secrets Manager**: A dedicated settings panel to securely store API keys and environment variables (accessible via `secrets` in your extension code) and register background startup hooks that execute when opening a vault.
  - **Remote Update Tracking**: The extension catalog now monitors remote hash versions, providing a single-click **Update** button when newer versions of installed community extensions become available.

- **Window Layering & Overlay Priority**:
  - **Terminal Stacking Control**: Added a new configuration option to choose whether the floating Terminal stays layered above or below VaporNote when both overlays are active simultaneously.

### Improvements

- **Quick Switcher**:
  - **Asynchronous Search & Infinite Scrolling**: File search now streams results asynchronously in paginated batches, ensuring immediate keyboard responsiveness and smooth scrolling even in large vaults with tens of thousands of files.
  - **Dynamic Pagination via Keyboard**: Pressing the down arrow past the bottom of the current list automatically requests the next batch of search results without interrupting your navigation flow.
  - **Live Search Metrics**: An updated badge displays both current page results and total vault matches for your active query and prefix rules.
  - **Instant Cache & Debounce**: Search input now features micro-debouncing and memory caching, eliminating UI stutter while typing.

- **Settings Interface**:
  - **Collapsible Two-Level Sidebar**: Reorganized settings navigation into collapsible groups (*Workspace*, *Core Features*, and *Extensions*) that remember their folded or expanded state across sessions.
  - **Core Features Overview**: Added a central settings hub summarizing built-in research tools (Web Viewer, VaporNote, Progress Planner, Quick Switcher, and AirSketch) with quick navigation shortcuts.
  - **Interactive Extension File Chips**: Files belonging to an extension (`main.js`, `styles.css`, `manifest.json`) are displayed as clickable chips that jump directly into the editor for instant inspection and editing.
  - **Simplified Extension Creation & Forking**: Streamlined the creation flow for custom tools into personal `local/` workspaces, and updated the "Fork to Local" action to protect community extensions from being overwritten during updates.

### Fixes

- **Quick Switcher Query Synchronization**:
  - **Stale Result Prevention**: Implemented query ID checks to drop slow, out-of-order asynchronous search responses when you rapidly backspace or change your search term.

- **Overlay Stacking Sync**:
  - **Layering Retention on Focus**: Switching focus to the terminal or updating configuration settings immediately updates window depth orders, preventing floating views from being trapped underneath other surfaces.

## 0.1.0-alpha.21 - 2026-11-7

### New Features

- **Unified Extensions Manager**:
  - **Installed & Explore Tabs**: Consolidated plugins and scripts under a single, streamlined "Extensions" interface in Settings, making it easy to manage existing add-ons or browse the online community catalog.
  - **One-Click Installation**: Install community-authored plugins and automation scripts directly from the Explore catalog with zero build steps or manual downloading required.
  - **Fork to User Workspace**: Decouple any community extension into your personal `user/` extensions folder with a single click, allowing you to freely modify its code without risking community updates overwriting your changes.
  - **AI Remix & Synthesis Suite**: Multi-select existing extensions to merge their code into unified context bundles. Features real-time token estimation, one-click copying for LLM assistants (Claude, ChatGPT, Google AI Studio), and direct exports to the integrated terminal with pre-scaffolded `PROMPT.md` files.
  - **Built-in Extension Scaffolding**: Create new zero-build plugins or single-file scripts instantly via a "+ New Extension" modal, automatically creating starter code templates and opening them directly in the editor.

- **Plugin Setting Sliders**:
  - **Interactive Range Controls**: Plugin developers can now configure smooth slider inputs with custom minimums, maximums, and steps, complete with real-time numeric value feedback.

- **Terminal Directory Launcher**:
  - **Open Directly to Folder**: Launch a new shell tab inside the built-in terminal targeting specific vault or extension directories automatically.

### Improvements

- **Command Palette**:
  - **Authorship & Provenance Labels**: Automated scripts registered in the Command Palette now clearly indicate their origin (e.g., `User script` vs. `@author • Community script`) alongside configured hotkeys.

- **Settings Organization**:
  - **Restructured Navigation**: Cleaned up the Settings sidebar into dedicated categories—*General*, *Extensions*, *Core Features*, and dynamic *Installed Plugins*.
  - **Integrated Webview Shortcuts**: Moved Webview Domain Shortcuts directly into the Web Viewer settings panel for a more cohesive configuration experience.
  - **Clickable Extension File Chips**: Each installed extension card displays interactive chips for files like `main.js` and `styles.css`, letting you open code directly in the editor for instant inspection.

- **Toast Notifications**:
  - **In-Place Updates**: Reusable notification alerts now update existing toast text, status styles, and dimensions dynamically without spawning duplicate popups or flickering.

### Fixes

- **Web Viewer & Popup Detection**:
  - **Reliable Tab Opening for Login Links**: Replaced brittle domain whitelists with request-based window feature detection. Standard navigation links on services like Google, GitHub, Okta, and Speedpay now consistently open as workspace tabs, reserving floating popup windows strictly for explicit dialogs like payment flows and OAuth authorization windows.

- **Plugin Lifecycle & Style Isolation**:
  - **Clean Style Tag Cleanup**: Resolved issues where reloading or removing custom plugins could leave orphaned `<style>` tags in the workspace, ensuring changes take effect cleanly and immediately without restarting the app.

## 0.1.0-alpha.20 - 2026-11-5

### New Features

- **Floating Terminal**:
  - **Multi-Tab Shell Sessions**: Run multiple independent terminal tabs side-by-side within the same floating window. Create new tabs with the `+` button, by double-clicking empty tab bar space, or using `Cmd/Ctrl + T`. Close tabs with `Cmd/Ctrl + W`.
  - **Intuitive Tab Navigation**: Quickly switch between terminal tabs using `Cmd/Ctrl + Shift + ]` / `[` or `Cmd/Ctrl + 1–9`.
  - **Custom Tab Renaming**: Double-click any tab title to rename it. Native text editing shortcuts (like `Cmd/Ctrl + A`) stay scoped cleanly to the rename input without interfering with your shell session.
  - **Live Drag-and-Drop Reordering**: Rearrange terminal tabs seamlessly on the fly by dragging them across the tab bar.
  - **Focus Mode**: Dim and blur the workspace background with a dedicated Focus button or the command palette (`Terminal: Toggle Focus Mode`), isolating your active shell session for distraction-free command-line work. Clicking anywhere outside the window exits Focus Mode.

- **VaporNote**:
  - **Live Drag-and-Drop Reordering**: Reorder scratchpad and web tabs dynamically with smooth pointer drag-and-drop matching the main workspace experience.

### Improvements

- **Floating Terminal**:
  - **Centered Window Placement**: Recenter or open the floating terminal with auto-calculated horizontal and vertical centering tailored to your current display dimensions.
  - **Refined Scrollbar & Viewport Gutter**: Replaced hidden scrollbars with a custom scrollbar column and reserved margin so output text never overlaps the scroll gutter.
  - **Command Palette Commands**: Added quick commands to launch a new terminal tab or toggle focus mode from anywhere in the app.

- **Web Browser & Authentication Popups**:
  - **Expanded OAuth, SSO & Payment Support**: Added streamlined popup support for Okta, Speedpay, Western Union, SAML endpoints, Apple ID, Discord, GitHub, Auth0, Ping Identity, PayPal, and Stripe.
  - **Responsive Popup Dimensions**: Popup windows now automatically respect target dimensions requested by services rather than forcing a rigid window size.
  - **Seamless Window Positioning**: Auth and payment popups open centered over the main app, floating reliably over fullscreen spaces without disrupting your desktop layout.
  - **Preserved Form Submissions (POST Requests)**: Links and redirects that pass form data (POST bodies) and referrer headers now open correctly in new tabs without dropping session parameters.
  - **Clean Chrome User-Agent**: Synchronized webview network requests with a clean Chrome user-agent string to prevent login rejections on Google Accounts and sensitive SSO portals.

- **VaporNote**:
  - **Streamlined Navigation Buttons**: Browser-type tabs in VaporNote now update their Back and Forward buttons reliably as you navigate between pages.
 
### Fixes

- **Floating Terminal**:
  - **Shortcut Isolation**: Fixed an issue where editor shortcuts or shell signals would collide during text editing and tab renaming.
  - **Automatic Session Recovery**: If the shell process in your last remaining terminal tab exits, a fresh shell session automatically restarts without requiring a window reload.
  - **Buffer Preservation**: Passing through keystrokes like `Ctrl + C` preserves native UNIX interrupt (`SIGINT`) behavior without unintentionally triggering GUI clipboard events.

- **VaporNote**:
  - **Accidental Dismissal**: Removed the `Escape` shortcut that could unexpectedly minimize VaporNote while writing notes or interacting with inputs.
  - **Navigation State Sync**: Resolved navigation history synchronization issues when navigating backward or forward in embedded web views.

- **Web Viewer**:
  - **Background Throttling**: Disabled aggressive background throttling on browser tabs and popups, preventing stalled two-factor authentication prompts and interrupted payment flows when the window is in the background.

## 0.1.0-alpha.19 - 2026-11-4

### New Features

- **Universal Tab History & Navigation**:
  - **Cross-Type History Stack**: Workspace tabs now maintain a unified history stack across all content types. You can seamlessly navigate back and forth between Markdown notes, Web pages, and PDF documents within the same tab without losing your place.
  - **Editor Navigation Header**: Markdown note tabs now feature a top navigation bar with Back and Forward buttons alongside the active document path.
  - **Universal Shortcuts**: Standardized `Cmd+[` (Go Back) and `Cmd+]` (Go Forward) across the entire application—working consistently in Markdown notes, Web views, PDF files, and VaporNote.
  - **Dynamic Button States**: Back and Forward buttons across note headers, web toolbars, and PDF viewports now automatically enable or disable to visually reflect available history.

- **Native Spaces (Workspace Tab Groups)**:
  - **Seamless Core Integration**: Tab Groups have been upgraded from an optional plugin into a core workspace capability ("Spaces"), offering instant, zero-latency workspace switching.
  - **Live In-Memory State**: Switching spaces now preserves live webviews and tab states in memory, eliminating tab reloads, lost form inputs, and reset scroll positions.
  - **Status Bar Space Switcher**: A new status bar indicator displays your current space with one-click access to switch between workspaces.
  - **Dedicated Spaces Commands**: Manage multi-project setups effortlessly using the Command Palette to switch (`Cmd+Shift+P`), create, rename, delete, and move tabs between spaces.

- **PDF Navigation Toolbar**:
  - **Toolbar Navigation Controls**: Added dedicated Back and Forward buttons directly inside the PDF reader toolbar for smooth navigation through document links and precision anchors.

### Improvements

- **Interactive Frontmatter Links**:
  - **In-App URL Opening**: Clicking web links in YAML frontmatter properties now opens them directly within your workspace rather than launching an external browser.
  - **Modifier Key Support**: Holding `Cmd` (or `Ctrl`) or clicking with the middle mouse button opens frontmatter links into an adjacent tab, while standard clicks open them directly in the current tab.

- **VaporNote Navigation & Workflow**:
  - **Unified Vapor Tab History**: VaporNote tabs now track internal history across notes, web links, images, and PDFs, supporting full back-and-forward traversal.
  - **Intuitive Tab Insertion**: Opening a new tab now places it immediately adjacent to your active tab instead of appending it to the far end of the tab bar.

- **Workspace Persistence & Restoration**:
  - **History Restoration**: Restoring previously closed tabs (`Cmd+Shift+T`) now fully restores their complete history stacks.
  - **Layout Split Retention**: Horizontal and vertical multi-pane split layouts are now reliably preserved across space changes and application restarts.

- **Streamlined Settings**:
  - **Built-in Core Modules**: Core features are now permanently built-in, decluttering the Settings panel so you can focus on Community Plugins, Shortcuts, and customization.

### Fixes

- **Window & View Management**:
  - **Prevented Stray Popups**: External link requests triggered from webviews are now safely captured and routed into standard workspace tabs instead of opening unexpected blank windows.
  - **Eliminated Ghost Views**: Fixed tab teardown handling to ensure hidden WebContentsViews and PDF views are completely detached and concealed, preventing visual overlaps and background resource leaks.

- **Notification Cleanup**:
  - **Silent Vault Startup**: Suppressed redundant "Folder Opened" notifications when launching directly into an existing vault.
  - **Reduced Progress Planner Alerts**: Eliminated duplicate cache notifications on startup when tasks and goals are already indexed.

- **Progress Planner Task Parsing**:
  - **Cleaner Task Titles**: Streamlined priority parsing to strictly target `#high`, `#medium`, and `#low` tags, eliminating legacy clutter from task titles and frontmatter blocks.

## 0.1.0-alpha.18 - 2026-11-3

### New Features

- **Task Board & List View**:
  - **Kanban Board Mode**: Visualize your tasks across dedicated columns for High Priority, Medium Priority, Low Priority, No Priority, and Completed items.
  - **Compact List Table Mode**: Scan and manage tasks in a structured tabular view with columns for completion status, priority, task title, origin file, and note shortcuts.
  - **Comprehensive Filtering & Search**: Instantaneously filter tasks by completion state (Active, All, Completed), priority level, and source document, or search across task titles and note paths in real time.
  - **Keyboard Shortcut & Command**: Open the new Board & List view anytime using `Cmd+Shift+L` or through the command palette (`Open Task List & Board View`).
  - **Smooth Infinite Scrolling**: Built-in chunked rendering keeps scrolling fluid and responsive across vaults with large volumes of tasks.

### Improvements

- **Progress Dashboard Node Inspector**:
  - **Hierarchical Subtask Tree**: Subtasks are now organized using a preorder tree hierarchy with visual indentation, keeping nested tasks grouped under their respective parents.
  - **Ghosted Context Parents**: When applying priority filters in the inspector, parent items without the selected priority remain visible in a dimmed state (`▾`) so you never lose the structural context of nested items.
  - **Inline Task Actions**: Toggle task completion or change task priorities directly inside the inspector sidebar without having to open the note in the editor.
  - **Hide Completed Filter**: Added a toggle to hide completed subtasks in the inspector sidebar, saving your preference across sessions.
  - **Resizable Sidebar**: Freely adjust the inspector sidebar width between 260px and 800px with a new draggable resizer handle; widths are automatically remembered.
  - **Cross-Note Origin Badges**: Subtasks referenced from other notes now display origin badges (e.g., `from Daily`) to clarify where tasks are sourced.
  - **Persistent Inspector Selection**: Selecting a node on the dashboard graph now persists cleanly even when the graph canvas re-renders.

- **Priority Tagging & Frontmatter Handling**:
  - **Clean Priority Tags**: Migrated priority syntax to clean, standard tags (`#high`, `#medium`, `#low`), automatically stripping them from display titles to keep task labels readable.
  - **Frontmatter Tag Prioritization**: Note-level priority is now strictly driven by frontmatter `tags`, preventing priority tags written in the body text or checkboxes from incorrectly overriding file-level goals.
  - **Frontmatter Tag Formats**: Setting a note's priority now seamlessly updates standard YAML tags (inline lists, multi-line arrays, or single values) and cleans up legacy `impact:` keys.

### Fixes

- **Task Linking & Hierarchy**:
  - **Cleaner Subtask Creation**: Adding subtasks beneath parent items now links cleanly to the parent note (`[[Note]]`) without inserting messy block anchors (such as `^tsk-xxxx`) into your markdown files.
  - **Cross-File Checkbox Isolation**: Fixed an issue where tasks referencing checkboxes in different markdown files could attempt invalid cross-file block inheritance; tasks now reliably attach directly to the target document.
 
## 0.1.0-alpha.17 - 2026-10-30

### Improvements

- **Decluttered Goal Canvas (Progress Planner)**:
  - **Cleaner Hierarchy by Default**: Checkbox subtasks are now hidden on the goal graph canvas by default, keeping the visualizer clean and focused on high-level goals and project relationships.
  - **"Show subtasks on canvas" Toggle**: Added a toggle in the Dashboard view settings panel so you can easily show or hide individual checkbox tasks on demand.
  - **Saved Preference**: Your canvas subtask visibility preference is automatically saved and remembered across sessions.

## 0.1.0-alpha.16 - 2026-10-21

### New Features

- **Web History Navigation Shortcuts (`Cmd/Ctrl+[` and `Cmd/Ctrl+]`)**:
  - Added dedicated navigation commands to move backward (`Cmd/Ctrl+[`) and forward (`Cmd/Ctrl+]`) through your browsing history, as well as a quick reload shortcut (`Cmd/Ctrl+R`).
  - Navigation commands automatically target either the active workspace web tab or your active VaporNote web tab based on focus.
- **Full Web Navigation History Preservation**:
  - Reopening closed web tabs (`Cmd/Ctrl+Shift+T`) or restoring your workspace on launch now restores your full backward/forward navigation history stack, allowing you to seamlessly navigate back to prior pages.
- **VaporNote In-Editor List Formatting & Search**:
  - Added native list-toggling shortcuts directly into VaporNote Markdown notes:
    - **Bullet List**: `Cmd/Ctrl+Shift+8`
    - **Numbered List**: `Cmd/Ctrl+Shift+7`
    - **Checkbox List**: `Cmd/Ctrl+Shift+C`
    - **Find in Note**: `Cmd/Ctrl+F`

### Improvements

- **Native Text Navigation Preserved in Web Viewer**:
  - Web search bars and text inputs now preserve standard text editing shortcuts (`Cmd+Left` to jump to line start, `Cmd+Right` to jump to line end, and `Cmd+Shift+Left/Right` to highlight text). Tab navigation is now strictly bound to `Cmd+Option+Left/Right`, preventing conflicts while typing.
- **Native macOS Full-Screen Toggle (`Cmd+Ctrl+F`)**:
  - Added support for the standard macOS full-screen toggle (`Cmd+Ctrl+F`) across the main window, embedded Web Views, and VaporNote.
- **Robust Terminal Clipboard & Input Handling**:
  - Overhauled clipboard event handling in the floating terminal for faster, more dependable copying (`Cmd+C`), pasting (`Cmd+V`), selecting all (`Cmd+A`), and screen clearing (`Cmd+K`) via both hotkeys and the right-click context menu.
- **Universal Shift-Symbol Shortcut Mapping**:
  - Improved keyboard chord parsing across operating systems so shifted number keys (such as `*` for `Shift+8` or `&` for `Shift+7`) reliably trigger their assigned shortcuts regardless of keyboard layout.

### Fixes

- **VaporNote Shortcut Target Desync**:
  - Fixed an issue where triggering list formatting or search commands while working in VaporNote could mistakenly execute against the background editor tab rather than the active VaporNote note.
- **Browser Address Bar Focus Capture**:
  - Fixed an issue where embedded web views could intercept and swallow `Cmd+L`, preventing the address bar from being focused via keyboard shortcut.

## 0.1.0-alpha.15 - 2026-10-20

### New Features

- **Default Location for New Notes**:
  - Added a new setting under **General Settings** allowing you to customize where new notes are saved when clicking unresolved internal links:
    - **Vault root**: Saves all new notes at the top level of your vault.
    - **Same folder as active note**: Creates the new note alongside the file you are currently editing.
    - **Custom folder**: Automatically routes all newly created notes into a designated folder (such as `Inbox` or `Notes`).
- **Visual Unresolved Wikilinks**:
  - Internal links pointing to notes or attachments that do not yet exist are now displayed with a distinct muted opacity (50%), hover styling, and a tooltip indicator (*"does not exist"*). Once the target note is created, links instantly update to full opacity across all open tabs.
- **Clean Document Creation**:
  - Creating notes via unresolved wikilinks or in VaporNote now initializes clean, blank documents rather than automatically injecting forced `# Heading` titles at the top of the file.

### Improvements

- **High-Speed Link Resolution & Duplicate Disambiguation**:
  - **Negative Link Caching**: Implemented in-memory negative caching for missing links, eliminating filesystem traversal and typing lag in large vaults with hundreds of unresolved wikilinks.
  - **Intelligent Proximity Routing**: When multiple notes share the same name across different folders, links automatically resolve to the file residing in the same directory as the active note.
  - **Automatic Collision Disambiguation**: If creating a new note creates a filename conflict with an existing note elsewhere in your vault, Mirage Editor automatically updates existing references across the vault into path-qualified links (e.g., `[[Projects/Summary|Summary]]`), ensuring your existing backlinks never break or misroute.
  - **Pre-Indexed Attachments**: Media assets, PDFs, images, and audio files are now pre-indexed into memory alongside Markdown notes for near-instant link and embed resolution.
- **Native Application Menu & Universal `Cmd/Ctrl+W`**:
  - Added a native system application menu bar (`File`, `Edit`, `View`, `Window`).
  - Pressing `Cmd/Ctrl+W` now cleanly dismisses open modals (such as Settings or Quick Switcher) and integrates with the native application menu to close active tabs across both the main workspace and VaporNote.
- **Seamless Focus Handoff Between Web and Markdown Tabs**:
  - Switching between embedded web/PDF tabs and Markdown documents or custom views (such as Progress Planner Agenda) now immediately releases webview focus, ensuring keyboard events and shortcuts work without requiring extra mouse clicks.

### Fixes

- **Empty Workspace Collapse on Last Tab Close**:
  - Fixed an issue where closing the final open tab in the workspace could detach the pane and leave the window completely blank. The workspace now automatically preserves a clean, active editor leaf ready for use.
- **Note Titles Containing Dots**:
  - Fixed an issue where note titles with periods (such as `[[Dr. Jekyll and Mr. Hyde]]`) were misidentified as non-markdown file extensions, which prevented the target note from resolving correctly.

## 0.1.0-alpha.14 - 2026-10-18

### Added

- **iCloud Calendar Integration (CalDAV Sync)**:
  - **Native Apple Calendar Sync**: Connect your iCloud account using an App-Specific Password to display your Apple Calendars directly alongside your Markdown tasks in the Progress Planner Agenda view.
  - **Auto-Discovery & Calendar Colors**: Automatically discovers all personal and shared calendars associated with your Apple ID, preserving their native calendar colors and event names.
  - **Background & Manual Syncing**: Events sync automatically in the background on a configurable interval (defaulting to 15 minutes). Added a **🔄 Sync** button directly to the Agenda view navigation bar and a Command Palette shortcut (**Progress: Sync iCloud Calendar (CalDAV)**) for instant on-demand updates.
  - **Rich Event Inspector**: Clicking an iCloud event displays full location info, descriptions, and recurring schedule details, along with a one-click button to open iCloud Calendar in a dedicated Web Viewer tab.
- **Calendar & Source Multi-Select Filter**:
  - Added an interactive **🗓️ Calendars** dropdown menu to the Agenda navigation bar.
  - Easily toggle individual iCloud calendars or local Markdown tasks on and off, with convenient **All** and **None** quick actions. Your selected filter preferences are saved and remembered automatically across app restarts.

### Changed

- **Intelligent Wikilink Resolution for Attachments & PDFs**:
  - Wikilinks pointing to non-markdown files (such as `[[diagram.png]]` or `[[paper.pdf]]`) now resolve automatically across the vault. The cache searches relative note folders, dedicated `- Attachments` directories, and the vault root without requiring manual full path references.
- **Enhanced PDF Anchor Navigation & Tab Reuse**:
  - Clicking a PDF anchor link (e.g. `[[manual.pdf#p=4&pt=200,300]]` or `[[manual.pdf#p=4]]`) now detects and focuses existing open PDF tabs across all split panes instead of opening duplicate viewer tabs.
  - Page-only anchor references (without point coordinates) now gracefully center and focus on the target page.
- **Persistent Agenda Mode & Scroll Position Memory**:
  - Your preferred Agenda view mode (**Week** vs. **Month**) now persists across sessions and tab reloads.
  - The weekly schedule grid now remembers your exact vertical scroll position when switching between workspace tabs, eliminating jumpy resets. Clicking the **Today** button smoothly recenters the timeline to the current hour.
- **Refined Agenda Timeline Styling**:
  - Upgraded the weekly timeline with custom-styled scrollbars and visual cloud badges (`☁️`) to clearly differentiate external calendar events from local vault tasks.

### Fixed

- **PDF Anchor Link Loading Races**:
  - Fixed an issue where clicking a PDF anchor link from a Markdown note while the PDF viewer was still initializing would fail to scroll to the target coordinates. Navigations are now safely queued and executed once page canvases mount.
- **Attachment Wikilink Extension Corruption**:
  - Fixed a bug where non-markdown targets could mistakenly have `.md` appended during link normalization, breaking wikilinks to PDFs and media files.
- **Daily Recurring CalDAV Events**:
  - Fixed an issue where daily recurring events (`FREQ=DAILY`) from calendar feeds failed to display on subsequent dates following their initial start date.

## 0.1.0-alpha.13 - 2026-10-15

### Added

- **Clear Web Viewer Cache & Cookies**:
  - **Browsing Data Purge**: Added a new **Browsing Data & Cache** section in Web Viewer settings along with a dedicated Command Palette action (**Web Viewer: Clear Web Viewer Cache & Data**).
  - **Full Session Reset**: Easily wipe all cached files, cookies, network resolver entries, and storage data across browsing sessions with a single click.

### Changed

- **Expanded Website & Retail Compatibility**:
  - **Firewall & Bot Detection Bypass**: Overhauled network request profiles and removed artificial browser switches to resolve blocks and access denials on sites protected by advanced Web Application Firewalls (such as Akamai or Cloudflare on retail and banking sites).
  - **Authentic Browser Identity**: Replaced fragmented User-Agent strings with clean, native Chrome headers that perfectly match underlying browser capabilities.
  - **Standardized Security Headers**: Preserved native Content Security Policies (CSP) and cookie-handling headers, preventing layout breakage and authentication failures on complex web applications.
- **CSP-Resistant VaporNote Transparency**:
  - Migrated VaporNote web translucency to native stylesheet injection. The opacity slider now applies smoothly and reliably across all websites, including sites with strict Content Security Policies (such as Reddit and Google).

### Fixed

- **Main Workspace Web Tab Opacity Leak**:
  - Fixed an issue where opacity adjustments in VaporNote could occasionally bleed into and dim web tabs open in the primary workspace. Workspace tabs now strictly maintain full opacity.
- **VaporNote PDF Backdrop Opacity**:
  - Fixed an issue where PDF tabs inside VaporNote initialized with a solid background color, preventing them from fading uniformly when using the opacity slider.

## 0.1.0-alpha.12 - 2026-10-13

### Added

- **Dedicated OAuth & Single Sign-On (SSO) Popups**:
  - **Isolated Login Windows**: Third-party authentication dialogs (Google, Apple, GitHub, Discord, Microsoft, etc.) now open inside dedicated, centered modal popup windows rather than hijacking your active tab or failing to load.
  - **Quick Cancellation**: Added a floating close button (✕) and full keyboard support (`Escape` or `Cmd/Ctrl+W`) to quickly dismiss login dialogs without interrupting your browsing session.
- **In-App Web Error & Offline Pages**:
  - Replaced blank screens and silent failures with a custom, dark-themed error page (*"This site can’t be reached"*) whenever a page fails to load due to connection loss, DNS errors, or server timeouts.
  - Features clear diagnostic details and an interactive **Try Again** button that preserves and retries your intended destination URL once your connection is restored.
- **"Open in Default Browser" Button & Command**:
  - Added an external browser button directly into the navigation bar of both the main Web Viewer and VaporNote web tabs.
  - Registered a new Command Palette action (**Web Viewer: Open in Default Browser**) to quickly hand off the current webpage to your system's default browser (Safari, Chrome, Firefox, etc.).

### Changed

- **Seamless Google Sign-In & Bot Detection Bypass**:
  - Completely overhauled Google Account authentication headers. By keeping Chromium engine tokens aligned with browser client hints (`Sec-CH-UA`) and disabling automation flags, Google sign-in rejections (*"This browser or app may not be secure"*) are eliminated.
  - Added automatic recovery that flushes invalid authentication cookies if an account verification challenge is triggered, preventing stuck login loops.
- **Accurate Surface Routing for Search & Quick Switcher**:
  - Opening links or searching via the Quick Switcher and Smart Web Search now reliably targets your main editor window whenever VaporNote is minimized or hidden, preventing tabs from quietly opening in background surfaces.

### Fixed

- **VaporNote Focus Theft on App Launch**:
  - Fixed an issue where VaporNote's background startup routine could steal keyboard focus away from the main workspace when launching Mirage Editor.
- **Error Page URL Recovery on Reload**:
  - Fixed an issue where clicking the reload button after a failed page load would attempt to reload the offline error page rather than retrying the actual target website.
- **URL Bar Integrity on Failed Navigation**:
  - Fixed an issue where failed navigation attempts could overwrite the address bar with raw error page data URLs.

## 0.1.0-alpha.11 - 2026-10-09

### Added

- **In-Vault Community Plugins System**:
  - **Zero-Build Plugin Architecture**: You can now create and run custom plugins directly within your vault (`.mirage-editor/plugins/`) using standard JavaScript, CSS, and JSON—no external build tools, Node installations, or bundlers required.
  - **One-Click Plugin Scaffolding**: Added a new **Community Plugins** section in Settings where you can instantly scaffold a new plugin. Mirage Editor automatically generates starter `main.js`, `manifest.json`, and `styles.css` files.
  - **Live Hot Reloading**: Mirage Editor actively watches plugin directories. Modifying and saving plugin code or styles immediately hot-reloads the plugin and updates the interface in real time.
  - **In-App Code Editing**: Installed plugins display direct file chips (`✎ main.js`, `✎ styles.css`, etc.) in Settings. Clicking any chip opens the file in Mirage Editor for instant editing.
  - **Dynamic Plugin Settings Tabs**: Plugins can register custom settings tabs and persistent data storage (`data.json`), which seamlessly appear in the Settings sidebar under a dedicated **Installed Plugins** section.
- **Dedicated Code & Config File Editor**:
  - Opening non-Markdown code or configuration files (`.js`, `.ts`, `.json`, `.css`, `.py`, `.sh`, `.yaml`, `.toml`, etc.) now launches a purpose-built code editing environment.
  - Features line number gutters, monospace typography, 2-space tab indentation, and lightweight syntax highlighting for keywords, strings, numbers, and comments.
- **Seamless Raw YAML Frontmatter Editing**:
  - Added a clickable **✎ Edit raw** action to note Properties headers, allowing you to instantly switch from the visual properties card to raw text YAML editing.
  - The editor automatically collapses raw YAML back into the visual Properties card as soon as your cursor navigates back down into the note body.

### Changed

- **Task Auto-Dating & Source Note Provenance (Progress Planner)**:
  - **Auto-Append Completion Date**: Added a Progress Planner setting to automatically stamp tasks with their completion date (`✅ YYYY-MM-DD`) when marked complete. Unchecking a task cleanly removes the date stamp.
  - **Auto-Append Source Note Link**: Added an option to automatically append a wikilink to the active note (`[[Note Name]]`) upon completion, preserving task provenance when copying or archiving tasks across files.

### Fixed

- **Frontmatter Deletion & Boundary Corruption**:
  - Fixed an issue where pressing `Backspace` at the top of a note body or using `Cmd/Ctrl+A` to select all text would delete into hidden frontmatter and corrupt note metadata. Deletions and selections are now strictly clamped to the note body.
- **Cursor Glitch on Note Open**:
  - Fixed a bug where opening a note placed the initial cursor at position `0` (above the properties widget). Cursors now land directly on the first line of the note body.
- **Task Block Anchor Invalidation**:
  - Fixed a bug where completing tasks with block references (e.g., `^task-123`) appended timestamps to the end of the line and broke the block syntax. Completion stamps are now inserted before the anchor.

## 0.1.0-alpha.10 - 2026-10-08

### Added

- **Terminal Context Menu & Native Shortcuts**:
  - **Native Context Menu**: Right-clicking anywhere inside the floating terminal now opens a context menu with quick actions for Copy, Paste, Select All, and Clear Buffer.
  - **Standard Terminal Shortcuts**: Added native keyboard shortcut support for `Cmd+C` (copy selection), `Cmd+V` (paste clipboard), `Cmd+A` (select all), and `Cmd+K` (clear screen and buffer). Shell signals such as `Ctrl+C` (SIGINT) remain untouched, while general app hotkeys continue to forward smoothly to the main workspace.
- **Interactive Input Prompts**:
  - Added an integrated, asynchronous input dialog system (`app.prompt`) that allows plugins, scripts, and commands to request text input via a clean modal popup with full keyboard navigation (Enter to submit, Escape to cancel).
- **Web Viewer Automation Bridge**:
  - Introduced background APIs allowing automation tools and notifier scripts to inspect active web tabs across both the main workspace and VaporNote, with support for running client-side JavaScript evaluations safely inside embedded pages.

### Changed

- **Intelligent "Close Active Tab" (`Cmd/Ctrl+W`)**:
  - Registered tab closing as a first-class app command that dynamically detects focus: pressing `Cmd/Ctrl+W` while interacting with VaporNote closes the active VaporNote tab, while pressing it in the editor closes the active workspace tab.
- **Terminal Selection Contrast & Stacking**:
  - Overhauled selection rendering in the terminal. Selected text is now stacked above the highlight layer with high-contrast colors, ensuring highlighted commands and log outputs remain sharp and readable.
- **VaporNote Focus Retention**:
  - Switching between web/PDF tabs and Markdown notes in VaporNote now automatically restores keyboard focus directly to the editor, eliminating the need to click into the note before typing.
- **Modal Dismissal Safety**:
  - Modal input dialogs now cleanly dispatch cancellation events when dismissed via Escape or backdrop clicks, preventing hanging actions or unintended trigger events in the command palette.

### Fixed

- **Terminal Text Selection Occlusion**:
  - Fixed an issue where selection highlight boxes in the terminal could render on top of the text layer, obscuring the characters underneath.
- **Cross-Surface Shortcut Routing**:
  - Fixed an issue where pressing `Cmd/Ctrl+W` could fail to register or close the wrong surface when transitioning focus between VaporNote and the primary editor window.

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
