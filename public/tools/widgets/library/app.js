const articles = [
  {
    id: "opportunite-algerie",
    title: "Mémoire souveraine",
    theme: "Assurance",
    type: "Analyse",
    language: "FR",
    date: "2026-06-28",
    tags: ["Algérie", "IA", "données", "assurance", "souveraineté"],
    summary: "Analyse de l'opportunité créée par la localisation des données assurantielles en Algérie, à partir du parallèle avec la rareté de la mémoire HBM.",
    pdf: "../outputs/opportunite-algerienne-marche-futur-ia-assurance-fr.pdf",
    source: "../outputs/opportunite-algerienne-marche-futur-ia-assurance-fr.md",
    html: "../outputs/opportunite-algerienne-marche-futur-ia-assurance-fr.html",
    thumb: "thumbs/opportunite-algerie.png",
    hasSources: true
  },
  {
    id: "decret-tertiaire",
    title: "Tertiaire 2030",
    theme: "Énergie",
    type: "Fiche",
    language: "FR",
    date: "2026-06-28",
    tags: ["décret tertiaire", "OPERAT", "énergie", "réglementation"],
    summary: "Fiche claire sur les obligations 2026, les bâtiments concernés, la modulation et les actions de conformité énergétique.",
    pdf: "../outputs/decret-tertiaire-2026-obligations-calendrier-fr.pdf",
    source: "../outputs/decret-tertiaire-2026-obligations-calendrier-fr.md",
    html: "../outputs/decret-tertiaire-2026-obligations-calendrier-fr.html",
    thumb: "thumbs/decret-tertiaire.png",
    hasSources: false
  },
  {
    id: "systeme-law",
    title: "Fièvre Law",
    theme: "Histoire",
    type: "Point",
    language: "FR",
    date: "2026-06-27",
    tags: ["monnaie", "banque", "finance", "Law", "faillite"],
    summary: "Synthèse structurée du système de Law, de l'émission de billets papier et des leçons prudentielles associées.",
    pdf: "../outputs/point-systeme-law-fr.pdf",
    source: "../outputs/systeme-law-point-modele-fr.md",
    html: "../outputs/point-systeme-law-fr.html",
    thumb: "thumbs/systeme-law.png",
    hasSources: false
  },
  {
    id: "week-review-crypto",
    title: "Crypto brouillard",
    theme: "Crypto",
    type: "Synthèse",
    language: "FR",
    date: "2026-06-27",
    tags: ["crypto", "marché", "bearish", "finance", "weekly review"],
    summary: "Lecture synthétique d'une revue hebdomadaire crypto, avec mise en perspective du pessimisme de marché.",
    pdf: "../outputs/point-week-review-crypto-bearishness-fr.pdf",
    source: "../outputs/bearishness-week-review-crypto-modele-fr.md",
    html: "../outputs/point-week-review-crypto-bearishness-fr.html",
    thumb: "thumbs/week-review-crypto.png",
    hasSources: false
  },
  {
    id: "credit-agricole-iphone",
    title: "iPhone bancaire",
    theme: "Finance",
    type: "Analyse",
    language: "FR",
    date: "2026-06-27",
    tags: ["paiement", "iPhone", "banque", "Apple", "mobile"],
    summary: "Analyse du mouvement du Crédit Agricole vers l'iPhone et des enjeux de paiement mobile.",
    pdf: "../outputs/rewrite-credit-agricole-iphone-paiement-mobile-fr.pdf",
    source: "../outputs/credit-agricole-iphone-paiement-mobile-modele-fr.md",
    html: "../outputs/rewrite-credit-agricole-iphone-paiement-mobile-fr.html",
    thumb: "thumbs/credit-agricole.png",
    hasSources: false
  },
  {
    id: "dieux-memoire",
    title: "Dieux mémoire",
    theme: "IA",
    type: "Article",
    language: "FR",
    date: "2026-06-27",
    tags: ["IA", "HBM", "mémoire", "semi-conducteurs", "SK Hynix"],
    summary: "Version structurée sur SK Hynix, la HBM et le rôle stratégique de la mémoire dans l'accélération de l'IA.",
    pdf: "../outputs/rewrite-dieux-de-la-memoire-boom-ia-plan-fr.pdf",
    source: "../outputs/dieux-de-la-memoire-boom-ia-plan-fr.md",
    html: "../outputs/rewrite-dieux-de-la-memoire-boom-ia-modele-fr.html",
    thumb: "thumbs/dieux-memoire.png",
    hasSources: false
  },
  {
    id: "fleurs-sechees",
    title: "Fleurs gardées",
    theme: "Maison",
    type: "Guide",
    language: "FR",
    date: "2026-06-27",
    tags: ["fleurs séchées", "conservation", "arômes", "guide"],
    summary: "Guide réécrit sur la conservation des fleurs séchées et la préservation de leurs arômes.",
    pdf: "../outputs/rewrite-conserver-fleurs-sechees-fr.pdf",
    source: "../outputs/comment-conserver-fleurs-sechees-rewrite.md",
    html: "",
    thumb: "thumbs/fleurs-sechees.png",
    hasSources: false
  },
  {
    id: "coaching",
    title: "Coaching express",
    theme: "Service",
    type: "Carte",
    language: "FR",
    date: "2026-06-27",
    tags: ["coaching", "service", "fiche"],
    summary: "Carte de service réécrite et mise en PDF.",
    pdf: "../outputs/rewrite-carte-de-service-coaching-fr.pdf",
    source: "",
    html: "",
    thumb: "thumbs/coaching.png",
    hasSources: false
  }
];

