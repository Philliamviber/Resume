/* =============================================================
   cases.js — "Selected Work" case files. Each case renders its text
   (problem · constraints · role · team · decisions · outcome) and an
   animated, illustrative SVG diagram that plays when scrolled into view:

     converge — acquired orgs folding into one governed platform
     grid     — a scan retiring two-thirds of a VM estate
     migrate  — phased moves into a landing zone (some still queued)
     chain    — business process → dependency → recovery priority
     code     — an illustrative Bicep template building AVD resources

   Diagrams are deliberately generic: no real names, counts or topology.
   ============================================================= */

(function () {
  const esc = (t) => String(t == null ? "" : t)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const M = () => window.MOTION || { reduce: true, onView: (el, cb) => cb(el) };
  const SVG = (vb, cls, label, body) =>
    `<svg viewBox="${vb}" class="${cls}" role="img" aria-label="${esc(label)}">${body}</svg>`;

  /* ---------- converge ---------- */
  function converge() {
    const hub = { x: 318, y: 125 };
    const orgs = Array.from({ length: 10 }, (_, i) => {
      const a = (-62 + i * (124 / 9)) * Math.PI / 180;
      return { x: 150 - Math.cos(a) * 120, y: 125 + Math.sin(a) * 108 };
    });
    const paths = orgs.map((o) => `M${o.x.toFixed(1)},${o.y.toFixed(1)} C${(o.x + 90).toFixed(1)},${o.y.toFixed(1)} ${hub.x - 90},${hub.y} ${hub.x - 30},${hub.y}`);
    const body = `
      ${paths.map((p, i) => `<path class="dg-edge" style="--i:${i}" d="${p}" id="cv-p${i}"/>`).join("")}
      ${orgs.map((o, i) => `<circle class="dg-node" cx="${o.x.toFixed(1)}" cy="${o.y.toFixed(1)}" r="7"/>`).join("")}
      <polygon class="dg-hub" points="${hex(hub.x, hub.y, 32)}"/>
      <text class="dg-label bright" x="${hub.x}" y="${hub.y - 2}" text-anchor="middle">ONE</text>
      <text class="dg-label bright" x="${hub.x}" y="${hub.y + 11}" text-anchor="middle">PLATFORM</text>
      <text class="dg-label small" x="${hub.x}" y="${hub.y + 50}" text-anchor="middle">Entra ID · M365 · network</text>
      <text class="dg-label small" x="8" y="14">acquired organizations ×10</text>
      <g class="dg-packets"></g>`;
    return {
      svg: SVG("0 0 400 250", "dg-converge", "Illustration: ten acquired organizations converging onto one governed platform", body),
      play(svg) {
        svg.classList.add("play");
        if (M().reduce) return;
        const g = svg.querySelector(".dg-packets");
        // SMIL motion along each edge once the edges have drawn in.
        setTimeout(() => {
          g.innerHTML = paths.map((_, i) => `
            <circle class="dg-packet" r="2.6">
              <animateMotion dur="${(2.2 + (i % 4) * 0.35).toFixed(2)}s" begin="${(i * 0.3).toFixed(1)}s" repeatCount="indefinite">
                <mpath href="#cv-p${i}"/></animateMotion>
            </circle>`).join("");
        }, 1400);
      },
    };
  }
  function hex(cx, cy, r) {
    return Array.from({ length: 6 }, (_, i) => {
      const a = (60 * i - 30) * Math.PI / 180;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  }

  /* ---------- grid ---------- */
  function grid() {
    const cols = 12, rows = 6, s = 20, gap = 6, x0 = 30, y0 = 34;
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ r, c, x: x0 + c * (s + gap), y: y0 + r * (s + gap) });
    // Deterministic pseudo-random choice of the ~1/3 that survive.
    const keep = new Set(cells.map((_, i) => i).filter((i) => ((i * 37 + 11) % 72) < 24));
    const body = `
      <defs><linearGradient id="scanGrad" x1="0" x2="1"><stop offset="0" stop-color="#00e5ff" stop-opacity="0"/><stop offset="1" stop-color="#00e5ff" stop-opacity=".55"/></linearGradient></defs>
      <text class="dg-label small" x="${x0}" y="20">virtual-machine estate</text>
      <text class="dg-label bright dg-count" x="370" y="20" text-anchor="end">100%</text>
      ${cells.map((c, i) => `<rect class="dg-vm" data-k="${keep.has(i) ? 1 : 0}" data-c="${c.c}" x="${c.x}" y="${c.y}" width="${s}" height="${s}" rx="3"/>`).join("")}
      <rect class="dg-scan" x="${x0 - 30}" y="${y0 - 6}" width="30" height="${rows * (s + gap) + 6}"/>
      <text class="dg-label small" x="${x0}" y="222"><tspan fill="#39ff14">■</tspan> retained   <tspan fill="#ff2e63">▢</tspan> retired</text>`;
    return {
      svg: SVG("0 0 400 240", "dg-grid", "Illustration: roughly two-thirds of a virtual-machine estate retired", body),
      play(svg) {
        svg.classList.add("play");
        const vms = [...svg.querySelectorAll(".dg-vm")];
        const count = svg.querySelector(".dg-count");
        const retire = () => { vms.forEach((v) => { if (v.dataset.k === "0") v.classList.add("retired"); }); count.textContent = "~33%"; };
        if (M().reduce) { retire(); return; }
        // Retire column by column in step with the scan line.
        for (let c = 0; c < cols; c++) {
          setTimeout(() => {
            vms.forEach((v) => { if (+v.dataset.c === c && v.dataset.k === "0") v.classList.add("retired"); });
            const left = vms.filter((v) => !v.classList.contains("retired")).length;
            count.textContent = Math.round((left / vms.length) * 100) + "%";
            if (c === cols - 1) setTimeout(() => (count.textContent = "~33%"), 500);
          }, 180 + c * 190);
        }
      },
    };
  }

  /* ---------- migrate ---------- */
  function migrate() {
    const wl = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 26 + (i % 2) * 58, y: 64 + Math.floor(i / 2) * 42 }));
    const dest = [{ x: 262, y: 70 }, { x: 318, y: 70 }, { x: 262, y: 112 }];
    const body = `
      <rect class="dg-box" x="14" y="40" width="130" height="150" rx="10"/>
      <text class="dg-label bright" x="22" y="56">acquired multi-cloud</text>
      <text class="dg-label small" x="22" y="186">AWS · Azure</text>
      <rect class="dg-zone" x="246" y="40" width="140" height="150" rx="10"/>
      <text class="dg-label bright" x="254" y="56">landing zone</text>
      <text class="dg-label small" x="254" y="182">enduring target</text>
      <path class="dg-route" d="M150,212 C200,230 250,230 300,196"/>
      <text class="dg-label small" x="190" y="244">BGP cutover path</text>
      <text class="dg-label small" x="160" y="158">phase 1 ✓</text>
      <text class="dg-label small" x="160" y="174">phase 2 ⋯</text>
      <text class="dg-label small" x="160" y="190">phase 3 queued</text>
      <g class="dg-status"><rect x="296" y="8" width="90" height="20" rx="10" fill="rgba(255,176,0,.12)" stroke="#ffb000"/>
        <text class="dg-label" x="341" y="22" text-anchor="middle" fill="#ffb000">UNDERWAY</text></g>
      ${wl.map((w, i) => `<g class="dg-wl queued" data-i="${i}"><rect x="${w.x}" y="${w.y}" width="48" height="28" rx="5"/>
        <text class="dg-label small" x="${w.x + 24}" y="${w.y + 18}" text-anchor="middle">app ${i + 1}</text></g>`).join("")}`;
    return {
      svg: SVG("0 0 400 250", "dg-migrate", "Illustration: phased migration of workloads into a landing zone, still underway", body),
      play(svg) {
        svg.classList.add("play");
        const g = [...svg.querySelectorAll(".dg-wl")];
        const move = (i, d, state) => {
          const el = g[i];
          el.style.transform = `translate(${d.x - wl[i].x}px, ${d.y - wl[i].y}px)`;
          el.classList.remove("queued"); el.classList.add(state);
        };
        const finish = () => { move(0, dest[0], "landed"); move(1, dest[1], "landed"); g[2].classList.remove("queued"); g[2].classList.add("moving"); g[2].style.transform = `translate(${dest[2].x - wl[2].x}px, ${dest[2].y - wl[2].y}px)`; };
        if (M().reduce) { finish(); return; }
        setTimeout(() => move(0, dest[0], "landed"), 500);
        setTimeout(() => move(1, dest[1], "landed"), 1300);
        setTimeout(() => { g[2].classList.remove("queued"); g[2].classList.add("moving"); g[2].style.transform = `translate(${(dest[2].x - wl[2].x) * 0.55}px, ${(dest[2].y - wl[2].y) * 0.55}px)`; }, 2100);
      },
    };
  }

  /* ---------- chain ---------- */
  function chain() {
    const colX = [18, 150, 282], w = 100, h = 30;
    const cols = [
      ["make", "ship", "sell"],
      ["identity", "network", "ERP / apps"],
      ["tier 1", "tier 2", "tier 3"],
    ];
    const heads = ["business process", "dependencies", "recovery priority"];
    const y = (r) => 58 + r * 54;
    let e = 0;
    const edges = [];
    [[0, 0], [0, 1], [1, 1], [1, 2], [2, 1], [2, 2]].forEach(([a, b]) => edges.push(`<path class="dg-edge" style="--i:${e++}" d="M${colX[0] + w},${y(a) + h / 2} C${colX[0] + w + 20},${y(a) + h / 2} ${colX[1] - 20},${y(b) + h / 2} ${colX[1]},${y(b) + h / 2}"/>`));
    [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]].forEach(([a, b]) => edges.push(`<path class="dg-edge" style="--i:${e++}" d="M${colX[1] + w},${y(a) + h / 2} C${colX[1] + w + 20},${y(a) + h / 2} ${colX[2] - 20},${y(b) + h / 2} ${colX[2]},${y(b) + h / 2}"/>`));
    const body = `
      ${heads.map((t, c) => `<text class="dg-label small" x="${colX[c] + w / 2}" y="36" text-anchor="middle">${t}</text>`).join("")}
      ${edges.join("")}
      ${cols.map((col, c) => col.map((t, r) => `
        <rect class="dg-box" style="--i:${c * 3 + r}" x="${colX[c]}" y="${y(r)}" width="${w}" height="${h}" rx="6"${c === 2 && r === 0 ? ' stroke="#39ff14"' : ""}/>
        <text class="dg-label bright" x="${colX[c] + w / 2}" y="${y(r) + 19}" text-anchor="middle">${t}</text>`).join("")).join("")}
      <text class="dg-label small" x="200" y="236" text-anchor="middle">BIA → dependencies → recovery priorities</text>`;
    return {
      svg: SVG("0 0 400 245", "dg-chain", "Illustration: business processes mapped to dependencies and recovery priorities", body),
      play(svg) { svg.classList.add("play"); },
    };
  }

  /* ---------- code ---------- */
  function code() {
    const L = [
      ['cm', '// illustrative only, not production config'],
      [['kw', 'param '], ['id', 'location '], ['tx', 'string = resourceGroup().location']],
      [['kw', 'resource '], ['id', 'hostPool '], ['str', "'…/hostPools@…'"], ['tx', ' = {']],
      [['tx', '  name: '], ['str', "'hp-avd-pooled'"]],
      [['tx', "  properties: { hostPoolType: "], ['str', "'Pooled'"], ['tx', ' }']],
      [['tx', '}']],
      [['kw', 'resource '], ['id', 'appGroup '], ['str', "'…/applicationGroups@…'"], ['tx', ' = {…}']],
      [['kw', 'resource '], ['id', 'workspace '], ['str', "'…/workspaces@…'"], ['tx', ' = {…}']],
      [['kw', 'module '], ['id', 'sessionHosts '], ['str', "'./hosts.bicep'"], ['tx', ' = {…}']],
    ];
    const line = (l) => Array.isArray(l[0]) ? l.map(([c, t]) => `<tspan class="${c}">${esc(t)}</tspan>`).join("") : `<tspan class="${l[0]}">${esc(l[1])}</tspan>`;
    const res = ["host pool", "app group", "workspace", "session hosts"];
    const body = `
      <rect x="6" y="8" width="258" height="232" rx="8" fill="#060b12" stroke="rgba(0,229,255,.2)"/>
      <text class="dg-label small" x="16" y="24">avd.bicep</text>
      <g class="dg-code">${L.map((l, i) => `<text class="dg-line" style="--i:${i}" x="16" y="${46 + i * 20}">${line(l)}</text>`).join("")}</g>
      <text class="dg-label small" x="280" y="24">deployed</text>
      ${res.map((r, i) => `<g class="dg-res" style="--i:${i}">
        <rect x="280" y="${40 + i * 48}" width="110" height="36" rx="6" fill="rgba(57,255,20,.07)" stroke="#39ff14"/>
        <text class="dg-label bright" x="335" y="${62 + i * 48}" text-anchor="middle">${r}</text></g>`).join("")}`;
    return {
      svg: SVG("0 0 400 250", "dg-code-wrap", "Illustration: an infrastructure-as-code template creating Azure Virtual Desktop resources", body),
      play(svg) { svg.classList.add("play"); },
    };
  }

  const DIAGRAMS = { converge, grid, migrate, chain, code };

  function row(label, value, cls) {
    if (!value || (Array.isArray(value) && !value.length)) return "";
    const v = Array.isArray(value) ? `<ul>${value.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : esc(value);
    return `<div class="case-row${cls ? " " + cls : ""}"><dt>${label}</dt><dd>${v}</dd></div>`;
  }

  document.addEventListener("resume:ready", (ev) => {
    const cases = ev.detail.caseStudies;
    const host = document.getElementById("case-list");
    if (!host || !cases) return;
    const built = [];
    host.innerHTML = cases.map((c, i) => {
      const dg = (DIAGRAMS[c.diagram] || chain)();
      built.push(dg);
      return `
      <article class="case reveal" id="case-${esc(c.id)}" data-idx="0${i + 1}" aria-labelledby="case-${esc(c.id)}-h">
        <figure class="case-fig">${dg.svg}<figcaption>illustrative · not to scale</figcaption></figure>
        <div class="case-body">
          <div class="case-top"><span class="pill ${esc(c.statusKind)}">${esc(c.status)}</span><span class="case-when">${esc(c.when)}</span></div>
          <h3 id="case-${esc(c.id)}-h">${esc(c.title)}</h3>
          <p class="case-sum">${esc(c.summary)}</p>
          <div class="case-metrics">${(c.metrics || []).map((m) => `<div class="cm"><span class="cm-v">${esc(m.v)}</span><span class="cm-l">${esc(m.l)}</span></div>`).join("")}</div>
          <dl class="case-rows">
            ${row("Problem", c.problem)}
            ${row("My role", c.role)}
            ${row("Outcome", c.outcome, "outcome")}
          </dl>
          <details>
            <summary>full case file: constraints · team · decisions</summary>
            <dl class="case-rows">
              ${row("Constraints", c.constraints)}
              ${row("The team", c.team)}
              ${row("Decisions", c.decisions)}
            </dl>
          </details>
        </div>
      </article>`;
    }).join("");

    host.querySelectorAll(".case").forEach((el, i) => {
      const svg = el.querySelector(".case-fig svg");
      M().onView(el.querySelector(".case-fig"), () => built[i].play(svg), 0.45);
    });
  });
})();
