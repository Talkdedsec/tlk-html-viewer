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