const planLabels = {
  dialectique: {
    type: "Thèse / antithèse / synthèse",
    parts: [
      ["I - La thèse : ce que l'idée permet de comprendre", "A) Le fait central", "B) La dynamique économique", "C) L'opportunité qui apparaît"],
      ["II - L'antithèse : ce qui limite ou contredit cette lecture", "A) Les confusions possibles", "B) Les contraintes techniques", "C) Le risque de surestimation"],
      ["III - La synthèse : le point d'équilibre", "A) Ce qui peut réellement se produire", "B) Les acteurs capables d'en profiter", "C) Les conditions à surveiller"]
    ]
  },
  operationnel: {
    type: "Problème / solution / mise en œuvre",
    parts: [
      ["I - Le problème : ce qui bloque ou crée la tension", "A) Le constat de départ", "B) Les acteurs concernés", "C) Les risques si rien ne change"],
      ["II - La solution : ce qui répond au problème", "A) Le levier principal", "B) Les infrastructures nécessaires", "C) La valeur créée"],
      ["III - La mise en œuvre : comment passer de l'idée à l'action", "A) Les premières étapes", "B) Les indicateurs à suivre", "C) Les conditions de réussite"]
    ]
  },
  confrontation: {
    type: "Deux points de vue / solution logique détachée",
    parts: [
      ["I - Premier point de vue : la lecture favorable", "A) L'argument principal", "B) Les preuves ou signaux disponibles", "C) La promesse implicite"],
      ["II - Second point de vue : la lecture opposée", "A) L'objection centrale", "B) Les angles morts", "C) Les conséquences possibles"],
      ["III - Solution logique : sortir des orientations de pensée", "A) Les faits qui résistent aux opinions", "B) Le scénario le plus robuste", "C) La décision rationnelle à retenir"]
    ]
  }
};

const requestedArticleId = new URLSearchParams(window.location.search).get("article");
const requestedView = new URLSearchParams(window.location.search).get("view");

const storedAnalyses = JSON.parse(localStorage.getItem("article-library-analyses") || "[]");
storedAnalyses.forEach((item) => articles.unshift(item));

const versionStoreKey = "article-library-versions";
let versionStore = JSON.parse(localStorage.getItem(versionStoreKey) || "{}");

const state = {
  topic: "Tous",
  format: "Tous",
  quick: "all",
  query: "",
  sort: "recent",
  selectedId: articles.some((article) => article.id === requestedArticleId) ? requestedArticleId : articles[0].id,
  favorites: new Set(JSON.parse(localStorage.getItem("article-library-favorites") || "[]"))
};

