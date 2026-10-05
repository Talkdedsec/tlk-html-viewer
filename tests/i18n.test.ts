import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
import {
  messages,
  translate,
  normalizeLocale,
  formatCount,
  editorPhrases,
  type MessageKey,
} from "../src/lib/i18n.ts";

test("every message has nonempty Turkish and English text with no encoding damage", () => {
  assert.ok(Object.keys(messages).length > 100);
  for (const key of Object.keys(messages) as MessageKey[]) {
    for (const locale of ["tr", "en"] as const) {
      const text = translate(locale, key);
      assert.ok(text.trim().length > 0, `${locale}: ${key}`);
      assert.doesNotMatch(text, /\uFFFD|Ã|Ä|Å/, `${locale}: ${key}`);
    }
  }
});

test("message IDs are English source text", () => {
  for (const key of Object.keys(messages))
    assert.doesNotMatch(key, /[çğıöşüÇĞİÖŞÜ]/, `Turkish message ID: ${key}`);
});

test("locale restore is validated and counts use correct grammar", () => {
  assert.equal(normalizeLocale("en"), "en");
  assert.equal(normalizeLocale("tr"), "tr");
  for (const value of [null, {}, "fr", 12])
    assert.equal(normalizeLocale(value), "tr");
  assert.equal(formatCount("en", "line", 1), "1 line");
  assert.equal(formatCount("en", "line", 2), "2 lines");
  assert.equal(formatCount("tr", "character", 2), "2 karakter");
});

test("visible JSX text and accessibility labels use the translation catalog", async () => {
  const source = ts.createSourceFile(
    "workspace.tsx",
    await readFile("src/workspace.tsx", "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const allowed = new Set([
    "TLK",
    "Viewer",
    "STUDIO",
    "TR",
    "EN",
    "UTF-8",
    ".html",
    "px",
    "Ctrl S",
    "Ctrl F",
    "Ctrl ↵",
    "↗",
    "·",
  ]);
  const errors: string[] = [];
  function walk(node: ts.Node) {
    if (ts.isJsxText(node)) {
      const text = node.text.replace(/\s+/g, " ").trim();
      if (text && !allowed.has(text)) errors.push(text);
    }
    if (
      ts.isJsxAttribute(node) &&
      ["aria-label", "title", "placeholder"].includes(
        node.name.getText(source),
      ) &&
      node.initializer &&
      ts.isStringLiteral(node.initializer)
    ) {
      if (!["Türkçe", "English"].includes(node.initializer.text))
        errors.push(node.initializer.text);
    }
    ts.forEachChild(node, walk);
  }
  walk(source);
  assert.deepEqual(errors, []);
});

test("CodeMirror search prompts and announcements are covered in Turkish", async () => {
  const source = await readFile(
    "node_modules/@codemirror/search/dist/index.js",
    "utf8",
  );
  const patterns = [...source.matchAll(/phrase\((?:view,\s*)?"([^"]+)"/g)];
  for (const [, key] of patterns)
    assert.ok(editorPhrases[key], `Missing editor phrase: ${key}`);
});
