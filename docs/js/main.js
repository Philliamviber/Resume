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
  const p = data.profile;
  const sum = document.getElementById("hero-summary");
  if (sum) sum.textContent = p.summary;
  const hook = document.getElementById("hero-hook");
  if (hook && p.hook) hook.textContent = p.hook;

  // Profile photos: build a rotating stack of real headshots, each with its own
  // face-framing object-position. Falls back to the monogram SVG if none load.
  renderAvatar(p);
}

/* Rotating circular avatar. Loads every photo in profile.photos (each may be a
   string or {src, position} to frame the face), stacks them, and crossfades.
   If no photo loads (e.g. user hasn't added them yet), the placeholder stays. */
function renderAvatar(p) {
  const ring = document.getElementById("avatar-ring");
  if (!ring) return;

  const photos = (p.photos && p.photos.length ? p.photos : (p.photo ? [p.photo] : []))
    .map((x) => (typeof x === "string" ? { src: x, position: "center" } : x));
  if (!photos.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Load all photos first; only swap in the ones that actually exist.
  Promise.all(photos.map((ph) => new Promise((resolve) => {
    const test = new Image();
    test.onload = () => resolve(ph);
    test.onerror = () => resolve(null);
    test.src = ph.src;
  }))).then((loaded) => {
    const ok = loaded.filter(Boolean);
    if (!ok.length) return;                 // keep placeholder

    ring.innerHTML = ok.map((ph, i) => `
      <img class="avatar-photo${i === 0 ? " is-active" : ""}" src="${ph.src}"
           alt="Philip Stiber" style="object-position:${ph.position || "center"}" />`).join("");

    const slides = [...ring.querySelectorAll(".avatar-photo")];
    if (slides.length < 2 || reduce) return; // single photo (or reduced motion) = no rotation

    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove("is-active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("is-active");
    }, 5000);                                // crossfade every 5s
  });
}

function renderCrossing(data) {
  const tag = document.getElementById("about-tagline");
  if (tag && data.profile.tagline) tag.textContent = data.profile.tagline;
  const host = document.getElementById("crossing-grid");
  if (!host || !data.profile.crossing) return;
  host.innerHTML = data.profile.crossing.map((c, i) => `
    <article class="cross-card">
      <div class="x">&#10799; vector_${String(i + 1).padStart(2, "0")}</div>
      <h3>${c.title}</h3>
      <p>${c.body}</p>
    </article>`).join("");
}

function renderRare(data) {
  const host = document.getElementById("rare-grid");
  if (!host || !data.profile.rareStats) return;
  host.innerHTML = data.profile.rareStats.map((r) => `
    <article class="rare-card">
      <div class="fig">${r.figure}</div>
      <div class="rl">${r.label}</div>
      <p class="rn">${r.note}</p>
    </article>`).join("");
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

  // Render one achievement as a keyboard/tap-accessible drill-down.
  // The "impact" (business objective elevated) lives in the DOM so it is
  // visible on hover AND focus, and readable by screen readers / ATS parsers.
  function achievement(a, key) {
    const text = typeof a === "string" ? a : a.text;
    const impact = typeof a === "string" ? "" : (a.impact || "");
    if (!impact) return `<li class="ach"><span class="ach-text">${text}</span></li>`;
    const id = `impact-${key}`;
    return `
      <li class="ach has-impact" tabindex="0" aria-describedby="${id}">
        <span class="ach-text">${text}</span>
        <span class="ach-cue" aria-hidden="true">▸ business impact</span>
        <span class="ach-impact" id="${id}" role="note">
          <span class="ach-impact-label">Business objective elevated</span>${impact}
        </span>
      </li>`;
  }

  // Metric chips: the headline numbers of an engagement, scannable at a glance.
  function metrics(list) {
    if (!list || !list.length) return "";
    return `<div class="brief-metrics">${list.map((m) => `
      <div class="bm">
        <span class="bm-val">${m.value}</span>
        <span class="bm-lbl">${m.label}</span>
      </div>`).join("")}</div>`;
  }

  // Stack tags: the platforms/controls actually used on the engagement.
  function stack(list) {
    if (!list || !list.length) return "";
    return `<div class="brief-stack">
      <span class="bs-label">stack&nbsp;&rsaquo;</span>
      ${list.map((t) => `<span class="bs-tag">${t}</span>`).join("")}
    </div>`;
  }

  // The engagement brief: outcome-first headline, key metrics, the
  // Situation -> Action -> Outcome flow, then the stack exercised.
  function brief(b) {
    if (!b) return "";
    return `
      <div class="brief">
        <div class="brief-kicker">&#9656; engagement brief</div>
        <p class="brief-headline">${b.headline}</p>
        ${metrics(b.metrics)}
        <div class="sao">
          <div class="sao-step sit">
            <span class="sao-num">01</span><span class="sao-label">Situation</span>
            <p>${b.situation}</p>
          </div>
          <div class="sao-arrow" aria-hidden="true">&#10142;</div>
          <div class="sao-step act">
            <span class="sao-num">02</span><span class="sao-label">Action</span>
            <p>${b.action}</p>
          </div>
          <div class="sao-arrow" aria-hidden="true">&#10142;</div>
          <div class="sao-step out">
            <span class="sao-num">03</span><span class="sao-label">Measurable outcome</span>
            <p>${b.outcome}</p>
          </div>
        </div>
        ${stack(b.stack)}
      </div>`;
  }

  host.innerHTML = data.experience.map((x, xi) => `
    <article class="exp-card">
      <div class="exp-head">
        <div>
          <h3>${x.company}</h3>
          <span class="exp-role">${x.role}</span> &middot;
          <span class="exp-when">${x.location}</span>
        </div>
        <span class="exp-when">${x.tenure}</span>
      </div>
      ${brief(x.brief)}
      <div class="exp-detail">
        <div class="exp-detail-label">Detailed wins &mdash; hover or tap any line for its business impact</div>
        <ul class="ach-list">${x.achievements.map((a, ai) => achievement(a, `${xi}-${ai}`)).join("")}</ul>
      </div>
    </article>`).join("");
}

