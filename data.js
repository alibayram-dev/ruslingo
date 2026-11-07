const VERBS_DATA = [
    { ru: "бронировать", tr: "rezervasyon yapmak", context: "Oda veya masa ayırma işlemi." },
    { ru: "подавать", tr: "servis etmek", context: "Yiyecek ve içecek sunumu." },
    { ru: "убирать", tr: "temizlemek", context: "Oda veya alan temizleme." },
    { ru: "платить", tr: "ödeme yapmak", context: "Hesap veya fatura ödeme." },
    { ru: "помогать", tr: "yardım etmek", context: "Misafire destek olma." },
    { ru: "приносить", tr: "getirmek", context: "Sipariş edilen eşyayı getirme." },
    { ru: "встречать", tr: "karşılamak", context: "Misafiri kapıda karşılama." },
    { ru: "объяснять", tr: "açıklamak", context: "Bilgi verme veya tarif etme." },
    { ru: "заселять", tr: "yerleştirmek", context: "Misafirin otele giriş işlemi." },
    { ru: "оплачивать", tr: "ödemek", context: "Hizmet bedelini ödeme." },
    { ru: "заказывать", tr: "sipariş vermek", context: "Yiyecek veya hizmet istemek." },
    { ru: "проверять", tr: "kontrol etmek", context: "Bilgi veya belgeyi incelemek." }
];

const NOUNS_DATA = [
    { ru: "ключ", tr: "anahtar", context: "Oda anahtarı / kartı." },
    { ru: "номер", tr: "oda", context: "Otel odası." },
    { ru: "этаж", tr: "kat", context: "Bina katı." },
    { ru: "бассейн", tr: "havuz", context: "Yüzme havuzu." },
    { ru: "ресторан", tr: "restoran", context: "Yemek alanı." },
    { ru: "полотенце", tr: "havlu", context: "Plaj veya banyo havlusu." },
    { ru: "счет", tr: "hesap", context: "Ödenecek tutar / adisyon." },
    { ru: "завтрак", tr: "kahvaltı", context: "Sabah öğünü." },
    { ru: "паспорт", tr: "pasaport", context: "Kimlik belgesi." },
    { ru: "пляж", tr: "plaj", context: "Sahil alanı." },
    { ru: "ресепшен", tr: "resepsiyon", context: "Otel giriş ve danışma bölümü." },
    { ru: "лифт", tr: "asansör", context: "Katlar arasında ulaşım aracı." }
];

