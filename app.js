const state = {
    reverse: false,
    mode: "grammar",
    category: "fiil",
    answerType: "tiles",
    queue: [],
    current: null,
    selectedTiles: [],
    availableTiles: [],
    tooltipTimer: null,
    answered: false,
    speechTimer: null,
    speechCount: 0,
    speechSpeed: "auto",
    recentQuestionKeys: [],
    questionStats: {}
};

const CACHE_KEY = "ruslingo-progress-v1";
const $ = id => document.getElementById(id);
const random = list => list[Math.floor(Math.random() * list.length)];
const shuffle = list => {
    const result = [...list];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

window.addEventListener("load", initialise);

function initialise() {
    loadCache();
    syncControls();
    $("reverse-toggle").addEventListener("click", toggleReverseMode);
    $("speech-speed").addEventListener("change", event => {
        state.speechSpeed = event.target.value;
        saveCache();
    });
    $("tab-grammar").addEventListener("click", () => setMode("grammar"));
    $("tab-sentence").addEventListener("click", () => setMode("sentence"));
    $("subtab-fiil").addEventListener("click", () => setCategory("fiil"));
    $("subtab-isim").addEventListener("click", () => setCategory("isim"));
    $("subtab-tiles").addEventListener("click", () => setAnswerType("tiles"));
    $("subtab-mc").addEventListener("click", () => setAnswerType("mc"));
    $("speak-question").addEventListener("click", speakQuestionText);
    $("show-info").addEventListener("click", showPatternInfo);
    $("close-info").addEventListener("click", hidePatternInfo);
    $("info-modal").addEventListener("click", event => {
        if (event.target === $("info-modal")) hidePatternInfo();
    });
    $("btn-check-tile").addEventListener("click", checkTileAnswer);
    $("feedback-btn").addEventListener("click", showNextQuestion);
    document.addEventListener("click", closeTooltipOnOutsideClick);
    refreshQuestionSession();
}

function loadCache() {
    try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
        if (cached.settings) {
            state.reverse = cached.settings.reverse === true;
            state.mode = ["grammar", "sentence"].includes(cached.settings.mode) ? cached.settings.mode : "grammar";
            state.category = ["fiil", "isim"].includes(cached.settings.category) ? cached.settings.category : "fiil";
            state.answerType = ["tiles", "mc"].includes(cached.settings.answerType) ? cached.settings.answerType : "tiles";
            state.speechSpeed = ["auto", "slow", "heavy"].includes(cached.settings.speechSpeed)
                ? cached.settings.speechSpeed
                : "auto";
        }
        state.recentQuestionKeys = Array.isArray(cached.recentQuestionKeys)
            ? cached.recentQuestionKeys.filter(key => typeof key === "string").slice(-30)
            : [];
        state.questionStats = cached.questionStats && typeof cached.questionStats === "object"
            ? cached.questionStats
            : {};
    } catch (error) {
        console.warn("Ruslingo önbelleği okunamadı; yeni çalışma verisiyle devam ediliyor.", error);
    }
}

function saveCache() {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            version: 1,
            savedAt: new Date().toISOString(),
            settings: {
                reverse: state.reverse,
                mode: state.mode,
                category: state.category,
                answerType: state.answerType,
                speechSpeed: state.speechSpeed
            },
            recentQuestionKeys: state.recentQuestionKeys.slice(-30),
            questionStats: state.questionStats
        }));
    } catch (error) {
        console.warn("Ruslingo çalışma verisi tarayıcıya kaydedilemedi.", error);
    }
}

function syncControls() {
    $("reverse-label").textContent = state.reverse ? "TR → RU" : "RU → TR";
    $("speech-speed").value = state.speechSpeed;
    $("tab-grammar").classList.toggle("active", state.mode === "grammar");
    $("tab-sentence").classList.toggle("active", state.mode === "sentence");
    $("grammar-subtabs").hidden = state.mode !== "grammar";
    $("sentence-subtabs").hidden = state.mode !== "sentence";
    $("subtab-fiil").classList.toggle("active", state.category === "fiil");
    $("subtab-isim").classList.toggle("active", state.category === "isim");
    $("subtab-tiles").classList.toggle("active", state.answerType === "tiles");
    $("subtab-mc").classList.toggle("active", state.answerType === "mc");
}

