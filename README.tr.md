<div align="center">

# TLK HTML Viewer

**Fikirden ekrana. Kurulum yok. Üyelik yok.**

[**Hemen kullan ↗**](https://talkdedsec.github.io/tlk-html-viewer/) · [Çevrimdışı indir](https://github.com/Talkdedsec/tlk-html-viewer/releases/latest) · [Kullanım rehberi](docs/USAGE.tr.md) · [English](README.md)

[![Quality](https://github.com/Talkdedsec/tlk-html-viewer/actions/workflows/ci.yml/badge.svg)](https://github.com/Talkdedsec/tlk-html-viewer/actions/workflows/ci.yml)
[![Website](https://github.com/Talkdedsec/tlk-html-viewer/actions/workflows/pages.yml/badge.svg)](https://github.com/Talkdedsec/tlk-html-viewer/actions/workflows/pages.yml)
[![MIT](https://img.shields.io/badge/license-MIT-b8a2f7)](LICENSE)

![TLK HTML Viewer tanıtım görseli](public/og.png)

</div>

HTML, CSS ve JavaScript yazmak, mevcut HTML dosyalarını açmak ve sonucu anında görmek için tarayıcıda çalışan bir çalışma alanı. Varsayılan koyu tema, üç görünüm seçeneği ve gelişmiş kod editörüyle gelir. Üst çubuktan **TR/EN** arasında geçebilirsin; seçimin hatırlanır, yazdığın kod değişmez. Dosyalar uygulama tarafından sunucuya gönderilmez.

## 10 saniyede başla

1. [Web uygulamasını aç](https://talkdedsec.github.io/tlk-html-viewer/).
2. Kodunu yapıştır veya **Dosya aç** ile bir HTML seç.
3. Önizlemeyi gör; **HTML indir** ile sonucunu al.

Sadece kullanmak için GitHub hesabı, terminal, Node.js veya paket kurulumu gerekmez.

## Neler var?

| Alan           | Özellikler                                                             |
| -------------- | ---------------------------------------------------------------------- |
| Editör         | Renklendirme, otomatik tamamlama, arama/değiştirme, katlama, geri alma |
| Önizleme       | Otomatik veya manuel çalıştırma; konsol ve hata çıktıları              |
| Düzen          | Yan yana, alt alta, yalnız kod, yalnız önizleme; mobil sekmeler        |
| Görünüm        | Gece, Grafit, Gün ışığı; yazı boyutu ve satır kaydırma                 |
| Cihaz          | Esnek masaüstü, 768 px tablet, 375 px telefon, tam ekran               |
| Dosyalar       | HTML/JSON açma, sürükle-bırak, HTML dışa aktarma ve proje yedeği       |
| Gizlilik       | Yerel tarayıcı kaydı; üyelik ve uygulama kaynaklı kod yüklemesi yok    |
| Taşınabilirlik | Aynı arayüzün tek HTML dosyalık çevrimdışı sürümü                      |

## Online veya çevrimdışı

**Online:** [Linki aç ve kullan](https://talkdedsec.github.io/tlk-html-viewer/).

**Çevrimdışı:** [Son sürümden](https://github.com/Talkdedsec/tlk-html-viewer/releases/latest) `tlk-html-viewer.html` indir, çift tıkla. Uygulamanın editörü dosyanın içindedir; harici paket gerekmez. İnternetteki resim/font/betikleri kullanan kendi HTML’in hâlâ o kaynaklara erişmek ister.

## Bilmen gerekenler

Dosya sınırı 2 MB. Yerel yan dosyalar, npm paketleri ve sunucu kodu otomatik çözülmez. Önizleme iframe’i ana uygulamadan ayrıdır; popup ve form gönderme gibi bazı işlemler kapalıdır. Sandbox sonsuz döngüleri veya HTML’in harici ağ isteklerini engellemez. Çalışmanı kalıcı korumak için JSON yedeğini indir.

[Kullanım ve sorun giderme](docs/USAGE.tr.md) · [Güvenlik modeli](SECURITY.md) · [Mimari](docs/ARCHITECTURE.md)

## Geliştirme

Yalnızca projeye katkı verecekler için Node.js 24 gerekir:

```sh
git clone https://github.com/Talkdedsec/tlk-html-viewer.git
cd tlk-html-viewer
npm ci
npm run dev
```

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:build
```

`npm run build`, tüm çalışma alanını esbuild ile tek bir dosyaya, `release/tlk-html-viewer.html` dosyasına paketler. GitHub Pages bu dosyayı yayınlar, sürüm de aynı dosyayı dağıtır.

Testler belge üretimini, içe aktarma doğrulamasını, tek dosyalık dağıtımı ve önizleme sandbox'ını denetler. Bu kontroller kapsamlı tarayıcı/erişilebilirlik denetimi anlamına gelmez.

## Katkı

[Hata bildir veya fikir öner](https://github.com/Talkdedsec/tlk-html-viewer/issues/new/choose). Değişiklik göndermeden önce [katkı rehberini](CONTRIBUTING.md) oku. Geçmiş sürümler [CHANGELOG.md](CHANGELOG.md) dosyasında.

MIT © 2026 Talkdedsec.
