import assert from "node:assert/strict";
import test from "node:test";
import { unstable_dev } from "wrangler";

test("production Worker renders the studio and isolated preview", async () => {
  const worker = await unstable_dev("dist/server/index.js", {
    config: "dist/server/wrangler.json",
    local: true,
    experimental: { disableExperimentalWarning: true },
    logLevel: "error",
  });
  try {
    const response = await worker.fetch("/", {
      headers: { accept: "text/html" },
    });
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /TLK HTML Viewer/);
    assert.match(html, /Fikirden/);
    assert.match(html, /sandbox="allow-scripts"/);
    assert.doesNotMatch(
      html,
      /allow-same-origin|site-preview|Starter Project/,
    );
    assert.match(html, /og:image/);
    assert.match(html, /role="tablist"/);
  } finally {
    await worker.stop();
  }
});