const topicFilters = document.querySelector("#topic-filters");
const formatFilters = document.querySelector("#format-filters");
const grid = document.querySelector("#article-grid");
const resultCount = document.querySelector("#result-count");
const libraryCount = document.querySelector("#library-count");
const activeTags = document.querySelector("#active-tags");
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");
const clear = document.querySelector("#clear");
const detailPanel = document.querySelector("#detail-panel");
const analysisWidget = document.querySelector("#analysis-widget");
const toggleWidget = document.querySelector("#toggle-widget");
const analysisTitle = document.querySelector("#analysis-title");
const analysisIdea = document.querySelector("#analysis-idea");
const analysisStructure = document.querySelector("#analysis-structure");
const analysisText = document.querySelector("#analysis-text");
const analysisSources = document.querySelector("#analysis-sources");
const analysisOutput = document.querySelector("#analysis-output");
const generateAnalysis = document.querySelector("#generate-analysis");
const saveAnalysis = document.querySelector("#save-analysis");
const copyAnalysis = document.querySelector("#copy-analysis");
const downloadAnalysis = document.querySelector("#download-analysis");
const versionModal = document.querySelector("#version-modal");
const versionModalKicker = document.querySelector("#version-modal-kicker");
const versionModalTitle = document.querySelector("#version-modal-title");
const versionModalBody = document.querySelector("#version-modal-body");
const closeVersionModal = document.querySelector("#close-version-modal");

function unique(values) {
  return ["Tous", ...Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "fr"))];
}

function textIndex(article) {
  const view = getArticleView(article);
  return [
    view.title,
    article.theme,
    article.type,
    article.language,
    view.summary,
    view.version.addition,
    ...article.tags
  ].join(" ").toLowerCase();
}

function getFilteredArticles() {
  const query = state.query.trim().toLowerCase();
  let list = articles.filter((article) => {
    const matchesTopic = state.topic === "Tous" || article.theme === state.topic;
    const matchesFormat = state.format === "Tous" || article.type === state.format;
    const matchesQuick =
      state.quick === "all" ||
      (state.quick === "atelier" && article.type === "Atelier") ||
      (state.quick === "favorites" && state.favorites.has(article.id)) ||
      (state.quick === "sources" && article.hasSources);
    const matchesQuery = !query || textIndex(article).includes(query);
    return matchesTopic && matchesFormat && matchesQuick && matchesQuery;
  });

  list = list.sort((a, b) => {
    if (state.sort === "title") return a.title.localeCompare(b.title, "fr");
    if (state.sort === "theme") return a.theme.localeCompare(b.theme, "fr") || a.title.localeCompare(b.title, "fr");
    return b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "fr");
  });

  return list;
}

function saveFavorites() {
  localStorage.setItem("article-library-favorites", JSON.stringify([...state.favorites]));
}

function countFor(key, value) {
  if (value === "Tous") return articles.length;
  return articles.filter((article) => article[key] === value).length;
}

function renderFilters() {
  topicFilters.innerHTML = unique(articles.map((article) => article.theme)).map((topic) => `
    <button class="filter-button ${state.topic === topic ? "is-active" : ""}" type="button" data-topic="${topic}">
      <span>${topic}</span>
      <span class="filter-count">${countFor("theme", topic)}</span>
    </button>
  `).join("");

  formatFilters.innerHTML = unique(articles.map((article) => article.type)).map((format) => `
    <button class="filter-button ${state.format === format ? "is-active" : ""}" type="button" data-format="${format}">
      <span>${format}</span>
      <span class="filter-count">${countFor("type", format)}</span>
    </button>
  `).join("");
}

