# Ruslingo

Rusça öğrenirken özellikle otel, resepsiyon ve günlük konaklama iletişiminde ihtiyaç duyulan kelimeleri ve cümle kalıplarını pratik etmek için geliştirdiğim küçük bir web uygulaması.

Bu projeyi kendimi geliştirmek, öğrendiğim Rusça kelimeleri düzenli tekrar etmek ve kendi çalışma sistemimi oluşturmak amacıyla yazdım.

## Canlı Demo

Projeye GitHub Pages üzerinden ulaşabilirsiniz:

**[Ruslingo'yu Aç](https://alibayram-dev.github.io/ruslingo/)**

## Özellikler

- Rusça-Türkçe ve Türkçe-Rusça çalışma yönü
- Fiil ve isim kelime grupları
- Otel temalı Rusça cümle kalıpları
- Çoktan seçmeli sorular
- Kelime kartlarıyla cümle kurma
- Kelimelerin üzerine gelince anlam gösterme
- Kelimeye tıklayınca Rusça telaffuz
- Rusça soruların otomatik seslendirilmesi
- Doğru ve yanlış cevaplar için ses efektleri
- Ayarlanabilir ses hızı:
  - Otomatik
  - Biraz Yavaş
  - Biraz Ağır
- Cümle kalıpları için ayrıntılı gramer açıklamaları
- Masaüstü ve mobil uyumlu arayüz
- Yeni soruları önceden hazırlayan soru kuyruğu

## Kullanılan Teknolojiler

- HTML5
- CSS3
- Vanilla JavaScript
- Web Speech API
- GitHub Pages

Herhangi bir framework veya backend kullanmadan, temel web teknolojileriyle geliştirildi.

## Proje Yapısı

```text
.
├── index.html   # Uygulamanın ana HTML dosyası
├── style.css    # Tasarım ve responsive stiller
├── app.js       # Uygulama mantığı ve soru sistemi
├── data.js      # Kelime, cümle ve cevap verileri
├── info.js      # Cümle kalıplarının gramer açıklamaları
└── README.md    # Proje dokümantasyonu
```

## Cümle Kalıpları

Uygulamadaki cümle kalıpları otel ve günlük iletişim senaryolarından oluşur. Her kalıbın:

- Kendine ait bir ID'si,
- Rusça cümlesi,
- Türkçe karşılığı,
- Kelime açıklamaları,
- Kullanım kuralı,
- Değiştirilebilir bölümleri

bulunur.

## Seslendirme

Seslendirme yalnızca Rusça metinler için kullanılır. Tarayıcının desteklediği Rusça ses motoru üzerinden çalışır.

Otomatik hız modunda aynı kart içinde tekrar seslendirmelerde hız kademeli olarak artar. Yeni karta geçildiğinde seslendirme sayacı sıfırlanır.

> Ses kalitesi, kullanılan tarayıcıya ve işletim sisteminde yüklü olan Rusça ses paketlerine göre değişebilir.

## GitHub Pages

Proje, GitHub Pages kullanılarak yayınlanmaktadır. `main` branch üzerindeki dosyalar güncellendiğinde canlı sayfanın güncellenmesi GitHub Pages ayarlarına bağlı olarak otomatik gerçekleşir.

## Geliştirme Amacı

Bu proje öncelikle kişisel öğrenme ve pratik amacıyla oluşturuldu. Geliştirme sürecinde:

- Daha fazla otel konuşması,
- Yeni kelime kategorileri,
- Daha kapsamlı Rusça gramer açıklamaları,
- İlerleme takibi,
- Kullanıcı skor sistemi

gibi özelliklerin eklenmesi planlanabilir.

## Yakında Eklenecekler

- Tarayıcıların desteklediği TTS altyapılarıyla konuşma destekli “Cevap” modu
- GroqAI destekli, yapay zekâ ile canlı asistanla konuşma modu
- Daha fazla kelime ve cümle kalıbı
- Web uygulaması entegrasyonu

## Geliştirme Notu

Bu proje aktif olarak geliştirilmektedir. Bazı Rusça kelime karşılıklarında, cümle çevirilerinde veya gramer açıklamalarında eksik ya da hatalı ifadeler bulunabilir. Böyle bir durum fark ederseniz bildirimde bulunmanız, içeriğin düzeltilmesine yardımcı olur.

## Katkı

Projeyi inceleyebilir, geliştirme fikirleri paylaşabilir veya hata bildirebilirsiniz. Özellikle Rusça kelime ve cümle karşılıklarındaki düzeltmeler projeye katkı sağlayacaktır.

## Lisans

Bu proje kişisel öğrenme ve geliştirme amacıyla hazırlanmıştır.
