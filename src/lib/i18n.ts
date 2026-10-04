export type Locale = "tr" | "en";

// Turkish source messages are stable message IDs, as in gettext catalogs.
// Keeping a single catalog makes an untranslated English entry a type error.
export const messages = {
  "İlk fikrin": "Your first idea",
  "Minimal bir başlangıç": "A minimal starting point",
  "Gece kartı": "Night card",
  "Biraz renk, biraz hareket": "A little color, a little motion",
  "Boş tuval": "Blank canvas",
  "Tamamen sana ait": "Entirely yours",
  Hazırlanıyor: "Getting ready",
  "Yerel kayıt okunamadı. Editörü kullanmaya devam edebilirsin.":
    "Local data could not be read. You can keep using the editor.",
  "Bu tarayıcıya kaydedildi": "Saved in this browser",
  "Yerel kayıt kullanılamıyor": "Local saving unavailable",
  "Kaydediliyor…": "Saving…",
  "HTML dosyası indirildi.": "HTML file downloaded.",
  "Dosya sınırı 2 MB. Daha küçük bir dosya seç.":
    "The file limit is 2 MB. Choose a smaller file.",
  "Bir .html, .htm veya proje .json dosyası seç.":
    "Choose an .html, .htm or project .json file.",
  "Açılan dosya mevcut çalışmanın yerini alacak. Devam edilsin mi?":
    "Opening this file will replace your current work. Continue?",
  "Geçersiz proje dosyası.": "Invalid project file.",
  "Dosya açıldı.": "File opened.",
  "Dosya açılamadı. Proje biçimini kontrol et.":
    "Could not open the file. Check its project format.",
  "Şablon mevcut çalışmanın yerini alacak. Devam edilsin mi?":
    "This template will replace your current work. Continue?",
  "Yeni tuval hazır.": "Your new canvas is ready.",
  "Kod kopyalandı.": "Code copied.",
  "Panoya erişilemedi. Editörde kodu seçip kopyalayabilirsin.":
    "Clipboard unavailable. Select and copy the code in the editor.",
  "Editöre geç": "Skip to editor",
  "TLK HTML Viewer, başa dön": "TLK HTML Viewer, back to top",
  "Kendi alanın. Sonsuz olasılık.": "Your space. Endless possibilities.",
  "GitHub deposu": "GitHub repository",
  "Klavye kısayolları": "Keyboard shortcuts",
  "Çalışma alanı ayarları": "Workspace settings",
  "HTML indir": "Download HTML",
  "TARAYICIDAKİ YARATICI ALANIN": "YOUR CREATIVE SPACE IN THE BROWSER",
  Fikirden: "From idea to",
  "ekrana.": "canvas.",
  "Yaz, dene, keşfet. Kodun anında hayat bulsun.":
    "Write, experiment, explore. See your code come to life.",
  "Bir fikirle başla": "Start with an idea",
  "Hazır tuvalleri keşfet": "Explore starter canvases",
  "HTML çalışma alanı": "HTML workspace",
  "Proje adı": "Project name",
  "Dosya aç": "Open file",
  "Düzenlenebilir proje indirildi.": "Editable project downloaded.",
  "Proje kaydet": "Save project",
  "Panel düzeni": "Panel layout",
  "Yan yana": "Side by side",
  "Alt alta": "Stacked",
  "Yalnızca kod": "Code only",
  "Yalnızca önizleme": "Preview only",
  Kod: "Code",
  Önizleme: "Preview",
  "Kod editörü": "Code editor",
  "Kod dili": "Code language",
  "Bu dosyanın kodunu kopyala": "Copy this file’s code",
  "Editör hazırlanıyor…": "Loading the editor…",
  satır: "lines",
  karakter: "characters",
  "Canlı önizleme": "Live preview",
  "Esnek masaüstü görünümü": "Flexible desktop viewport",
  "Tablet: 768 piksel": "Tablet: 768 pixels",
  "Telefon: 375 piksel": "Phone: 375 pixels",
  "Önizlemeyi yenile": "Refresh preview",
  "Önizlemeyi tam ekran aç": "Open preview in fullscreen",
  "Tam ekran kullanılamıyor.": "Fullscreen is unavailable.",
  "Bu tarayıcı tam ekranı desteklemiyor.":
    "This browser does not support fullscreen.",
  "HTML canlı önizleme": "Live HTML preview",
  "Ayrı önizleme alanı": "Isolated preview",
  "Esnek genişlik": "Flexible width",
  "JavaScript açık": "JavaScript enabled",
  "JavaScript kapalı": "JavaScript disabled",
  Konsol: "Console",
  "Otomatik çalıştır": "Auto-run",
  Çalıştır: "Run",
  "JavaScript konsolu": "JavaScript console",
  "Çıktı ve hatalar": "Output and errors",
  "Son 200 kayıt": "Last 200 entries",
  "Konsolu temizle": "Clear console",
  "Henüz bir çıktı yok. JavaScript’te console.log() ile başla.":
    "No output yet. Try console.log() in your JavaScript.",
  "Çalışman bu tarayıcıda saklanır.": "Your work stays in this browser.",
  "Editörde ara": "Search editor",
  "Tüm kısayollar ↗": "All shortcuts ↗",
  "SANA GÖRE BİR ALAN": "A SPACE THAT FITS YOU",
  "Ayarları kapat": "Close settings",
  "Rengini, ritmini, çalışma şeklini seç.":
    "Choose your colors, your rhythm, your workflow.",
  Görünüm: "Appearance",
  Gece: "Midnight",
  Grafit: "Graphite",
  "Gün ışığı": "Daylight",
  "Editör yazı boyutu": "Editor font size",
  "Rahat okuma için ayarla.": "Adjust for comfortable reading.",
  "Uzun satırları kaydır": "Wrap long lines",
  "Yatay kaydırmadan kodunu gör.":
    "Read your code without horizontal scrolling.",
  "JavaScript’i çalıştır": "Run JavaScript",
  "Önizlemedeki betikleri etkinleştir.": "Enable scripts in the preview.",
  "Projeler bu cihazın tarayıcısında saklanır. Açtığın HTML’in dış bağlantıları ağ isteği yapabilir. Kalıcı bir kopya için projeni indir.":
    "Projects are saved in this browser. External resources in your HTML can make network requests. Download your project to keep a backup.",
  "Tamam, devam edelim": "Done, let’s continue",
  "KÜÇÜK BİR BAŞLANGIÇ": "A SMALL START",
  "Sıradaki fikrin burada.": "Your next idea starts here.",
  "Şablonları kapat": "Close templates",
  "Bir tuval seç, gerisini hayal gücüne bırak.":
    "Choose a canvas. Let your imagination do the rest.",
  "Şablon açmak mevcut çalışmanın yerini alır. Önce “Proje kaydet” ile kopyasını indirebilirsin.":
    "Opening a template replaces your current work. Download a backup with “Save project” first.",
  "Akışını bozmadan.": "Stay in your flow.",
  "Kısayolları kapat": "Close shortcuts",
  "Mac’te Ctrl yerine ⌘ kullanabilirsin.": "On a Mac, use ⌘ instead of Ctrl.",
  "Önizlemeyi çalıştır": "Run the preview",
  "HTML dosyasını indir": "Download the HTML file",
  "Editörde ara ve değiştir": "Find and replace in the editor",
  "Son düzenlemeyi geri al": "Undo the last edit",
  "Kodu girintile": "Indent code",
  "Açık pencereyi kapat": "Close the open dialog",
  ".html veya proje .json dosyanı çalışma alanına sürükleyebilirsin. Dosya sınırı 2 MB; yerel resimler ve ayrı dosyalar otomatik yüklenmez.":
    "Drag an .html or project .json file into the workspace. The file limit is 2 MB; local images and companion files are not loaded automatically.",
  "Bildirimi kapat": "Dismiss notification",
  "Arayüz dili": "Interface language",
  "Çevrimdışı sürümü indir": "Download the offline app",
  "Kodun sunucuya yüklenmez.": "Your code is not uploaded.",
  "A LITTLE IDEA.": "A LITTLE IDEA.",
  Make: "Make",
  "something.": "something.",
  "Stay curious.": "Stay curious.",
} as const;