function renderCards(list) {
  if (!list.length) {
    grid.innerHTML = `<div class="empty">Aucun article ne correspond à ces filtres.</div>`;
    return;
  }

  grid.innerHTML = list.map((article) => {
    const view = getArticleView(article);
    return `
    <article class="card ${state.selectedId === article.id ? "is-selected" : ""}" data-id="${article.id}" tabindex="0">
      <div class="thumb">
        ${article.thumb ? `<img src="${article.thumb}" alt="">` : `<span class="thumb-fallback">PDF</span>`}
      </div>
      <div class="card-body">
        <div class="card-kicker">${article.theme} · ${article.type}</div>
        <h3>${view.title}</h3>
        <p>${view.summary}</p>
        <div class="card-tags">
          ${article.tags.slice(0, 4).map((tag) => `<span class="tag">${tag}</span>`).join("")}
          ${view.versionNumber > 1 ? `<span class="tag">v${view.versionNumber}</span>` : ""}
        </div>
        <div class="card-actions">
          ${article.pdf ? `<a class="link-button" href="${article.pdf}" target="_blank" rel="noreferrer">PDF</a>` : ""}
          ${article.source ? `<a class="link-button" href="${article.source}" target="_blank" rel="noreferrer">Source</a>` : ""}
          ${article.html ? `<a class="link-button" href="${article.html}" target="_blank" rel="noreferrer">HTML</a>` : ""}
          ${article.markdown ? `<button class="link-button" type="button" data-export-analysis="${article.id}">Export .md</button>` : ""}
          <button class="link-button" type="button" data-enrich="${article.id}">Enrichir</button>
          <button class="link-button" type="button" data-timemachine="${article.id}">Time machine</button>
          <button class="favorite-button ${state.favorites.has(article.id) ? "is-on" : ""}" type="button" data-favorite="${article.id}">${state.favorites.has(article.id) ? "Favori" : "Marquer"}</button>
        </div>
      </div>
    </article>
  `;
  }).join("");
}

function renderDetail() {
  const article = articles.find((item) => item.id === state.selectedId) || articles[0];
  const view = getArticleView(article);
  detailPanel.innerHTML = `
    <div class="detail-cover">
      ${article.thumb ? `<img src="${article.thumb}" alt="">` : `<span class="thumb-fallback">PDF</span>`}
    </div>
    <div class="detail-kicker">${article.theme} · ${article.type}</div>
    <h2>${view.title}</h2>
    <p>${view.summary}</p>
    <div class="detail-list">
      <div class="detail-row"><span>Date</span><strong>${formatDate(article.date)}</strong></div>
      <div class="detail-row"><span>Langue</span><strong>${article.language}</strong></div>
      <div class="detail-row"><span>Sources</span><strong>${article.hasSources ? "Oui" : "Non"}</strong></div>
      <div class="detail-row"><span>Version active</span><strong>v${view.versionNumber}</strong></div>
      <div class="detail-row"><span>Origine</span><strong>${escapeHtml(view.version.origin)}</strong></div>
    </div>
    ${view.version.id !== "base" ? `<div class="version-note"><strong>Enrichissement actif</strong><p>${escapeHtml(view.version.addition)}</p></div>` : ""}
    <div class="card-tags">
      ${article.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      ${view.versionNumber > 1 ? `<span class="tag">v${view.versionNumber}</span>` : ""}
    </div>
    <div class="detail-actions">
      ${article.pdf ? `<a class="link-button" href="${article.pdf}" target="_blank" rel="noreferrer">Ouvrir le PDF</a>` : ""}
      ${article.source ? `<a class="link-button" href="${article.source}" target="_blank" rel="noreferrer">Voir la source</a>` : ""}
      ${article.html ? `<a class="link-button" href="${article.html}" target="_blank" rel="noreferrer">Ouvrir HTML</a>` : ""}
      ${article.markdown ? `<button class="link-button" type="button" data-export-analysis="${article.id}">Exporter .md</button>` : ""}
      <button class="link-button" type="button" data-enrich="${article.id}">Enrichir</button>
      <button class="link-button" type="button" data-timemachine="${article.id}">Time machine</button>
    </div>
  `;
}

function focusRequestedArticle() {
  if (!requestedArticleId) return;
  const selectedCard = grid.querySelector(`[data-id="${CSS.escape(state.selectedId)}"]`);
  selectedCard?.classList.add("is-deep-linked");
  if (!window.__articleDeepLinkFocused && selectedCard) {
    window.__articleDeepLinkFocused = true;
    requestAnimationFrame(() => selectedCard.scrollIntoView({ block: "center", behavior: "smooth" }));
  }
}

