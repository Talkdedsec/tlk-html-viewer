# Contributing

Use Node.js 24 and npm. Run npm ci, then npm run dev. Keep the default theme dark, preserve keyboard access and responsive layouts, and avoid uploading users' code.

Before opening a pull request, run npm run typecheck, npm run lint, npm test, npm run build and npm run test:production. Include the behavior changed, validation performed, and any limitations. For UI changes, manually test desktop and mobile widths, theme switching, dialogs and keyboard navigation.

Never add allow-same-origin to the preview iframe. Keep exported documents free of preview instrumentation. Import failures must leave the existing project intact.
