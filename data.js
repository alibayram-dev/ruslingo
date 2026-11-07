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
