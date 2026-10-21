# Mirage Editor

**Your research workflow in one window.**

![status](https://img.shields.io/badge/status-alpha-orange) ![platform](https://img.shields.io/badge/platform-macOS-lightgrey)

---

## Why Mirage?

Mirage is a unified research environment. Instead of juggling a notes app, a browser, a PDF reader, and a task manager, you get all of them in a single window. A session might look like this:

> Read a PDF, pin a citation to an exact point on page 4, open the source in the next pane, track the task in the status bar, and keep a translucent note floating on top.

Your work is stored as plain files in a folder you control. Notes are Markdown, drawings are SVG, and per-vault settings are JSON. There is no proprietary database and no lock-in.

---

## Highlights

| | |
| :--- | :--- |
| **Precision PDF anchors** | Pin a link to an exact point on a PDF page, and citing notes stay in sync when you move the pin |
| **Built-in browser** | Sandboxed tabs with restorable history, search-engine choice, ad blocking, and incognito mode |
| **Floating terminal** | A real PTY that stays alive in the background |
| **Split-pane workspace** | Notes, web pages, and PDFs side by side, with drag-and-drop tab splitting |
| **Linked notes** | `[[wikilinks]]` with aliases, bidirectional backlinks, and unresolved-link styling |
| **Live Preview editor** | CodeMirror 6 with in-place rendering of headings, task checkboxes, lists, images, KaTeX math, and a YAML properties card |
| **VaporNote** | A translucent, floating multi-tab companion window |
| **Planner** | Goals graph, agenda calendar, recurring tasks, and iCloud Calendar sync |
| **Encryption** | Per-note AES-256-GCM encryption; plaintext never touches disk |
| **Extensible** | Zero-build vault plugins with hot reload, plus a script runner |

---

## Feature Tour

### Notes
- Interactive Markdown with smart list continuation, indent/outdent, and `Cmd+Shift+8/7/C` for bullet, numbered, and checkbox lists.
- Checking a task can stamp it with a completion date and a link back to the source note.
- Quick Switcher (`Cmd+O`) with custom prefix rules and alias matching. Heading Switcher (`Cmd+Shift+H`) and global vault search with a tag explorer.
- Choose where new notes from unresolved links are created: vault root, next to the active note, or a custom folder.
- A lightweight code view for peeking at and editing script files without leaving the app.

### Web
- Browse in tabs next to your notes. `Cmd+L` focuses the address bar, `Cmd+[` and `Cmd+]` navigate history, and `Cmd+Shift+S` opens a smart search prompt.
- Reopening a closed tab (`Cmd+Shift+T`) restores its full back/forward history.
- Search engines: Google, DuckDuckGo, Bing, Brave, Ecosia, Kagi, or a custom URL.
- Optional ad blocker, video playback-speed controls, an incognito session, and one-click cache and cookie clearing.
- Dedicated popup windows for OAuth and single sign-on flows.

### PDFs
- Pin anchors to exact coordinates: `[[paper.pdf#p=4&pt=350,620|Paper, p. 4]]`.
- A slide-out drawer lists every note in the vault that cites the PDF, grouped by page, with snippets.
- Hold `Cmd` and drag a pin to move it, and every citing note updates automatically.
- Selectable text, link annotations, cursor-anchored zoom, and a "chalkboard" dark mode (`Alt+D`).

### Terminal
- A native pseudo-terminal (`node-pty` + `xterm.js`) that floats above notes and web tabs and is resizable in 8 directions.
- Run anything you'd run in a normal terminal, from Neovim to AI coding CLIs like Claude Code, without leaving your notes.

### VaporNote
- A floating, translucent window (`Alt+M` to minimize, `Alt+F` for fullscreen) with its own tabs for Markdown, web pages, PDFs, and images.
- Opacity slider, edge resizing, and live sync with the main workspace and the files on disk.

### Planning
- **Goals Graph** (`Cmd+Shift+G`): a force-directed map of goals, projects, and subtasks, with impact coloring and collapsible branches.
- **Agenda** (`Cmd+Shift+A`): week and month views, drag-to-reschedule, recurrence rules, and overdue alerts.
- **iCloud Calendar** via CalDAV, with calendar filtering and background sync.
- Pin the task you're working on to the status bar.

### Spaces & Security
- **Spaces** (`Cmd+Shift+P`): switch between virtual workspaces such as Default, Work, and Research, each with its own layout and tabs.
- **Encrypted notes** (`.mdenc`): AES-256-GCM with PBKDF2 (210,000 iterations). Notes decrypt only in memory and re-encrypt on save.

### AirSketch
- Draw on an iPad or tablet with Apple Pencil, including palm rejection, shapes, and lasso. Drawings save as SVG in your vault and sync live to the desktop note.

### Extending Mirage
- **Vault plugins** live in `.mirage-editor/plugins/<id>/` as plain CommonJS with a `manifest.json`. Edits hot-reload with no restart, and a built-in scaffolder creates a template.
- **Script Runner** turns any `.js` file in a designated folder into a Command Palette entry, with access to the app, vault, and workspace.

---

## Install

1. Download the latest `.dmg` from the [Releases](../../releases) page.
2. Drag **Mirage Editor** to Applications.
3. Mirage is not yet notarized. If macOS blocks the first launch, go to **System Settings → Privacy & Security → Open Anyway**.
4. Open a folder as your vault. Mirage creates a `.mirage-editor/` folder inside it for settings.

Releases are macOS builds. The codebase also targets Windows and Linux, but macOS is the current supported platform.

---

## Essential Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Cmd+P` | Command Palette (recent commands first) |
| `Cmd+O` | Quick Switcher |
| `Cmd+Shift+F` | Search the whole vault |
| `Cmd+Opt+←/→` | Previous / next tab |
| `Cmd+Shift+T` | Reopen closed tab (with web history) |
| `Cmd+L` | Focus address bar |
| `Alt+M` | Show / hide VaporNote |
| `Cmd+Shift+G` / `Cmd+Shift+A` | Goals Graph / Agenda |

Every shortcut can be rebound in **Settings → Hotkeys**.

---

## Architecture

Mirage keeps untrusted web content, heavy PDFs, and the terminal out of the main UI thread by giving each its own Electron `WebContentsView`, coordinated from the main process.

```
┌──────────────────────────────────────────────────────────────┐
│                    ELECTRON MAIN PROCESS                     │
│   Window manager · IPC hub · PTY sessions · CalDAV · menus   │
└──────┬───────────────┬────────────────┬───────────────┬──────┘
       │               │                │               │
┌──────▼──────┐ ┌──────▼──────┐ ┌───────▼───────┐ ┌─────▼──────┐
│ Main        │ │ Overlay     │ │ Workspace     │ │ VaporNote  │
│ renderer    │ │ stages      │ │ web & PDF     │ │ stage      │
│ · Vault     │ │ · Modals    │ │ views         │ │ · Web &    │
│ · Metadata  │ │ · Toasts    │ │ (sandboxed,   │ │   PDF      │
│   cache     │ │             │ │  partitioned) │ │   views    │
│ · CodeMirror│ │             │ │               │ │            │
└─────────────┘ └─────────────┘ └───────────────┘ └────────────┘
```

### Engineering notes

For the technically curious, here are some of the decisions under the hood.

- **Isolated web views.** Web and PDF tabs run as native `WebContentsView`s in their own processes, the approach Electron recommends over the `<webview>` tag. Views are explicitly destroyed on close, so memory returns to the system.
- **Keyboard handoff.** Embedded pages can swallow keystrokes, so Mirage intercepts keys in the main process and hands focus between web, PDF, and note panes. Shortcuts behave the same everywhere.
- **Fast link resolution.** Exact-path and basename indexes give O(1) lookups. Missing links are negatively cached, and duplicate note names resolve by directory proximity.
- **Safe renames on collision.** Creating a note whose name already exists elsewhere automatically rewrites existing references to path-qualified links, so backlinks never misroute.
- **Non-blocking startup.** Two-phase stat scanning and chunked async cache loading keep cold starts fast and the UI responsive, even in large vaults.
- **Streaming backlink indexing.** PDF citation indexing runs in small background batches with per-tab cancellation to hold a smooth frame rate.
- **Layout-aware shortcuts.** A chord normalizer handles macOS and Windows/Linux modifiers, shifted symbols, and software layouts like Dvorak and Colemak, and warns on conflicts.
- **Watcher-loop protection.** The vault's file watcher ignores the app's own recent writes, so saving never retriggers itself.
- **Automated tests.** 300+ unit tests, including source-invariant checks that guard critical function signatures and IPC channels.

---

## Built With

Electron · TypeScript · CodeMirror 6 · `node-pty` + xterm.js · PDF.js · KaTeX · chokidar · esbuild · Vitest

---

## Status

Mirage is in **alpha**. Core features are stable and releases ship frequently, but expect some rough edges. Bug reports and feedback are welcome via [Issues](../../issues).

## About

Mirage Editor is a solo project by Julian Ventura.
