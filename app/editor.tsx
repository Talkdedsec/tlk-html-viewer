"use client";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";
import { useMemo } from "react";

export default function Editor({
  value,
  language,
  onChange,
  light,
  fontSize,
  wrap,
}: {
  value: string;
  language: "html" | "css" | "js";
  onChange: (value: string) => void;
  light: boolean;
  fontSize: number;
  wrap: boolean;
}) {
  const extensions = useMemo(
    () => [
      language === "html" ? html() : language === "css" ? css() : javascript(),
      ...(wrap ? [EditorView.lineWrapping] : []),
      EditorView.theme({
        "&": {
          fontSize: `${fontSize}px`,
          height: "100%",
          background: "transparent",
        },
        ".cm-scroller": {
          fontFamily: '"Cascadia Code", "SFMono-Regular", Consolas, monospace',
          lineHeight: "1.8",
        },
        ".cm-gutters": {
          background: "transparent",
          border: "none",
          color: "#6c7187",
        },
        ".cm-content": { padding: "20px 0" },
        ".cm-line": { padding: "0 20px 0 10px" },
        ".cm-activeLine": { background: "rgba(128,128,180,.05)" },
      }),
    ],
    [language, fontSize, wrap],
  );
  return (
    <CodeMirror
      value={value}
      extensions={extensions}
      theme={light ? "light" : oneDark}
      onChange={onChange}
      height="100%"
      aria-label={`${language.toUpperCase()} kod editörü`}
      basicSetup={{
        foldGutter: true,
        autocompletion: true,
        highlightActiveLine: true,
        searchKeymap: true,
        tabSize: 2,
      }}
    />
  );
}
