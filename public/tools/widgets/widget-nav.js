(function () {
  const widgets = [
    { name: "CryptoClisme", file: "CryptoClisme.html" },
    { name: "Crypto Market Pulse", file: "CryptoMarketPulse.html" },
    { name: "TapeMix", file: "TapeMix.html" },
    { name: "Global ccTLD Globe", file: "GlobalCctldGlobe.html" },
    { name: "Simulateur DCA crypto", file: "crypto-dca-widget.html" },
    { name: "Atelier d'analyse", file: "analyse-textes-widget.html" },
    { name: "Bibliotheque de documents", file: "bibliotheque-documents.html" },
    { name: "Bibliotheque d'articles", file: "library/index.html" }
  ];

  const currentFile = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
  const currentIndex = widgets.findIndex((widget) => widget.file.split("/").pop() === currentFile);
  if (currentIndex < 0 || document.querySelector(".widget-global-nav")) return;

  const previous = widgets[(currentIndex - 1 + widgets.length) % widgets.length];
  const next = widgets[(currentIndex + 1) % widgets.length];
  const isInLibraryFolder = location.pathname.includes("/library/");
  const rootPrefix = isInLibraryFolder ? "../" : "";

  const style = document.createElement("style");
  style.textContent = `
    .widget-global-nav {
      position: fixed;
      z-index: 80;
      left: 50%;
      bottom: 16px;
      display: flex;
      align-items: center;
      gap: 6px;
      max-width: calc(100% - 24px);
      border: 1px solid rgba(222, 218, 210, .9);
      border-radius: 8px;
      background: rgba(255, 255, 255, .92);
      box-shadow: 0 18px 45px rgba(22, 22, 22, .14);
      color: #161616;
      padding: 6px;
      transform: translateX(-50%);
      backdrop-filter: blur(16px);
      font-family: Arial, Helvetica, sans-serif;
    }

    .widget-global-nav a {
      min-height: 34px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 8px;
      color: inherit;
      font-size: 12px;
      font-weight: 800;
      line-height: 1;
      text-decoration: none;
      white-space: nowrap;
      padding: 8px 10px;
    }

    .widget-global-nav a:hover,
    .widget-global-nav a:focus-visible {
      border-color: #dedad2;
      background: #fbfaf7;
      outline: 0;
    }

    .widget-global-nav .hub {
      background: #161616;
      color: #fff;
    }

    @media (max-width: 560px) {
      .widget-global-nav {
        position: static;
        right: auto;
        bottom: auto;
        left: auto;
        width: auto;
        margin: 16px 10px 10px;
        transform: none;
      }

      .widget-global-nav a {
        flex: 1;
        min-width: 0;
        padding: 8px 6px;
      }

      .widget-global-nav .label {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);

  const nav = document.createElement("nav");
  nav.className = "widget-global-nav";
  nav.setAttribute("aria-label", "Navigation entre widgets");
  nav.innerHTML = `
    <a href="${rootPrefix}${previous.file}" title="${previous.name}">Precedent<span class="label">&nbsp;: ${previous.name}</span></a>
    <a class="hub" href="${rootPrefix}index.html">Bibliotheque</a>
    <a href="${rootPrefix}${next.file}" title="${next.name}">Suivant<span class="label">&nbsp;: ${next.name}</span></a>
  `;
  document.body.appendChild(nav);
}());