function recordAnswer(question, correct) {
    const stats = state.questionStats[question.key] || {
        attempts: 0,
        correct: 0,
        incorrect: 0,
        wrongStreak: 0
    };
    stats.attempts += 1;
    if (correct) {
        stats.correct += 1;
        stats.wrongStreak = 0;
    } else {
        stats.incorrect += 1;
        stats.wrongStreak += 1;
    }
    stats.lastAnsweredAt = new Date().toISOString();
    state.questionStats[question.key] = stats;
    state.recentQuestionKeys = [
        ...state.recentQuestionKeys.filter(key => key !== question.key),
        question.key
    ].slice(-30);
    saveCache();
}

function refreshQuestionSession() {
    clearTimeout(state.speechTimer);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    state.queue = [];
    fillQueue();
    showNextQuestion();
}

function fillQueue() {
    while (state.queue.length < 5) {
        const question = state.mode === "grammar" ? createGrammarQuestion() : createSentenceQuestion();
        if (question) state.queue.push(question);
    }
}

function showNextQuestion() {
    hideFeedback();
    hideTooltip();
    clearTimeout(state.speechTimer);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    fillQueue();
    state.current = state.queue.shift();
    fillQueue();
    state.selectedTiles = [];
    state.availableTiles = [...(state.current.sourceTiles || [])];
    state.answered = false;
    state.speechCount = 0;
    renderQuestion();
    scheduleAutomaticRussianSpeech();
}

function createGrammarQuestion() {
    const pool = state.category === "fiil" ? VERBS_DATA : NOUNS_DATA;
    const item = chooseWeighted(pool, item => getQuestionKey("grammar", item.ru));
    const optionItems = [item];
    const optionCandidates = shuffle(pool.filter(candidate => candidate !== item));
    for (const candidate of optionCandidates) {
        if (!optionItems.some(option => normalizeAnswer(option.tr) === normalizeAnswer(candidate.tr))) {
            optionItems.push(candidate);
        }
        if (optionItems.length === Math.min(5, pool.length)) break;
    }
    const promptText = state.reverse ? item.tr : item.ru;
    return {
        type: "grammar",
        key: getQuestionKey("grammar", item.ru),
        promptText,
        correctAnswer: state.reverse ? item.ru : item.tr,
        options: shuffle(optionItems).map(option => state.reverse ? option.ru : option.tr),
        wordMap: [{ word: promptText, meaning: state.reverse ? item.ru : item.tr }],
        tag: state.category === "fiil" ? "FİİL SÖZLÜĞÜ" : "İSİM SÖZLÜĞÜ",
        language: state.reverse ? "tr-TR" : "ru-RU"
    };
}

function createSentenceQuestion() {
    const template = chooseWeighted(PHRASES_DATA, item => item.id);
    const selectedValues = selectDictionaryValues(template.dict);
    alignPresentTenseVerb(template, selectedValues);
    const ruTokens = resolveTemplate(template.ruTemplate, selectedValues, "ru");
    const trTokens = resolveTemplate(template.trTemplate, selectedValues, "tr");
    const wordMap = createWordMap(selectedValues, template.glossary);
    const fullRu = formatTokens(ruTokens);
    const fullTr = formatTokens(trTokens);
    const correctTokens = state.reverse ? ruTokens : trTokens;
    const promptLanguage = state.reverse ? "tr-TR" : "ru-RU";
    const distractors = state.reverse ? template.distractors.ru : template.distractors.tr;

    return {
        type: "sentence",
        key: getQuestionKey("sentence", `${template.id}|${fullRu}|${fullTr}`),
        promptText: state.reverse ? fullTr : fullRu,
        correctAnswer: state.reverse ? fullRu : fullTr,
        correctTokens,
        sourceTiles: shuffle([...correctTokens, ...distractors]),
        options: createSentenceOptions(fullRu, fullTr),
        wordMap,
        tag: "OTEL CÜMLE KALIBI",
        language: promptLanguage,
        infoId: template.infoId
    };
}

function alignPresentTenseVerb(template, selectedValues) {
    if (!["present-affirmative", "present-negative"].includes(template.id)) return;
    const subject = selectedValues.subject;
    const matchingVerbs = template.dict.verb.filter(verb => verb.subject?.toLocaleLowerCase("ru-RU") === subject.ru.toLocaleLowerCase("ru-RU"));
    if (matchingVerbs.length) selectedValues.verb = random(matchingVerbs);
}

