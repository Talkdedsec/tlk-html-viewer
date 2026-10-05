import { build } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

// The whole workspace in one HTML file: GitHub Pages serves it as index.html
// and the release ships it unchanged. No chunks, CDN URLs, server or package
// installation are needed at runtime.
const result = await build({
  entryPoints: ["src/main.tsx"],
  bundle: true,
  splitting: false,
  minify: true,
  format: "iife",
  platform: "browser",
  target: ["es2022"],
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: "standalone.js",
  write: false,
  legalComments: "inline",
  metafile: true,
});
for (const output of Object.values(result.metafile.outputs)) {
  if (output.imports.some((item) => item.external))
    throw new Error("Standalone output contains an external import.");
}
const js = result.outputFiles.find((file) => file.path.endsWith(".js")).text;
const css = result.outputFiles.find((file) => file.path.endsWith(".css")).text;
const icon = await readFile("public/favicon.svg", "utf8");
const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><meta name="description" content="A live HTML, CSS and JavaScript editor with nothing to install. Your code stays in your browser."><meta property="og:title" content="TLK HTML Viewer"><meta property="og:description" content="From idea to canvas. No install, no account."><meta property="og:locale" content="en_US"><meta property="og:locale:alternate" content="tr_TR"><meta property="og:image" content="https://talkdedsec.github.io/tlk-html-viewer/og.png"><title>TLK HTML Viewer — From idea to canvas</title><link rel="icon" href="data:image/svg+xml,${encodeURIComponent(icon)}"><style>${css}</style></head><body><div id="root"></div><noscript>Enable JavaScript to use TLK HTML Viewer. · TLK HTML Viewer için JavaScript’i etkinleştir.</noscript><script>${js}</script></body></html>`;
await mkdir("release", { recursive: true });
await writeFile("release/tlk-html-viewer.html", page);
await writeFile(
  "release/build-meta.json",
  JSON.stringify(result.metafile, null, 2),
);
await writeFile(
  "release/SHA256SUMS.txt",
  `${createHash("sha256").update(page).digest("hex")}  tlk-html-viewer.html\n`,
);
console.log(
  `Standalone: release/tlk-html-viewer.html (${Math.round(Buffer.byteLength(page) / 1024)} KB)`,
);
