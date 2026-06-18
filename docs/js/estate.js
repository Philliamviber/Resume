/* =============================================================
   estate.js — Integration Portfolio. Renders the brand-logo wall,
   public headline stats, and the two acquisition-integration callout
   cards from data.estate (intro, summary, brands, transitions) in
   resume-data.json. Update that file → the section re-renders.

   Replaces the former SVG world map: facility coordinates and internal
   operational notes were dropped so the section shows only publicly
   verifiable brand associations. Dependency-free, fully offline.
   ============================================================= */

(function () {
  // Human label for the optional "acquired via" provenance badge.
  function viaLabel(via) {
    if (via === "anheuser-busch") return "via Anheuser-Busch";
    if (via === "molson-coors") return "via Molson Coors";
    return "";
  }

  document.addEventListener("resume:ready", (ev) => {
    const estate = ev.detail.estate;
    if (!estate) return;

    const intro = document.getElementById("estate-intro");
    if (intro) intro.textContent = estate.intro;

    // Headline stat chips (reuses the .es-chip styling).
    const sum = document.getElementById("estate-summary");
    if (sum && estate.summary) {
      sum.innerHTML = estate.summary.map((s) => `
        <div class="es-chip">
          <span class="es-val">${s.value}</span>
          <span class="es-lbl">${s.label}</span>
        </div>`).join("");
    }

    // Brand logo wall. Each tile renders the logo with a graceful text
    // fallback (the caption) if the asset is missing — so the section
    // works before the press-kit art is dropped into assets/brands/.
    const wall = document.getElementById("brand-wall");
    if (wall && estate.brands) {
      wall.innerHTML = estate.brands.map((b) => {
        const via = b.acquiredVia
          ? `<span class="bt-badge">${viaLabel(b.acquiredVia)}</span>`
          : "";
        // White-knockout marks would vanish on the light card; flag them so
        // CSS recolors them to dark ink.
        const knockout = b.knockout ? " is-knockout" : "";
        return `
        <figure class="brand-tile${knockout}">
          <div class="bt-logo">
            <img src="${b.logo}" alt="${b.name} logo" loading="lazy" decoding="async">
          </div>
          <figcaption class="bt-name">${b.name}</figcaption>
          ${via}
        </figure>`;
      }).join("");

      // If a logo file 404s, flag the tile so CSS shows a clean text chip.
      wall.querySelectorAll(".brand-tile img").forEach((img) => {
        img.addEventListener("error", () => {
          const tile = img.closest(".brand-tile");
          if (tile) tile.classList.add("logo-missing");
        });
      });
    }

    // Acquisition-integration callout cards.
    const tr = document.getElementById("estate-transitions");
    if (tr && estate.transitions) {
      tr.innerHTML = estate.transitions.map((t) => `
        <div class="transition-card">
          <div class="tc-partner">${t.partner}</div>
          <p class="tc-text">${t.text}</p>
        </div>`).join("");
    }
  });
})();