const PHRASES_DATA = [
    {
        id: "restaurant-floor",
        infoId: "restaurant-floor",
        ruTemplate: ["Ресторан", "находится", "на", "{floor}", "этаже"],
        trTemplate: ["Restoran", "{floorTr}", "katta", "yer", "almaktadır"],
        dict: { floor: [{ ru: "первом", tr: "birinci" }, { ru: "втором", tr: "ikinci" }, { ru: "третьем", tr: "üçüncü" }] },
        glossary: [
            { ru: "Ресторан", tr: "restoran" }, { ru: "находится", tr: "bulunuyor" },
            { ru: "на", tr: "üzerinde" }, { ru: "этаже", tr: "katta" }
        ],
        distractors: { ru: ["вход", "номер", "справа"], tr: ["oda", "giriş", "sağda"] }
    },
    {
        id: "welcome",
        infoId: "welcome",
        ruTemplate: ["Добро", "пожаловать", "в", "наш", "{place}"],
        trTemplate: ["{placeTr}", "hoş", "geldiniz"],
        dict: { place: [{ ru: "отель", tr: "Otelimize" }, { ru: "ресторан", tr: "Restoranımıza" }, { ru: "СПА-центр", tr: "Spa Merkezimize" }] },
        glossary: [
            { ru: "Добро", tr: "iyi" }, { ru: "пожаловать", tr: "hoş geldiniz" },
            { ru: "в", tr: "içine" }, { ru: "наш", tr: "bizim" }
        ],
        distractors: { ru: ["завтрак", "этаж", "ключ"], tr: ["kahvaltı", "kat", "anahtar"] }
    },
    {
        id: "schedule",
        infoId: "schedule",
        ruTemplate: ["{event}", "начнется", "в", "{time}", "часов"],
        trTemplate: ["{eventTr}", "saat", "{timeTr}'de", "başlayacak"],
        dict: {
            event: [{ ru: "Завтрак", tr: "Kahvaltı" }, { ru: "Вечернее шоу", tr: "Akşam Şovu" }, { ru: "Анимация", tr: "Animasyon" }],
            time: [{ ru: "семь", tr: "07:00" }, { ru: "восемь", tr: "20:00" }, { ru: "девять", tr: "21:00" }]
        },
        glossary: [
            { ru: "начнется", tr: "başlayacak" }, { ru: "в", tr: "saat" },
            { ru: "часов", tr: "saat" }
        ],
        distractors: { ru: ["ресторан", "номер", "помощь"], tr: ["restoran", "oda", "yardım"] }
    },
    {
        id: "polite-request",
        infoId: "polite-request",
        ruTemplate: ["Можно", "ваш", "{item}", "пожалуйста"],
        trTemplate: ["{itemTr}", "alabilir", "miyim", "lütfen"],
        dict: { item: [{ ru: "паспорт", tr: "Pasaportunuzu" }, { ru: "ключ", tr: "Anahtarınızı" }, { ru: "ваучер", tr: "Kuponunuzu" }] },
        glossary: [
            { ru: "Можно", tr: "olabilir mi" }, { ru: "ваш", tr: "sizin" },
            { ru: "пожалуйста", tr: "lütfen" }
        ],
        distractors: { ru: ["этаж", "завтрак", "бассейн"], tr: ["kat", "kahvaltı", "havuz"] }
    },
    {
        id: "elevator",
        infoId: "elevator",
        ruTemplate: ["Где", "находится", "лифт"],
        trTemplate: ["Asansör", "nerede", "?"],
        dict: {},
        glossary: [
            { ru: "Где", tr: "nerede" }, { ru: "находится", tr: "bulunuyor" },
            { ru: "лифт", tr: "asansör" }
        ],
        distractors: { ru: ["ресторан", "номер", "вход"], tr: ["restoran", "oda", "giriş"] }
    },
    {
        id: "help",
        infoId: "help",
        ruTemplate: ["Мне", "нужна", "помощь"],
        trTemplate: ["Yardıma", "ihtiyacım", "var"],
        dict: {},
        glossary: [
            { ru: "Мне", tr: "bana" }, { ru: "нужна", tr: "gerekiyor" },
            { ru: "помощь", tr: "yardım" }
        ],
        distractors: { ru: ["ключ", "паспорт", "полотенце"], tr: ["anahtar", "pasaport", "havlu"] }
    }
];

VERBS_DATA.push(
    { ru: "делать", tr: "yapmak", context: "Bir işi gerçekleştirmek.", conjugation: "first" },
    { ru: "работать", tr: "çalışmak", context: "Bir işte çalışmak.", conjugation: "first" },
    { ru: "отдыхать", tr: "dinlenmek", context: "Dinlenmek veya mola vermek.", conjugation: "first" },
    { ru: "гулять", tr: "yürümek / gezmek", context: "Gezinti yapmak.", conjugation: "first" },
    { ru: "знать", tr: "bilmek", context: "Bir bilgiye sahip olmak.", conjugation: "first" },
    { ru: "понимать", tr: "anlamak", context: "Bir şeyi kavramak.", conjugation: "first" },
    { ru: "повторять", tr: "tekrarlamak", context: "Bir şeyi yeniden söylemek veya yapmak.", conjugation: "first" },
    { ru: "думать", tr: "düşünmek", context: "Zihinsel olarak değerlendirmek.", conjugation: "first" },
    { ru: "слушать", tr: "dinlemek", context: "Bir sesi veya kişiyi dinlemek.", conjugation: "first" },
    { ru: "изучать", tr: "öğrenmek / incelemek", context: "Bir konuyu çalışmak.", conjugation: "first" },
    { ru: "спрашивать", tr: "sormak", context: "Bilgi istemek.", conjugation: "first" },
    { ru: "отвечать", tr: "cevap vermek", context: "Bir soruya cevap vermek.", conjugation: "first" },
    { ru: "играть", tr: "oynamak", context: "Oyun veya spor yapmak.", conjugation: "first" },
    { ru: "читать", tr: "okumak", context: "Yazılı bir metni okumak.", conjugation: "first" },
    { ru: "завтракать", tr: "kahvaltı yapmak", context: "Sabah yemeği yemek.", conjugation: "first" },
    { ru: "обедать", tr: "öğle yemeği yemek", context: "Öğle yemeği yemek.", conjugation: "first" },
    { ru: "ужинать", tr: "akşam yemeği yemek", context: "Akşam yemeği yemek.", conjugation: "first" },
    { ru: "покупать", tr: "satın almak", context: "Bir şeyi para vererek almak.", conjugation: "first" },
    { ru: "говорить", tr: "konuşmak / söylemek", context: "Konuşmak veya bir şey söylemek.", conjugation: "second" },
    { ru: "смотреть", tr: "izlemek / bakmak", context: "Bir şeye bakmak veya izlemek.", conjugation: "second" },
    { ru: "курить", tr: "sigara içmek", context: "Sigara içmek.", conjugation: "second" },
    { ru: "помнить", tr: "hatırlamak", context: "Bir bilgiyi akılda tutmak.", conjugation: "second" },
    { ru: "строить", tr: "inşa etmek", context: "Bir yapı oluşturmak.", conjugation: "second" }
);

