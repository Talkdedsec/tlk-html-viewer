# Usage guide

**English** · [Türkçe](USAGE.tr.md)

## Start without installing anything

1. [Open TLK HTML Viewer](https://talkdedsec.github.io/tlk-html-viewer/).
2. Change the code in the HTML, CSS or JS tab.
3. With **Auto-run** on, the result appears in the preview after 650 ms. With it off, use **Run**.

You don't need an account, a GitHub sign-in or a server upload. **Open file** reads your local file through the browser's File API.

## View an existing HTML file

Choose an `.html` or `.htm` file with **Open file**, drag it onto the workspace, or paste its code into the HTML tab. The size limit is 2 MB. A complete HTML document goes into the HTML panel as is, and the CSS and JS panels are cleared. Because opening a file replaces your current work, you are asked to confirm first.

Images or CSS files next to a file are not picked up automatically. For a portable document, put styles and scripts inside the document; images can be embedded as data URLs. Links to resources on the internet only work when you are online.

## Make it yours

The **TR / EN** switch in the top bar changes the interface language. Buttons, settings, notices, shortcuts and the editor's search panel change together. Your project's source code, the open file and the undo history are kept. The app opens in your browser's language, and once you pick one it is remembered in this browser.

- Settings: Midnight, Graphite or Daylight theme; font size; line wrapping; JavaScript in the preview.
- Layout buttons: side by side, stacked, code only or preview only.
- Device buttons: flexible desktop, 768 px tablet, 375 px phone.
- Fullscreen: enlarges the preview. Press Esc to leave.
- On a phone: switch between the **Code** and **Preview** tabs.

Device options change the iframe width; they do not emulate a real device's operating system or browser.

## Keep your work

**Download HTML** merges the HTML, CSS and JS panels into a single runnable HTML file. The preview console's helper code is not exported.

**Save project** downloads a JSON file that keeps the three panels separate. Restore it later with **Open file**. Automatic saving in the browser is not a backup: it can be lost if site data is cleared or a private window is closed. The tool tells you when storage is unavailable.

## Use it offline

[Download the single-file version](https://talkdedsec.github.io/tlk-html-viewer/tlk-html-viewer.html). If your browser opens the file instead, use "Save as" to keep it as `.html`. Double-click the file to run it; no Node.js, package install or local server is needed. The latest version is also on the [Releases](https://github.com/Talkdedsec/tlk-html-viewer/releases) page.

Offline use covers the app's own code and editor. If the HTML you open asks for external fonts, images or JavaScript, those will not load without a connection. Some browsers restrict the clipboard and local storage under `file://`; normal select-and-copy and project download still work there.

## Troubleshooting

| Problem                             | Check                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------- |
| The preview doesn't change          | Turn on Auto-run or press Ctrl/Cmd + Enter.                                                 |
| JavaScript doesn't run              | Check the JavaScript option in Settings and the Console panel.                              |
| A form, popup or alert doesn't open | These are blocked by the preview's permissions; it is not a bug.                            |
| An image doesn't show               | Local relative files are not loaded automatically. Embed it or use a reachable URL.         |
| Copy fails                          | Select the text in the editor and use your system's copy shortcut.                          |
| The tab freezes                     | Code with an infinite loop can lock the tab. Close the tab; don't run code you don't trust. |

Before reporting a bug, read the [known limits](../SECURITY.md) and the [issue form](https://github.com/Talkdedsec/tlk-html-viewer/issues/new/choose).
