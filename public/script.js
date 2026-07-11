const ticker = document.querySelector("#ticker");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobileNav");
const railItems = [...document.querySelectorAll(".rail-item")];
const headerNavItems = [...document.querySelectorAll("[data-nav-section]")];
const observedSections = [...document.querySelectorAll(".section-observed")];
const showMore = document.querySelector("#showMore");
const productExtras = [...document.querySelectorAll(".product-extra")];
const track = document.querySelector("#carouselTrack");
const cards = [...document.querySelectorAll(".work-card")];
const dots = document.querySelector("#carouselDots");
const prev = document.querySelector(".carousel-control.prev");
const next = document.querySelector(".carousel-control.next");
const tickerTrack = document.querySelector(".ticker-track");
let tickerLinks = [...document.querySelectorAll(".ticker-link")];
const intelArticleCards = [...document.querySelectorAll(".intel-article-card")];
const analysisMenuToggle = document.querySelector(".analysis-menu-toggle");
const analysisMenuPanel = document.querySelector("#analysisMenu");
const libraryOpen = document.querySelector("[data-open-library]");
const libraryToggle = document.querySelector("[data-library-toggle]");
const libraryContent = document.querySelector("#intelblog-content");
const portfolioLoop = document.querySelector(".portfolio-grid");
const footerObserverTarget = document.querySelector("[data-footer-observed]");
const footerBlogItems = [...document.querySelectorAll(".footer-blog-item")];
const presenceToggle = document.querySelector(".presence-toggle");
const footerWorkshop = document.querySelector("[data-footer-workshop]");
const analysisForm = document.querySelector(".analysis-form");
const widgetButtons = [...document.querySelectorAll("[data-widget-src]")];
const widgetPreview = document.querySelector("#widget-preview");
const widgetPreviewFrame = document.querySelector("#widgetPreviewFrame");
const widgetPreviewTitle = document.querySelector("#widgetPreviewTitle");
const widgetPreviewOpen = document.querySelector("#widgetPreviewOpen");

let lastScrollY = window.scrollY;
let lastTickerToggleY = window.scrollY;
let tickerCollapsed = false;
let carouselIndex = 1;

const returningVisitorKey = "lazyapp_returning_visitor";

function readRadioFavoriteCount() {
  try {
    const favorites = JSON.parse(localStorage.getItem("ibizaRadioFavoriteTracks") || "[]");
    return Array.isArray(favorites) ? favorites.length : 0;
  } catch (_) {
    return 0;
  }
}

function collectReturningVisitorContext(source) {
  const width = window.innerWidth || 0;
  const deviceKind = width < 760 ? "mobile" : width < 1120 ? "tablet" : "desktop";
  return {
    source,
    deviceKind,
    language: navigator.language || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    radioFavorites: readRadioFavoriteCount(),
    lastSeenAt: new Date().toISOString(),
  };
}

function extractFirstNameFromForm(form) {
  if (!form) return "";
  const data = new FormData(form);
  const direct = data.get("prenom") || data.get("firstName") || data.get("firstname");
  if (direct) return String(direct).trim().split(/\s+/)[0];
  const field = form.querySelector('[autocomplete="given-name"], input[name*="prenom" i], input[name*="first" i]');
  return field?.value.trim().split(/\s+/)[0] || "";
}

function storeReturningVisitorFromForm(form, source) {
  const firstName = extractFirstNameFromForm(form);
  if (!firstName) return;
  const profile = {
    firstName,
    context: collectReturningVisitorContext(source),
  };
  try {
    localStorage.setItem(returningVisitorKey, JSON.stringify(profile));
  } catch (_) {}
}

function getReturningVisitorGreeting() {
  try {
    const profile = JSON.parse(localStorage.getItem(returningVisitorKey) || "null");
    const firstName = String(profile?.firstName || "").trim();
    if (!firstName) return null;
    return {
      id: "returning-visitor-greeting",
      type: "returning-greeting",
      title: firstName + ", content de vous revoir !",
    };
  } catch (_) {
    return null;
  }
}

function updateTicker() {
  const current = window.scrollY;
  const movingDown = current > lastScrollY + 1;
  const movingUp = current < lastScrollY - 1;
  const farEnoughFromToggle = Math.abs(current - lastTickerToggleY) > 18;

  if (!tickerCollapsed && current > 130 && movingDown && farEnoughFromToggle) {
    tickerCollapsed = true;
    lastTickerToggleY = current;
    document.body.classList.add("ticker-collapsed");
  }

  if (tickerCollapsed && movingUp && farEnoughFromToggle) {
    tickerCollapsed = false;
    lastTickerToggleY = current;
    document.body.classList.remove("ticker-collapsed");
  }

  lastScrollY = current;
}

function setActiveSection(sectionName) {
  document.body.classList.remove("section-top", "section-produits", "section-services", "section-realisations", "section-widgets");
  document.body.classList.add(`section-${sectionName}`);

  railItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.section === sectionName);
  });

  headerNavItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.navSection === sectionName);
  });
}

function syncSectionFromHash() {
  const sectionName = location.hash.replace("#", "") || "top";
  if (["top", "produits", "services", "realisations", "widgets"].includes(sectionName)) {
    setActiveSection(sectionName);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveSection(visible.target.dataset.section);
    }
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: [0.08, 0.2, 0.45, 0.7],
  }
);

observedSections.forEach((section) => observer.observe(section));

function renderCarousel() {
  if (!track || cards.length === 0) return;
  const active = cards[carouselIndex];
  const cardWidth = active.getBoundingClientRect().width;
  const trackStyle = window.getComputedStyle(track);
  const gap = Number.parseFloat(trackStyle.columnGap || trackStyle.gap) || 18;
  const shellWidth = track.parentElement.getBoundingClientRect().width;
  const offset = carouselIndex * (cardWidth + gap) - (shellWidth - cardWidth) / 2;

  track.style.transform = `translateX(${-offset}px)`;
  cards.forEach((card, index) => card.classList.toggle("active", index === carouselIndex));
  [...dots.children].forEach((dot, index) => dot.classList.toggle("active", index === carouselIndex));
}

function goCarousel(direction) {
  carouselIndex = (carouselIndex + direction + cards.length) % cards.length;
  renderCarousel();
}

function setLibraryExpanded(expanded) {
  const library = document.querySelector("#intelblog-library");
  if (!library || !libraryToggle || !libraryContent) return;
  library.classList.toggle("is-collapsed", !expanded);
  libraryToggle.setAttribute("aria-expanded", String(expanded));
  libraryToggle.textContent = expanded ? "Replier les articles" : "Voir les articles";
  libraryContent.hidden = !expanded;
}

function focusIntelArticle(articleId) {
  const target = intelArticleCards.find((card) => card.dataset.article === articleId);
  const footerTarget = footerBlogItems.find((item) => item.dataset.article === articleId);
  const library = document.querySelector("#intelblog-library");

  if (target && library) {
    setLibraryExpanded(true);
    library.scrollIntoView({ behavior: "smooth", block: "center" });
    intelArticleCards.forEach((card) => card.classList.toggle("highlight", card === target));
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, 380);
    return;
  }

  if (footerTarget) {
    footerTarget.open = true;
    footerTarget.scrollIntoView({ behavior: "smooth", block: "center" });
    footerBlogItems.forEach((item) => item.classList.toggle("highlight", item === footerTarget));
  }
}

function shuffleDocuments(documents) {
  return documents
    .map((doc) => ({ doc, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ doc }) => doc);
}