NOUNS_DATA.push(
    { ru: "человек", tr: "insan", context: "İnsan veya kişi." },
    { ru: "мужчина", tr: "erkek", context: "Yetişkin erkek." },
    { ru: "женщина", tr: "kadın", context: "Yetişkin kadın." },
    { ru: "молодой человек", tr: "genç erkek", context: "Genç erkek." },
    { ru: "девушка", tr: "genç kadın / kız", context: "Genç kadın veya kız." },
    { ru: "мальчик", tr: "erkek çocuk", context: "Erkek çocuk." },
    { ru: "девочка", tr: "kız çocuk", context: "Kız çocuk." },
    { ru: "дети", tr: "çocuklar", context: "Çocuklar." },
    { ru: "семья", tr: "aile", context: "Aile." },
    { ru: "папа", tr: "baba", context: "Baba." },
    { ru: "мама", tr: "anne", context: "Anne." },
    { ru: "брат", tr: "erkek kardeş", context: "Erkek kardeş." },
    { ru: "сестра", tr: "kız kardeş", context: "Kız kardeş." },
    { ru: "бабушка", tr: "büyükanne", context: "Büyükanne." },
    { ru: "дедушка", tr: "dede", context: "Dede." },
    { ru: "деревня", tr: "köy", context: "Köy." },
    { ru: "озеро", tr: "göl", context: "Göl." },
    { ru: "река", tr: "nehir", context: "Nehir." },
    { ru: "дача", tr: "sayfiye evi", context: "Şehir dışındaki yazlık ev." },
    { ru: "церковь", tr: "kilise", context: "Kilise." },
    { ru: "город", tr: "şehir", context: "Şehir." },
    { ru: "парк", tr: "park", context: "Park." },
    { ru: "магазин", tr: "mağaza", context: "Mağaza." },
    { ru: "улица", tr: "sokak / cadde", context: "Sokak veya cadde." },
    { ru: "площадь", tr: "meydan", context: "Meydan." },
    { ru: "театр", tr: "tiyatro", context: "Tiyatro." },
    { ru: "клуб", tr: "kulüp", context: "Kulüp." },
    { ru: "бар", tr: "bar", context: "Bar." },
    { ru: "кафе", tr: "kafe", context: "Kafe." },
    { ru: "стадион", tr: "stadyum", context: "Stadyum." },
    { ru: "музей", tr: "müze", context: "Müze." },
    { ru: "аптека", tr: "eczane", context: "Eczane." },
    { ru: "вокзал", tr: "tren garı", context: "Tren garı." },
    { ru: "почта", tr: "postane", context: "Postane." },
    { ru: "школа", tr: "okul", context: "Okul." },
    { ru: "институт", tr: "enstitü", context: "Enstitü." },
    { ru: "университет", tr: "üniversite", context: "Üniversite." },
    { ru: "рынок", tr: "pazar", context: "Pazar yeri." },
    { ru: "машина", tr: "araba", context: "Araba veya makine." },
    { ru: "автобус", tr: "otobüs", context: "Otobüs." },
    { ru: "трамвай", tr: "tramvay", context: "Tramvay." },
    { ru: "такси", tr: "taksi", context: "Taksi." },
    { ru: "метро", tr: "metro", context: "Metro." },
    { ru: "скорость", tr: "hız", context: "Hız." },
    { ru: "опасность", tr: "tehlike", context: "Tehlike." },
    { ru: "авария", tr: "kaza", context: "Kaza." },
    { ru: "журнал", tr: "dergi", context: "Dergi." },
    { ru: "газета", tr: "gazete", context: "Gazete." },
    { ru: "книга", tr: "kitap", context: "Kitap." },
    { ru: "статья", tr: "makale", context: "Makale." },
    { ru: "слово", tr: "kelime", context: "Kelime." },
    { ru: "словарь", tr: "sözlük", context: "Sözlük." },
    { ru: "письмо", tr: "mektup", context: "Mektup." },
    { ru: "поэзия", tr: "şiir", context: "Şiir." },
    { ru: "жизнь", tr: "hayat", context: "Hayat." },
    { ru: "кровь", tr: "kan", context: "Kan." },
    { ru: "ручка", tr: "kalem", context: "Tükenmez kalem." },
    { ru: "карандаш", tr: "kurşun kalem", context: "Kurşun kalem." },
    { ru: "сумка", tr: "çanta", context: "Çanta." },
    { ru: "урок", tr: "ders", context: "Ders." },
    { ru: "перерыв", tr: "teneffüs / mola", context: "Mola." },
    { ru: "лекция", tr: "ders / konferans", context: "Ders veya konferans." },
    { ru: "стол", tr: "masa", context: "Masa." },
    { ru: "погода", tr: "hava durumu", context: "Hava durumu." },
    { ru: "билет", tr: "bilet", context: "Bilet." },
    { ru: "премьера", tr: "prömiyer", context: "İlk gösterim." },
    { ru: "инженер", tr: "mühendis", context: "Mühendis." },
    { ru: "дизайнер", tr: "tasarımcı", context: "Tasarımcı." },
    { ru: "секретарь", tr: "sekreter", context: "Sekreter." },
    { ru: "экскурсовод", tr: "rehber", context: "Tur rehberi." },
    { ru: "официант", tr: "garson", context: "Garson." },
    { ru: "охранник", tr: "güvenlik görevlisi", context: "Güvenlik görevlisi." },
    { ru: "музыкант", tr: "müzisyen", context: "Müzisyen." },
    { ru: "преподаватель", tr: "öğretim görevlisi", context: "Öğretmen veya öğretim görevlisi." },
    { ru: "менеджер", tr: "yönetici", context: "Yönetici." },
    { ru: "юрист", tr: "hukukçu", context: "Hukukçu." },
    { ru: "переводчик", tr: "çevirmen", context: "Çevirmen." },
    { ru: "продавец", tr: "satıcı", context: "Satıcı." },
    { ru: "бизнесмен", tr: "iş insanı", context: "İş insanı." },
    { ru: "писатель", tr: "yazar", context: "Yazar." },
    { ru: "строитель", tr: "inşaatçı", context: "İnşaat işçisi." },
    { ru: "архитектор", tr: "mimar", context: "Mimar." },
    { ru: "экономист", tr: "ekonomist", context: "Ekonomist." },
    { ru: "шофёр", tr: "şoför", context: "Şoför." },
    { ru: "врач", tr: "doktor", context: "Doktor." },
    { ru: "актёр", tr: "erkek oyuncu", context: "Erkek oyuncu." },
    { ru: "актриса", tr: "kadın oyuncu", context: "Kadın oyuncu." },
    { ru: "художник", tr: "ressam / sanatçı", context: "Ressam veya sanatçı." },
    { ru: "веб-дизайнер", tr: "web tasarımcısı", context: "Web tasarımcısı." },
    { ru: "сок", tr: "meyve suyu", context: "Meyve suyu." },
    { ru: "молоко", tr: "süt", context: "Süt." },
    { ru: "вода", tr: "su", context: "Su." },
    { ru: "чай", tr: "çay", context: "Çay." },
    { ru: "кофе", tr: "kahve", context: "Kahve." },
    { ru: "вино", tr: "şarap", context: "Şarap." },
    { ru: "пиво", tr: "bira", context: "Bira." },
    { ru: "рыба", tr: "balık", context: "Balık." },
    { ru: "сыр", tr: "peynir", context: "Peynir." },
    { ru: "время", tr: "zaman", context: "Zaman." },
    { ru: "год", tr: "yıl", context: "Yıl." },
    { ru: "неделя", tr: "hafta", context: "Hafta." },
    { ru: "месяц", tr: "ay", context: "Ay." },
    { ru: "утро", tr: "sabah", context: "Sabah." },
    { ru: "день", tr: "gün", context: "Gün." },
    { ru: "вечер", tr: "akşam", context: "Akşam." },
    { ru: "ночь", tr: "gece", context: "Gece." },
    { ru: "сейчас", tr: "şimdi", context: "Şimdi." },
    { ru: "работа", tr: "iş", context: "İş." },
    { ru: "дело", tr: "iş / mesele", context: "İş veya mesele." },
    { ru: "место", tr: "yer", context: "Yer." },
    { ru: "решение", tr: "karar / çözüm", context: "Karar veya çözüm." },
    { ru: "событие", tr: "olay", context: "Olay." },
    { ru: "новость", tr: "haber", context: "Haber." },
    { ru: "вещь", tr: "eşya / şey", context: "Eşya veya şey." },
    { ru: "обувь", tr: "ayakkabı", context: "Ayakkabı." },
    { ru: "одежда", tr: "kıyafet", context: "Kıyafet." }
);

