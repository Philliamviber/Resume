/* =============================================================
   heatmap.js — proficiency heatmap built with a plain CSS grid
   (no extra library). Each skill gets a 5-cell row; cells light
   up green up to the skill's proficiency, like a signal meter.
   Reads data.skills (name/proficiency) from resume-data.json.
   ============================================================= */

(function () {
  // Map proficiency (1–5) to a glow intensity color.
  function cellColor(level, filled) {
    if (!filled) return { bg: "rgba(57,255,20,0.05)", bd: "rgba(57,255,20,0.10)", glow: "none" };
    const ramp = [
      "#0e3b12", // 1
      "#1c7a1a", // 2
      "#2bbf1f", // 3
      "#39ff14", // 4
      "#aaff5a", // 5
    ];
    const c = ramp[Math.min(level, 5) - 1];
    return { bg: c, bd: c, glow: `0 0 8px ${c}aa` };
  }

  document.addEventListener("resume:ready", (ev) => {
    const data = ev.detail;
    const host = document.getElementById("heatmap");
    if (!host) return;

    // Sort skills strongest-first so the matrix reads top-down.
    const skills = [...data.skills].sort((a, b) => b.proficiency - a.proficiency);

    host.innerHTML = skills.map((s) => {
      const cells = [1, 2, 3, 4, 5].map((lvl) => {
        const filled = lvl <= s.proficiency;
        const c = cellColor(lvl, filled);
        return `<div class="hm-cell" title="${s.name}: ${s.proficiency}/5"
                  style="background:${c.bg};border-color:${c.bd};box-shadow:${c.glow}"></div>`;
      }).join("");
      return `<div class="hm-label">${s.name}</div><div class="hm-row">${cells}</div>`;
    }).join("");
  });
})();