function renderTickerDocuments() {
  if (!tickerTrack) return;

  const limit = Number(tickerTrack.dataset.documentLimit || 10);
  const articleSource = intelArticleCards.length ? intelArticleCards : footerBlogItems;
  const recentDocuments = articleSource
    .map((card, index) => ({
      id: card.dataset.article || "footer-blog-" + index,
      title: card.querySelector("h3, summary")?.textContent.trim(),
    }))
    .filter((document) => document.id && document.title)
    .slice(-limit);

  if (recentDocuments.length === 0) return;

  const randomDocuments = shuffleDocuments(recentDocuments);
  const returningGreeting = getReturningVisitorGreeting();
  const loopDocuments = returningGreeting ? [returningGreeting, ...randomDocuments] : randomDocuments;
  const infiniteLoopDocuments = [...loopDocuments, ...loopDocuments];

  tickerTrack.replaceChildren();
  infiniteLoopDocuments.forEach((doc) => {
    const button = document.createElement("button");
    button.className = "ticker-link";
    button.type = "button";
    if (doc.type === "returning-greeting") {
      button.dataset.returningGreeting = "true";
      button.textContent = doc.title;
      button.addEventListener("click", openContactModal);
    } else {
      button.dataset.article = doc.id;
      button.textContent = doc.title;
      button.addEventListener("click", () => focusIntelArticle(doc.id));
    }
    tickerTrack.appendChild(button);
  });

  tickerLinks = [...tickerTrack.querySelectorAll(".ticker-link")];
}

