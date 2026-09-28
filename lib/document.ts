export type Project = { html: string; css: string; js: string };
export const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const starter: Project = {
  html: `<main class="card">
  <span class="eyebrow">A LITTLE IDEA. A LIVE CANVAS.</span>
  <h1>Make something<br><em>worth seeing.</em></h1>
  <p>Your next idea starts here. Change the code,<br>and watch it come to life.</p>
  <button id="hello">Let's make it happen <span>↗</span></button>
  <div class="note"><span class="dot"></span> Made with curiosity, in your browser.</div>
</main>`,
  css: `* { box-sizing: border-box; }
body {
  margin: 0; min-height: 100vh; display: grid;
  place-items: center; padding: 32px;
  background: #f4f1e9; color: #24352d;
  font-family: system-ui, sans-serif;
}
.card { width: 100%; max-width: 540px; }
.eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 2px; }
h1 { font-size: clamp(36px, 7vw, 64px); line-height: 1.1; letter-spacing: -3px; margin: 30px 0 20px; }
h1 em { font-family: Georgia, serif; font-weight: 400; color: #729074; }
p { color: #6a7268; font-size: 14px; line-height: 1.8; }
button { margin-top: 20px; background: #263e30; color: #fff; border: 0; border-radius: 8px; padding: 16px 22px; cursor: pointer; }
button span { margin-left: 20px; }
button:hover { background: #3b5945; }
.note { margin-top: 50px; font-size: 10px; color: #7a8378; }
.dot { display: inline-block; width: 6px; height: 6px; background: #799975; border-radius: 50%; margin-right: 6px; }`,
  js: `const button = document.querySelector('#hello');

button?.addEventListener('click', () => {
  button.textContent = 'You made it happen. ✓';
  console.log('Hello from your live canvas!');
});

console.log('Your canvas is ready.');`,
};

// These boundaries prevent an added CSS/JS panel from terminating its own tag.
export function composeDocument(project: Project): string {
  const style = `<style>${project.css.replace(/<\/style/gi, (match) => match.replace("/", "\\/"))}</style>`;
  const script = `<script>${project.js.replace(/<\/script/gi, (match) => match.replace("/", "\\/"))}</script>`;
  let html = project.html;
  if (!/<html[\s>]/i.test(html)) {
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${style}</head><body>${html}${script}</body></html>`;
  }
  html = /<\/head\s*>/i.test(html)
    ? html.replace(/<\/head\s*>/i, () => `${style}</head>`)
    : html.replace(
        /<html\b[^>]*>/i,
        (match) => `${match}<head>${style}</head>`,
      );
  return /<\/body\s*>/i.test(html)
    ? html.replace(/<\/body\s*>/i, () => `${script}</body>`)
    : html + script;
}

export function previewDocument(project: Project, token: string): string {
  const bridge = `<script>(()=>{const token=${JSON.stringify(token).replace(/</g, "\\u003c")};const send=(level,args)=>{try{parent.postMessage({source:'tlk-viewer',token,level,text:args.map(x=>{try{return typeof x==='string'?x:JSON.stringify(x)}catch{return String(x)}}).join(' ').slice(0,4000)},'*')}catch{}};for(const level of ['log','info','warn','error']){const original=console[level];console[level]=(...args)=>{send(level,args);original.apply(console,args)}}addEventListener('error',e=>send('error',[e.message]));addEventListener('unhandledrejection',e=>send('error',[String(e.reason)]));})();</script>`;
  const html = composeDocument(project);
  return html.replace(/<head\b[^>]*>/i, (match) => match + bridge);
}

export function parseProject(value: unknown): Project | null {
  if (!value || typeof value !== "object") return null;
  const p = value as Partial<Project>;
  if (
    typeof p.html !== "string" ||
    typeof p.css !== "string" ||
    typeof p.js !== "string"
  )
    return null;
  if (p.html.length + p.css.length + p.js.length > MAX_FILE_SIZE) return null;
  return { html: p.html, css: p.css, js: p.js };
}
