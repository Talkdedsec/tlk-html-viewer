import assert from "node:assert/strict";
import test from "node:test";
import {
  composeDocument,
  previewDocument,
  parseProject,
  starter,
  MAX_FILE_SIZE,
} from "../lib/document.ts";

test("exports a self-contained document from all three panels", () => {
  const output = composeDocument(starter);
  assert.match(output, /^<!doctype html>/i);
  assert.ok(output.includes(starter.html));
  assert.ok(output.indexOf("<style>") < output.indexOf("<body>"));
  assert.ok(output.indexOf(starter.js) > output.indexOf(starter.html));
  assert.ok(!output.includes("tlk-viewer"));
});

test("preserves a full HTML document and injects added panels", () => {
  const html =
    '<!DOCTYPE html><html lang="tr"><head><title>Existing</title></head><body><p>Hello</p></body></html>';
  const output = composeDocument({
    html,
    css: "p{color:red}",
    js: "console.log(123)",
  });
  assert.equal((output.match(/<html/g) || []).length, 1);
  assert.ok(output.includes("<title>Existing</title>"));
  assert.match(output, /<style>p\{color:red\}<\/style><\/head>/);
  assert.match(output, /<script>console.log\(123\)<\/script><\/body>/);
});

test("closing-tag text cannot end a CSS or JavaScript panel", () => {
  const output = composeDocument({
    html: "<main/>",
    css: 'a::after{content:"</style>"}',
    js: 'const s="</ScRiPt><img src=x>";',
  });
  assert.equal((output.match(/<\/script>/gi) || []).length, 1);
  assert.equal((output.match(/<\/style>/gi) || []).length, 1);
  assert.ok(output.includes("<\\/ScRiPt>"));
});

test("console bridge executes before user scripts and is preview-only", () => {
  const project = {
    html: '<html><head><script>console.log("early")</script></head><body>Hi</body></html>',
    css: "",
    js: "",
  };
  const output = previewDocument(project, "test-token");
  assert.ok(
    output.indexOf("test-token") < output.indexOf('console.log("early")'),
  );
  assert.ok(output.includes("unhandledrejection"));
  assert.ok(!composeDocument(project).includes("test-token"));
});

test("project import rejects invalid types and oversized input", () => {
  for (const invalid of [
    null,
    [],
    {},
    "text",
    { html: 1, css: "", js: "" },
    { html: "", css: null, js: "" },
    { html: "x".repeat(MAX_FILE_SIZE + 1), css: "", js: "" },
  ])
    assert.equal(parseProject(invalid), null);
  assert.deepEqual(parseProject({ ...starter, untrusted: "ignored" }), starter);
});

test("empty projects remain valid and exportable", () => {
  const empty = { html: "", css: "", js: "" };
  assert.deepEqual(parseProject(empty), empty);
  assert.match(composeDocument(empty), /<body>/);
});
