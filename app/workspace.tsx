"use client";
import {
  translate as translateMessage,
  normalizeLocale,
  formatCount,
  type Locale,
  type MessageKey,
} from "../lib/i18n";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Code2,
  Play,
  PanelLeft,
  Columns2,
  Rows2,
  Eye,
  Upload,
  Download,
  Settings2,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Maximize2,
  Terminal,
  X,
  Check,
  ChevronDown,
  Copy,
  FileCode2,
  FolderOpen,
  Sparkles,
  CodeXml,
  Plus,
  ShieldCheck,
  Keyboard,
  Trash2,
  Save,
} from "lucide-react";
import {
  composeDocument,
  previewDocument,
  parseProject,
  starter,
  MAX_FILE_SIZE,
  type Project,
} from "../lib/document";
const Editor = lazy(() => import("./editor"));
type Layout = "split" | "stack" | "code" | "preview";
type Theme = "midnight" | "graphite" | "light";
type Log = {
  level: string;
  text: string;
  time: number;
};
const STORE = "tlk-html-viewer.project.v1";
const PREFS = "tlk-html-viewer.preferences.v1";
const templates: {
  name: MessageKey;
  caption: MessageKey;
  project: Project;
  color: string;
}[] = [
  {
    name: "İlk fikrin",
    caption: "Minimal bir başlangıç",
    project: starter,
    color: "sage",
  },
  {
    name: "Gece kartı",
    caption: "Biraz renk, biraz hareket",
    color: "purple",
    project: {
      html: '<main><div class="orb"></div><span>CREATIVE EXPERIMENT / 002</span><h1>Stay curious.</h1><p>Small experiments. Unexpected possibilities.</p><button>Explore something new ↗</button></main>',
      css: "*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#111019;color:#eee8ff;font-family:system-ui;padding:24px}main{position:relative;overflow:hidden;border:1px solid #393146;border-radius:24px;padding:60px 36px;max-width:500px;background:#1b1726}.orb{width:100px;height:100px;background:linear-gradient(130deg,#bc9cff,#ff9bb9);border-radius:50%;box-shadow:0 0 70px #aa78ed55;margin-bottom:45px}span{font-size:10px;letter-spacing:2px;color:#b19bcf}h1{font-size:48px;letter-spacing:-2px;margin:18px 0}p{color:#a49ab6;line-height:1.7}button{margin-top:20px;background:#c4a7ff;border:0;padding:14px 20px;border-radius:9px;color:#21162f;cursor:pointer}button:hover{background:#d9c7ff}",
      js: "document.querySelector('button').onclick = () => console.log('Keep exploring. ✦');",
    },
  },
  {
    name: "Boş tuval",
    caption: "Tamamen sana ait",
    color: "blank",
    project: {
      html: "<main>\n  <h1>Merhaba, dünya.</h1>\n</main>",
      css: "body {\n  font-family: system-ui, sans-serif;\n  padding: 40px;\n}",
      js: "// Fikrini burada hayata geçir.\n",
    },
  },
];
function download(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function IconButton({
  label,
  onClick,
  icon,
  active,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`icon-button ${active ? "active" : ""}`}
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
export default function Workspace() {
  const [locale, setLocale] = useState<Locale>("tr");
  const translate = useCallback(
    (key: MessageKey) => translateMessage(locale, key),
    [locale],
  );
  const [project, setProject] = useState<Project>(starter);
  const [tab, setTab] = useState<keyof Project>("html");
  const [layout, setLayout] = useState<Layout>("split");
  const [theme, setTheme] = useState<Theme>("midnight");
  const [viewport, setViewport] = useState("100%");
  const [auto, setAuto] = useState(true);
  const [scripts, setScripts] = useState(true);
  const [wrap, setWrap] = useState(true);
  const [fontSize, setFontSize] = useState(13);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<MessageKey>("Hazırlanıyor");
  const [name, setName] = useState("untitled");
  const [logs, setLogs] = useState<Log[]>([]);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [notice, setNotice] = useState<MessageKey | "">("");
  const [rendered, setRendered] = useState({ html: "", token: "", key: 0 });
  const [mobile, setMobile] = useState<"code" | "preview">("code");
  const frame = useRef<HTMLIFrameElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const settings = useRef<HTMLDialogElement>(null);
  const library = useRef<HTMLDialogElement>(null);
  const help = useRef<HTMLDialogElement>(null);
  const importing = useRef(false);
  const projectRef = useRef(project);
  useEffect(() => {
    projectRef.current = project;
  }, [project]);
  const notify = useCallback((text: MessageKey) => setNotice(text), []);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  const run = useCallback(() => {
    const token = crypto.randomUUID();
    setLogs([]);
    setRendered((previous) => ({
      html: previewDocument(projectRef.current, token),
      token,
      key: previous.key + 1,
    }));
  }, []);
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const raw = localStorage.getItem(STORE);
        if (raw) {
          const data = JSON.parse(raw);
          const valid = parseProject(data.project);
          if (valid) {
            setProject(valid);
            projectRef.current = valid;
            if (typeof data.name === "string") setName(data.name.slice(0, 80));
          }
        }
        const prefs = JSON.parse(localStorage.getItem(PREFS) || "{}");
        setLocale(normalizeLocale(prefs.locale));
        if (["midnight", "graphite", "light"].includes(prefs.theme))
          setTheme(prefs.theme);
        if ([11, 12, 13, 14, 16, 18].includes(prefs.fontSize))
          setFontSize(prefs.fontSize);
        if (typeof prefs.wrap === "boolean") setWrap(prefs.wrap);
      } catch {
        notify("Yerel kayıt okunamadı. Editörü kullanmaya devam edebilirsin.");
      }
      setReady(true);
      run();
    });
    return () => {
      cancelled = true;
    };
  }, [notify, run]);
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORE, JSON.stringify({ project, name }));
        setSaved("Bu tarayıcıya kaydedildi");
      } catch {
        setSaved("Yerel kayıt kullanılamıyor");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [project, name, ready]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        PREFS,
        JSON.stringify({ theme, fontSize, wrap, locale }),
      );
    } catch {
      /* Editing remains available. */
    }
  }, [theme, fontSize, wrap, locale, ready]);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title =
      locale === "en"
        ? "TLK HTML Viewer — From idea to canvas"
        : "TLK HTML Viewer — Fikirden ekrana";
  }, [locale]);
  useEffect(() => {
    if (!ready || !auto) return;
    const timer = setTimeout(run, 650);
    return () => clearTimeout(timer);
  }, [project, auto, ready, run]);
  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (
        e.source !== frame.current?.contentWindow ||
        !e.data ||
        e.data.source !== "tlk-viewer" ||
        e.data.token !== rendered.token
      )
        return;
      if (
        !["log", "info", "warn", "error"].includes(e.data.level) ||
        typeof e.data.text !== "string"
      )
        return;
      setLogs((previous) => [
        ...previous.slice(-199),
        {
          level: e.data.level,
          text: e.data.text.slice(0, 4000),
          time: Date.now(),
        },
      ]);
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [rendered.token]);
  const exportHtml = useCallback(() => {
    download(
      composeDocument(projectRef.current),
      `${name.replace(/[^\p{L}\p{N}_-]/gu, "-") || "untitled"}.html`,
      "text/html;charset=utf-8",
    );
    notify("HTML dosyası indirildi.");
  }, [name, notify]);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        run();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        exportHtml();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [run, exportHtml]);
  useEffect(() => {
    const listener = (e: BeforeUnloadEvent) => {
      if (saved !== "Bu tarayıcıya kaydedildi") {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", listener);
    return () => window.removeEventListener("beforeunload", listener);
  }, [saved]);
  async function openFile(file?: File) {
    if (!file || importing.current) return;
    if (file.size > MAX_FILE_SIZE)
      return notify("Dosya sınırı 2 MB. Daha küçük bir dosya seç.");
    if (!/\.(html?|json)$/i.test(file.name))
      return notify("Bir .html, .htm veya proje .json dosyası seç.");
    if (
      !confirm(
        translate(
          "Açılan dosya mevcut çalışmanın yerini alacak. Devam edilsin mi?",
        ),
      )
    )
      return;
    importing.current = true;
    try {
      const text = await file.text();
      const next = /\.json$/i.test(file.name)
        ? parseProject(JSON.parse(text).project)
        : { html: text, css: "", js: "" };
      if (!next) throw new Error(translate("Geçersiz proje dosyası."));
      setProject(next);
      projectRef.current = next;
      setName(file.name.replace(/\.(html?|json)$/i, ""));
      setTab("html");
      run();
      notify("Dosya açıldı.");
    } catch {
      notify("Dosya açılamadı. Proje biçimini kontrol et.");
    } finally {
      importing.current = false;
    }
  }
  function loadTemplate(index: number) {
    if (
      !confirm(
        translate("Şablon mevcut çalışmanın yerini alacak. Devam edilsin mi?"),
      )
    )
      return;
    const next = { ...templates[index].project };
    setProject(next);
    projectRef.current = next;
    setName("untitled");
    setTab("html");
    run();
    library.current?.close();
    notify("Yeni tuval hazır.");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(project[tab]);
      notify("Kod kopyalandı.");
    } catch {
      notify("Panoya erişilemedi. Editörde kodu seçip kopyalayabilirsin.");
    }
  }
  return (
    <div className={`studio theme-${theme}`}>
      <a className="skip-link" href="#code-panel">
        {" "}
        {translate("Editöre geç")}{" "}
      </a>
      <header className="topbar">
        <button
          className="brand"
          onClick={() => window.scrollTo({ top: 0 })}
          aria-label={translate("TLK HTML Viewer, başa dön")}
        >
          <span className="brand-icon">
            <Code2 size={21} />
          </span>
          <span>
            TLK <b>Viewer</b>
          </span>
          <span className="beta">STUDIO</span>
        </button>
        <div className="top-center">
          <span className="status-dot" />{" "}
          {translate("Kendi alanın. Sonsuz olasılık.")}{" "}
        </div>
        <div className="top-actions">
          <div
            className="language-switch"
            role="group"
            aria-label={translate("Arayüz dili")}
          >
            <button
              lang="tr"
              aria-label="Türkçe"
              aria-pressed={locale === "tr"}
              onClick={() => setLocale("tr")}
            >
              TR
            </button>
            <button
              lang="en"
              aria-label="English"
              aria-pressed={locale === "en"}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
          </div>
          <a
            className="icon-button github"
            href="https://github.com/Talkdedsec/tlk-html-viewer"
            target="_blank"
            rel="noreferrer"
            aria-label={translate("GitHub deposu")}
          >
            <CodeXml size={18} />
          </a>
          {
            <IconButton
              label={translate("Klavye kısayolları")}
              onClick={() => help.current?.showModal()}
              icon={<Keyboard size={18} />}
            />
          }
          {
            <IconButton
              label={translate("Çalışma alanı ayarları")}
              onClick={() => settings.current?.showModal()}
              icon={<Settings2 size={18} />}
            />
          }
          <button
            className="primary small"
            onClick={exportHtml}
            aria-label={translate("HTML indir")}
          >
            <Download size={15} />
            <span>{translate("HTML indir")}</span>
          </button>
        </div>
      </header>
      <main className="main">
        <section className="intro">
          <div>
            <div className="eyebrow">
              <span /> {translate("TARAYICIDAKİ YARATICI ALANIN")}{" "}
            </div>
            <h1>
              {" "}
              {translate("Fikirden")} <span>{translate("ekrana.")}</span>
            </h1>
            <p>{translate("Yaz, dene, keşfet. Kodun anında hayat bulsun.")}</p>
          </div>
          <button
            className="template-callout"
            aria-label={translate("Bir fikirle başla")}
            onClick={() => library.current?.showModal()}
          >
            <span className="template-icon">
              <Sparkles size={19} />
            </span>
            <span>
              <b>{translate("Bir fikirle başla")}</b>
              <small>{translate("Hazır tuvalleri keşfet")}</small>
            </span>
            <span className="arrow">↗</span>
          </button>
        </section>
        <section
          className="workbench"
          aria-label={translate("HTML çalışma alanı")}
          onDragOver={(e) => {
            if (e.dataTransfer.types.includes("Files")) e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            void openFile(e.dataTransfer.files[0]);
          }}
        >
          <div className="project-toolbar">
            <div className="project-title">
              <FileCode2 size={17} />
              <input
                aria-label={translate("Proje adı")}
                value={name}
                maxLength={80}
                onChange={(e) => {
                  setSaved("Kaydediliyor…");
                  setName(e.target.value);
                }}
              />
              <span className="extension">.html</span>
              <span className="toolbar-divider" />
              <span className="save-status">
                <Check size={12} />
                {translate(saved)}
              </span>
            </div>
            <div className="project-actions">
              <button
                className="text-button"
                aria-label={translate("Dosya aç")}
                onClick={() => fileInput.current?.click()}
              >
                <Upload size={14} />
                <span>{translate("Dosya aç")}</span>
              </button>
              <button
                className="text-button"
                aria-label={translate("Proje kaydet")}
                onClick={() => {
                  download(
                    JSON.stringify({ version: 1, name, project }, null, 2),
                    `${name.replace(/[^\p{L}\p{N}_-]/gu, "-") || "untitled"}.json`,
                    "application/json",
                  );
                  notify("Düzenlenebilir proje indirildi.");
                }}
              >
                <Save size={14} />
                <span>{translate("Proje kaydet")}</span>
              </button>
              <span className="toolbar-divider" />
              <div
                className="layout-switch"
                aria-label={translate("Panel düzeni")}
              >
                {
                  <IconButton
                    label={translate("Yan yana")}
                    onClick={() => setLayout("split")}
                    icon={<Columns2 size={16} />}
                    active={layout === "split"}
                  />
                }
                {
                  <IconButton
                    label={translate("Alt alta")}
                    onClick={() => setLayout("stack")}
                    icon={<Rows2 size={16} />}
                    active={layout === "stack"}
                  />
                }
                {
                  <IconButton
                    label={translate("Yalnızca kod")}
                    onClick={() => setLayout("code")}
                    icon={<PanelLeft size={16} />}
                    active={layout === "code"}
                  />
                }
                {
                  <IconButton
                    label={translate("Yalnızca önizleme")}
                    onClick={() => setLayout("preview")}
                    icon={<Eye size={16} />}
                    active={layout === "preview"}
                  />
                }
              </div>
            </div>
          </div>
          <div className="mobile-tabs">
            <button
              className={mobile === "code" ? "selected" : ""}
              onClick={() => setMobile("code")}
            >
              <Code2 size={15} /> {translate("Kod")}{" "}
            </button>
            <button
              className={mobile === "preview" ? "selected" : ""}
              onClick={() => setMobile("preview")}
            >
              <Eye size={15} /> {translate("Önizleme")}{" "}
            </button>
          </div>
          <div className={`panels layout-${layout} mobile-${mobile}`}>
            <section
              className="code-panel"
              id="code-panel"
              aria-label={translate("Kod editörü")}
            >
              <div className="panel-toolbar">
                <div
                  className="file-tabs"
                  role="tablist"
                  aria-label={translate("Kod dili")}
                >
                  {(["html", "css", "js"] as const).map((language, i) => (
                    <button
                      key={language}
                      id={`tab-${language}`}
                      role="tab"
                      aria-selected={tab === language}
                      aria-controls="editor-pane"
                      tabIndex={tab === language ? 0 : -1}
                      onKeyDown={(e) => {
                        if (
                          ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                            e.key,
                          )
                        ) {
                          e.preventDefault();
                          const all = ["html", "css", "js"] as const;
                          const next =
                            e.key === "Home"
                              ? 0
                              : e.key === "End"
                                ? 2
                                : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                          setTab(all[next]);
                          document.getElementById(`tab-${all[next]}`)?.focus();
                        }
                      }}
                      onClick={() => setTab(language)}
                      className={tab === language ? "selected" : ""}
                    >
                      <span className={`file-symbol ${language}`}>
                        {language === "html"
                          ? "< >"
                          : language === "css"
                            ? "#"
                            : "JS"}
                      </span>
                      {language === "html"
                        ? "index.html"
                        : language === "css"
                          ? "style.css"
                          : "script.js"}
                      {tab === language && <span className="tab-dot" />}
                    </button>
                  ))}
                </div>
                {
                  <IconButton
                    label={translate("Bu dosyanın kodunu kopyala")}
                    onClick={copy}
                    icon={<Copy size={14} />}
                  />
                }
              </div>
              <div
                className="editor-container"
                id="editor-pane"
                role="tabpanel"
                aria-labelledby={`tab-${tab}`}
              >
                <Suspense
                  fallback={
                    <div className="editor-loading">
                      {translate("Editör hazırlanıyor…")}
                    </div>
                  }
                >
                  {ready &&
                    (["html", "css", "js"] as const).map((language) => (
                      <div key={language} hidden={language !== tab}>
                        <Editor
                          value={project[language]}
                          language={language}
                          locale={locale}
                          onChange={(value) => {
                            setSaved("Kaydediliyor…");
                            setProject((p) => ({ ...p, [language]: value }));
                          }}
                          light={theme === "light"}
                          fontSize={fontSize}
                          wrap={wrap}
                        />
                      </div>
                    ))}
                </Suspense>
              </div>
              <div className="editor-bottom">
                <span>
                  {formatCount(locale, "line", project[tab].split("\n").length)}{" "}
                  <i>·</i>{" "}
                  {formatCount(locale, "character", project[tab].length)}
                </span>
                <span>
                  UTF-8 <i>·</i> {tab.toUpperCase()}
                </span>
              </div>
            </section>
            <section
              className="preview-panel"
              aria-label={translate("Canlı önizleme")}
              ref={preview}
            >
              <div className="panel-toolbar preview-toolbar">
                <div className="preview-label">
                  <span className="status-dot" /> <b>{translate("Önizleme")}</b>
                </div>
                <div className="device-switch">
                  {
                    <IconButton
                      label={translate("Esnek masaüstü görünümü")}
                      onClick={() => setViewport("100%")}
                      icon={<Monitor size={15} />}
                      active={viewport === "100%"}
                    />
                  }
                  {
                    <IconButton
                      label={translate("Tablet: 768 piksel")}
                      onClick={() => setViewport("768")}
                      icon={<Tablet size={15} />}
                      active={viewport === "768"}
                    />
                  }
                  {
                    <IconButton
                      label={translate("Telefon: 375 piksel")}
                      onClick={() => setViewport("375")}
                      icon={<Smartphone size={15} />}
                      active={viewport === "375"}
                    />
                  }
                </div>
                <div className="preview-tools">
                  {
                    <IconButton
                      label={translate("Önizlemeyi yenile")}
                      onClick={run}
                      icon={<RotateCw size={14} />}
                    />
                  }
                  {
                    <IconButton
                      label={translate("Önizlemeyi tam ekran aç")}
                      onClick={() => {
                        if (preview.current?.requestFullscreen)
                          preview.current
                            .requestFullscreen()
                            .catch(() => notify("Tam ekran kullanılamıyor."));
                        else notify("Bu tarayıcı tam ekranı desteklemiyor.");
                      }}
                      icon={<Maximize2 size={14} />}
                    />
                  }
                </div>
              </div>
              <div className="preview-canvas">
                <div
                  className={`device-frame ${viewport === "100%" ? "fluid" : "fixed"}`}
                  style={{
                    width: viewport === "100%" ? "100%" : `${viewport}px`,
                  }}
                >
                  <div className="browser-bar">
                    <span />
                    <span />
                    <span />
                    <div>{name || "untitled"}.html</div>
                    <ShieldCheck size={12} />
                  </div>
                  <iframe
                    key={`${rendered.key}-${scripts}`}
                    ref={frame}
                    title={translate("HTML canlı önizleme")}
                    sandbox={scripts ? "allow-scripts" : ""}
                    referrerPolicy="no-referrer"
                    srcDoc={rendered.html}
                  />
                </div>
              </div>
              <div className="preview-bottom">
                <span>
                  <ShieldCheck size={12} />{" "}
                  {translate("Ayrı önizleme alanı")}{" "}
                </span>
                <span>
                  {viewport === "100%"
                    ? translate("Esnek genişlik")
                    : `${viewport} px`}{" "}
                  <i>·</i>{" "}
                  {scripts
                    ? translate("JavaScript açık")
                    : translate("JavaScript kapalı")}
                </span>
              </div>
            </section>
          </div>
          <div className="execution-bar">
            <button
              className={`console-toggle ${consoleOpen ? "selected" : ""}`}
              onClick={() => setConsoleOpen((v) => !v)}
              aria-expanded={consoleOpen}
            >
              <Terminal size={15} /> {translate("Konsol")}{" "}
              <span
                className={
                  logs.some((l) => l.level === "error")
                    ? "error-count"
                    : "log-count"
                }
              >
                {logs.length}
              </span>
              <ChevronDown className={consoleOpen ? "rotate" : ""} size={13} />
            </button>
            <div className="run-controls">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={auto}
                  onChange={(e) => setAuto(e.target.checked)}
                />
                <span className="toggle" />{" "}
                {translate("Otomatik çalıştır")}{" "}
              </label>
              <button className="primary run" onClick={run}>
                <Play size={13} fill="currentColor" /> {translate("Çalıştır")}{" "}
                <kbd>Ctrl ↵</kbd>
              </button>
            </div>
          </div>
          {consoleOpen && (
            <section
              className="console-panel"
              aria-label={translate("JavaScript konsolu")}
            >
              <div className="console-heading">
                <span>
                  {" "}
                  {translate("Çıktı ve hatalar")}{" "}
                  <small>{translate("Son 200 kayıt")}</small>
                </span>
                {
                  <IconButton
                    label={translate("Konsolu temizle")}
                    onClick={() => setLogs([])}
                    icon={<Trash2 size={14} />}
                  />
                }
              </div>
              <div className="console-output">
                {logs.length ? (
                  logs.map((log, i) => (
                    <div className={`console-line ${log.level}`} key={i}>
                      <time>
                        {new Date(log.time).toLocaleTimeString(
                          locale === "tr" ? "tr-TR" : "en-US",
                        )}
                      </time>
                      <b>{log.level}</b>
                      <pre>{log.text}</pre>
                    </div>
                  ))
                ) : (
                  <p>
                    {" "}
                    {translate(
                      "Henüz bir çıktı yok. JavaScript’te console.log() ile başla.",
                    )}{" "}
                  </p>
                )}
              </div>
            </section>
          )}
        </section>
        <footer className="footer">
          <span>
            <span className="status-dot" />{" "}
            {translate("Çalışman bu tarayıcıda saklanır.")}{" "}
          </span>
          <span>
            <kbd>Ctrl S</kbd> {translate("HTML indir")} <i>·</i>{" "}
            <kbd>Ctrl F</kbd> {translate("Editörde ara")}{" "}
            <button onClick={() => help.current?.showModal()}>
              {" "}
              {translate("Tüm kısayollar ↗")}{" "}
            </button>
          </span>
        </footer>
      </main>
      <input
        ref={fileInput}
        type="file"
        accept=".html,.htm,.json"
        className="hidden"
        onChange={(e) => {
          void openFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <dialog
        ref={settings}
        className="dialog"
        aria-label={translate("Çalışma alanı ayarları")}
      >
        <div className="dialog-title">
          <div>
            <span className="eyebrow">{translate("SANA GÖRE BİR ALAN")}</span>
            <h2>{translate("Çalışma alanı ayarları")}</h2>
          </div>
          <button
            className="icon-button"
            onClick={() => settings.current?.close()}
            aria-label={translate("Ayarları kapat")}
          >
            <X size={20} />
          </button>
        </div>
        <p className="dialog-subtitle">
          {" "}
          {translate("Rengini, ritmini, çalışma şeklini seç.")}{" "}
        </p>
        <h3>{translate("Görünüm")}</h3>
        <div className="theme-options">
          {(
            [
              { id: "midnight", name: "Gece", color: "#14151e" },
              { id: "graphite", name: "Grafit", color: "#222425" },
              { id: "light", name: "Gün ışığı", color: "#f3f2f8" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              className={theme === t.id ? "selected" : ""}
              onClick={() => setTheme(t.id)}
              aria-pressed={theme === t.id}
            >
              <span style={{ background: t.color }}>
                <span />
                <span />
                <span />
              </span>
              <b>{translate(t.name)}</b>
              {theme === t.id && <Check size={14} />}
            </button>
          ))}
        </div>
        <div className="setting-row">
          <label htmlFor="font-size">
            {" "}
            {translate("Editör yazı boyutu")}
            <small>{translate("Rahat okuma için ayarla.")}</small>
          </label>
          <select
            id="font-size"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          >
            {[11, 12, 13, 14, 16, 18].map((n) => (
              <option key={n} value={n}>
                {n} px
              </option>
            ))}
          </select>
        </div>
        <div className="setting-row">
          <label htmlFor="wrap">
            {" "}
            {translate("Uzun satırları kaydır")}
            <small>{translate("Yatay kaydırmadan kodunu gör.")}</small>
          </label>
          <input
            id="wrap"
            type="checkbox"
            checked={wrap}
            onChange={(e) => setWrap(e.target.checked)}
          />
        </div>
        <div className="setting-row">
          <label htmlFor="scripts">
            {" "}
            {translate("JavaScript’i çalıştır")}{" "}
            <small>{translate("Önizlemedeki betikleri etkinleştir.")}</small>
          </label>
          <input
            id="scripts"
            type="checkbox"
            checked={scripts}
            onChange={(e) => setScripts(e.target.checked)}
          />
        </div>
        <div className="settings-note">
          <ShieldCheck size={18} />
          <p>
            {" "}
            {translate(
              "Projeler bu cihazın tarayıcısında saklanır. Açtığın HTML’in dış bağlantıları ağ isteği yapabilir. Kalıcı bir kopya için projeni indir.",
            )}{" "}
          </p>
        </div>
        <button
          className="primary full"
          onClick={() => settings.current?.close()}
        >
          {" "}
          {translate("Tamam, devam edelim")} <Check size={15} />
        </button>
      </dialog>
      <dialog
        ref={library}
        className="dialog template-dialog"
        aria-label={translate("Bir fikirle başla")}
      >
        <div className="dialog-title">
          <div>
            <span className="eyebrow">{translate("KÜÇÜK BİR BAŞLANGIÇ")}</span>
            <h2>{translate("Sıradaki fikrin burada.")}</h2>
          </div>
          <button
            className="icon-button"
            onClick={() => library.current?.close()}
            aria-label={translate("Şablonları kapat")}
          >
            <X size={20} />
          </button>
        </div>
        <p className="dialog-subtitle">
          {" "}
          {translate("Bir tuval seç, gerisini hayal gücüne bırak.")}{" "}
        </p>
        <div className="template-grid">
          {templates.map((t, i) => (
            <button
              className="template-card"
              key={t.name}
              onClick={() => loadTemplate(i)}
            >
              <div className={`template-art ${t.color}`}>
                {i === 0 ? (
                  <>
                    <small>{translate("A LITTLE IDEA.")}</small>
                    <strong>
                      {" "}
                      {translate("Make")} <br />
                      <em>{translate("something.")}</em>
                    </strong>
                  </>
                ) : i === 1 ? (
                  <>
                    <span className="orb" />
                    <strong>{translate("Stay curious.")}</strong>
                  </>
                ) : (
                  <Plus size={40} />
                )}
              </div>
              <b>
                {translate(t.name)}
                <span>↗</span>
              </b>
              <small>{translate(t.caption)}</small>
            </button>
          ))}
        </div>
        <p className="muted">
          {" "}
          {translate(
            "Şablon açmak mevcut çalışmanın yerini alır. Önce “Proje kaydet” ile kopyasını indirebilirsin.",
          )}{" "}
        </p>
      </dialog>
      <dialog
        ref={help}
        className="dialog"
        aria-label={translate("Klavye kısayolları")}
      >
        <div className="dialog-title">
          <h2>{translate("Akışını bozmadan.")}</h2>
          <button
            className="icon-button"
            onClick={() => help.current?.close()}
            aria-label={translate("Kısayolları kapat")}
          >
            <X size={20} />
          </button>
        </div>
        <p className="dialog-subtitle">
          {translate("Mac’te Ctrl yerine ⌘ kullanabilirsin.")}
        </p>
        {[
          ["Ctrl + Enter", translate("Önizlemeyi çalıştır")],
          ["Ctrl + S", translate("HTML dosyasını indir")],
          ["Ctrl + F", translate("Editörde ara ve değiştir")],
          ["Ctrl + Z", translate("Son düzenlemeyi geri al")],
          ["Tab", translate("Kodu girintile")],
          ["Esc", translate("Açık pencereyi kapat")],
        ].map(([key, label]) => (
          <div className="shortcut-row" key={key}>
            <span>{label}</span>
            <kbd>{key}</kbd>
          </div>
        ))}
        <div className="settings-note">
          <FolderOpen size={18} />
          <p>
            {" "}
            {translate(
              ".html veya proje .json dosyanı çalışma alanına sürükleyebilirsin. Dosya sınırı 2 MB; yerel resimler ve ayrı dosyalar otomatik yüklenmez.",
            )}{" "}
          </p>
        </div>
      </dialog>
      {notice && (
        <div className="toast" role="status">
          <Check size={16} />
          {translate(notice)}
          <button
            aria-label={translate("Bildirimi kapat")}
            onClick={() => setNotice("")}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