export type MessageKey = keyof typeof messages;

// Template illustrations are translated; user source code is never translated.
const turkishOverrides: Partial<Record<MessageKey, string>> = {
  "A LITTLE IDEA.": "KÜÇÜK BİR FİKİR.",
  Make: "Bir şey",
  "something.": "üret.",
  "Stay curious.": "Merak et.",
};

export function translate(locale: Locale, key: MessageKey): string {
  return locale === "en" ? messages[key] : (turkishOverrides[key] ?? key);
}

export function normalizeLocale(value: unknown): Locale {
  return value === "en" ? "en" : "tr";
}

export const editorPhrases: Record<string, string> = {
  Find: "Bul",
  Replace: "Değiştir",
  next: "sonraki",
  previous: "önceki",
  all: "tümü",
  "match case": "büyük/küçük harf",
  regexp: "düzenli ifade",
  "by word": "tam kelime",
  replace: "değiştir",
  "replace all": "tümünü değiştir",
  close: "kapat",
  "Go to line": "Satıra git",
  go: "git",
  "fold line": "satırı katla",
  "unfold line": "satırı aç",
  "folded code": "katlanmış kod",
  unfold: "aç",
  "Control character": "Kontrol karakteri",
  "No diagnostics": "Tanılama yok",
  Completions: "Tamamlamalar",
  "replaced match on line $": "$. satırdaki eşleşme değiştirildi",
  "replaced $ matches": "$ eşleşme değiştirildi",
  "current match": "geçerli eşleşme",
  "on line": "satır",
};

export function formatCount(
  locale: Locale,
  unit: "line" | "character",
  count: number,
): string {
  const number = count.toLocaleString(locale === "tr" ? "tr-TR" : "en-US");
  if (locale === "tr")
    return `${number} ${unit === "line" ? "satır" : "karakter"}`;
  return `${number} ${unit}${count === 1 ? "" : "s"}`;
}
