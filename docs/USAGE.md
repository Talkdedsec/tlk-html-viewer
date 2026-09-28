# Kullanım rehberi

## Hiçbir şey kurmadan başla

1. [TLK HTML Viewer’ı aç](https://talkdedsec.github.io/tlk-html-viewer/).
2. HTML, CSS veya JS sekmesindeki kodu değiştir.
3. Otomatik çalıştır açıksa sonuç 650 ms sonra önizlemede görünür. Kapalıysa **Çalıştır** düğmesini kullan.

Hesap açman, GitHub’a giriş yapman veya dosyanı bir sunucuya yüklemen gerekmez. “Dosya aç” yerel dosyanı tarayıcının File API’siyle okur.

## Mevcut HTML’i görüntüle

**Dosya aç** ile `.html` veya `.htm` seçebilir, dosyayı çalışma alanına sürükleyebilir ya da kodunu HTML sekmesine yapıştırabilirsin. Boyut sınırı 2 MB’dir. Tam HTML belgeleri HTML paneline olduğu gibi alınır; ek CSS ve JS panelleri temizlenir. Dosya seçmek mevcut çalışmanın yerini alacağından önce onay istenir.

Bir dosyanın yanında bulunan resim veya CSS dosyaları otomatik alınmaz. Taşınabilir bir belge için stilleri ve betikleri belgenin içine yerleştir; resimleri data URL olarak gömebilirsin. İnternetteki kaynaklara giden bağlantılar yalnızca erişim varsa çalışır.

## Görünümü kendine göre ayarla

- Ayarlar: Gece, Grafit veya Gün ışığı teması; yazı boyutu; satır kaydırma; önizlemede JavaScript.
- Düzen düğmeleri: yan yana, alt alta, yalnız kod veya yalnız önizleme.
- Cihaz düğmeleri: esnek masaüstü, 768 px tablet, 375 px telefon.
- Tam ekran: önizleme alanını büyütür. Çıkmak için Esc kullan.
- Telefonda: Kod ve Önizleme sekmeleri arasında geç.

Cihaz seçenekleri iframe genişliğini değiştirir; gerçek bir cihazın işletim sistemi veya tarayıcısını taklit etmez.

## Çalışmanı koru

**HTML indir**, HTML/CSS/JS panellerini tek bir çalıştırılabilir HTML dosyasına birleştirir. Önizleme konsoluna ait yardımcı kod dışa aktarılmaz.

**Proje kaydet**, üç paneli ayrı ayrı koruyan bir JSON dosyası indirir. Daha sonra **Dosya aç** ile geri yükleyebilirsin. Tarayıcıdaki otomatik kayıt yedek yerine geçmez: site verileri silinirse veya özel pencere kapanırsa kaybolabilir. Depolama kullanılamıyorsa araç bunu bildirir.

## Çevrimdışı kullan

[Tek dosyalık sürümü indir](https://talkdedsec.github.io/tlk-html-viewer/tlk-html-viewer.html). Tarayıcı dosyayı açarsa “Farklı kaydet” ile `.html` olarak kaydet. Dosyaya çift tıkla; Node.js, paket kurulumu veya yerel sunucu gerekmez. Güncel sürüm [Releases](https://github.com/Talkdedsec/tlk-html-viewer/releases) bölümünde de bulunur.

Çevrimdışı kullanım, uygulamanın kendi kodu ve editörü içindir. Açtığın HTML dış font, resim veya JavaScript istiyorsa bunlar internet olmadan yüklenmez. Bazı tarayıcılar `file://` altında pano ve yerel depolamayı kısıtlayabilir; bu durumda normal seçim/kopyalama ve proje indirme kullanılabilir.

## Sorun giderme

| Durum                            | Kontrol                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| Önizleme değişmiyor              | Otomatik çalıştırı aç veya Ctrl/Cmd + Enter kullan.                                     |
| JavaScript çalışmıyor            | Ayarlardaki JavaScript seçeneğini ve Konsol panelini kontrol et.                        |
| Form, popup veya alert açılmıyor | Bunlar önizleme izinleriyle engellenir; bir hata değildir.                              |
| Resim görünmüyor                 | Yerel göreli dosyalar otomatik yüklenmez. Kaynağı göm veya erişilebilir bir URL kullan. |
| Kopyalama başarısız              | Editörde metni seçip sistemin kopyalama kısayolunu kullan.                              |
| Sekme donuyor                    | Sonsuz döngülü kod sekmeyi kilitleyebilir. Sekmeyi kapat; güvenmediğin kodu çalıştırma. |

Bir hata bildirmeden önce [bilinen sınırları](../SECURITY.md) ve [issue formunu](https://github.com/Talkdedsec/tlk-html-viewer/issues/new/choose) incele.
