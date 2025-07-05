import { bangs as coreBangs } from "./bang";
import "./global.css";
import { initTheme, toggleTheme } from "./theme";

// Initialize light/dark theme before rendering anything
initTheme();

function noSearchDefaultPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; position: relative;">
      <div id="header-buttons" style="position: absolute; top: 16px; right: 16px; display: flex; gap: 8px;">
        <button id="theme-toggle" class="header-btn">🌙</button>
        <button id="settings-btn" class="header-btn" aria-label="Settings">
          <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 4.6V4a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
        <button id="bangs-btn" class="header-btn" aria-label="All Bangs">
          <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
      <div class="content-container">
        <h1 style="" >Bangss.xyz</h1>
        <p>DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables <a href="https://duckduckgo.com/bang.html" target="_blank">all of DuckDuckGo's bangs.</a></p>
        <div class="url-container"> 
          <input 
            type="text" 
            class="url-input"
            value="bangg.xyz/?q=%s"
            readonly 
          />
          <button class="copy-button">
            <img src="/clipboard.svg" alt="Copy" />
          </button>
        </div>
      </div>
      <footer class="footer">
        <a href="https://t3.chat" target="_blank">made with ❤️ by</a>
        •
        <a href="https://x.com/theo" target="_blank">gabs</a>
        •
        <a href="https://github.com/t3dotgg/unduck" target="_blank">github</a>
      </footer>
    </div>
  `;

  const copyButton = app.querySelector<HTMLButtonElement>(".copy-button")!;
  const copyIcon = copyButton.querySelector("img")!;
  const urlInput = app.querySelector<HTMLInputElement>(".url-input")!;

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
    copyIcon.src = "/clipboard-check.svg";

    setTimeout(() => {
      copyIcon.src = "/clipboard.svg";
    }, 2000);
  });

  // Setup theme toggle logic
  const themeToggle = app.querySelector<HTMLButtonElement>("#theme-toggle")!;

  // Use CSS variables for stroke color so SVG icon color adapts to theme
  const sunSvg = `<svg width="16" height="16" class="" viewBox="0 0 24 24" fill="none" stroke="var(--text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonSvg = `<svg width="16" height="16" class="" viewBox="0 0 24 24" fill="none" stroke="var(--text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>`;

  const refreshToggleIcon = () => {
    const isDark = document.documentElement.classList.contains("dark");
    themeToggle.innerHTML = isDark ? sunSvg : moonSvg;
  };

  // Add hover effect for theme toggle button
  themeToggle.addEventListener("mouseenter", () => {
    themeToggle.style.background = "var(--copy-button-hover-bg)";
    themeToggle.style.transition = "background 0.2s";
    themeToggle.style.borderRadius = "4px";
  });
  themeToggle.addEventListener("mouseleave", () => {
    themeToggle.style.background = "none";
  });

  themeToggle.addEventListener("click", () => {
    toggleTheme();
    refreshToggleIcon();
  });

  // Initialise the correct icon on first load
  refreshToggleIcon();

  // Settings modal logic
  const settingsBtn = app.querySelector<HTMLButtonElement>("#settings-btn")!;

  let modal = document.querySelector<HTMLDivElement>("#settings-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "settings-modal";
    modal.innerHTML = `
      <div class="settings-content">
        <button class="close-btn" aria-label="Close">&times;</button>
        <div class="settings-section">
          <h2>Settings</h2>
          <p>Personalize your Bangss.xyz experience.</p>
        </div>

        <div class="settings-section">
          <h3>Bangs</h3>
          <label for="default-bang">Default Bang</label>
          <input id="default-bang" type="text" placeholder="g" value="${LS_DEFAULT_BANG}" />
          <small>The best way to add new bangs is by submitting them on <a href="https://duckduckgo.com/bang.html" class="inline-link" target="_blank" rel="noopener">DuckDuckGo</a>.</small>
        </div>

        <div class="settings-section">
          <h3>Add Custom Bang</h3>
          <div class="row"><input id="cb-name" placeholder="Bang name" /></div>
          <div class="row"><input id="cb-shortcut" placeholder="Shortcut (e.g. !ddg)" /></div>
          <div class="row"><input id="cb-url" placeholder="Search URL with {{{s}}}" /></div>
          <div class="row"><input id="cb-domain" placeholder="Base domain" /></div>
          <button id="add-bang-btn" class="primary" style="margin-top:8px;">Add Bang</button>
        </div>

        <div class="settings-section">
          <h3>Search History</h3>
          <label><input type="checkbox" class="switch-input" /> Enable Search History</label>
          <button class="primary" style="margin-top:8px;">Clear History</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const closeBtn = modal.querySelector<HTMLButtonElement>(".close-btn")!;

  const openModal = () => modal!.classList.add("open");
  const closeModal = () => modal!.classList.remove("open");

  settingsBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  /* Bangs modal */
  let bangsModal = document.querySelector<HTMLDivElement>("#bangs-modal");
  if (!bangsModal) {
    bangsModal = document.createElement("div");
    bangsModal.id = "bangs-modal";
    bangsModal.innerHTML = `
      <div class="bangs-content">
        <button class="close-btn" aria-label="Close">&times;</button>
        <h2>Your Bangs</h2>
        <div id="bangs-list"></div>
      </div>
    `;
    document.body.appendChild(bangsModal);
  }

  const bangsCloseBtn =
    bangsModal.querySelector<HTMLButtonElement>(".close-btn")!;
  const bangsListDiv = bangsModal.querySelector<HTMLDivElement>("#bangs-list")!;

  const renderBangsList = () => {
    const custom = getCustomBangs();
    const parts: string[] = [];

    if (custom.length === 0) {
      parts.push('<p style="font-size:13px">No custom bangs yet.</p>');
    } else {
      parts.push(
        custom
          .map(
            (b: any, idx: number) => `
        <div class="bang-item">
          <span class="tag">!${b.t}</span>
          <span class="domain">${b.d}</span>
          <button class="action-btn" data-edit="${idx}">Edit</button>
          <button class="action-btn" data-delete="${idx}">Delete</button>
        </div>`
          )
          .join("")
      );
    }

    parts.push(
      '<hr style="border:none;border-top:1px solid var(--url-input-border);" />'
    );

    bangsListDiv.innerHTML = parts.join("");

    // attach event listeners
    bangsListDiv
      .querySelectorAll<HTMLButtonElement>("[data-add]")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const tag = btn.getAttribute("data-add")!;
          const customs = getCustomBangs();
          if (!customs.some((b: any) => b.t === tag)) {
            saveCustomBangs(customs);
            rebuildBangMap();
            renderBangsList();
          }
        });
      });

    bangsListDiv
      .querySelectorAll<HTMLButtonElement>("[data-edit]")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-edit")!, 10);
          const customs = getCustomBangs();
          const target = customs[idx];
          const newUrl = prompt("Edit search URL", target.u) || target.u;
          customs[idx] = { ...target, u: newUrl };
          saveCustomBangs(customs);
          rebuildBangMap();
          renderBangsList();
        });
      });

    // Delete bang buttons
    bangsListDiv
      .querySelectorAll<HTMLButtonElement>("[data-delete]")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-delete")!, 10);
          const customs = getCustomBangs();
          const target = customs[idx];
          const confirmDelete = confirm(`Delete bang !${target.t}?`);
          if (!confirmDelete) return;
          customs.splice(idx, 1);
          saveCustomBangs(customs);
          rebuildBangMap();
          renderBangsList();
        });
      });
  };

  renderBangsList();

  const openBangsModal = () => {
    renderBangsList();
    bangsModal!.classList.add("open");
  };
  const closeBangsModal = () => bangsModal!.classList.remove("open");

  const bangsBtn = app.querySelector<HTMLButtonElement>("#bangs-btn")!;
  bangsBtn.addEventListener("click", openBangsModal);
  bangsCloseBtn.addEventListener("click", closeBangsModal);
  bangsModal.addEventListener("click", (e) => {
    if (e.target === bangsModal) closeBangsModal();
  });

  // Default bang change handling
  const defaultBangInput =
    modal.querySelector<HTMLInputElement>("#default-bang")!;
  defaultBangInput.addEventListener("change", () => {
    const val = defaultBangInput.value.trim().replace(/^!/, "");
    if (!val) return;
    localStorage.setItem("default-bang", val);
    currentDefaultBang = findBangByTag(val) ?? currentDefaultBang;
  });

  // Add bang handler
  const addBangBtn = modal.querySelector<HTMLButtonElement>("#add-bang-btn")!;
  addBangBtn.addEventListener("click", () => {
    const name = (
      modal.querySelector<HTMLInputElement>("#cb-name")!.value || ""
    ).trim();
    let shortcut = (
      modal.querySelector<HTMLInputElement>("#cb-shortcut")!.value || ""
    ).trim();
    const url = (
      modal.querySelector<HTMLInputElement>("#cb-url")!.value || ""
    ).trim();
    const domain = (
      modal.querySelector<HTMLInputElement>("#cb-domain")!.value || ""
    ).trim();

    if (!name || !shortcut || !url || !domain) {
      alert("Please fill all custom bang fields.");
      return;
    }

    shortcut = shortcut.replace(/^!/, "").toLowerCase();

    const customBangs = getCustomBangs();
    if (customBangs.some((b: any) => b.t === shortcut)) {
      alert("Shortcut already exists.");
      return;
    }

    const newBang = { n: name, t: shortcut, u: url, d: domain };
    customBangs.unshift(newBang);
    saveCustomBangs(customBangs);
    rebuildBangMap();
    renderBangsList();

    // Clear inputs & feedback
    modal
      .querySelectorAll<HTMLInputElement>(
        "#cb-name, #cb-shortcut, #cb-url, #cb-domain"
      )
      .forEach((el) => (el.value = ""));
    alert("Custom bang added!");
  });
}