cards.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Afficher la realisation ${index + 1}`);
  dot.addEventListener("click", () => {
    carouselIndex = index;
    renderCarousel();
  });
  dots.appendChild(dot);
});

window.addEventListener("scroll", updateTicker, { passive: true });
window.addEventListener("hashchange", syncSectionFromHash);
window.addEventListener("resize", renderCarousel);

renderTickerDocuments();

function initPortfolioInfiniteLoop() {
  if (!portfolioLoop || portfolioLoop.dataset.loopReady === "true") return;
  const originals = [...portfolioLoop.querySelectorAll(":scope > .site-card")];
  if (originals.length < 2) return;

  const moreCard = portfolioLoop.querySelector(":scope > .collection-more-card");
  if (moreCard) moreCard.hidden = true;

  portfolioLoop.dataset.loopReady = "true";
  const before = originals.map((card) => card.cloneNode(true));
  const after = originals.map((card) => card.cloneNode(true));
  before.forEach((card) => {
    card.dataset.loopClone = "before";
    card.setAttribute("aria-hidden", "true");
  });
  after.forEach((card) => {
    card.dataset.loopClone = "after";
    card.setAttribute("aria-hidden", "true");
  });
  portfolioLoop.replaceChildren(...before, ...originals, ...after);

  let isLoopJumping = false;

  function loopWidth() {
    const firstOriginal = portfolioLoop.children[before.length];
    const firstAfter = portfolioLoop.children[before.length + originals.length];
    if (!firstOriginal || !firstAfter) return portfolioLoop.scrollWidth / 3;
    return firstAfter.offsetLeft - firstOriginal.offsetLeft;
  }

  function jumpWithoutAnimation(left) {
    if (isLoopJumping) return;
    isLoopJumping = true;
    const previousBehavior = portfolioLoop.style.scrollBehavior;
    const previousSnap = portfolioLoop.style.scrollSnapType;
    portfolioLoop.classList.add("is-loop-jumping");
    portfolioLoop.style.scrollBehavior = "auto";
    portfolioLoop.style.scrollSnapType = "none";
    portfolioLoop.scrollLeft = left;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        portfolioLoop.style.scrollBehavior = previousBehavior;
        portfolioLoop.style.scrollSnapType = previousSnap;
        portfolioLoop.classList.remove("is-loop-jumping");
        isLoopJumping = false;
      });
    });
  }

  function placeMiddle() {
    jumpWithoutAnimation(loopWidth());
  }

  requestAnimationFrame(placeMiddle);
  portfolioLoop.addEventListener("scroll", () => {
    if (isLoopJumping) return;
    const width = loopWidth();
    if (width <= 0) return;
    const left = portfolioLoop.scrollLeft;
    if (left < width * 0.5) jumpWithoutAnimation(left + width);
    if (left > width * 1.5) jumpWithoutAnimation(left - width);
  }, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(placeMiddle));
}

initPortfolioInfiniteLoop();

if (footerObserverTarget) {
  const footerObserver = new IntersectionObserver((entries) => {
    const inView = entries.some((entry) => entry.isIntersecting);
    document.body.classList.toggle("footer-in-view", inView);
    if (!inView) {
      footerWorkshop?.classList.remove("is-expanded");
      document.body.classList.remove("footer-workshop-open");
    }
  }, { threshold: [0.08, 0.28] });
  footerObserver.observe(footerObserverTarget);
}

function setFooterWorkshopExpanded(expanded) {
  if (!footerWorkshop) return;
  footerWorkshop.classList.toggle("is-expanded", expanded);
  document.body.classList.toggle("footer-workshop-open", expanded);
  if (expanded) {
    window.setTimeout(() => {
      window.scrollTo({ top: getSnapTargetTop(footerWorkshop), behavior: "smooth" });
    }, 40);
  }
}

footerWorkshop?.addEventListener("wheel", (event) => {
  if (Math.abs(event.deltaY) < 8) return;
  const expanded = footerWorkshop.classList.contains("is-expanded");
  if (!expanded && event.deltaY > 0) {
    event.preventDefault();
    setFooterWorkshopExpanded(true);
  } else if (expanded && event.deltaY < 0) {
    event.preventDefault();
    setFooterWorkshopExpanded(false);
  }
}, { passive: false });

libraryToggle?.addEventListener("click", () => {
  const expanded = libraryToggle.getAttribute("aria-expanded") === "true";
  setLibraryExpanded(!expanded);
});

libraryOpen?.addEventListener("click", () => {
  const library = document.querySelector("#intelblog-library");
  setLibraryExpanded(true);
  library?.scrollIntoView({ behavior: "smooth", block: "start" });
});

analysisMenuToggle?.addEventListener("click", () => {
  const isOpen = analysisMenuToggle.getAttribute("aria-expanded") === "true";
  analysisMenuToggle.setAttribute("aria-expanded", String(!isOpen));
  if (analysisMenuPanel) analysisMenuPanel.hidden = isOpen;
});

document.addEventListener("click", (event) => {
  if (!analysisMenuToggle || !analysisMenuPanel) return;
  if (event.target.closest(".analysis-menu")) return;
  analysisMenuToggle.setAttribute("aria-expanded", "false");
  analysisMenuPanel.hidden = true;
});

analysisForm?.addEventListener("submit", (event) => {
  event.preventDefault();
});

presenceToggle?.addEventListener("click", () => {
  const online = presenceToggle.getAttribute("aria-pressed") !== "true";
  presenceToggle.setAttribute("aria-pressed", String(online));
  presenceToggle.innerHTML = online ? "<span></span> En ligne" : "<span></span> Hors ligne";
});

widgetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.dataset.widgetSrc;
    const name = button.dataset.widgetName || button.textContent.trim();
    if (!src || !widgetPreviewFrame || !widgetPreviewTitle || !widgetPreviewOpen) return;
    widgetPreviewFrame.src = src;
    widgetPreviewTitle.textContent = name;
    widgetPreviewOpen.href = src;
    widgetPreview?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

menuToggle?.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mobileNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const productPicker = document.querySelector("[data-product-picker]");
const productChoiceModal = document.querySelector("#productChoiceModal");
const productChoiceStatus = document.querySelector("[data-product-status]");
const productChoicePerspective = document.querySelector("[data-product-perspective]");
const productChoiceSelected = document.querySelector("[data-product-selected]");
const productQuestionForm = document.querySelector("[data-product-question-form]");
const productResult = document.querySelector("[data-product-result]");
const productAssessment = document.querySelector("[data-product-assessment]");
const productOffer = document.querySelector("[data-product-offer]");
const productContactForm = document.querySelector("[data-product-contact-form]");
const productModalClose = document.querySelector("[data-product-modal-close]");
const productMaxChoices = 3;
let productSelected = [];
const tarotDigitalCombinations = [
  {
    "combination_key": "image-marque__implantation__storytelling",
    "archetype": "L’Architecte",
    "headline": "L’Architecte — une trajectoire dominée par identité et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Storytelling du site, Image de marque. Il révèle un potentiel fondé sur crédibilité, clarté, différenciation. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Positionnement, narration et architecture éditoriale. + Identité visuelle, design system et cohérence de marque.",
    "score_foundation": 8,
    "score_identity": 11,
    "score_growth": 7,
    "score_innovation": 3
  },
  {
    "combination_key": "diffusion__implantation__storytelling",
    "archetype": "Le Bâtisseur",
    "headline": "Le Bâtisseur — une trajectoire dominée par croissance et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Storytelling du site, Canaux de diffusion. Il révèle un potentiel fondé sur crédibilité, clarté, visibilité. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Positionnement, narration et architecture éditoriale. + Plan de diffusion multicanal et automatisations.",
    "score_foundation": 8,
    "score_identity": 8,
    "score_growth": 10,
    "score_innovation": 4
  },
  {
    "combination_key": "acquisition__implantation__storytelling",
    "archetype": "Le Bâtisseur",
    "headline": "Le Bâtisseur — une trajectoire dominée par croissance et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Storytelling du site, Acquisition client. Il révèle un potentiel fondé sur crédibilité, clarté, conversion. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Positionnement, narration et architecture éditoriale. + Tunnel d’acquisition, CRM, analytics et fidélisation.",
    "score_foundation": 9,
    "score_identity": 8,
    "score_growth": 10,
    "score_innovation": 3
  },
  {
    "combination_key": "crypto__implantation__storytelling",
    "archetype": "Le Bâtisseur",
    "headline": "Le Bâtisseur — une trajectoire dominée par fondations et croissance.",
    "prediction": "Votre tirage associe Implantation internet, Storytelling du site, Crypto transactions. Il révèle un potentiel fondé sur crédibilité, clarté, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Positionnement, narration et architecture éditoriale. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 9,
    "score_identity": 7,
    "score_growth": 7,
    "score_innovation": 7
  },
  {
    "combination_key": "implantation__storytelling__web3",
    "archetype": "L’Architecte",
    "headline": "L’Architecte — une trajectoire dominée par fondations et identité.",
    "prediction": "Votre tirage associe Implantation internet, Storytelling du site, Web3 innovateur. Il révèle un potentiel fondé sur crédibilité, clarté, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Positionnement, narration et architecture éditoriale. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 9,
    "score_identity": 8,
    "score_growth": 7,
    "score_innovation": 7
  },
  {
    "combination_key": "diffusion__image-marque__implantation",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Implantation internet, Image de marque, Canaux de diffusion. Il révèle un potentiel fondé sur crédibilité, différenciation, visibilité. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Identité visuelle, design system et cohérence de marque. + Plan de diffusion multicanal et automatisations.",
    "score_foundation": 7,
    "score_identity": 8,
    "score_growth": 9,
    "score_innovation": 4
  },
  {
    "combination_key": "acquisition__image-marque__implantation",
    "archetype": "Le Bâtisseur",
    "headline": "Le Bâtisseur — une trajectoire dominée par croissance et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Image de marque, Acquisition client. Il révèle un potentiel fondé sur crédibilité, différenciation, conversion. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Identité visuelle, design system et cohérence de marque. + Tunnel d’acquisition, CRM, analytics et fidélisation.",
    "score_foundation": 8,
    "score_identity": 8,
    "score_growth": 9,
    "score_innovation": 3
  },
  {
    "combination_key": "crypto__image-marque__implantation",
    "archetype": "L’Architecte",
    "headline": "L’Architecte — une trajectoire dominée par fondations et identité.",
    "prediction": "Votre tirage associe Implantation internet, Image de marque, Crypto transactions. Il révèle un potentiel fondé sur crédibilité, différenciation, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Identité visuelle, design system et cohérence de marque. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 8,
    "score_identity": 7,
    "score_growth": 6,
    "score_innovation": 7
  },
  {
    "combination_key": "image-marque__implantation__web3",
    "archetype": "L’Architecte",
    "headline": "L’Architecte — une trajectoire dominée par fondations et identité.",
    "prediction": "Votre tirage associe Implantation internet, Image de marque, Web3 innovateur. Il révèle un potentiel fondé sur crédibilité, différenciation, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Identité visuelle, design system et cohérence de marque. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 8,
    "score_identity": 8,
    "score_growth": 6,
    "score_innovation": 7
  },
  {
    "combination_key": "acquisition__diffusion__implantation",
    "archetype": "Le Bâtisseur",
    "headline": "Le Bâtisseur — une trajectoire dominée par croissance et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Canaux de diffusion, Acquisition client. Il révèle un potentiel fondé sur crédibilité, visibilité, conversion. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Plan de diffusion multicanal et automatisations. + Tunnel d’acquisition, CRM, analytics et fidélisation.",
    "score_foundation": 8,
    "score_identity": 5,
    "score_growth": 12,
    "score_innovation": 4
  },
  {
    "combination_key": "crypto__diffusion__implantation",
    "archetype": "Le Bâtisseur",
    "headline": "Le Bâtisseur — une trajectoire dominée par croissance et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Canaux de diffusion, Crypto transactions. Il révèle un potentiel fondé sur crédibilité, visibilité, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Plan de diffusion multicanal et automatisations. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 8,
    "score_identity": 4,
    "score_growth": 9,
    "score_innovation": 8
  },
  {
    "combination_key": "diffusion__implantation__web3",
    "archetype": "Le Bâtisseur",
    "headline": "Le Bâtisseur — une trajectoire dominée par croissance et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Canaux de diffusion, Web3 innovateur. Il révèle un potentiel fondé sur crédibilité, visibilité, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Plan de diffusion multicanal et automatisations. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 8,
    "score_identity": 5,
    "score_growth": 9,
    "score_innovation": 8
  },
  {
    "combination_key": "acquisition__crypto__implantation",
    "archetype": "Le Bâtisseur",
    "headline": "Le Bâtisseur — une trajectoire dominée par croissance et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Acquisition client, Crypto transactions. Il révèle un potentiel fondé sur crédibilité, conversion, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Tunnel d’acquisition, CRM, analytics et fidélisation. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 9,
    "score_identity": 4,
    "score_growth": 9,
    "score_innovation": 7
  },
  {
    "combination_key": "acquisition__implantation__web3",
    "archetype": "Le Bâtisseur",
    "headline": "Le Bâtisseur — une trajectoire dominée par croissance et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Acquisition client, Web3 innovateur. Il révèle un potentiel fondé sur crédibilité, conversion, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Tunnel d’acquisition, CRM, analytics et fidélisation. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 9,
    "score_identity": 5,
    "score_growth": 9,
    "score_innovation": 7
  },
  {
    "combination_key": "crypto__implantation__web3",
    "archetype": "Le Pionnier",
    "headline": "Le Pionnier — une trajectoire dominée par innovation et fondations.",
    "prediction": "Votre tirage associe Implantation internet, Crypto transactions, Web3 innovateur. Il révèle un potentiel fondé sur crédibilité, nouveaux usages, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Audit domaine, architecture web et implantation. + Paiement crypto, wallet et parcours transactionnels. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 9,
    "score_identity": 4,
    "score_growth": 6,
    "score_innovation": 11
  },
  {
    "combination_key": "diffusion__image-marque__storytelling",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par identité et croissance.",
    "prediction": "Votre tirage associe Storytelling du site, Image de marque, Canaux de diffusion. Il révèle un potentiel fondé sur clarté, différenciation, visibilité. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Identité visuelle, design system et cohérence de marque. + Plan de diffusion multicanal et automatisations.",
    "score_foundation": 4,
    "score_identity": 12,
    "score_growth": 10,
    "score_innovation": 4
  },
  {
    "combination_key": "acquisition__image-marque__storytelling",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par identité et croissance.",
    "prediction": "Votre tirage associe Storytelling du site, Image de marque, Acquisition client. Il révèle un potentiel fondé sur clarté, différenciation, conversion. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Identité visuelle, design system et cohérence de marque. + Tunnel d’acquisition, CRM, analytics et fidélisation.",
    "score_foundation": 5,
    "score_identity": 12,
    "score_growth": 10,
    "score_innovation": 3
  },
  {
    "combination_key": "crypto__image-marque__storytelling",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par identité et croissance.",
    "prediction": "Votre tirage associe Storytelling du site, Image de marque, Crypto transactions. Il révèle un potentiel fondé sur clarté, différenciation, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Identité visuelle, design system et cohérence de marque. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 5,
    "score_identity": 11,
    "score_growth": 7,
    "score_innovation": 7
  },
  {
    "combination_key": "image-marque__storytelling__web3",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par identité et croissance.",
    "prediction": "Votre tirage associe Storytelling du site, Image de marque, Web3 innovateur. Il révèle un potentiel fondé sur clarté, différenciation, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Identité visuelle, design system et cohérence de marque. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 5,
    "score_identity": 12,
    "score_growth": 7,
    "score_innovation": 7
  },
  {
    "combination_key": "acquisition__diffusion__storytelling",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Storytelling du site, Canaux de diffusion, Acquisition client. Il révèle un potentiel fondé sur clarté, visibilité, conversion. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Plan de diffusion multicanal et automatisations. + Tunnel d’acquisition, CRM, analytics et fidélisation.",
    "score_foundation": 5,
    "score_identity": 9,
    "score_growth": 13,
    "score_innovation": 4
  },
  {
    "combination_key": "crypto__diffusion__storytelling",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Storytelling du site, Canaux de diffusion, Crypto transactions. Il révèle un potentiel fondé sur clarté, visibilité, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Plan de diffusion multicanal et automatisations. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 5,
    "score_identity": 8,
    "score_growth": 10,
    "score_innovation": 8
  },
  {
    "combination_key": "diffusion__storytelling__web3",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Storytelling du site, Canaux de diffusion, Web3 innovateur. Il révèle un potentiel fondé sur clarté, visibilité, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Plan de diffusion multicanal et automatisations. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 5,
    "score_identity": 9,
    "score_growth": 10,
    "score_innovation": 8
  },
  {
    "combination_key": "acquisition__crypto__storytelling",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Storytelling du site, Acquisition client, Crypto transactions. Il révèle un potentiel fondé sur clarté, conversion, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Tunnel d’acquisition, CRM, analytics et fidélisation. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 6,
    "score_identity": 8,
    "score_growth": 10,
    "score_innovation": 7
  },
  {
    "combination_key": "acquisition__storytelling__web3",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Storytelling du site, Acquisition client, Web3 innovateur. Il révèle un potentiel fondé sur clarté, conversion, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Tunnel d’acquisition, CRM, analytics et fidélisation. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 6,
    "score_identity": 9,
    "score_growth": 10,
    "score_innovation": 7
  },
  {
    "combination_key": "crypto__storytelling__web3",
    "archetype": "L’Alchimiste",
    "headline": "L’Alchimiste — une trajectoire dominée par innovation et identité.",
    "prediction": "Votre tirage associe Storytelling du site, Crypto transactions, Web3 innovateur. Il révèle un potentiel fondé sur clarté, nouveaux usages, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Positionnement, narration et architecture éditoriale. + Paiement crypto, wallet et parcours transactionnels. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 6,
    "score_identity": 8,
    "score_growth": 7,
    "score_innovation": 11
  },
  {
    "combination_key": "acquisition__diffusion__image-marque",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Image de marque, Canaux de diffusion, Acquisition client. Il révèle un potentiel fondé sur différenciation, visibilité, conversion. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Identité visuelle, design system et cohérence de marque. + Plan de diffusion multicanal et automatisations. + Tunnel d’acquisition, CRM, analytics et fidélisation.",
    "score_foundation": 4,
    "score_identity": 9,
    "score_growth": 12,
    "score_innovation": 4
  },
  {
    "combination_key": "crypto__diffusion__image-marque",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Image de marque, Canaux de diffusion, Crypto transactions. Il révèle un potentiel fondé sur différenciation, visibilité, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Identité visuelle, design system et cohérence de marque. + Plan de diffusion multicanal et automatisations. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 4,
    "score_identity": 8,
    "score_growth": 9,
    "score_innovation": 8
  },
  {
    "combination_key": "diffusion__image-marque__web3",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Image de marque, Canaux de diffusion, Web3 innovateur. Il révèle un potentiel fondé sur différenciation, visibilité, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Identité visuelle, design system et cohérence de marque. + Plan de diffusion multicanal et automatisations. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 4,
    "score_identity": 9,
    "score_growth": 9,
    "score_innovation": 8
  },
  {
    "combination_key": "acquisition__crypto__image-marque",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Image de marque, Acquisition client, Crypto transactions. Il révèle un potentiel fondé sur différenciation, conversion, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Identité visuelle, design system et cohérence de marque. + Tunnel d’acquisition, CRM, analytics et fidélisation. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 5,
    "score_identity": 8,
    "score_growth": 9,
    "score_innovation": 7
  },
  {
    "combination_key": "acquisition__image-marque__web3",
    "archetype": "Le Stratège",
    "headline": "Le Stratège — une trajectoire dominée par croissance et identité.",
    "prediction": "Votre tirage associe Image de marque, Acquisition client, Web3 innovateur. Il révèle un potentiel fondé sur différenciation, conversion, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Identité visuelle, design system et cohérence de marque. + Tunnel d’acquisition, CRM, analytics et fidélisation. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 5,
    "score_identity": 9,
    "score_growth": 9,
    "score_innovation": 7
  },
  {
    "combination_key": "crypto__image-marque__web3",
    "archetype": "L’Alchimiste",
    "headline": "L’Alchimiste — une trajectoire dominée par innovation et identité.",
    "prediction": "Votre tirage associe Image de marque, Crypto transactions, Web3 innovateur. Il révèle un potentiel fondé sur différenciation, nouveaux usages, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Identité visuelle, design system et cohérence de marque. + Paiement crypto, wallet et parcours transactionnels. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 5,
    "score_identity": 8,
    "score_growth": 6,
    "score_innovation": 11
  },
  {
    "combination_key": "acquisition__crypto__diffusion",
    "archetype": "L’Explorateur",
    "headline": "L’Explorateur — une trajectoire dominée par croissance et innovation.",
    "prediction": "Votre tirage associe Canaux de diffusion, Acquisition client, Crypto transactions. Il révèle un potentiel fondé sur visibilité, conversion, nouveaux usages. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Plan de diffusion multicanal et automatisations. + Tunnel d’acquisition, CRM, analytics et fidélisation. + Paiement crypto, wallet et parcours transactionnels.",
    "score_foundation": 5,
    "score_identity": 5,
    "score_growth": 12,
    "score_innovation": 8
  },
  {
    "combination_key": "acquisition__diffusion__web3",
    "archetype": "L’Explorateur",
    "headline": "L’Explorateur — une trajectoire dominée par croissance et innovation.",
    "prediction": "Votre tirage associe Canaux de diffusion, Acquisition client, Web3 innovateur. Il révèle un potentiel fondé sur visibilité, conversion, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Plan de diffusion multicanal et automatisations. + Tunnel d’acquisition, CRM, analytics et fidélisation. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 5,
    "score_identity": 6,
    "score_growth": 12,
    "score_innovation": 8
  },
  {
    "combination_key": "crypto__diffusion__web3",
    "archetype": "L’Explorateur",
    "headline": "L’Explorateur — une trajectoire dominée par innovation et croissance.",
    "prediction": "Votre tirage associe Canaux de diffusion, Crypto transactions, Web3 innovateur. Il révèle un potentiel fondé sur visibilité, nouveaux usages, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Plan de diffusion multicanal et automatisations. + Paiement crypto, wallet et parcours transactionnels. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 5,
    "score_identity": 5,
    "score_growth": 9,
    "score_innovation": 12
  },
  {
    "combination_key": "acquisition__crypto__web3",
    "archetype": "L’Explorateur",
    "headline": "L’Explorateur — une trajectoire dominée par innovation et croissance.",
    "prediction": "Votre tirage associe Acquisition client, Crypto transactions, Web3 innovateur. Il révèle un potentiel fondé sur conversion, nouveaux usages, leadership. Votre enjeu n’est pas d’ajouter un outil isolé, mais de relier ces trois leviers dans un même parcours.",
    "opportunity": "Transformer cette combinaison en système mesurable et en parcours client cohérent.",
    "warning": "Le risque serait de traiter ces sujets séparément et de perdre leur effet cumulatif.",
    "cta_label": "Découvrir votre trajectoire digitale",
    "recommended_offer": "Tunnel d’acquisition, CRM, analytics et fidélisation. + Paiement crypto, wallet et parcours transactionnels. + Prototype Web3, identité numérique et expérimentation.",
    "score_foundation": 6,
    "score_identity": 5,
    "score_growth": 9,
    "score_innovation": 11
  }
];
const tarotDigitalCombinationMap = new Map(tarotDigitalCombinations.map((reading) => [reading.combination_key, reading]));
let activeProductReading = null;


function getProductCards() {
  return productPicker ? [...productPicker.querySelectorAll(".product-choice-card")] : [];
}

function updateProductStatus(message) {
  if (!productChoiceStatus) return;
  productChoiceStatus.textContent = message || (productSelected.length + " / " + productMaxChoices + " axes selectionnes");
}

function getProductReading() {
  const key = productSelected.map((card) => card.dataset.productId).sort().join("__");
  return tarotDigitalCombinationMap.get(key) || null;
}

function strongestProductAxis(reading) {
  if (!reading) return "Projet";
  const scores = [
    ["Fondations", reading.score_foundation],
    ["Identite", reading.score_identity],
    ["Croissance", reading.score_growth],
    ["Innovation", reading.score_innovation]
  ];
  return scores.sort((a, b) => b[1] - a[1])[0][0];
}

function buildProductPerspective() {
  activeProductReading = getProductReading();
  if (activeProductReading) {
    return activeProductReading.prediction + " " + activeProductReading.opportunity + " " + activeProductReading.warning;
  }
  const titles = productSelected.map((card) => card.dataset.productTitle);
  return "Votre tirage associe " + titles.join(", ") + ". Il ouvre une lecture digitale a relier dans un parcours client coherent.";
}

function openProductChoiceModal() {
  if (!productChoiceModal) return;
  const readingText = buildProductPerspective();
  const title = productChoiceModal.querySelector("#productChoiceTitle");
  if (title) title.textContent = activeProductReading ? activeProductReading.headline : "Vos 3 cartes ouvrent une lecture.";
  const kicker = productChoiceModal.querySelector(".product-choice-kicker");
  if (kicker) kicker.textContent = activeProductReading ? activeProductReading.archetype : "Tirage Lazy App";
  if (productChoicePerspective) productChoicePerspective.textContent = readingText;
  if (productChoiceSelected) {
    productChoiceSelected.innerHTML = productSelected.map((card) => "<span>" + card.dataset.productTitle + "</span>").join("");
  }
  productQuestionForm?.reset();
  if (productResult) productResult.hidden = true;
  productChoiceModal.classList.add("is-open");
  productChoiceModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("product-modal-open");
}

function closeProductChoiceModal() {
  if (!productChoiceModal) return;
  productChoiceModal.classList.remove("is-open");
  productChoiceModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("product-modal-open");
}

function toggleProductChoice(card) {
  const isSelected = card.classList.contains("is-selected");
  if (isSelected) {
    card.classList.remove("is-selected");
    card.setAttribute("aria-pressed", "false");
    productSelected = productSelected.filter((item) => item !== card);
    updateProductStatus();
    return;
  }
  if (productSelected.length >= productMaxChoices) {
    updateProductStatus("3 cartes maximum : relancez le tirage ou retirez une carte.");
    productChoiceStatus?.classList.add("is-alert");
    window.setTimeout(() => productChoiceStatus?.classList.remove("is-alert"), 520);
    return;
  }
  card.classList.add("is-selected");
  card.setAttribute("aria-pressed", "true");
  productSelected.push(card);
  updateProductStatus();
  if (productSelected.length === productMaxChoices) window.setTimeout(openProductChoiceModal, 520);
}

const productRandomDraw = document.querySelector("[data-product-random-draw]");

if (productPicker) {
  getProductCards().forEach((card) => {
    card.addEventListener("click", () => toggleProductChoice(card));
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggleProductChoice(card);
    });
  });
  productRandomDraw?.addEventListener("click", () => {
    const cards = getProductCards();
    productSelected = [];
    cards.forEach((card) => {
      card.classList.remove("is-selected");
      card.setAttribute("aria-pressed", "false");
    });
    const drawn = [...cards].sort(() => Math.random() - 0.5).slice(0, productMaxChoices);
    drawn.forEach((card, index) => {
      window.setTimeout(() => {
        card.classList.add("is-selected");
        card.setAttribute("aria-pressed", "true");
        productSelected.push(card);
        updateProductStatus();
        if (productSelected.length === productMaxChoices) window.setTimeout(openProductChoiceModal, 620);
      }, index * 220);
    });
  });
  updateProductStatus();
}

productModalClose?.addEventListener("click", closeProductChoiceModal);
productChoiceModal?.addEventListener("click", (event) => {
  if (event.target === productChoiceModal) closeProductChoiceModal();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && productChoiceModal?.classList.contains("is-open")) closeProductChoiceModal();
});

productQuestionForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(productQuestionForm);
  const answers = ["presence", "identite", "suivi", "innovation", "matiere"].map((name) => formData.get(name));
  const ouiCount = answers.filter((answer) => answer === "oui").length;
  const selectedTitles = productSelected.map((card) => card.dataset.productTitle).join(", ");
  const reading = activeProductReading || getProductReading();
  const dominantAxis = strongestProductAxis(reading);
  if (productAssessment) {
    const maturity = ouiCount >= 4
      ? "Votre base semble deja exploitable : il faut maintenant prioriser, mesurer et rendre le parcours plus lisible."
      : ouiCount >= 2
        ? "Votre situation possede deja de la matiere, mais certains liens restent a structurer pour eviter les efforts disperses."
        : "Votre situation est encore ouverte : il faut commencer par rendre les fondations visibles, utiles et testables.";
    productAssessment.textContent = maturity + " Le tirage place l'axe " + dominantAxis + " au centre de la lecture, avec " + selectedTitles + " comme points d'appui.";
  }
  if (productOffer) {
    productOffer.textContent = reading
      ? reading.opportunity + " Lazy App peut intervenir sur : " + reading.recommended_offer + " Vigilance : " + reading.warning
      : "Lazy App peut transformer ce tirage en atelier concret : clarifier les priorites, organiser les preuves, tester le parcours et livrer les briques utiles sans enfermer le projet dans un outil trop lourd.";
  }
  if (productResult) productResult.hidden = false;
});

productContactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  storeReturningVisitorFromForm(productContactForm, "product-perspective-form");
  renderTickerDocuments();
  const data = new FormData(productContactForm);
  const chosen = productSelected.map((card) => card.dataset.productTitle).join(", ");
  const reading = activeProductReading || getProductReading();
  const body = [
    "Bonjour Nicolas,", "", "Je souhaite echanger sur ces axes : " + chosen,
    reading ? "Lecture : " + reading.headline : "",
    reading ? "Offre recommandee : " + reading.recommended_offer : "", "",
    "Demande : " + (data.get("message") || ""),
    "Nom : " + (data.get("nom") || ""),
    "Prenom : " + (data.get("prenom") || ""),
    "Email : " + (data.get("email") || ""),
    "Telephone : " + (data.get("telephone") || ""),
    "Liens utiles : " + (data.get("liens") || ""),
    "Fichiers cloud : " + (data.get("fichiers") || "")
  ].join("\n");
  window.location.href = "mailto:nicolas@lazyapp.fr?subject=" + encodeURIComponent("Demande Lazy App - Produits") + "&body=" + encodeURIComponent(body);
});

prev?.addEventListener("click", () => goCarousel(-1));
next?.addEventListener("click", () => goCarousel(1));

syncSectionFromHash();
requestAnimationFrame(renderCarousel);


const contactModal = document.querySelector("#contactModal");
const contactDialog = document.querySelector(".contact-dialog");
const contactForm = document.querySelector("#contactForm");
const contactStatus = document.querySelector("#contactStatus");
const linkFields = document.querySelector("#linkFields");
const projectFiles = document.querySelector("#projectFiles");
const fileSummary = document.querySelector("#fileSummary");
let lastContactTrigger = null;

function openContactModal() {
  if (!contactModal || !contactDialog) return;
  lastContactTrigger = document.activeElement;
  contactModal.classList.add("is-open");
  contactModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.setTimeout(() => contactDialog.focus(), 20);
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove("is-open");
  contactModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastContactTrigger?.focus) lastContactTrigger.focus();
}

function createLinkRow() {
  const row = document.createElement("div");
  row.className = "link-row";
  row.innerHTML = '<label>Lien<input name="lien[]" type="url" placeholder="https://..."></label><label>Explication<textarea name="lienExplication[]" rows="2" placeholder="Pourquoi ce lien est utile ?"></textarea></label>';
  return row;
}

function ensureEmptyLinkRow() {
  if (!linkFields) return;
  const rows = [...linkFields.querySelectorAll(".link-row")];
  const last = rows[rows.length - 1];
  const input = last?.querySelector('input[name="lien[]"]');
  if (input?.value.trim()) {
    linkFields.appendChild(createLinkRow());
  }
}

function updateFileSummary() {
  if (!projectFiles || !fileSummary) return;
  const files = [...projectFiles.files].map((file) => file.name);
  fileSummary.textContent = files.length
    ? `Fichiers selectionnes : ${files.join(", ")}. Pensez a les joindre dans votre email avant l'envoi.`
    : "Aucun fichier selectionne. Les noms seront repris dans l'email ; vous pourrez joindre les fichiers depuis votre messagerie.";
}

