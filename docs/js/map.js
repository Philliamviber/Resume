/* =============================================================
   map.js — "Field Footprint". Renders two dependency-free SVG maps
   (North America + Europe) with glowing neon markers for each region
   where Philip has worked, beside a grouped, scannable city list.
   Hovering/focusing a marker highlights its city group and vice-versa.

   Reads data.footprint (maps -> clusters) from resume-data.json. Each
   cluster carries an x,y already projected into that map's viewBox by
   tools/generate-maps.mjs, so this module does ZERO projection math.
   The base outlines are static SVGs in docs/assets/, fetched once and
   inlined so markers share the outline's coordinate system. Fully
   offline, no libraries, no trackers.
   ============================================================= */

(function () {
  // Marker radius grows gently with how many cities a region represents.
  function radiusFor(count) {
    return Math.round((6 + Math.sqrt(count) * 2.6) * 10) / 10;
  }

  // Build the <g> markers for one map's clusters as an SVG string.
  function markersSVG(mapId, clusters) {
    return clusters.map((c) => {
      const key = `${mapId}-${c.id}`;
      const n = c.cities.length;
      const r = radiusFor(n);
      const label = n > 1 ? `${c.label} — ${n} cities` : c.label;
      const badge = n > 1
        ? `<text class="mk-badge" x="${c.x}" y="${c.y + 0.5}">${n}</text>`
        : "";
      return `
        <g class="map-marker" data-key="${key}" tabindex="0" role="button" aria-label="${label}">
          <title>${label}</title>
          <circle class="mk-halo" cx="${c.x}" cy="${c.y}" r="${r + 7}"></circle>
          <circle class="mk-dot"  cx="${c.x}" cy="${c.y}" r="${r}"></circle>
          ${badge}
        </g>`;
    }).join("");
  }

  // Build the grouped, readable city list for all maps.
  function listHTML(maps) {
    return maps.map((m) => {
      const regions = m.clusters.map((c) => {
        const key = `${m.id}-${c.id}`;
        const n = c.cities.length;
        const cities = c.cities.map((city) => `<li>${city}</li>`).join("");
        return `
          <div class="ml-region" data-key="${key}" tabindex="0" role="button"
               aria-label="${c.label}, ${n} ${n === 1 ? "city" : "cities"}">
            <div class="ml-region-head">
              <span class="ml-dot" aria-hidden="true"></span>
              <span class="ml-name">${c.label}</span>
              <span class="ml-count">${n}</span>
            </div>
            <ul class="ml-cities">${cities}</ul>
          </div>`;
      }).join("");
      return `
        <div class="ml-group" data-map="${m.id}">
          <h3 class="ml-title">${m.title}</h3>
          ${regions}
        </div>`;
    }).join("");
  }

  // Load one map's base SVG, inline it, then inject its markers.
  async function mountMap(map) {
    const host = document.getElementById(`map-host-${map.id}`);
    if (!host) return;
    try {
      const res = await fetch(map.asset, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      host.innerHTML = await res.text();
    } catch (err) {
      console.error(`Field Footprint: could not load ${map.asset}`, err);
      host.innerHTML = `<p class="map-fallback">Map unavailable offline.</p>`;
      return;
    }
    const g = host.querySelector(".map-markers");
    if (g) g.innerHTML = markersSVG(map.id, map.clusters);
  }

  document.addEventListener("resume:ready", async (ev) => {
    const fp = ev.detail.footprint;
    const section = document.getElementById("map");
    if (!section) return;
    if (!fp || !fp.maps || !fp.maps.length) { section.hidden = true; return; }

    const intro = document.getElementById("map-intro");
    if (intro && fp.intro) intro.textContent = fp.intro;

    const list = document.getElementById("map-list");
    if (list) list.innerHTML = listHTML(fp.maps);

    // Inline both base maps (in parallel) and inject their markers.
    await Promise.all(fp.maps.map(mountMap));

    // ---- Two-way highlight: marker <-> city group share a data-key ----
    function setActive(key, on) {
      section.querySelectorAll(`[data-key="${key}"]`).forEach((el) => {
        el.classList.toggle("is-active", on);
      });
    }

    const markers = [...section.querySelectorAll(".map-marker")];
    const regions = [...section.querySelectorAll(".ml-region")];

    function wire(el, { scrollList } = {}) {
      const key = el.dataset.key;
      const on = () => {
        setActive(key, true);
        if (scrollList) {
          const li = section.querySelector(`.ml-region[data-key="${key}"]`);
          li?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      };
      const off = () => setActive(key, false);
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
      el.addEventListener("focus", on);
      el.addEventListener("blur", off);
    }

    markers.forEach((m) => wire(m, { scrollList: true }));
    regions.forEach((r) => wire(r));
  });
})();
