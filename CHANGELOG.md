# Changelog

## Unreleased

- Single distribution: the one-file HTML build is the only build. The unused server-rendered variant, its Worker, hosting configuration and dependencies are gone.
- Source moved to `src/`; `npm run build` produces `release/tlk-html-viewer.html`, `npm run dev` starts a local Vite server.
- Release checks now assert the preview sandbox (`allow-scripts` only, never `allow-same-origin`) on the shipped file.
- Linting runs on typescript-eslint and React hooks rules; Dependabot groups minor and patch updates.

## 1.2.0 — 2026-09-28

- Complete Turkish/English interface switching with a persisted language preference.
- Translated dialogs, notifications, accessibility labels, template descriptions and CodeMirror search controls.
- Switching language preserves source code, preview state and editor undo history.
- Locale-aware counts and console timestamps; narrow-screen header and light-theme contrast fixes.
- Translation coverage and editor phrase regression tests.

## 1.1.0 — 2026-09-28

- Public online use without installation or an account.
- Standalone offline HTML distribution built from the same workspace, with a SHA-256 checksum.
- English and Turkish onboarding, usage guide, architecture notes and example documents.
- Bug/feature forms, pull request guidance and build artifact verification in CI.
- Preserve editor undo histories when switching language tabs.

## 1.0.0 — 2026-09-28

- HTML, CSS and JavaScript editor with live isolated preview.
- Three themes, four layouts, device widths, console capture and local project saving.
- HTML/project import and export, templates and keyboard shortcuts.
- Document validation tests and production Worker smoke test.
