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
    speechSpeed: "auto"
};

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
    $("reverse-toggle").addEventListener("click", toggleReverseMode);
    $("speech-speed").addEventListener("change", event => {
        state.speechSpeed = event.target.value;
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

function refreshQuestionSession() {
    state.queue = [];
    fillQueue();
    showNextQuestion();
}

function fillQueue() {
    while (state.queue.length < 5) {
        state.queue.push(state.mode === "grammar" ? createGrammarQuestion() : createSentenceQuestion());
    }
}

function showNextQuestion() {
    hideFeedback();
    hideTooltip();
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
    const item = random(pool);
    const optionItems = [item];
    while (optionItems.length < Math.min(5, pool.length)) {
        const candidate = random(pool);
        if (!optionItems.some(option => option.ru === candidate.ru)) optionItems.push(candidate);
    }
    const promptText = state.reverse ? item.tr : item.ru;
    return {
        type: "grammar",
        promptText,
        correctAnswer: state.reverse ? item.ru : item.tr,
        options: shuffle(optionItems).map(option => state.reverse ? option.ru : option.tr),
        wordMap: [{ word: promptText, meaning: state.reverse ? item.ru : item.tr }],
        tag: state.category === "fiil" ? "FİİL SÖZLÜĞÜ" : "İSİM SÖZLÜĞÜ",
        language: state.reverse ? "ru-RU" : "tr-TR"
    };
}

function createSentenceQuestion() {
    const template = random(PHRASES_DATA);
    const selectedValues = selectDictionaryValues(template.dict);
    alignPresentTenseVerb(template, selectedValues);
    const ruTokens = resolveTemplate(template.ruTemplate, selectedValues, "ru");
    const trTokens = resolveTemplate(template.trTemplate, selectedValues, "tr");
    const wordMap = createWordMap(selectedValues, template.glossary);
    const fullRu = formatTokens(ruTokens);
    const fullTr = formatTokens(trTokens);
    const correctTokens = state.reverse ? ruTokens : trTokens;
    const answerLanguage = state.reverse ? "ru-RU" : "tr-TR";
    const distractors = state.reverse ? template.distractors.ru : template.distractors.tr;

    return {
        type: "sentence",
        promptText: state.reverse ? fullTr : fullRu,
        correctAnswer: state.reverse ? fullRu : fullTr,
        correctTokens,
        sourceTiles: shuffle([...correctTokens, ...distractors]),
        options: createSentenceOptions(fullRu, fullTr),
        wordMap,
        tag: "OTEL CÜMLE KALIBI",
        language: answerLanguage,
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
    return Object.fromEntries(Object.entries(dictionary).map(([key, values]) => [key, random(values)]));
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
    const selectedWords = Object.values(dictionary).flatMap(choice => {
        return [{ word: choice.ru, meaning: choice.tr }, { word: choice.tr, meaning: choice.ru }];
    });
    const fixedWords = glossary.flatMap(choice => {
        return [{ word: choice.ru, meaning: choice.tr }, { word: choice.tr, meaning: choice.ru }];
    });
    return [...selectedWords, ...fixedWords];
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
        if (!options.includes(candidate)) options.push(candidate);
        if (options.length === 5) break;
    }
    return shuffle(options);
}

function renderQuestion() {
    $("question-tag").textContent = state.current.tag;
    const questionBox = $("interactive-question-box");
    questionBox.replaceChildren();
    state.current.promptText.split(" ").forEach(word => {
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
            state.availableTiles.push(state.selectedTiles.splice(index, 1)[0]);
            renderTileLists();
        });
        target.append(tile);
    });
    state.availableTiles.forEach((word, index) => {
        const tile = createTile(word, false, () => {
            state.selectedTiles.push(state.availableTiles.splice(index, 1)[0]);
            renderTileLists();
        });
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
    const correct = answer === state.current.correctAnswer;
    if (containsRussian(answer)) speakRussian(answer);
    else speakRussianForCurrentQuestion();
    showFeedback(correct, state.current.correctAnswer);
    if (!correct) speakRussianAfterDelay(state.current.correctAnswer);
}

function checkTileAnswer() {
    if (!state.selectedTiles.length || state.answered) return;
    checkAnswer(state.selectedTiles.join(" "));
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
    const cleanWord = word.replace(/[.,!?]/g, "").toLocaleLowerCase("tr-TR");
    let match = state.current.wordMap.find(item => item.word.toLocaleLowerCase("tr-TR") === cleanWord);
    if (!match) {
        match = [...VERBS_DATA, ...NOUNS_DATA].find(item =>
            item.ru.toLocaleLowerCase("tr-TR") === cleanWord || item.tr.toLocaleLowerCase("tr-TR") === cleanWord
        );
    }
    $("tooltip-target-word").textContent = word;
    $("tooltip-meaning").textContent = match ? match.meaning || (state.reverse ? match.ru : match.tr) : "Karşılık bulunamadı";
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
    const cleanWord = word.replace(/[.,!?]/g, "").toLocaleLowerCase("tr-TR");
    const match = state.current.wordMap.find(item =>
        item.word.toLocaleLowerCase("tr-TR") === cleanWord
    );
    const russianWord = containsRussian(word) ? word : match?.meaning;
    if (russianWord && containsRussian(russianWord)) speakRussian(russianWord);
}

function speakRussianAfterDelay(text) {
    if (containsRussian(text)) window.setTimeout(() => speakRussian(text), 280);
}

function speakRussianForCurrentQuestion() {
    const russianText = containsRussian(state.current.promptText)
        ? state.current.promptText
        : state.current.correctAnswer;
    speakRussian(russianText);
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
    if (state.mode === mode) return;
    state.mode = mode;
    $("tab-grammar").classList.toggle("active", mode === "grammar");
    $("tab-sentence").classList.toggle("active", mode === "sentence");
    $("grammar-subtabs").hidden = mode !== "grammar";
    $("sentence-subtabs").hidden = mode !== "sentence";
    refreshQuestionSession();
}

function setCategory(category) {
    if (state.category === category) return;
    state.category = category;
    $("subtab-fiil").classList.toggle("active", category === "fiil");
    $("subtab-isim").classList.toggle("active", category === "isim");
    if (state.mode === "grammar") refreshQuestionSession();
}

function setAnswerType(type) {
    if (state.answerType === type) return;
    state.answerType = type;
    $("subtab-tiles").classList.toggle("active", type === "tiles");
    $("subtab-mc").classList.toggle("active", type === "mc");
    if (state.mode === "sentence") setAnswerSurface();
}

function toggleReverseMode() {
    state.reverse = !state.reverse;
    $("reverse-label").textContent = state.reverse ? "TR → RU" : "RU → TR";
    refreshQuestionSession();
}

function speakQuestionText() {
    if (state.current) speakRussianForCurrentQuestion();
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