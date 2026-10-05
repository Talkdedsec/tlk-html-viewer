export type Locale = "en" | "tr";

// English source text is the message ID, as in gettext catalogs, and each
// entry holds its Turkish translation. A missing translation is a type error.
export const messages = {
  "Your first idea": "İlk fikrin",
  "A minimal starting point": "Minimal bir başlangıç",
  "Night card": "Gece kartı",
  "A little color, a little motion": "Biraz renk, biraz hareket",
  "Blank canvas": "Boş tuval",
  "Entirely yours": "Tamamen sana ait",
  "Getting ready": "Hazırlanıyor",
  "Local data could not be read. You can keep using the editor.":
    "Yerel kayıt okunamadı. Editörü kullanmaya devam edebilirsin.",
  "Saved in this browser": "Bu tarayıcıya kaydedildi",
  "Local saving unavailable": "Yerel kayıt kullanılamıyor",
  "Saving…": "Kaydediliyor…",
  "HTML file downloaded.": "HTML dosyası indirildi.",
  "The file limit is 2 MB. Choose a smaller file.":
    "Dosya sınırı 2 MB. Daha küçük bir dosya seç.",
  "Choose an .html, .htm or project .json file.":
    "Bir .html, .htm veya proje .json dosyası seç.",
  "Opening this file will replace your current work. Continue?":
    "Açılan dosya mevcut çalışmanın yerini alacak. Devam edilsin mi?",
  "Invalid project file.": "Geçersiz proje dosyası.",
  "File opened.": "Dosya açıldı.",
  "Could not open the file. Check its project format.":
    "Dosya açılamadı. Proje biçimini kontrol et.",
  "This template will replace your current work. Continue?":
    "Şablon mevcut çalışmanın yerini alacak. Devam edilsin mi?",
  "Your new canvas is ready.": "Yeni tuval hazır.",
  "Code copied.": "Kod kopyalandı.",
  "Clipboard unavailable. Select and copy the code in the editor.":
    "Panoya erişilemedi. Editörde kodu seçip kopyalayabilirsin.",
  "Skip to editor": "Editöre geç",
  "TLK HTML Viewer, back to top": "TLK HTML Viewer, başa dön",
  "Your space. Endless possibilities.": "Kendi alanın. Sonsuz olasılık.",
  "GitHub repository": "GitHub deposu",
  "Keyboard shortcuts": "Klavye kısayolları",
  "Workspace settings": "Çalışma alanı ayarları",
  "Download HTML": "HTML indir",
  "YOUR CREATIVE SPACE IN THE BROWSER": "TARAYICIDAKİ YARATICI ALANIN",
  "From idea to": "Fikirden",
  "canvas.": "ekrana.",
  "Write, experiment, explore. See your code come to life.":
    "Yaz, dene, keşfet. Kodun anında hayat bulsun.",
  "Start with an idea": "Bir fikirle başla",
  "Explore starter canvases": "Hazır tuvalleri keşfet",
  "HTML workspace": "HTML çalışma alanı",
  "Project name": "Proje adı",
  "Open file": "Dosya aç",
  "Editable project downloaded.": "Düzenlenebilir proje indirildi.",
  "Save project": "Proje kaydet",
  "Panel layout": "Panel düzeni",
  "Side by side": "Yan yana",
  Stacked: "Alt alta",
  "Code only": "Yalnızca kod",
  "Preview only": "Yalnızca önizleme",
  Code: "Kod",
  Preview: "Önizleme",
  "Code editor": "Kod editörü",
  "Code language": "Kod dili",
  "Copy this file’s code": "Bu dosyanın kodunu kopyala",
  "Loading the editor…": "Editör hazırlanıyor…",
  lines: "satır",
  characters: "karakter",
  "Live preview": "Canlı önizleme",
  "Flexible desktop viewport": "Esnek masaüstü görünümü",
  "Tablet: 768 pixels": "Tablet: 768 piksel",
  "Phone: 375 pixels": "Telefon: 375 piksel",
  "Refresh preview": "Önizlemeyi yenile",
  "Open preview in fullscreen": "Önizlemeyi tam ekran aç",
  "Fullscreen is unavailable.": "Tam ekran kullanılamıyor.",
  "This browser does not support fullscreen.":
    "Bu tarayıcı tam ekranı desteklemiyor.",
  "Live HTML preview": "HTML canlı önizleme",
  "Isolated preview": "Ayrı önizleme alanı",
  "Flexible width": "Esnek genişlik",
  "JavaScript enabled": "JavaScript açık",
  "JavaScript disabled": "JavaScript kapalı",
  Console: "Konsol",
  "Auto-run": "Otomatik çalıştır",
  Run: "Çalıştır",
  "JavaScript console": "JavaScript konsolu",
  "Output and errors": "Çıktı ve hatalar",
  "Last 200 entries": "Son 200 kayıt",
  "Clear console": "Konsolu temizle",
  "No output yet. Try console.log() in your JavaScript.":
    "Henüz bir çıktı yok. JavaScript’te console.log() ile başla.",
  "Your work stays in this browser.": "Çalışman bu tarayıcıda saklanır.",
  "Search editor": "Editörde ara",
  "All shortcuts ↗": "Tüm kısayollar ↗",
  "A SPACE THAT FITS YOU": "SANA GÖRE BİR ALAN",
  "Close settings": "Ayarları kapat",
  "Choose your colors, your rhythm, your workflow.":
    "Rengini, ritmini, çalışma şeklini seç.",
  Appearance: "Görünüm",
  Midnight: "Gece",
  Graphite: "Grafit",
  Daylight: "Gün ışığı",
  "Editor font size": "Editör yazı boyutu",
  "Adjust for comfortable reading.": "Rahat okuma için ayarla.",
  "Wrap long lines": "Uzun satırları kaydır",
  "Read your code without horizontal scrolling.":
    "Yatay kaydırmadan kodunu gör.",
  "Run JavaScript": "JavaScript’i çalıştır",
  "Enable scripts in the preview.": "Önizlemedeki betikleri etkinleştir.",
  "Projects are saved in this browser. External resources in your HTML can make network requests. Download your project to keep a backup.":
    "Projeler bu cihazın tarayıcısında saklanır. Açtığın HTML’in dış bağlantıları ağ isteği yapabilir. Kalıcı bir kopya için projeni indir.",
  "Done, let’s continue": "Tamam, devam edelim",
  "A SMALL START": "KÜÇÜK BİR BAŞLANGIÇ",
  "Your next idea starts here.": "Sıradaki fikrin burada.",
  "Close templates": "Şablonları kapat",
  "Choose a canvas. Let your imagination do the rest.":
    "Bir tuval seç, gerisini hayal gücüne bırak.",
  "Opening a template replaces your current work. Download a backup with “Save project” first.":
    "Şablon açmak mevcut çalışmanın yerini alır. Önce “Proje kaydet” ile kopyasını indirebilirsin.",
  "Stay in your flow.": "Akışını bozmadan.",
  "Close shortcuts": "Kısayolları kapat",
  "On a Mac, use ⌘ instead of Ctrl.": "Mac’te Ctrl yerine ⌘ kullanabilirsin.",
  "Run the preview": "Önizlemeyi çalıştır",
  "Download the HTML file": "HTML dosyasını indir",
  "Find and replace in the editor": "Editörde ara ve değiştir",
  "Undo the last edit": "Son düzenlemeyi geri al",
  "Indent code": "Kodu girintile",
  "Close the open dialog": "Açık pencereyi kapat",
  "Drag an .html or project .json file into the workspace. The file limit is 2 MB; local images and companion files are not loaded automatically.":
    ".html veya proje .json dosyanı çalışma alanına sürükleyebilirsin. Dosya sınırı 2 MB; yerel resimler ve ayrı dosyalar otomatik yüklenmez.",
  "Dismiss notification": "Bildirimi kapat",
  "Interface language": "Arayüz dili",
  "Download the offline app": "Çevrimdışı sürümü indir",
  "Your code is not uploaded.": "Kodun sunucuya yüklenmez.",
  "TLK HTML Viewer — From idea to canvas": "TLK HTML Viewer — Fikirden ekrana",
  // Template illustrations are translated; user source code never is.
  "A LITTLE IDEA.": "KÜÇÜK BİR FİKİR.",
  Make: "Bir şey",
  "something.": "üret.",
  "Stay curious.": "Merak et.",
} as const;

export type MessageKey = keyof typeof messages;

export function translate(locale: Locale, key: MessageKey): string {
  return locale === "tr" ? messages[key] : key;
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