function renderActiveTags() {
  const tags = [];
  if (state.topic !== "Tous") tags.push(state.topic);
  if (state.format !== "Tous") tags.push(state.format);
  if (state.quick === "favorites") tags.push("Favoris");
  if (state.quick === "atelier") tags.push("Atelier d'analyse");
  if (state.quick === "sources") tags.push("Avec sources");
  if (state.query.trim()) tags.push(`Recherche : ${state.query.trim()}`);
  activeTags.innerHTML = tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function getVersionBucket(articleId) {
  if (!versionStore[articleId]) versionStore[articleId] = { activeId: "base", items: [] };
  return versionStore[articleId];
}

function getAllVersions(article) {
  const bucket = getVersionBucket(article.id);
  return [
    {
      id: "base",
      createdAt: article.date,
      origin: "Version initiale",
      addition: article.summary,
      summary: article.summary
    },
    ...bucket.items
  ];
}

function getArticleView(article) {
  const bucket = getVersionBucket(article.id);
  const versions = getAllVersions(article);
  const fallbackActiveId = versions[versions.length - 1]?.id || "base";
  const activeId = bucket.activeId && versions.some((version) => version.id === bucket.activeId)
    ? bucket.activeId
    : fallbackActiveId;
  const version = versions.find((item) => item.id === activeId) || versions[0];
  return {
    title: article.title,
    summary: version.summary || article.summary,
    version,
    versions,
    versionNumber: versions.findIndex((item) => item.id === version.id) + 1
  };
}

function saveVersionStore() {
  localStorage.setItem(versionStoreKey, JSON.stringify(versionStore));
}

function summarizeEnrichment(article, addition) {
  const clean = addition.replace(/\s+/g, " ").trim();
  const clipped = clean.length > 185 ? `${clean.slice(0, 182).trim()}...` : clean;
  return `${article.summary} Enrichissement : ${clipped}`;
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function addVersion(articleId, origin, addition) {
  const article = articles.find((item) => item.id === articleId);
  if (!article) return;
  const bucket = getVersionBucket(articleId);
  const version = {
    id: `v-${Date.now()}`,
    createdAt: new Date().toISOString(),
    origin,
    addition,
    summary: summarizeEnrichment(article, addition)
  };
  bucket.items.push(version);
  bucket.activeId = version.id;
  saveVersionStore();
  state.selectedId = articleId;
  closeModal();
  render();
}

function restoreVersion(articleId, versionId) {
  const bucket = getVersionBucket(articleId);
  bucket.activeId = versionId;
  saveVersionStore();
  state.selectedId = articleId;
  closeModal();
  render();
}

function openEnrichModal(articleId) {
  const article = articles.find((item) => item.id === articleId);
  if (!article) return;
  const view = getArticleView(article);
  versionModalKicker.textContent = "Enrichissement";
  versionModalTitle.textContent = view.title;
  versionModalBody.innerHTML = `
    <form class="version-form" id="enrich-form" data-article="${article.id}">
      <label class="field">
        <span>Origine de la modification</span>
        <input name="origin" type="text" placeholder="Ex. Nouvelle source, intuition personnelle, correction, article LinkedIn">
      </label>
      <label class="field">
        <span>Nouveaux éléments à intégrer</span>
        <textarea name="addition" rows="9" placeholder="Colle ici les faits, sources, arguments ou corrections à ajouter à l'article..."></textarea>
      </label>
      <div class="modal-actions">
        <button class="primary-button" type="submit">Créer la version</button>
        <button class="link-button" type="button" data-close-modal>Annuler</button>
      </div>
    </form>
  `;
  versionModal.hidden = false;
  versionModalBody.querySelector("[data-close-modal]").addEventListener("click", closeModal);
}

function openTimeMachine(articleId) {
  const article = articles.find((item) => item.id === articleId);
  if (!article) return;
  const view = getArticleView(article);
  versionModalKicker.textContent = "Time machine";
  versionModalTitle.textContent = view.title;
  versionModalBody.innerHTML = `
    <div class="timeline">
      ${view.versions.map((version, index) => `
        <article class="timeline-item ${version.id === view.version.id ? "is-active" : ""}">
          <div class="timeline-top">
            <strong>v${index + 1} · ${escapeHtml(version.origin)}</strong>
            <span>${formatDateTime(version.createdAt)}</span>
          </div>
          <p>${escapeHtml(version.addition)}</p>
          <button class="link-button" type="button" data-article="${article.id}" data-restore-version="${version.id}">
            ${version.id === view.version.id ? "Version active" : "Revenir ici"}
          </button>
        </article>
      `).join("")}
    </div>
  `;
  versionModal.hidden = false;
}

function closeModal() {
  versionModal.hidden = true;
}

function render() {
  const list = getFilteredArticles();
  libraryCount.textContent = `${articles.length} articles`;
  resultCount.textContent = `${list.length} résultat${list.length > 1 ? "s" : ""}`;
  renderFilters();
  renderCards(list);
  renderDetail();
  renderActiveTags();
  focusRequestedArticle();
}

document.addEventListener("click", (event) => {
  const topicButton = event.target.closest("[data-topic]");
  const formatButton = event.target.closest("[data-format]");
  const quickButton = event.target.closest("[data-quick]");
  const card = event.target.closest(".card");
  const favoriteButton = event.target.closest("[data-favorite]");
  const exportButton = event.target.closest("[data-export-analysis]");
  const enrichButton = event.target.closest("[data-enrich]");
  const timemachineButton = event.target.closest("[data-timemachine]");
  const restoreButton = event.target.closest("[data-restore-version]");

  if (exportButton) {
    event.stopPropagation();
    const article = articles.find((item) => item.id === exportButton.dataset.exportAnalysis);
    if (article?.markdown) downloadMarkdown(article.title, article.markdown);
    return;
  }

  if (enrichButton) {
    event.stopPropagation();
    openEnrichModal(enrichButton.dataset.enrich);
    return;
  }

  if (timemachineButton) {
    event.stopPropagation();
    openTimeMachine(timemachineButton.dataset.timemachine);
    return;
  }

  if (restoreButton) {
    event.stopPropagation();
    restoreVersion(restoreButton.dataset.article, restoreButton.dataset.restoreVersion);
    return;
  }

  if (favoriteButton) {
    event.stopPropagation();
    const id = favoriteButton.dataset.favorite;
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    saveFavorites();
    render();
    return;
  }

  if (topicButton) state.topic = topicButton.dataset.topic;
  if (formatButton) state.format = formatButton.dataset.format;
  if (quickButton) {
    state.quick = quickButton.dataset.quick;
    document.querySelectorAll("[data-quick]").forEach((button) => button.classList.toggle("is-active", button === quickButton));
    if (state.quick === "atelier") analysisWidget.classList.remove("is-collapsed");
  }
  if (card && !event.target.closest("a")) {
    state.selectedId = card.dataset.id;
    const url = new URL(window.location.href);
    url.searchParams.set("article", state.selectedId);
    history.replaceState(null, "", url);
  }

  if (topicButton || formatButton || quickButton || card) render();
});

closeVersionModal.addEventListener("click", closeModal);
versionModal.addEventListener("click", (event) => {
  if (event.target === versionModal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !versionModal.hidden) closeModal();
});

versionModalBody.addEventListener("submit", (event) => {
  const form = event.target.closest("#enrich-form");
  if (!form) return;
  event.preventDefault();
  const articleId = form.dataset.article;
  const origin = form.elements.origin.value.trim() || "Ajout manuel";
  const addition = form.elements.addition.value.trim();
  if (!addition) return;
  addVersion(articleId, origin, addition);
});

grid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const card = event.target.closest(".card");
  if (!card) return;
  state.selectedId = card.dataset.id;
  render();
});

