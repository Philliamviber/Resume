/* =============================================================
   main.js — shared bootstrap.
   Loads resume-data.json ONCE, stashes it on window.RESUME, then
   renders the parts that are plain HTML (hero, stat cards, timeline,
   experience). The chart modules (graph/radar/heatmap/wordcloud)
   wait for the same data via the "resume:ready" event.

   Beginner note: every visual reads from ONE json file, so updating
   your resume = editing docs/data/resume-data.json only.
   ============================================================= */

window.RESUME = null;

/* Tiny count-up animation for the impact stat cards. */
function countUp(el, target, prefix, suffix) {
  const dur = 1100;
  const start = performance.now();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { el.textContent = `${prefix || ""}${target}${suffix || ""}`; return; }
  function tick(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);            // ease-out cubic
    const val = Math.round(target * eased);
    el.textContent = `${prefix || ""}${val}${suffix || ""}`;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* Reveal stat numbers when they scroll into view. */
function wireImpact(data) {
  const grid = document.getElementById("impact-grid");
  if (!grid) return;
  data.impact.forEach((s) => {
    const card = document.createElement("div");
    card.className = "stat";
    card.innerHTML = `<div class="num" data-target="${s.value}">0</div>
                      <div class="lbl">${s.label}</div>`;
    grid.appendChild(card);
    card._stat = s;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const numEl = e.target.querySelector(".num");
      const s = e.target._stat;
      countUp(numEl, s.value, s.prefix, s.suffix);
      io.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  grid.querySelectorAll(".stat").forEach((c) => io.observe(c));
}

function renderHero(data) {
  const sum = document.getElementById("hero-summary");
  if (sum) sum.textContent = data.profile.summary;
}

function renderTimeline(data) {
  const host = document.getElementById("timeline-list");
  if (!host) return;
  host.innerHTML = data.timeline.map((t) => `
    <div class="tl-item">
      <span class="dot-node"></span>
      <div class="yr">${t.year}</div>
      <div class="tl-title">${t.title}</div>
      <div class="tl-org">${t.org}</div>
    </div>`).join("");
}

function renderExperience(data) {
  const host = document.getElementById("exp-list");
  if (!host) return;
  host.innerHTML = data.experience.map((x) => `
    <article class="exp-card">
      <div class="exp-head">
        <div>
          <h3>${x.company}</h3>
          <span class="exp-role">${x.role}</span> &middot;
          <span class="exp-when">${x.location}</span>
        </div>
        <span class="exp-when">${x.tenure}</span>
      </div>
      <p class="exp-summary">${x.summary}</p>
      <ul>${x.achievements.map((a) => `<li>${a}</li>`).join("")}</ul>
    </article>`).join("");
}

/* Boot: fetch data, render HTML parts, broadcast to chart modules. */
async function boot() {
  try {
    const res = await fetch("data/resume-data.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    window.RESUME = data;

    renderHero(data);
    wireImpact(data);
    renderTimeline(data);
    renderExperience(data);

    // Let the visualization modules know data is ready.
    document.dispatchEvent(new CustomEvent("resume:ready", { detail: data }));
  } catch (err) {
    console.error("Failed to load resume-data.json:", err);
    const sum = document.getElementById("hero-summary");
    if (sum) {
      sum.textContent =
        "Data failed to load. If you opened index.html directly via file://, run a local server " +
        "(e.g. `python -m http.server` inside /docs) so fetch() can read the JSON.";
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
