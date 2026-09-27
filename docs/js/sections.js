/* =============================================================
   sections.js — renders the narrative sections from resume-data.json:
   problems, leadership loop + principles, capability pillars, the
   NIST CSF 2.0 practice matrix, stack groups, credential mapping,
   forward-looking focus, education note, and GitHub repo cards.
   ============================================================= */

(function () {
  const esc = (t) => String(t == null ? "" : t)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const M = () => window.MOTION || { reduce: true, onView: (el, cb) => cb(el) };

  const ICONS = {
    merge: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="4"/><circle cx="8" cy="32" r="4"/><circle cx="32" cy="20" r="5"/><path d="M12 9c8 1 10 6 15 10M12 31c8-1 10-6 15-10"/></svg>',
    trim: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="6" width="8" height="8" rx="1"/><rect x="16" y="6" width="8" height="8" rx="1" stroke-dasharray="2 2" opacity=".5"/><rect x="28" y="6" width="8" height="8" rx="1" stroke-dasharray="2 2" opacity=".5"/><rect x="4" y="18" width="8" height="8" rx="1" stroke-dasharray="2 2" opacity=".5"/><rect x="16" y="18" width="8" height="8" rx="1"/><rect x="28" y="18" width="8" height="8" rx="1" stroke-dasharray="2 2" opacity=".5"/><path d="M4 33h32" /><path d="M30 30l6 3-6 3"/></svg>',
    shield: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 4l13 5v10c0 8-6 14-13 17C13 33 7 27 7 19V9z"/><path d="M14 20l4 4 8-9"/></svg>',
    pulse: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h8l3-8 5 16 4-12 3 4h11"/><circle cx="20" cy="20" r="17" opacity=".35"/></svg>',
  };

  function problems(d) {
    const host = document.getElementById("problem-grid");
    if (!host || !d.problems) return;
    host.innerHTML = d.problems.map((p) => `
      <article class="problem reveal">
        <div class="p-icon" aria-hidden="true">${ICONS[p.icon] || ICONS.shield}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.body)}</p>
        <div class="p-proof">${esc(p.proof)}</div>
      </article>`).join("");
  }

  /* ---- Leadership: an interactive delivery loop that cycles through the steps ---- */
  function leadership(d) {
    const L = d.leadership;
    if (!L) return;
    const intro = document.getElementById("approach-intro");
    if (intro) intro.textContent = L.intro;

    const fig = document.getElementById("loop-fig");
    if (fig && L.loop) {
      const n = L.loop.length, R = 142, C = 200;
      const cls = (o) => (/^me$/i.test(o) ? "me" : /\+/.test(o) ? "both" : "eng");
      const pos = L.loop.map((_, i) => {
        const a = (-90 + (360 / n) * i) * Math.PI / 180;
        return { x: C + R * Math.cos(a), y: C + R * Math.sin(a), deg: (360 / n) * i };
      });
      fig.innerHTML = `
        <svg viewBox="-10 -10 420 420" role="img" aria-label="Delivery loop: ${L.loop.map((s) => esc(s.step)).join(", ")}">
          <circle class="lp-ring" cx="${C}" cy="${C}" r="${R}"/>
          <g class="lp-orbit" id="lp-orbit"><circle class="lp-pulse" cx="${C}" cy="${C - R}" r="6"/></g>
          <text class="lp-center-k" x="${C}" y="${C - 6}">TEAM-OWNED</text>
          <text class="lp-center-k" x="${C}" y="${C + 10}">DELIVERY</text>
          ${L.loop.map((s, i) => `
            <g class="lp-node ${cls(s.owner)}" data-i="${i}" tabindex="0" role="button" aria-label="${esc(s.step)} — ${esc(s.owner)}: ${esc(s.text)}">
              <circle cx="${pos[i].x}" cy="${pos[i].y}" r="40"/>
              <text class="lp-step" x="${pos[i].x}" y="${pos[i].y + 1}">${esc(s.step)}</text>
              <text class="lp-owner" x="${pos[i].x}" y="${pos[i].y + 15}">${esc(s.owner)}</text>
            </g>`).join("")}
        </svg>
        <figcaption class="loop-caption" id="loop-caption" aria-live="polite"></figcaption>
        <div class="loop-key" aria-hidden="true"><span class="k-eng">engineers</span><span class="k-both">shared</span><span class="k-me">me</span></div>`;

      const orbit = fig.querySelector("#lp-orbit");
      const cap = fig.querySelector("#loop-caption");
      const nodes = [...fig.querySelectorAll(".lp-node")];
      let cur = 0, turns = 0, timer = null;
      function activate(i, user) {
        if (i < cur && !user) turns++;
        cur = i;
        nodes.forEach((g, k) => g.classList.toggle("is-active", k === i));
        const deg = pos[i].deg + turns * 360;
        orbit.style.transform = `rotate(${deg}deg)`;
        const s = L.loop[i];
        cap.innerHTML = `<b>${esc(s.step)} · ${esc(s.owner)}</b><br>${esc(s.text)}`;
      }
      function auto() {
        if (M().reduce) return;
        stopAuto();
        timer = setInterval(() => { if (!document.hidden) activate((cur + 1) % n); }, 2600);
      }
      function stopAuto() { if (timer) clearInterval(timer); timer = null; }
      nodes.forEach((g, i) => {
        const pick = () => { stopAuto(); activate(i, true); };
        g.addEventListener("click", pick);
        g.addEventListener("focus", pick);
        g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
      });
      fig.addEventListener("mouseleave", auto);
      activate(0);
      M().onView(fig, auto, 0.4);
    }

    const pr = document.getElementById("principles");
    if (pr && L.principles) {
      pr.innerHTML = L.principles.map((p) => `
        <div class="principle reveal"><h3>${esc(p.t)}</h3><p>${esc(p.b)}</p></div>`).join("");
    }
  }

  /* ---- Capabilities: five pillars with evidence + tools ---- */
  function capabilities(d) {
    const host = document.getElementById("cap-grid");
    if (!host || !d.capabilities) return;
    host.innerHTML = d.capabilities.map((c, i) => `
      <article class="cap reveal" style="--c:${c.color}">
        <h3><small>0${i + 1}</small>${esc(c.title)}</h3>
        <ul>${c.evidence.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
        <div class="cap-tools">${c.tools.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </article>`).join("");
  }

  /* ---- NIST CSF 2.0 practice matrix ---- */
  function csf(d) {
    const host = document.getElementById("csf");
    const C = d.csf;
    if (!host || !C) return;
    const intro = document.getElementById("csf-intro");
    if (intro) intro.textContent = C.intro;
    const capBy = Object.fromEntries((d.capabilities || []).map((c) => [c.key, c]));
    const LEVEL = ["—", "supporting", "active", "core responsibility"];
    let html = `<div class="csf-h" role="columnheader"></div>` +
      C.functions.map((f) => `<div class="csf-h" role="columnheader"><b>${f.k}</b><span>${esc(f.name)}</span></div>`).join("");
    C.rows.forEach((r, ri) => {
      const cap = capBy[r.cap] || { title: r.cap };
      html += `<div class="csf-r" role="rowheader">${esc(cap.title)}</div>`;
      r.v.forEach((v, ci) => {
        const f = C.functions[ci];
        const note = C.notes[`${r.cap}:${f.k}`];
        const label = `${cap.title} × ${f.name}: ${LEVEL[v]}${note ? ". " + note : ""}`;
        html += `<div class="csf-c${note ? " has-note" : ""}" role="cell" tabindex="0" data-l="${v}"
                  style="--d:${ri + ci}" aria-label="${esc(label)}" data-detail="${esc(label)}"></div>`;
      });
    });
    host.innerHTML = html;
    host.insertAdjacentHTML("afterend", `<div class="csf-legend" aria-hidden="true">
      <span><i style="background:rgba(0,229,255,0.16)"></i>supporting</span>
      <span><i style="background:rgba(0,229,255,0.38)"></i>active</span>
      <span><i style="background:linear-gradient(135deg,#00e5ff,#39ff14)"></i>core responsibility</span></div>`);
    const detail = document.getElementById("csf-detail");
    host.querySelectorAll(".csf-c").forEach((cell) => {
      const show = () => { if (detail) detail.textContent = "› " + cell.dataset.detail; };
      cell.addEventListener("mouseenter", show);
      cell.addEventListener("focus", show);
    });
    M().onView(host, () => host.classList.add("play"), 0.3);
  }

  function stack(d) {
    const host = document.getElementById("stack-groups");
    if (!host || !d.techStack) return;
    host.innerHTML = Object.entries(d.techStack).map(([g, items]) => `
      <div class="stack-group"><h4>${esc(g)}</h4>
        <ul>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("");
  }

  function certMap(d) {
    const host = document.getElementById("cert-map");
    if (!host || !d.certMap) return;
    host.innerHTML = d.certMap.map((c) => `
      <div class="cv-item"><span class="cv-tag">${esc(c.tag)}</span><span class="cv-text">${esc(c.text)}</span></div>`).join("");
  }

  function focus(d) {
    const host = document.getElementById("focus");
    const F = d.focus;
    if (!host || !F) return;
    host.innerHTML = `<h3>${esc(F.title)}</h3><p class="focus-note">// ${esc(F.note)}</p>
      <div class="focus-grid">${F.items.map((i) => `
        <div class="focus-item"><b>${esc(i.t)}</b><span>${esc(i.b)}</span></div>`).join("")}</div>`;
  }

  function education(d) {
    const el = document.getElementById("edu-note");
    if (!el || !d.education) return;
    el.innerHTML = "Education: " + d.education.map((e) =>
      `<b>${esc(e.program)}</b>, ${esc(e.school)} (${esc(e.location)})`).join(" · ") + ".";
  }

  /* ---- GitHub: grouped repo cards (this section previously never rendered) ---- */
  function repos(d) {
    const G = d.github;
    const host = document.getElementById("repos-groups");
    if (!host || !G) return;
    const intro = document.getElementById("repos-intro");
    if (intro) intro.textContent = G.intro;
    host.innerHTML = G.groups.map((g) => `
      <div class="repo-group">
        <h3>// ${esc(g.name)}</h3>
        <div class="repo-grid">${g.repos.map((r) => `
          <a class="repo reveal${r.flagship ? " flagship" : ""}" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
            ${r.flagship ? '<span class="r-flag">FLAGSHIP</span>' : ""}
            <div class="r-head"><span class="r-name">${esc(r.name)}</span><span class="r-lang">${esc(r.lang)}</span></div>
            <p class="r-blurb">${esc(r.blurb)}</p>
            <p class="r-why">${esc(r.why)}</p>
          </a>`).join("")}</div>
      </div>`).join("");
  }

  document.addEventListener("resume:ready", (ev) => {
    const d = ev.detail;
    problems(d); leadership(d); capabilities(d); csf(d); stack(d);
    certMap(d); focus(d); education(d); repos(d);
  });
})();
