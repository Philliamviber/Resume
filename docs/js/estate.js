/* =============================================================
   estate.js — Global Estate map. A dependency-free SVG world map
   (equirectangular projection) plotting Tilray Brands' operational
   sites across North America and Europe, with glowing markers and
   AutoVPN-style links tracing every site back to the Toronto hub.

   No tile server, no external library — fully offline and on-theme.
   Reads data.estate (intro, summary, projection, sites) from
   resume-data.json. Update that file → the map re-renders.
   ============================================================= */

(function () {
  const SVGNS = "http://www.w3.org/2000/svg";

  // Color + label per site type (echoes the site's neon palette).
  const TYPES = {
    hub:        { color: "#ff2e63", label: "Command center", r: 9 },
    production: { color: "#00e5ff", label: "Brewery / production", r: 6 },
    brewpub:    { color: "#ffb000", label: "Brewpubs", r: 6 },
    cannabis:   { color: "#39ff14", label: "Cannabis facility", r: 5.5 },
  };

  function el(name, attrs) {
    const node = document.createElementNS(SVGNS, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  document.addEventListener("resume:ready", (ev) => {
    const data = ev.detail;
    const estate = data.estate;
    if (!estate) return;

    const intro = document.getElementById("estate-intro");
    if (intro) intro.textContent = estate.intro;

    // Summary stat chips.
    const sum = document.getElementById("estate-summary");
    if (sum && estate.summary) {
      sum.innerHTML = estate.summary.map((s) => `
        <div class="es-chip">
          <span class="es-val">${s.value}</span>
          <span class="es-lbl">${s.label}</span>
        </div>`).join("");
    }

    const markersG = document.getElementById("estate-markers");
    const linksG = document.getElementById("estate-links");
    const info = document.getElementById("estate-info");
    const tip = document.getElementById("estate-tooltip");
    if (!markersG) return;

    // Equirectangular projection: lat/lng -> SVG x/y within the viewBox.
    const p = estate.projection;
    const project = (lat, lng) => ({
      x: ((lng - p.lngMin) / (p.lngMax - p.lngMin)) * p.w,
      y: ((p.latMax - lat) / (p.latMax - p.latMin)) * p.h,
    });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hub = estate.sites.find((s) => s.type === "hub") || estate.sites[0];
    const hubPt = project(hub.lat, hub.lng);

    const defaultInfo = info ? info.innerHTML : "";

    function showDetail(site) {
      const t = TYPES[site.type] || TYPES.production;
      if (info) {
        info.innerHTML =
          `<span class="ei-name" style="color:${t.color}">&#9656; ${site.name}</span>` +
          `<span class="ei-type">${t.label}</span> &mdash; ${site.note}`;
      }
    }
    function clearDetail() { if (info) info.innerHTML = defaultInfo; }

    function moveTip(site, evt) {
      if (!tip) return;
      tip.textContent = site.name;
      tip.style.opacity = "1";
      const host = tip.parentElement.getBoundingClientRect();
      tip.style.left = (evt.clientX - host.left) + "px";
      tip.style.top = (evt.clientY - host.top) + "px";
    }
    function hideTip() { if (tip) tip.style.opacity = "0"; }

    // 1) Draw the hub -> site connection links first (so they sit behind markers).
    estate.sites.forEach((site) => {
      if (site === hub) return;
      const pt = project(site.lat, site.lng);
      // Gentle quadratic curve arcing above the straight line for a network feel.
      const mx = (hubPt.x + pt.x) / 2;
      const my = (hubPt.y + pt.y) / 2 - Math.abs(pt.x - hubPt.x) * 0.12;
      const path = el("path", {
        d: `M${hubPt.x.toFixed(1)},${hubPt.y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`,
        class: "estate-link" + (reduce ? "" : " animate"),
      });
      linksG.appendChild(path);
    });

    // 2) Draw the markers.
    estate.sites.forEach((site) => {
      const t = TYPES[site.type] || TYPES.production;
      const pt = project(site.lat, site.lng);
      const g = el("g", { class: "estate-node", tabindex: "0", role: "button",
        "aria-label": `${site.name} — ${t.label}. ${site.note}` });

      // Soft glow halo.
      g.appendChild(el("circle", { cx: pt.x, cy: pt.y, r: t.r + 6,
        fill: t.color, opacity: "0.12", class: "es-halo" }));
      // Pulsing ring for the hub.
      if (site.type === "hub" && !reduce) {
        g.appendChild(el("circle", { cx: pt.x, cy: pt.y, r: t.r,
          fill: "none", stroke: t.color, "stroke-width": "1.5", class: "es-pulse" }));
      }
      // Core dot.
      g.appendChild(el("circle", { cx: pt.x, cy: pt.y, r: t.r,
        fill: t.color, stroke: "#05080d", "stroke-width": "1.5", class: "es-dot" }));

      const activate = (e) => { showDetail(site); if (e) moveTip(site, e); };
      g.addEventListener("mouseenter", activate);
      g.addEventListener("mousemove", (e) => moveTip(site, e));
      g.addEventListener("mouseleave", () => { clearDetail(); hideTip(); });
      g.addEventListener("focus", () => showDetail(site));
      g.addEventListener("blur", () => { clearDetail(); hideTip(); });
      g.addEventListener("click", () => showDetail(site));
      markersG.appendChild(g);
    });

    // 3) Legend (one key per type actually present).
    const legend = document.getElementById("estate-legend");
    if (legend) {
      const present = [...new Set(estate.sites.map((s) => s.type))];
      legend.innerHTML = present.map((type) => {
        const t = TYPES[type] || TYPES.production;
        return `<span class="es-key"><span class="es-swatch" style="background:${t.color};box-shadow:0 0 8px ${t.color}"></span>${t.label}</span>`;
      }).join("");
    }
  });
})();