const PRESENT_TENSE_DATA = [
    { id: "rabotat", infinitive: "работать", tr: "çalışmak", conjugation: "first", stem: "работа", presentTr: "çalışıyorum", negativeTr: "çalışmıyorum", questionTr: "çalışıyor musun", forms: { я: "работаю", ты: "работаешь", "он/она/оно": "работает", мы: "работаем", вы: "работаете", они: "работают" } },
    { id: "delat", infinitive: "делать", tr: "yapmak", conjugation: "first", stem: "дела", presentTr: "yapıyorum", negativeTr: "yapmıyorum", questionTr: "yapıyor musun", forms: { я: "делаю", ты: "делаешь", "он/она/оно": "делает", мы: "делаем", вы: "делаете", они: "делают" } },
    { id: "govorit", infinitive: "говорить", tr: "konuşmak", conjugation: "second", stem: "говор", presentTr: "konuşuyorum", negativeTr: "konuşmuyorum", questionTr: "konuşuyor musun", forms: { я: "говорю", ты: "говоришь", "он/она/оно": "говорит", мы: "говорим", вы: "говорите", они: "говорят" } },
    { id: "smotret", infinitive: "смотреть", tr: "izlemek", conjugation: "second", stem: "смотр", presentTr: "izliyorum", negativeTr: "izlemiyorum", questionTr: "izliyor musun", forms: { я: "смотрю", ты: "смотришь", "он/она/оно": "смотрит", мы: "смотрим", вы: "смотрите", они: "смотрят" } },
    { id: "kurit", infinitive: "курить", tr: "sigara içmek", conjugation: "second", stem: "кур", presentTr: "sigara içiyorum", negativeTr: "sigara içmiyorum", questionTr: "sigara içiyor musun", forms: { я: "курю", ты: "куришь", "он/она/оно": "курит", мы: "курим", вы: "курите", они: "курят" } },
    { id: "pomnit", infinitive: "помнить", tr: "hatırlamak", conjugation: "second", stem: "помн", presentTr: "hatırlıyorum", negativeTr: "hatırlamıyorum", questionTr: "hatırlıyor musun", forms: { я: "помню", ты: "помнишь", "он/она/оно": "помнит", мы: "помним", вы: "помните", они: "помнят" } }
];