search.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

sort.addEventListener("change", (event) => {
  state.sort = event.target.value;
  render();
});

clear.addEventListener("click", () => {
  state.topic = "Tous";
  state.format = "Tous";
  state.quick = "all";
  state.query = "";
  state.sort = "recent";
  search.value = "";
  sort.value = "recent";
  document.querySelectorAll("[data-quick]").forEach((button) => button.classList.toggle("is-active", button.dataset.quick === "all"));
  render();
});

toggleWidget.addEventListener("click", () => {
  analysisWidget.classList.toggle("is-collapsed");
  toggleWidget.textContent = analysisWidget.classList.contains("is-collapsed") ? "Afficher" : "Masquer";
});

generateAnalysis.addEventListener("click", () => {
  analysisOutput.textContent = buildAnalysisMarkdown();
});

saveAnalysis.addEventListener("click", () => {
  const markdown = analysisOutput.textContent.trim() || buildAnalysisMarkdown();
  analysisOutput.textContent = markdown;
  const title = shortCreativeTitle(analysisTitle.value, analysisIdea.value, analysisText.value);
  const article = {
    id: `atelier-${Date.now()}`,
    title,
    theme: "Analyse",
    type: "Atelier",
    language: "FR",
    date: new Date().toISOString().slice(0, 10),
    tags: ["atelier", planLabels[analysisStructure.value].type, ...keywordsFromText(analysisIdea.value || analysisText.value).slice(0, 3)],
    summary: analysisIdea.value.trim() || firstSentence(analysisText.value) || "Fiche d'analyse générée depuis l'atelier.",
    pdf: "",
    source: "",
    html: "",
    thumb: "",
    hasSources: false,
    markdown
  };
  articles.unshift(article);
  const saved = articles.filter((item) => item.type === "Atelier");
  localStorage.setItem("article-library-analyses", JSON.stringify(saved));
  state.selectedId = article.id;
  state.quick = "atelier";
  document.querySelectorAll("[data-quick]").forEach((button) => button.classList.toggle("is-active", button.dataset.quick === "atelier"));
  render();
});

