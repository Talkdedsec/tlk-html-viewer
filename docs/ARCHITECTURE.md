# Architecture

The online and offline versions are the same single HTML file built from one React workspace. There is no backend API for users' documents.

```mermaid
flowchart LR
  Input[Local file or editor] --> State[React project state]
  State --> Storage[Browser localStorage]
  State --> Composer[Document composer]
  Composer --> Preview[Sandboxed srcdoc iframe]
  Preview --> Console[Validated console messages]
  Composer --> Export[Standalone HTML export]
  State --> JSON[Editable project JSON]
```

## Source map

| Location                       | Responsibility                                                  |
| ------------------------------ | --------------------------------------------------------------- |
| `src/workspace.tsx`            | Application state, responsive workspace and user actions        |
| `src/editor.tsx`               | CodeMirror configuration and language support                   |
| `src/studio.css`               | Three themes, layouts, responsive and accessibility styles      |
| `src/lib/document.ts`          | Pure HTML composition and project validation                    |
| `src/lib/i18n.ts`              | Turkish and English interface text                              |
| `src/main.tsx`                 | Browser entry point                                             |
| `scripts/build-standalone.mjs` | Bundle all application code into one HTML, emit checksum        |
| `index.html`, `vite.config.ts` | Local development server only                                   |
| `tests/`                       | Composition, import validation, translation and artifact checks |

## Distribution

The GitHub Pages workflow builds the standalone artifact and serves it as `index.html`. The downloadable HTML is the same file. It does not need a CDN, npm, a backend or an account to run. The build checks that no external runtime imports remain and verifies its SHA-256 checksum. Library license notices are retained in the bundle.

## Data boundaries

User files are read through `File.text()`. Imports are size/type checked before replacing state. Projects are stored in `localStorage`, with errors caught so storage denial does not stop editing. Downloaded project files preserve the three source panels.

The iframe receives generated HTML through `srcdoc`, with only `allow-scripts` when enabled. It never receives `allow-same-origin`. Console events are checked against the active window and render token; text length and retained messages are bounded. This prevents direct access to parent state, but does not protect against resource exhaustion or prevent external network requests by imported content.

The HTML composer is designed for browser documents and fragments, not as a sanitization library or an HTML formatter. Source is meant to execute in the preview. Do not use it to sanitize markup for embedding into a trusted page.

## Validation boundaries

CI verifies types, lint, pure functions, the standalone output and the preview sandbox. It does not claim a full cross-browser accessibility audit. Before shipping UI changes, manually check desktop/mobile layouts, all themes, keyboard navigation, dialogs, storage denial and file import/export.