function formatTokens(tokens) {
    return tokens.reduce((sentence, token) => /^(?:[,.!?;:])$/.test(token)
        ? `${sentence}${token}`
        : `${sentence}${sentence ? " " : ""}${token}`, "");
}

function selectDictionaryValues(dictionary) {
    return Object.fromEntries(Object.entries(dictionary).map(([key, values]) => [key, choose(values)]));
}

function choose(values) {
    return values[Math.floor(Math.random() * values.length)];
}

function chooseWeighted(values, keyFactory) {
    const available = values.filter(item => !isQuestionKeyUsed(keyFactory(item)));
    const candidates = available.length ? available : values;
    const weighted = candidates.flatMap(item => {
        const key = keyFactory(item);
        const stats = findQuestionStats(key);
        const weight = 1 + Math.min(stats?.wrongStreak || 0, 3) * 4;
        return Array(weight).fill(item);
    });
    return choose(weighted);
}

function isQuestionKeyUsed(key) {
    return state.recentQuestionKeys.some(recentKey => recentKey === key || recentKey.startsWith(`${key}|`))
        || state.queue.some(question => question.key === key || question.key.startsWith(`${key}|`));
}

function findQuestionStats(key) {
    if (state.questionStats[key]) return state.questionStats[key];
    const prefix = `${key}|`;
    return Object.entries(state.questionStats)
        .filter(([storedKey]) => storedKey.startsWith(prefix))
        .map(([, stats]) => stats)
        .sort((a, b) => (b.wrongStreak || 0) - (a.wrongStreak || 0))[0];
}

function getQuestionKey(type, value) {
    return `${type}|${state.mode}|${state.category}|${state.reverse ? "reverse" : "normal"}|${value}`;
}

function resolveTemplate(tokens, dictionary, language) {
    return tokens.map(token => {
        const placeholder = token.match(/^\{([^}]+)\}(.*)$/);
        if (!placeholder) return token;
        const key = placeholder[1].replace(/Tr$/, "");
        const choice = dictionary[key];
        const value = language === "ru" ? choice.ru : choice.tr;
        return `${value}${placeholder[2]}`;
    });
}

function createWordMap(dictionary, glossary = []) {
    const selectedWords = Object.values(dictionary).flatMap(createWordMapEntries);
    const fixedWords = glossary.flatMap(createWordMapEntries);
    return [...selectedWords, ...fixedWords];
}

function createWordMapEntries(choice) {
    return createWordMapEntryVariants(choice.ru, choice.tr);
}

function createWordMapEntryVariants(russian, turkish) {
    const entries = [];
    for (const [source, meaning] of [[russian, turkish], [turkish, russian]]) {
        const variants = source.split("/").map(variant => variant.trim()).filter(Boolean);
        for (const variant of variants) {
            entries.push({ word: variant, meaning });
            tokenizeSentence(variant).forEach(token => {
                if (tokenizeSentence(variant).length > 1) entries.push({ word: token, meaning });
            });
        }
    }
    return entries;
}

function createSentenceOptions(fullRu, fullTr) {
    const correct = state.reverse ? fullRu : fullTr;
    const options = [correct];
    const candidates = PHRASES_DATA.map(template => {
        const selectedValues = selectDictionaryValues(template.dict);
        alignPresentTenseVerb(template, selectedValues);
        const ru = formatTokens(resolveTemplate(template.ruTemplate, selectedValues, "ru"));
        const tr = formatTokens(resolveTemplate(template.trTemplate, selectedValues, "tr"));
        return state.reverse ? ru : tr;
    });
    for (const candidate of shuffle(candidates)) {
        if (!options.some(option => normalizeAnswer(option) === normalizeAnswer(candidate))) options.push(candidate);
        if (options.length === 5) break;
    }
    return shuffle(options);
}

function renderQuestion() {
    $("question-tag").textContent = state.current.tag;
    const questionBox = $("interactive-question-box");
    questionBox.replaceChildren();
    tokenizeSentence(state.current.promptText).forEach(word => {
        const button = document.createElement("button");
        button.className = "question-word";
        button.type = "button";
        button.textContent = word;
        button.addEventListener("click", event => {
            showTooltip(word, event);
            speakWord(word);
        });
        button.addEventListener("mouseenter", event => showTooltip(word, event));
        button.addEventListener("mouseleave", hideTooltip);
        questionBox.append(button);
    });
    const infoButton = $("show-info");
    infoButton.hidden = state.current.type !== "sentence" || !state.current.infoId;
    setAnswerSurface();
}