PRESENT_TENSE_DATA.push(
    { id: "otdykhat", infinitive: "отдыхать", tr: "dinlenmek", conjugation: "first", presentTr: "dinleniyorum", negativeTr: "dinlenmiyorum", questionTr: "dinleniyor musun", forms: { я: "отдыхаю", ты: "отдыхаешь", "он/она/оно": "отдыхает", мы: "отдыхаем", вы: "отдыхаете", они: "отдыхают" } },
    { id: "gulyat", infinitive: "гулять", tr: "gezmek", conjugation: "first", presentTr: "geziyorum", negativeTr: "gezmiyorum", questionTr: "geziyor musun", forms: { я: "гуляю", ты: "гуляешь", "он/она/оно": "гуляет", мы: "гуляем", вы: "гуляете", они: "гуляют" } },
    { id: "znat", infinitive: "знать", tr: "bilmek", conjugation: "first", presentTr: "biliyorum", negativeTr: "bilmiyorum", questionTr: "biliyor musun", forms: { я: "знаю", ты: "знаешь", "он/она/оно": "знает", мы: "знаем", вы: "знаете", они: "знают" } },
    { id: "ponimat", infinitive: "понимать", tr: "anlamak", conjugation: "first", presentTr: "anlıyorum", negativeTr: "anlamıyorum", questionTr: "anlıyor musun", forms: { я: "понимаю", ты: "понимаешь", "он/она/оно": "понимает", мы: "понимаем", вы: "понимаете", они: "понимают" } },
    { id: "povtoryat", infinitive: "повторять", tr: "tekrarlamak", conjugation: "first", presentTr: "tekrarlıyorum", negativeTr: "tekrarlamıyorum", questionTr: "tekrarlıyor musun", forms: { я: "повторяю", ты: "повторяешь", "он/она/оно": "повторяет", мы: "повторяем", вы: "повторяете", они: "повторяют" } },
    { id: "dumat", infinitive: "думать", tr: "düşünmek", conjugation: "first", presentTr: "düşünüyorum", negativeTr: "düşünmüyorum", questionTr: "düşünüyor musun", forms: { я: "думаю", ты: "думаешь", "он/она/оно": "думает", мы: "думаем", вы: "думаете", они: "думают" } },
    { id: "slushat", infinitive: "слушать", tr: "dinlemek", conjugation: "first", presentTr: "dinliyorum", negativeTr: "dinlemiyorum", questionTr: "dinliyor musun", forms: { я: "слушаю", ты: "слушаешь", "он/она/оно": "слушает", мы: "слушаем", вы: "слушаете", они: "слушают" } },
    { id: "izuchat", infinitive: "изучать", tr: "öğrenmek", conjugation: "first", presentTr: "öğreniyorum", negativeTr: "öğrenmiyorum", questionTr: "öğreniyor musun", forms: { я: "изучаю", ты: "изучаешь", "он/она/оно": "изучает", мы: "изучаем", вы: "изучаете", они: "изучают" } },
    { id: "sprashivat", infinitive: "спрашивать", tr: "sormak", conjugation: "first", presentTr: "soruyorum", negativeTr: "sormuyorum", questionTr: "soruyor musun", forms: { я: "спрашиваю", ты: "спрашиваешь", "он/она/оно": "спрашивает", мы: "спрашиваем", вы: "спрашиваете", они: "спрашивают" } },
    { id: "otvechat", infinitive: "отвечать", tr: "cevap vermek", conjugation: "first", presentTr: "cevap veriyorum", negativeTr: "cevap vermiyorum", questionTr: "cevap veriyor musun", forms: { я: "отвечаю", ты: "отвечаешь", "он/она/оно": "отвечает", мы: "отвечаем", вы: "отвечаете", они: "отвечают" } },
    { id: "igrat", infinitive: "играть", tr: "oynamak", conjugation: "first", presentTr: "oynuyorum", negativeTr: "oynamıyorum", questionTr: "oynuyor musun", forms: { я: "играю", ты: "играешь", "он/она/оно": "играет", мы: "играем", вы: "играете", они: "играют" } },
    { id: "chitat", infinitive: "читать", tr: "okumak", conjugation: "first", presentTr: "okuyorum", negativeTr: "okumuyorum", questionTr: "okuyor musun", forms: { я: "читаю", ты: "читаешь", "он/она/оно": "читает", мы: "читаем", вы: "читаете", они: "читают" } },
    { id: "zavtrakat", infinitive: "завтракать", tr: "kahvaltı yapmak", conjugation: "first", presentTr: "kahvaltı yapıyorum", negativeTr: "kahvaltı yapmıyorum", questionTr: "kahvaltı yapıyor musun", forms: { я: "завтракаю", ты: "завтракаешь", "он/она/оно": "завтракает", мы: "завтракаем", вы: "завтракаете", они: "завтракают" } },
    { id: "obedat", infinitive: "обедать", tr: "öğle yemeği yemek", conjugation: "first", presentTr: "öğle yemeği yiyorum", negativeTr: "öğle yemeği yemiyorum", questionTr: "öğle yemeği yiyor musun", forms: { я: "обедаю", ты: "обедаешь", "он/она/оно": "обедает", мы: "обедаем", вы: "обедаете", они: "обедают" } },
    { id: "uzhinat", infinitive: "ужинать", tr: "akşam yemeği yemek", conjugation: "first", presentTr: "akşam yemeği yiyorum", negativeTr: "akşam yemeği yemiyorum", questionTr: "akşam yemeği yiyor musun", forms: { я: "ужинаю", ты: "ужинаешь", "он/она/оно": "ужинает", мы: "ужинаем", вы: "ужинаете", они: "ужинают" } },
    { id: "pokupat", infinitive: "покупать", tr: "satın almak", conjugation: "first", presentTr: "satın alıyorum", negativeTr: "satın almıyorum", questionTr: "satın alıyor musun", forms: { я: "покупаю", ты: "покупаешь", "он/она/оно": "покупает", мы: "покупаем", вы: "покупаете", они: "покупают" } },
    { id: "stroit", infinitive: "строить", tr: "inşa etmek", conjugation: "second", presentTr: "inşa ediyorum", negativeTr: "inşa etmiyorum", questionTr: "inşa ediyor musun", forms: { я: "строю", ты: "строишь", "он/она/оно": "строит", мы: "строим", вы: "строите", они: "строят" } }
);

