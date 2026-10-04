import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { Script } from "node:vm";
import test from "node:test";

test("standalone release is a single document with valid bundled JavaScript", async () => {
  const html = await readFile("release/tlk-html-viewer.html", "utf8");
  assert.match(
    html,
    /<div id="root"><\/div><noscript>[\s\S]*?<\/noscript><script>/,
  );
  assert.equal((html.match(/<\/script>/gi) || []).length, 1);
  assert.doesNotMatch(html, /<script[^>]+src=|<link[^>]+href=["']https?:/i);
  const script = html.slice(
    html.indexOf("<script>") + 8,
    html.lastIndexOf("</script>"),
  );
  assert.doesNotThrow(() => new Script(script));
  assert.match(html, /id="root"/);
  assert.match(html, /TLK HTML Viewer/);
  const sum = await readFile("release/SHA256SUMS.txt", "utf8");
  assert.equal(
    sum.split(" ")[0],
    createHash("sha256").update(html).digest("hex"),
  );
});

test("standalone dependency graph has no external runtime imports", async () => {
  const metadata = JSON.parse(
    await readFile("release/build-meta.json", "utf8"),
  );
  for (const output of Object.values(metadata.outputs)) {
    assert.equal(output.imports.filter((i) => i.external).length, 0);
  }
});

test("preview stays sandboxed and the page ships its metadata", async () => {
  const html = await readFile("release/tlk-html-viewer.html", "utf8");
  // The preview iframe gets allow-scripts at most. The bundle also contains
  // CodeMirror's completion list for the sandbox attribute, so the check is
  // pinned to the iframe's own props rather than the whole file.
  assert.match(
    html,
    /sandbox:\w+\?"allow-scripts":"",referrerPolicy:"no-referrer"/,
  );
  for (const file of ["src/workspace.tsx", "src/editor.tsx", "src/lib/document.ts"])
    assert.doesNotMatch(await readFile(file, "utf8"), /allow-same-origin/);
  assert.match(html, /role:"tablist"/);
  assert.match(html, /<meta property="og:image" content="https:\/\//);
  assert.match(html, /Fikirden/);
});