/* Personal travel slideshow: a self-contained carousel built from
   data.travel.slides. Prev/next buttons, clickable dots, keyboard
   arrows, and a pause-on-hover auto-advance. Images lazy-load and the
   whole section hides itself if no travel data is present. */
function renderTravel(data) {
  const t = data.travel;
  const section = document.getElementById("travel");
  if (!section) return;
  if (!t || !t.slides || !t.slides.length) { section.hidden = true; return; }

  const sub = document.getElementById("travel-sub");
  if (sub && t.subtitle) sub.textContent = t.subtitle;

  const stage = document.getElementById("travel-stage");
  const dotsHost = document.getElementById("travel-dots");
  if (!stage) return;

  stage.innerHTML = t.slides.map((s, i) => `
    <figure class="travel-slide${i === 0 ? " is-active" : ""}" data-idx="${i}">
      <img src="${s.src}" alt="${(s.caption || "Travel photo").replace(/"/g, "&quot;")}"
           loading="lazy" decoding="async" />
      <figcaption>${s.caption || ""}</figcaption>
    </figure>`).join("");

  if (dotsHost) {
    dotsHost.innerHTML = t.slides.map((_, i) => `
      <button class="travel-dot${i === 0 ? " is-active" : ""}" data-idx="${i}"
              aria-label="Go to photo ${i + 1} of ${t.slides.length}"></button>`).join("");
  }

  const slides = [...stage.querySelectorAll(".travel-slide")];
  const dots = dotsHost ? [...dotsHost.querySelectorAll(".travel-dot")] : [];
  const counter = document.getElementById("travel-counter");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let idx = 0;
  let timer = null;

  function show(n) {
    idx = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    if (counter) counter.textContent = `${idx + 1} / ${slides.length}`;
  }
  const next = () => show(idx + 1);
  const prev = () => show(idx - 1);

  function startAuto() {
    if (reduce) return;
    stopAuto();
    timer = setInterval(next, 5000);
  }
  function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

  section.querySelector(".travel-next")?.addEventListener("click", () => { next(); startAuto(); });
  section.querySelector(".travel-prev")?.addEventListener("click", () => { prev(); startAuto(); });
  dots.forEach((d) => d.addEventListener("click", () => { show(+d.dataset.idx); startAuto(); }));

  // Keyboard arrows when the carousel is focused.
  const viewport = section.querySelector(".travel-viewport");
  viewport?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { next(); startAuto(); }
    else if (e.key === "ArrowLeft") { prev(); startAuto(); }
  });

  // Pause auto-advance while the visitor is interacting.
  viewport?.addEventListener("mouseenter", stopAuto);
  viewport?.addEventListener("mouseleave", startAuto);
  viewport?.addEventListener("focusin", stopAuto);
  viewport?.addEventListener("focusout", startAuto);

  show(0);
  startAuto();
}

/* Boot: fetch data, render HTML parts, broadcast to chart modules. */
async function boot() {
  try {
    const res = await fetch("data/resume-data.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    window.RESUME = data;

    renderHero(data);
    renderCrossing(data);
    renderRare(data);
    wireImpact(data);
    renderTimeline(data);
    renderExperience(data);
    renderTravel(data);

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