const PRESENT_VERB_FORMS = PRESENT_TENSE_DATA.flatMap(item =>
    Object.entries(item.forms).map(([subject, ru]) => ({
        ru,
        tr: item.presentTr,
        negativeTr: item.negativeTr,
        questionTr: item.questionTr,
        subject,
        infinitive: item.infinitive
    }))
);

PHRASES_DATA.push(
    {
        id: "present-affirmative",
        infoId: "present-affirmative",
        ruTemplate: ["{subject}", "{verb}"],
        trTemplate: ["{subjectTr}", "{verbTr}"],
        dict: {
            subject: [{ ru: "Я", tr: "Ben" }],
            verb: PRESENT_VERB_FORMS
        },
        glossary: [{ ru: "Я", tr: "ben" }, { ru: "Ты", tr: "sen" }, { ru: "Мы", tr: "biz" }, { ru: "Они", tr: "onlar" }],
        distractors: { ru: ["не", "завтрак", "отель"], tr: ["değil", "kahvaltı", "otel"] }
    },
    {
        id: "present-negative",
        infoId: "present-negative",
        ruTemplate: ["{subject}", "не", "{verb}"],
        trTemplate: ["{subjectTr}", "{verbTr}"],
        dict: {
            subject: [{ ru: "Я", tr: "Ben" }],
            verb: PRESENT_VERB_FORMS.map(item => ({ ru: item.ru, tr: item.negativeTr, subject: item.subject })),
            negative: [{ ru: "не", tr: "" }]
        },
        glossary: [{ ru: "не", tr: "değil / -miyor" }, { ru: "Я", tr: "ben" }, { ru: "Ты", tr: "sen" }, { ru: "Мы", tr: "biz" }, { ru: "Они", tr: "onlar" }],
        distractors: { ru: ["сейчас", "завтрак", "номер"], tr: ["şimdi", "kahvaltı", "oda"] }
    },
    {
        id: "present-question",
        infoId: "present-question",
        ruTemplate: ["Ты", "{verb}", "?"],
        trTemplate: ["Sen", "{verbTr}?"],
        dict: {
            verb: PRESENT_VERB_FORMS.filter(item => item.subject === "ты" && item.infinitive !== "курить").map(item => ({ ru: item.ru, tr: item.questionTr }))
        },
        glossary: [{ ru: "Ты", tr: "sen" }],
        distractors: { ru: ["не", "где", "время"], tr: ["değil", "nerede", "zaman"] }
    },
    {
        id: "present-activity",
        infoId: "present-activity",
        ruTemplate: ["Сейчас", "{verb}", "{place}"],
        trTemplate: ["Şimdi", "{verbTr}", "{placeTr}"],
        dict: {
            verb: PRESENT_VERB_FORMS.filter(item => item.subject === "я").map(item => ({ ru: item.ru, tr: item.tr })),
            place: [{ ru: "в отеле", tr: "otelde" }, { ru: "в ресторане", tr: "restoranda" }, { ru: "дома", tr: "evde" }]
        },
        glossary: [{ ru: "Сейчас", tr: "şimdi" }],
        distractors: { ru: ["не", "время", "ключ"], tr: ["değil", "zaman", "anahtar"] }
    }
);