function getCustomBangs() {
  try {
    return JSON.parse(localStorage.getItem("custom-bangs") ?? "[]");
  } catch {
    return [] as any[];
  }
}

function saveCustomBangs(b: any[]) {
  localStorage.setItem("custom-bangs", JSON.stringify(b));
}

export function getAllBangs() {
  return [...getCustomBangs(), ...coreBangs];
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";

type Bang = { t: string; u: string; d: string; n?: string };

let bangMap = new Map<string, Bang>(
  coreBangs.map((b) => [b.t, b] as [string, Bang])
);

function rebuildBangMap() {
  bangMap = new Map<string, Bang>(
    [...coreBangs, ...getCustomBangs()].map((b) => [b.t, b] as [string, Bang])
  );
}

// Build initial map with custom bangs (if any)
rebuildBangMap();

function findBangByTag(tag: string) {
  return bangMap.get(tag);
}

let currentDefaultBang = findBangByTag(LS_DEFAULT_BANG);

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = findBangByTag(bangCandidate ?? "") ?? currentDefaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // If the query is just `!gh`, use `github.com` instead of `github.com/search?q=`
  if (cleanQuery === "")
    return selectedBang ? `https://${selectedBang.d}` : null;

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  incrementSearchCount();
  window.location.replace(searchUrl);
}

doRedirect();

// Render persistent search counter
function getSearchCount() {
  return parseInt(localStorage.getItem("search-count") ?? "0", 10);
}

function incrementSearchCount() {
  const newCount = getSearchCount() + 1;
  localStorage.setItem("search-count", newCount.toString());
}

function renderSearchCounter() {
  let el = document.querySelector<HTMLDivElement>("#search-counter");
  if (!el) {
    el = document.createElement("div");
    el.id = "search-counter";
    el.className = "search-counter";
    document.body.appendChild(el);
  }
  // el.textContent = `search: ${getSearchCount()}`;
}

renderSearchCounter();