function fieldValue(formData, name) {
  return String(formData.get(name) || "").trim();
}

function buildContactEmail() {
  if (!contactForm) return "";
  const formData = new FormData(contactForm);
  const services = formData.getAll("services").filter(Boolean).join(", ") || "Non precise";
  const links = [...contactForm.querySelectorAll(".link-row")]
    .map((row) => {
      const url = row.querySelector('input[name="lien[]"]')?.value.trim();
      const explanation = row.querySelector('textarea[name="lienExplication[]"]')?.value.trim();
      if (!url && !explanation) return "";
      return `- ${url || "Lien non renseigne"}\n  Explication : ${explanation || "Non precisee"}`;
    })
    .filter(Boolean)
    .join("\n");
  const files = projectFiles ? [...projectFiles.files].map((file) => `- ${file.name}`).join("\n") : "";
  const subject = `Demande Lazy App - ${fieldValue(formData, "prenom")} ${fieldValue(formData, "nom")}`.trim();
  const body = [
    "Bonjour Nicolas,",
    "",
    "Nouvelle demande depuis le site Lazy App.",
    "",
    "COORDONNEES",
    `Nom : ${fieldValue(formData, "nom")}`,
    `Prenom : ${fieldValue(formData, "prenom")}`,
    `Telephone : ${fieldValue(formData, "telephone")}`,
    `Email : ${fieldValue(formData, "email")}`,
    "",
    "SERVICES SOUHAITES",
    services,
    "",
    "LIENS UTILES",
    links || "Aucun lien fourni.",
    "",
    "FICHIERS A JOINDRE",
    files || "Aucun fichier selectionne.",
    `Explication fichiers : ${fieldValue(formData, "fichiersExplication") || "Non precisee"}`,
    "",
    "EXPRESSION LIBRE",
    fieldValue(formData, "souhait"),
    "",
    "La demande sera etudiee et un retour sera fait sous 3 jours ouvres.",
  ].join("\n");
  return `mailto:nicolas@lazyapp.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.querySelectorAll("[data-contact-open]").forEach((button) => {
  button.addEventListener("click", openContactModal);
});

document.querySelectorAll("[data-contact-close]").forEach((button) => {
  button.addEventListener("click", closeContactModal);
});

contactModal?.addEventListener("click", (event) => {
  if (event.target.matches("[data-contact-close]")) closeContactModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && contactModal?.classList.contains("is-open")) closeContactModal();
});

linkFields?.addEventListener("paste", () => window.setTimeout(ensureEmptyLinkRow, 30));
linkFields?.addEventListener("input", (event) => {
  if (event.target.matches('input[name="lien[]"]')) ensureEmptyLinkRow();
});
projectFiles?.addEventListener("change", updateFileSummary);

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  storeReturningVisitorFromForm(contactForm, "playlist-contact-form");
  renderTickerDocuments();
  const mailto = buildContactEmail();
  if (contactStatus) {
    contactStatus.classList.add("is-ready");
    contactStatus.textContent = "Votre messagerie va s'ouvrir avec la demande pre-remplie. Pensez a joindre les fichiers selectionnes avant l'envoi.";
  }
  window.location.href = mailto;
});

// Services 3D orbit - July 2026
const services3dRoot = document.querySelector('[data-services-3d]');
if (services3dRoot) {
  const services3dCards = [...services3dRoot.querySelectorAll('.services-3d-card')];
  const services3dStatus = services3dRoot.querySelector('[data-services-status]');
  const services3dNext = services3dRoot.querySelector('[data-services-next]');
  let services3dIndex = 0;
  let services3dTimer;
  let services3dFastTimer;
  let services3dLastManualAt = 0;
  let services3dTouchStart = null;
  let services3dPhaseTimers = [];

  function services3dDistance(index) {
    const length = services3dCards.length;
    let distance = index - services3dIndex;
    if (distance > length / 2) distance -= length;
    if (distance < -length / 2) distance += length;
    return distance;
  }

  function setServices3dFastMode(fast) {
    services3dRoot.classList.toggle('is-fast-nav', fast);
    window.clearTimeout(services3dFastTimer);
    if (fast) {
      services3dFastTimer = window.setTimeout(() => services3dRoot.classList.remove('is-fast-nav'), 680);
    }
  }

  function clearServices3dPhases() {
    services3dPhaseTimers.forEach((timer) => window.clearTimeout(timer));
    services3dPhaseTimers = [];
    services3dCards.forEach((card) => card.classList.remove("is-entering-main", "is-leaving-main"));
  }

  function markServices3dPhases(previousIndex, nextIndex) {
    if (previousIndex === nextIndex || !services3dCards.length) return;
    clearServices3dPhases();
    const leaving = services3dCards[previousIndex];
    const entering = services3dCards[nextIndex];
    leaving?.classList.add("is-leaving-main");
    entering?.classList.add("is-entering-main");
    const phaseDuration = services3dRoot.classList.contains("is-fast-nav") ? 700 : 1080;
    services3dPhaseTimers.push(window.setTimeout(() => {
      leaving?.classList.remove("is-leaving-main");
      entering?.classList.remove("is-entering-main");
    }, phaseDuration));
  }

  function renderServices3d() {
    const isMobile = window.innerWidth <= 760;
    const isTablet = window.innerWidth <= 1080;
    const spread = isMobile ? 138 : isTablet ? 260 : 390;
    const depthStep = isMobile ? -62 : isTablet ? -100 : -135;
    services3dCards.forEach((card, index) => {
      const distance = services3dDistance(index);
      const side = Math.abs(distance);
      const clamped = Math.max(-3, Math.min(3, distance));
      const isActive = side === 0;
      const title = card.dataset.serviceTitle || "";
      card.style.setProperty("--x", (clamped * spread) + "px");
      card.style.setProperty("--z-depth", (side * depthStep) + "px");
      card.style.setProperty("--side-tilt", (isActive ? 0 : clamped * -7) + "deg");
      card.style.setProperty("--lift", (isActive ? -10 : side === 1 ? 10 : side === 2 ? 28 : 42) + "px");
      card.style.setProperty("--opacity", side > 3 ? 0 : side === 3 ? 0.24 : side === 2 ? 0.38 : isActive ? 1 : 0.58);
      card.style.setProperty("--scale", isActive ? 1.02 : side === 1 ? 0.72 : side === 2 ? 0.56 : 0.46);
      card.style.setProperty("--sat", isActive ? 1.08 : side === 1 ? 0.72 : 0.52);
      card.style.setProperty("--bright", isActive ? 1.08 : side === 1 ? 0.84 : 0.72);
      card.style.setProperty("--z", String(180 - side * 22));
      card.classList.toggle("is-active", isActive);
      card.classList.toggle("is-back-visible", !isActive);
      card.setAttribute("aria-hidden", side > 2 ? "true" : "false");
      card.setAttribute("aria-label", isActive ? title + ", service actif" : title);
    });
    if (services3dStatus) services3dStatus.textContent = services3dCards[services3dIndex]?.dataset.serviceTitle || "";
  }

  function moveServices3d(step, options = {}) {
    const now = performance.now();
    const isManual = options.manual !== false;
    const isFast = isManual && now - services3dLastManualAt < 460;
    if (isManual) services3dLastManualAt = now;
    setServices3dFastMode(isFast);
    const previousIndex = services3dIndex;
    services3dIndex = (services3dIndex + step + services3dCards.length) % services3dCards.length;
    markServices3dPhases(previousIndex, services3dIndex);
    renderServices3d();
  }

  function selectServices3d(index) {
    const now = performance.now();
    const isFast = now - services3dLastManualAt < 460;
    services3dLastManualAt = now;
    setServices3dFastMode(isFast);
    const previousIndex = services3dIndex;
    services3dIndex = index;
    markServices3dPhases(previousIndex, services3dIndex);
    renderServices3d();
  }

  function scheduleServices3d() {
    clearInterval(services3dTimer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) services3dTimer = setInterval(() => moveServices3d(1, { manual: false }), 8200);
  }

  services3dNext?.addEventListener("click", () => { moveServices3d(1); scheduleServices3d(); });
  services3dCards.forEach((card, index) => {
    card.addEventListener("click", () => { selectServices3d(index); scheduleServices3d(); });
  });

  services3dRoot.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    services3dTouchStart = touch ? { x: touch.clientX, y: touch.clientY, time: performance.now() } : null;
  }, { passive: true });

  services3dRoot.addEventListener('touchend', (event) => {
    if (!services3dTouchStart) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - services3dTouchStart.x;
    const dy = touch.clientY - services3dTouchStart.y;
    const elapsed = performance.now() - services3dTouchStart.time;
    services3dTouchStart = null;
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.25 || elapsed > 720) return;
    moveServices3d(dx < 0 ? 1 : -1);
    scheduleServices3d();
    if (event.cancelable) event.preventDefault();
  }, { passive: false });

  services3dRoot.addEventListener("mouseenter", () => clearInterval(services3dTimer));
  services3dRoot.addEventListener("mouseleave", scheduleServices3d);
  window.addEventListener("resize", renderServices3d);
  renderServices3d();
  scheduleServices3d();
}
// End Services 3D orbit

// Section practical scroll assist - July 2026
const sectionSnapTargets = observedSections.filter((section) => section.id || section.dataset.section === "top");
let sectionTouchStart = null;
let sectionSnapLockedUntil = 0;
let sectionWheelTimer = 0;
let sectionWheelIntent = null;
const sectionSnapGap = 8;

function getCssPixels(name) {
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(name);
  return Number.parseFloat(value) || 0;
}

function getVisibleChromeHeight() {
  const tickerHeight = document.body.classList.contains("ticker-collapsed") ? 0 : getCssPixels("--ticker-current-height");
  return tickerHeight + getCssPixels("--header-current-height");
}

function getSnapTargetTop(section) {
  return Math.max(0, window.scrollY + section.getBoundingClientRect().top - getVisibleChromeHeight() - sectionSnapGap);
}

function getSectionTop(section) {
  return window.scrollY + section.getBoundingClientRect().top;
}

function getNearestSnapIndex(referenceOffset = 0.28) {
  const reference = window.scrollY + getVisibleChromeHeight() + window.innerHeight * referenceOffset;
  return sectionSnapTargets.reduce((nearestIndex, section, index) => {
    const currentDistance = Math.abs(getSectionTop(section) - reference);
    const nearestDistance = Math.abs(getSectionTop(sectionSnapTargets[nearestIndex]) - reference);
    return currentDistance < nearestDistance ? index : nearestIndex;
  }, 0);
}

function isScrollableElement(element) {
  if (!element || element === document.body || element === document.documentElement) return false;
  const style = window.getComputedStyle(element);
  const canScrollY = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 2;
  const canScrollX = /(auto|scroll)/.test(style.overflowX) && element.scrollWidth > element.clientWidth + 2;
  return canScrollY || canScrollX;
}

function shouldRespectNativeScroll(event) {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return true;
  if (target.closest("input, textarea, select, button, summary, [contenteditable], .radio-widget, .contact-modal, .mobile-nav, .product-choice-modal, .services-3d, .carousel-shell, .intelblog-grid, .portfolio-grid, .visit-recap-modal")) return true;
  let node = target;
  while (node && node !== document.body) {
    if (isScrollableElement(node)) return true;
    node = node.parentElement;
  }
  return false;
}

function updateSectionPreviewBlur() {
  const activeIndex = getNearestSnapIndex(0.2);
  sectionSnapTargets.forEach((section) => section.classList.remove("section-preview-blur"));
  const next = sectionSnapTargets[activeIndex + 1];
  const current = sectionSnapTargets[activeIndex];
  if (!next || !current) return;
  const chrome = getVisibleChromeHeight();
  const currentRect = current.getBoundingClientRect();
  const nextRect = next.getBoundingClientRect();
  const currentStillOwnsViewport = currentRect.top <= chrome + 18 && currentRect.bottom > chrome + window.innerHeight * 0.38;
  const nextIsPreview = nextRect.top < window.innerHeight - 24 && nextRect.top > chrome + 24;
  if (currentStillOwnsViewport && nextIsPreview) next.classList.add("section-preview-blur");
}

function assistedSnapToIndex(targetIndex) {
  const target = sectionSnapTargets[targetIndex];
  if (!target) return false;
  sectionSnapLockedUntil = performance.now() + 540;
  window.scrollTo({ top: getSnapTargetTop(target), behavior: "smooth" });
  const sectionName = target.dataset.section || target.id || "top";
  const nextHash = sectionName === "top" ? "#top" : "#" + sectionName;
  if (location.hash !== nextHash) history.replaceState(null, "", nextHash);
  setActiveSection(sectionName);
  window.setTimeout(() => {
    sectionSnapLockedUntil = 0;
    updateSectionPreviewBlur();
  }, 560);
  return true;
}

function completeWheelTurbo() {
  const intent = sectionWheelIntent;
  sectionWheelIntent = null;
  if (!intent || performance.now() < sectionSnapLockedUntil) return;
  const direction = intent.delta > 0 ? 1 : -1;
  const currentIndex = getNearestSnapIndex(direction > 0 ? 0.18 : 0.08);
  const targetIndex = Math.min(sectionSnapTargets.length - 1, Math.max(0, currentIndex + direction));
  if (targetIndex === currentIndex) return;

  const strongSingleMove = Math.abs(intent.maxDelta) >= 68;
  const steadyIntent = Math.abs(intent.delta) >= 128 && intent.events <= 8;
  const sectionEdge = direction > 0
    ? sectionSnapTargets[targetIndex].getBoundingClientRect().top < window.innerHeight * 0.78
    : sectionSnapTargets[targetIndex].getBoundingClientRect().bottom > getVisibleChromeHeight() + window.innerHeight * 0.18;

  if ((strongSingleMove || steadyIntent) && sectionEdge) assistedSnapToIndex(targetIndex);
}

function handleAssistedWheel(event) {
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || shouldRespectNativeScroll(event)) return;
  if (performance.now() < sectionSnapLockedUntil) return;
  if (!sectionWheelIntent || Math.sign(sectionWheelIntent.delta) !== Math.sign(event.deltaY)) {
    sectionWheelIntent = { delta: 0, maxDelta: 0, events: 0 };
  }
  sectionWheelIntent.delta += event.deltaY;
  sectionWheelIntent.maxDelta = Math.max(sectionWheelIntent.maxDelta, Math.abs(event.deltaY));
  sectionWheelIntent.events += 1;
  window.clearTimeout(sectionWheelTimer);
  sectionWheelTimer = window.setTimeout(completeWheelTurbo, 74);
}

// Collection More expansion - July 2026
const sectionMoreButtons = [...document.querySelectorAll("[data-section-more]")];
sectionMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.sectionMore;
    const section = targetId ? document.getElementById(targetId) : button.closest(".content-section");
    if (!section) return;
    const expanded = section.classList.toggle("is-expanded");
    button.setAttribute("aria-expanded", String(expanded));
    if (expanded) window.scrollTo({ top: getSnapTargetTop(section), behavior: "smooth" });
  });
});
// End Collection More expansion

window.addEventListener("wheel", handleAssistedWheel, { passive: true });
window.addEventListener("scroll", updateSectionPreviewBlur, { passive: true });
window.addEventListener("resize", updateSectionPreviewBlur);
requestAnimationFrame(updateSectionPreviewBlur);

window.addEventListener("touchstart", (event) => {
  const touch = event.changedTouches[0];
  sectionTouchStart = touch ? { y: touch.clientY, time: performance.now(), startIndex: getNearestSnapIndex(0.18), target: event.target } : null;
}, { passive: true });

window.addEventListener("touchend", (event) => {
  if (!sectionTouchStart || shouldRespectNativeScroll({ target: sectionTouchStart.target })) return;
  const touch = event.changedTouches[0];
  if (!touch) return;
  const distance = sectionTouchStart.y - touch.clientY;
  const elapsed = performance.now() - sectionTouchStart.time;
  const startIndex = sectionTouchStart.startIndex;
  sectionTouchStart = null;
  const isFastSwipe = Math.abs(distance) >= 70 && elapsed <= 420;
  if (!isFastSwipe || performance.now() < sectionSnapLockedUntil) return;
  const direction = distance > 0 ? 1 : -1;
  const targetIndex = Math.min(sectionSnapTargets.length - 1, Math.max(0, startIndex + direction));
  if (targetIndex !== startIndex) assistedSnapToIndex(targetIndex);
}, { passive: true });
// End Section practical scroll assist

// Visit memory for widgets and realisations - July 2026
(() => {
  const storageKey = "lazyapp_visit_memory";
  const modal = document.getElementById("visitRecapModal");
  const list = modal?.querySelector("[data-visit-recap-list]");
  const trigger = document.querySelector("[data-visit-recap-open]");
  if (!modal || !list || !trigger) return;

  function readMemory() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeMemory(items) { localStorage.setItem(storageKey, JSON.stringify(items.slice(-12))); }
  function refreshTrigger() { trigger.hidden = readMemory().length === 0; }
  function recordVisit(kind, title, href, prompt = "A preciser ensemble") {
    const items = readMemory().filter((item) => item.href !== href || item.kind !== kind);
    items.push({ kind, title, href, prompt, at: Date.now() });
    writeMemory(items);
    refreshTrigger();
  }
  function itemTypeLabel(kind) { return kind === "widget" ? "Widget consulte" : "Realisation visitee"; }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"\']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "\'": "&#39;" }[char] || char));
  }
  function renderList() {
    const items = readMemory().slice(-8).reverse();
    list.innerHTML = items.length ? items.map((item, index) => {
      const title = escapeHtml(item.title);
      const prompt = escapeHtml(item.prompt || "Voir l'element");
      const href = escapeHtml(item.href);
      return `<article class="visit-recap-item"><div><span>${itemTypeLabel(item.kind)}</span><strong>${title}</strong></div><div><span>Trace utile</span><a href="${href}" target="_blank" rel="noreferrer">${prompt}</a></div><div class="visit-recap-vote" aria-label="Avis sur ${title}"><label><input type="radio" name="visit-${index}" value="aime"> Aime</label><label><input type="radio" name="visit-${index}" value="pas-encore"> A retravailler</label></div></article>`;
    }).join("") : "<p>Aucun widget ou realisation n'a encore ete consulte depuis cette session.</p>";
  }
  function openModal() { renderList(); modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); modal.querySelector(".visit-recap-dialog")?.focus(); }
  function closeModal() { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); }
  document.querySelectorAll(".widget-open-link").forEach((link) => {
    link.addEventListener("click", () => {
      const card = link.closest(".widget-carousel-card");
      const title = card?.querySelector("h3")?.textContent?.trim() || link.textContent.trim();
      recordVisit("widget", title, link.getAttribute("href") || "#", "Widget original / prompt / version deployee");
    });
  });
  document.querySelectorAll(".site-preview, .site-card-link").forEach((link) => {
    link.addEventListener("click", () => {
      const card = link.closest(".site-card");
      const title = card?.querySelector("h3")?.textContent?.trim() || link.textContent.trim();
      const family = card?.querySelector(".work-kicker")?.textContent?.trim() || "Projet";
      recordVisit("realisation", title, link.getAttribute("href") || "#", family);
    });
  });
  trigger.addEventListener("click", openModal);
  modal.querySelectorAll("[data-visit-recap-close]").forEach((button) => button.addEventListener("click", closeModal));
  modal.querySelector("[data-visit-recap-clear]")?.addEventListener("click", () => { localStorage.removeItem(storageKey); closeModal(); refreshTrigger(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });
  refreshTrigger();
})();
// End Visit memory