copyAnalysis.addEventListener("click", async () => {
  const markdown = analysisOutput.textContent.trim() || buildAnalysisMarkdown();
  analysisOutput.textContent = markdown;
  await navigator.clipboard.writeText(markdown);
  copyAnalysis.textContent = "Copié";
  setTimeout(() => copyAnalysis.textContent = "Copier", 1200);
});

downloadAnalysis.addEventListener("click", () => {
  const markdown = analysisOutput.textContent.trim() || buildAnalysisMarkdown();
  analysisOutput.textContent = markdown;
  downloadMarkdown(shortCreativeTitle(analysisTitle.value, analysisIdea.value, analysisText.value), markdown);
});

function buildAnalysisMarkdown() {
  const title = shortCreativeTitle(analysisTitle.value, analysisIdea.value, analysisText.value);
  analysisTitle.value = title;
  const idea = stripEndPunctuation(analysisIdea.value.trim() || "L'idée directrice reste à préciser");
  const sourceText = analysisText.value.trim();
  const sources = analysisSources.value.trim();
  const plan = planLabels[analysisStructure.value];
  const signals = extractSignals(sourceText);
  const keywords = keywordsFromText(`${idea} ${sourceText}`).slice(0, 8);

  return [
    `# ${title}`,
    "",
    "## Introduction",
    "",
    `${idea}. Cette analyse organise les faits disponibles pour distinguer l'intuition forte, ses limites et les conditions concrètes qui permettraient de la vérifier.`,
    "",
    ...plan.parts.flatMap((part, partIndex) => {
      const [heading, ...subparts] = part;
      return [
        `## ${heading}`,
        "",
        ...subparts.flatMap((subpart, subIndex) => {
          const signal = signals[(partIndex * 3 + subIndex) % Math.max(signals.length, 1)] || idea;
          return [
            `### ${subpart}`,
            "",
            paragraphFor(analysisStructure.value, partIndex, subIndex, idea, signal),
            ""
          ];
        })
      ];
    }),
    "## Conclusion",
    "",
    `La position la plus solide consiste à ne pas confondre récit, infrastructure et capture de valeur. L'hypothèse devient défendable si les faits montrent une demande réelle, un usage mesurable et des acteurs capables de transformer cette demande en avantage durable.`,
    "",
    "## Points à vérifier",
    "",
    "- Quels acteurs captent réellement la valeur ?",
    "- Quelle ressource est consommée : mémoire, stockage, blockspace, énergie, identité ou attention ?",
    "- Le lien économique est-il direct, indirect ou seulement narratif ?",
    "- La demande est-elle institutionnelle, individuelle ou mixte ?",
    "- Existe-t-il des sources permettant de vérifier les volumes, les coûts et les usages ?",
    "",
    ...(sources ? [
      "",
      "## Sources",
      "",
      ...sources.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => `- ${line}`)
    ] : []),
    "",
    "## Mots-clés",
    "",
    keywords.map((keyword) => `- ${keyword}`).join("\n")
  ].join("\n");
}