function tokenizeSentence(text) {
    return text.match(/\S+/g) || [];
}

function setAnswerSurface() {
    const showChoices = state.current.type === "grammar" || state.answerType === "mc";
    $("mc-options-container").hidden = !showChoices;
    $("tile-builder-container").hidden = showChoices;
    if (showChoices) renderChoices();
    else renderTiles();
}

function renderChoices() {
    const container = $("mc-options-container");
    container.replaceChildren();
    state.current.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "choice";
        button.innerHTML = `<span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span>`;
        button.addEventListener("click", () => checkAnswer(option));
        button.disabled = state.answered;
        container.append(button);
    });
}

function renderTiles() {
    renderTileLists();
}

function renderTileLists() {
    const target = $("sentence-target-box");
    const source = $("sentence-source-tiles");
    target.replaceChildren();
    source.replaceChildren();
    if (!state.selectedTiles.length) {
        const placeholder = document.createElement("span");
        placeholder.className = "placeholder";
        placeholder.textContent = "Kelimelere basarak cümleyi oluştur...";
        target.append(placeholder);
    }
    state.selectedTiles.forEach((word, index) => {
        const tile = createTile(word, true, () => {
            if (state.answered) return;
            state.availableTiles.push(state.selectedTiles.splice(index, 1)[0]);
            renderTileLists();
        });
        tile.disabled = state.answered;
        target.append(tile);
    });
    state.availableTiles.forEach((word, index) => {
        const tile = createTile(word, false, () => {
            if (state.answered) return;
            state.selectedTiles.push(state.availableTiles.splice(index, 1)[0]);
            renderTileLists();
        });
        tile.disabled = state.answered;
        source.append(tile);
    });
}

function createTile(word, selected, onClick) {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = selected ? "tile selected" : "tile";
    tile.textContent = word;
    tile.addEventListener("click", onClick);
    return tile;
}

function checkAnswer(answer) {
    if (state.answered) return;
    state.answered = true;
    const correct = normalizeAnswer(answer) === normalizeAnswer(state.current.correctAnswer);
    recordAnswer(state.current, correct);
    state.queue = [];
    fillQueue();
    showFeedback(correct, state.current.correctAnswer);
}

function normalizeAnswer(answer) {
    return answer
        .normalize("NFC")
        .replace(/\s+([,.!?;:])/g, "$1")
        .replace(/\s+/g, " ")
        .trim()
        .toLocaleLowerCase("tr-TR");
}

function checkTileAnswer() {
    if (!state.selectedTiles.length || state.answered) return;
    checkAnswer(formatTokens(state.selectedTiles));
}

function showFeedback(correct, answer) {
    const feedback = $("feedback-bar");
    feedback.className = `feedback visible ${correct ? "correct" : "incorrect"}`;
    $("feedback-icon").innerHTML = correct ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>';
    $("feedback-title").textContent = correct ? "Muhteşem! Doğru cevap" : "Doğrusu:";
    $("feedback-detail").textContent = correct ? "" : answer;
    playAnswerSound(correct);
}

function hideFeedback() {
    $("feedback-bar").className = "feedback";
}

function showTooltip(word, event) {
    event.stopPropagation();
    const cleanWord = normalizeLookupWord(word);
    let match = state.current.wordMap.find(item => normalizeLookupWord(item.word) === cleanWord);
    if (!match) {
        match = [...VERBS_DATA, ...NOUNS_DATA].find(item =>
            createWordMapEntryVariants(item.ru, item.tr)
                .some(entry => normalizeLookupWord(entry.word) === cleanWord)
        );
    }
    $("tooltip-target-word").textContent = word;
    $("tooltip-meaning").textContent = match
        ? match.meaning || (state.reverse ? match.ru : match.tr)
        : "Karşılık bulunamadı";
    $("word-tooltip").hidden = false;
    clearTimeout(state.tooltipTimer);
    state.tooltipTimer = setTimeout(hideTooltip, 4000);
}

function hideTooltip() {
    $("word-tooltip").hidden = true;
}

function closeTooltipOnOutsideClick(event) {
    if (!$("word-tooltip").contains(event.target) && !event.target.closest(".question-word")) hideTooltip();
}

function normalizeLookupWord(word) {
    return word
        .replace(/[.,!?;:]/g, "")
        .trim()
        .toLocaleLowerCase("tr-TR");
}

