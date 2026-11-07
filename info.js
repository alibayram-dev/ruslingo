const SENTENCE_PATTERN_INFO = {
    "restaurant-floor": {
        title: "P01 · Bir yerin bulunduğu katı söyleme",
        markdown: `# Ресторан находится на первом этаже

## Türkçesi
Restoran birinci katta bulunmaktadır.

## Kalıp
**[Yer] + находится + на + [sıra sayısı] + этаже**

## Kelimeler
- **Ресторан** — restoran
- **находится** — bulunuyor / bulunmaktadır
- **на** — üzerinde / -de, -da
- **первом** — birinci (eril isimle, edat hâlinde)
- **этаже** — katta

## Kural
Bir yerin nerede bulunduğunu anlatırken **находится** kullanılır. Kat söylerken **на + sıra sayısı + этаже** yapısı kullanılır. Rusçada *этаж* eril olduğu için “birinci” burada **первом** olur; yalın hâli **первый** değildir.

## Değişen bölüm
**первом / втором / третьем** yerine kat numarasına göre başka sıra sayıları gelebilir.`
    },
    "welcome": {
        title: "P02 · Karşılama ve hoş geldin",
        markdown: `# Добро пожаловать в наш отель

## Türkçesi
Otelimize hoş geldiniz.

## Kalıp
**Добро пожаловать в + [mekân]**

## Kelimeler
- **Добро пожаловать** — hoş geldiniz
- **в** — -e, -a / içine
- **наш** — bizim
- **отель** — otel

## Kural
**Добро пожаловать** sabit bir “hoş geldiniz” ifadesidir. Ardından **в** gelir ve misafirin geldiği yer söylenir. **наш** “bizim” anlamındadır ve **отель** ile uyumlu kullanılır.

## Değişen bölüm
**отель**, **ресторан** veya **СПА-центр** ile değişebilir.`
    },
    "schedule": {
        title: "P03 · Etkinlik saatini söyleme",
        markdown: `# Завтрак начнется в семь часов

## Türkçesi
Kahvaltı saat yedide başlayacak.

## Kalıp
**[Etkinlik] + начнется + в + [saat] + часов**

## Kelimeler
- **Завтрак** — kahvaltı
- **начнется** — başlayacak
- **в** — saat ...'de
- **семь** — yedi
- **часов** — saat (saat ifadesinin parçası)

## Kural
Gelecekte başlayacak bir etkinlik için **начнется** kullanılır. Saatten önce **в** gelir. Tam saatlerde sayıdan sonra **часов** kullanımı bu başlangıç seviyesinde kalıp olarak öğrenilebilir.

## Değişen bölüm
Etkinlik ve saat değişebilir: **Завтрак / Вечернее шоу / Анимация**.`
    },
    "polite-request": {
        title: "P04 · Kibarca bir şey isteme",
        markdown: `# Можно ваш паспорт, пожалуйста

## Türkçesi
Pasaportunuzu alabilir miyim, lütfen?

## Kalıp
**Можно + [iyelik] + [nesne] + пожалуйста**

## Kelimeler
- **Можно** — mümkün mü / alabilir miyim
- **ваш** — sizin
- **паспорт** — pasaport
- **пожалуйста** — lütfen

## Kural
Bir otel görevlisi veya misafirden kibarca bir belge/nesne isterken **Можно** ile başlanabilir. **пожалуйста** ifadeyi yumuşatır.

## Değişen bölüm
**паспорт**, **ключ** veya **ваучер** olabilir.`
    },
    "elevator": {
        title: "P05 · Bir yerin nerede olduğunu sorma",
        markdown: `# Где находится лифт

## Türkçesi
Asansör nerede bulunuyor?

## Kalıp
**Где находится + [yer / nesne]**

## Kelimeler
- **Где** — nerede
- **находится** — bulunuyor / bulunur
- **лифт** — asansör

## Kural
Bir nesnenin veya bölümün konumunu sormak için **Где находится ...?** kullanılır. Soru işareti konuşmada yükselen tonlamayla tamamlanır.`
    },
    "help": {
        title: "P06 · Yardıma ihtiyaç duyma",
        markdown: `# Мне нужна помощь

## Türkçesi
Yardıma ihtiyacım var.

## Kalıp
**Мне нужна + [dişil isim]**

## Kelimeler
- **Мне** — bana / benim ... ihtiyacım var
- **нужна** — gerekiyor / gerekli (dişil isimle)
- **помощь** — yardım

## Kural
Rusçada “ihtiyacım var” anlamı için **Мне нужна ...** kullanılır. **помощь** dişil bir isim olduğu için **нужна** gelir. Eril isimlerle **нужен**, çoğul isimlerle **нужны** kullanılabilir.`
    },
    "present-affirmative": {
        title: "P07 · Şimdiki zamanda olumlu fiil",
        markdown: `# Я работаю

## Türkçesi
Ben çalışıyorum.

## Kural
Rusçada fiilin şimdiki zaman çekiminde mastar sonundaki **-ть** çıkarılır ve kişi eki eklenir. Birinci çekimde yaygın ekler **-ю / -ешь / -ет / -ем / -ете / -ют**, ikinci çekimde ise **-ю / -ишь / -ит / -им / -ите / -ят** şeklindedir.

## Kişi ekleri
- **я** — -ю / -у
- **ты** — -ешь veya -ишь
- **он / она / оно** — -ет veya -ит
- **мы** — -ем veya -им
- **вы** — -ете veya -ите
- **они** — -ют veya -ят`
    },
    "present-negative": {
        title: "P08 · Şimdiki zamanda olumsuzluk",
        markdown: `# Я не работаю

## Türkçesi
Ben çalışmıyorum.

## Kural
Rusçada fiili olumsuz yapmak için çekimli fiilden önce ayrı yazılan **не** kullanılır:

**özne + не + çekimli fiil**

Örnek: **Я не работаю** — Ben çalışmıyorum.`
    },
    "present-question": {
        title: "P09 · Şimdiki zamanda soru",
        markdown: `# Ты работаешь?

## Türkçesi
Sen çalışıyor musun?

## Kural
Şimdiki zaman sorularında fiil kişi ekiyle çekilir ve soru çoğunlukla tonlama ile anlaşılır:

**Ты + çekimli fiil?**

Olumsuz soru için **Ты не работаешь?** denir.`
    },
    "present-activity": {
        title: "P10 · Şu anda yapılan eylem",
        markdown: `# Сейчас я работаю в отеле

## Türkçesi
Şu anda otelde çalışıyorum.

## Kural
Şu an gerçekleşen eylemi belirtmek için **Сейчас + çekimli fiil + yer** yapısı kullanılabilir. Rusçada şimdiki zaman, bağlama göre Türkçedeki “-yor” anlamını karşılar.`
    }
};