function paragraphFor(structure, partIndex, subIndex, idea, signal) {
  const openers = {
    dialectique: [
      "Le premier niveau de lecture consiste à prendre l'hypothèse au sérieux.",
      "La limite apparaît lorsque l'on distingue le récit général du mécanisme économique réel.",
      "La synthèse consiste à isoler ce qui reste vrai une fois les excès retirés."
    ],
    operationnel: [
      "Le problème vient de la distance entre l'intuition et son application concrète.",
      "La solution consiste à identifier l'infrastructure qui porte réellement l'usage.",
      "La mise en œuvre demande de passer des concepts aux indicateurs observables."
    ],
    confrontation: [
      "Le premier point de vue voit dans cette idée un signal de bascule.",
      "Le second point de vue rappelle que toute adoption technique ne crée pas automatiquement de valeur.",
      "La solution logique consiste à détacher l'analyse des préférences initiales."
    ]
  };
  const opener = openers[structure][partIndex];
  const focus = subIndex === 0 ? "Le fait central à retenir est" : subIndex === 1 ? "Le point de tension est" : "La conséquence à surveiller est";
  return `${opener} ${focus} : ${stripEndPunctuation(signal)}. Dans cette perspective, l'idée générale peut être formulée ainsi : ${idea}.`;
}

function extractSignals(text) {
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 45 && sentence.length < 240);
  return sentences.length ? sentences.slice(0, 12) : [];
}

function extractTitle(text) {
  return text.split(/\r?\n/).map((line) => line.trim()).find((line) => line.length > 8 && line.length < 90);
}

function firstSentence(text) {
  return extractSignals(text)[0] || "";
}

function cleanTitle(value) {
  return value.trim().replace(/\s+/g, " ");
}

function shortCreativeTitle(rawTitle, idea = "", text = "") {
  const initial = cleanTitle(rawTitle || extractTitle(text) || idea || "Analyse vive");
  if (countTitleWords(initial) <= 3) return sentenceTitle(initial);

  const haystack = `${initial} ${idea} ${text}`.toLowerCase();
  const normalized = haystack.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const signatures = [
    [/token|memoire|certif|blockchain|nft/, "Mémoire certifiée"],
    [/polygon|unicorn|blockspace|stablecoin/, "Rails tokenisés"],
    [/assurance|alger|souverain|donnee/, "Données souveraines"],
    [/hbm|hynix|dram|semi-conducteur|gpu/, "Mémoire reine"],
    [/decret|tertiaire|operat|energie/, "Tertiaire 2030"],
    [/crypto|bearish|bitcoin|market/, "Crypto brouillard"],
    [/law|billet|banque|faillite/, "Fièvre Law"],
    [/iphone|credit agricole|paiement|apple/, "iPhone bancaire"]
  ];
  const match = signatures.find(([pattern]) => pattern.test(normalized));
  if (match) return match[1];

  const words = keywordsFromText(`${initial} ${idea} ${text}`).slice(0, 3);
  return titleCase(words.length ? words.join(" ") : "Analyse vive");
}

function countTitleWords(value) {
  return (value.match(/[A-Za-zÀ-ÖØ-öø-ÿ0-9]+/g) || []).length;
}

function titleCase(value) {
  const small = new Set(["de", "du", "des", "la", "le", "les", "et", "à", "au", "aux", "d"]);
  return cleanTitle(value)
    .split(/\s+/)
    .slice(0, 3)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && small.has(lower)) return lower;
      if (/^[A-Z0-9]{2,}$/.test(word)) return word;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function sentenceTitle(value) {
  const cleaned = cleanTitle(value);
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function stripEndPunctuation(value) {
  return value.trim().replace(/[.!?]+$/g, "");
}

function keywordsFromText(text) {
  const stop = new Set("alors avec cette dans pour plus mais donc comme entre nous vous elles ils elle lui leur leurs des les une que qui quoi dont ceci cela cette sans sont avoir être faire peut peut-il aux sur ses son selon tout tous très quand même plus moins".split(" "));
  const words = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/[a-z0-9]{4,}/g) || [];
  const counts = new Map();
  words.forEach((word) => {
    if (!stop.has(word)) counts.set(word, (counts.get(word) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([word]) => word);
}

function slugify(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "analyse";
}

function downloadMarkdown(title, markdown) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugify(title)}.md`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

render();