function speak(text, language) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = getSpeechRate();
    window.speechSynthesis.speak(utterance);
}

function getSpeechRate() {
    if (state.speechSpeed === "slow") return 0.7;
    if (state.speechSpeed === "heavy") return 0.52;
    const multipliers = [1, 1.25, 1.5];
    const multiplier = multipliers[Math.min(state.speechCount, multipliers.length - 1)];
    state.speechCount += 1;
    return 0.85 * multiplier;
}

function containsRussian(text) {
    return /[\u0400-\u04ff]/.test(text);
}

function speakRussian(text) {
    if (containsRussian(text)) speak(text, "ru-RU");
}

function speakWord(word) {
    speak(word.replace(/[.,!?;:]/g, ""), state.current.language);
}

function speakRussianForCurrentQuestion() {
    if (containsRussian(state.current.promptText)) speakRussian(state.current.promptText);
}

function scheduleAutomaticRussianSpeech() {
    clearTimeout(state.speechTimer);
    state.speechTimer = window.setTimeout(() => {
        speakRussianForCurrentQuestion();
    }, 80);
}

function showPatternInfo() {
    const info = SENTENCE_PATTERN_INFO[state.current?.infoId];
    if (!info) return;
    $("info-title").textContent = info.title;
    $("info-content").innerHTML = markdownToHtml(info.markdown);
    $("info-modal").hidden = false;
}

function markdownToHtml(markdown) {
    const escaped = markdown
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    const lines = escaped.split(/\r?\n/);
    const html = [];
    let paragraph = [];
    let list = [];
    const flushParagraph = () => {
        if (paragraph.length) {
            html.push(`<p>${paragraph.join("<br>")}</p>`);
            paragraph = [];
        }
    };
    const flushList = () => {
        if (list.length) {
            html.push(`<ul>${list.map(item => `<li>${item}</li>`).join("")}</ul>`);
            list = [];
        }
    };
    for (const line of lines) {
        if (!line.trim()) {
            flushParagraph();
            flushList();
        } else if (line.startsWith("### ")) {
            flushParagraph();
            flushList();
            html.push(`<h4>${line.slice(4)}</h4>`);
        } else if (line.startsWith("## ")) {
            flushParagraph();
            flushList();
            html.push(`<h3>${line.slice(3)}</h3>`);
        } else if (line.startsWith("# ")) {
            flushParagraph();
            flushList();
            html.push(`<h2>${line.slice(2)}</h2>`);
        } else if (line.startsWith("- ")) {
            flushParagraph();
            list.push(line.slice(2));
        } else {
            flushList();
            paragraph.push(line);
        }
    }
    flushParagraph();
    flushList();
    return html.join("")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function hidePatternInfo() {
    $("info-modal").hidden = true;
}

function playAnswerSound(correct) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(correct ? 660 : 190, context.currentTime);
    if (correct) oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + (correct ? 0.2 : 0.28));
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + (correct ? 0.2 : 0.28));
    oscillator.addEventListener("ended", () => context.close());
}

function setMode(mode) {
    state.mode = mode;
    $("tab-grammar").classList.toggle("active", mode === "grammar");
    $("tab-sentence").classList.toggle("active", mode === "sentence");
    $("grammar-subtabs").hidden = mode !== "grammar";
    $("sentence-subtabs").hidden = mode !== "sentence";
    saveCache();
    refreshQuestionSession();
}

function setCategory(category) {
    if (state.category === category) return;
    state.category = category;
    $("subtab-fiil").classList.toggle("active", category === "fiil");
    $("subtab-isim").classList.toggle("active", category === "isim");
    saveCache();
    if (state.mode === "grammar") refreshQuestionSession();
}

function setAnswerType(type) {
    state.answerType = type;
    $("subtab-tiles").classList.toggle("active", type === "tiles");
    $("subtab-mc").classList.toggle("active", type === "mc");
    saveCache();
    if (state.mode === "sentence") refreshQuestionSession();
}

function toggleReverseMode() {
    state.reverse = !state.reverse;
    $("reverse-label").textContent = state.reverse ? "TR → RU" : "RU → TR";
    saveCache();
    refreshQuestionSession();
}

function speakQuestionText() {
    if (state.current) speak(state.current.promptText, state.current.language);
}

const brandMark = document.querySelector('.brand-mark');

if (brandMark) {
  brandMark.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Tam ekran moda geçilemedi: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });
}