# TLK HTML Viewer

![TLK HTML Viewer social card](public/og.png)

**Fikirden ekrana.** A customizable HTML, CSS and JavaScript workspace with a Turkish interface, a dark default theme and instant preview.

## Features

- CodeMirror editor: syntax highlighting, completion, folding, search/replace and undo/redo.
- Separate HTML, CSS and JavaScript panels; full HTML documents also work.
- Live preview with a 650 ms debounce, or manual execution.
- Side-by-side, stacked, code-only and preview-only layouts; mobile editor/preview tabs.
- Flexible desktop, 768 px tablet and 375 px phone viewports; fullscreen preview.
- Midnight, graphite and light themes; adjustable font size and line wrapping.
- Console output, warnings, errors and unhandled promise rejections; last 200 messages.
- Open or drop HTML and project JSON files, up to 2 MB.
- Download a combined standalone HTML file or an editable JSON project.
- Automatic local browser saving, three starter templates and keyboard shortcuts.

## Development

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by the server. The project uses React, TypeScript, CodeMirror 6, Lucide, vinext and Vite. The Sites Vite plugin produces Cloudflare Worker-compatible output.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:production
```

CI runs the same checks. The production test starts a local Worker runtime and checks the rendered page. Automated coverage currently covers document composition, project validation and server rendering; it does not replace interactive browser testing.

## Shortcuts

| Shortcut         | Action                               |
| ---------------- | ------------------------------------ |
| Ctrl/Cmd + Enter | Run preview                          |
| Ctrl/Cmd + S     | Download HTML                        |
| Ctrl/Cmd + F     | Search/replace in the focused editor |
| Ctrl/Cmd + Z     | Undo in the focused editor           |
| Tab              | Indent code                          |
| Esc              | Close a dialog                       |

## Project files

Use **Proje kaydet** to download a JSON file that preserves all three panels. Use **Dosya aç** or drag it into the workspace to restore it. HTML export combines the panels into a standalone document and omits the preview console bridge. Importing an HTML file places the complete document in the HTML panel.

```json
{
  "version": 1,
  "name": "my-project",
  "project": {
    "html": "<h1>Hello</h1>",
    "css": "h1 { color: rebeccapurple; }",
    "js": "console.log('Ready');"
  }
}
```

## Privacy and limitations

Project code stays in this browser's localStorage; the editor does not upload it. Export a JSON backup to move between devices or protect against cleared browser data. Storage can be unavailable or full, in which case the workspace displays a failure status and editing remains available.

The preview uses an iframe with `sandbox="allow-scripts"`, never `allow-same-origin`. JavaScript can be disabled in settings. Parent-page access, popups, form submission and top-level navigation are not granted. Imported content can still load external resources and a long-running script can freeze a tab. This is a creative tool, not a malware sandbox. See [SECURITY.md](SECURITY.md).

Relative images, local companion files, backend routes, package imports and multi-file projects are not automatically resolved. Hosted HTTPS or localhost is required for modern clipboard and secure-context features. The app is not an offline PWA. Preview console capture may be blocked by an imported document's own CSP. Exported HTML runs independently, outside the app's sandbox.

## Hosting

`npm run build` emits `dist/server/index.js` and `dist/client`. `.hosting/hosting.json` identifies the Sites project; it contains no credential. Sites deployment access and the GitHub repository's visibility are independent. The repository is public; the initial Sites preview is owner-private.

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md). MIT © 2026 Talkdedsec.
