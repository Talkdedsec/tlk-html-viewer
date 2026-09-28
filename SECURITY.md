# Security

Please report vulnerabilities privately through GitHub private vulnerability reporting when available, or to the contact on the repository owner's profile. Do not post executable exploits involving real user data in public issues.

## Preview model

User HTML runs in a sandboxed srcdoc iframe. The app deliberately never grants allow-same-origin, top navigation, popups, form submission, downloads, or modal dialogs to preview content. JavaScript can be disabled in workspace settings. The console accepts messages only from the current preview window with a per-render token, bounds message lengths, and retains at most 200 entries. Console text is rendered as text, never HTML.

Sandboxing does not prevent resource exhaustion or external network requests. Only open code you trust; infinite loops may freeze a tab. Remote fonts, images, CSS and JavaScript in imported HTML can contact third parties. The preview is not a malware analysis environment. Clipboard copy requires browser permission. Exported HTML is an ordinary document and is not sandboxed when opened independently.

## Storage

Project code and preferences are stored in localStorage on this browser, without encryption. They are not uploaded by the editor. The hosting platform may retain normal HTTP access logs. There is no app-level analytics, account system, cloud synchronization, or secret storage. Download a project JSON backup before clearing browser data.

## Validation

CI checks TypeScript, ESLint, document composition/import behavior, and production server rendering. This is not a claim of comprehensive browser or security auditing.

References: [MDN iframe sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe), [CodeMirror](https://codemirror.net/docs/).
