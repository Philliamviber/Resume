# 🎨 Design Concept Catalog

A menu of **marketable, cyber-themed visual concepts** for this portfolio. The site already ships the ⭐ **Built now** set; the rest are scoped, ready-to-add ideas so the portfolio can keep evolving. Each entry notes the recommended library and the "why it sells."

> Visual language throughout: **dark "SOC console"** — near-black canvas, cyan / green primary accents (blue-team), amber for "in progress", red reserved for alerts and retired items, violet for credentials; monospace kickers, node-and-edge glow.
>
> Rules for every visual: data comes from `resume-data.json`; status is always honest (delivered / underway / ongoing); diagrams of real work are **illustrative, generic and labelled as such** — no real names, counts, topology or counterparties; all motion respects `prefers-reduced-motion` and pauses off-screen.

---

## ⭐ Built now (live on the site, v3)

| # | Concept | Library | Why it sells |
|---|---------|---------|--------------|
| 1 | **Hero network canvas** — drifting nodes, links, travelling packets, scan rings; reacts to the cursor | Canvas 2D | Motion-graphic "video" feel with zero video weight |
| 2 | **Status boot log** — `[ OK ]` / `[RUN]` lines for delivered vs underway work | Vanilla JS/CSS | Cyber-native way to state honest status up front |
| 3 | **Status ticker** — SOC-style marquee of outcomes | CSS | Scannable proof, pauses on hover |
| 4 | **Decrypt text** — hero role cycling + section headings resolve from glyphs | Vanilla JS | Kinetic "graphic text", screen-reader safe |
| 5 | **Statement typography** — the hook as large gradient-highlighted type with a scan sweep | CSS | The thesis in one glance |
| 6 | **Case-file diagrams** — converge (M&A), VM-grid retirement scan, phased migration, BIA→recovery chain, Bicep build | SVG + SMIL/CSS | Shows the mechanism of each case, animated on scroll |
| 7 | **Delivery loop** — interactive ring showing who owns each step (engineers / shared / me) | SVG | Makes the leadership model visible |
| 8 | **NIST CSF 2.0 practice matrix** — capability areas × Govern…Recover | CSS grid | Blue-team fluency; explicitly "practice, not compliance" |
| 9 | **Career graph** — roles → outcomes → capabilities → credentials | vis-network | The BloodHound-style signature piece |
| 10 | **Skill radar** — 8 self-assessed domains | Chart.js | One-glance profile |
| 11 | **Impact counters + profile facts** | Vanilla JS | Numbers-first, delivered outcomes only |
| 12 | **Timeline rail + experience cards** with hover-to-reveal business impact | Vanilla | Narrative spine + the "so what" |
| 13 | **Integration portfolio brand wall** | Vanilla | Tangible proof of M&A scope |
| 14 | **Credential wall + Credly embeds** | Credly | Independently verifiable |
| 15 | **Field Footprint maps** | SVG (d3-geo at build time) | Geographic reach |
| 16 | **Printable résumé + PDF** | Print CSS + Chromium | Recruiters still need a document |

Retired in v3: proficiency heatmap (duplicated the radar) and tech word cloud (replaced by grouped, ATS-legible stack chips).

---

## 🧩 Graph & network variations

| # | Concept | Library | Notes |
|---|---------|---------|-------|
| 8 | **Sankey of career flow** — headcount/scope flowing role → role | D3-sankey | Shows scale growth over time |
| 9 | **Chord diagram** — skills ↔ roles relationships | D3-chord | Beautiful for "which skills powered which jobs" |
| 10 | **Sunburst of competencies** — domain → skill → tool, clickable | D3-hierarchy | Drill-down without leaving the page |
| 11 | **Tool dependency graph** — platforms wired to the projects that used them | Cytoscape.js | Alternate engine if you outgrow vis-network |
| 12 | **3D node graph** — the career map in WebGL space | 3d-force-graph | High-impact demo for senior/architect roles |
| 13 | **Animated packet / path tracer** — a "pulse" that walks the attack path | vis-network + canvas | Motion makes the centerpiece feel alive |
| 14 | **Skill constellation** — skills as stars, lines as relationships | D3 / canvas | Calmer, "night-sky" alternative to the graph |

---

## 📊 Charts & matrices

| # | Concept | Library | Notes |
|---|---------|---------|-------|
| 15 | **MITRE ATT&CK-style competency matrix** — tactics columns, your coverage as filled cells | Vanilla grid | Speaks fluent security; very on-brand |
| 16 | **CVSS-style impact scoring** — each achievement scored on a severity-style gauge | Chart.js / SVG | Reframes wins in security vocabulary |
| 17 | **Radar comparison vs. role benchmark** — your profile overlaid on a target JD | Chart.js (2 datasets) | Tailorable per application |
| 18 | **Gauge / donut sub-charts** — uptime, RTO, integration counts | Chart.js | Executive-dashboard feel |
| 19 | **Activity heat-calendar** — GitHub-style contribution grid of project intensity | Cal-Heatmap | Familiar, recruiter-friendly |
| 20 | **Hex / honeycomb skill grid** — hexagon tiles, color = proficiency | CSS clip-path | Distinctive, modern texture |

---

## 🗺️ Maps & spatial

| # | Concept | Library | Notes |
|---|---------|---------|-------|
| 21 | ⭐ **Geographic estate map** — *built* as a dependency-free SVG (no tile server, stays offline & on-theme) — Tilray sites across NA & Europe, glowing markers + hub-and-spoke links, data-driven from `estate` block | Vanilla SVG/JS | Visualizes the scope of operations managed |
| 22 | **Migration flow map** — arcs showing tenant-to-tenant & datacenter moves | D3 arcs | Tells the M&A integration story spatially |

---

## ✨ Theming, motion & polish

| # | Concept | Library | Notes |
|---|---------|---------|-------|
| 23 | **Typing-effect hero** — role titles cycle with a typewriter cursor | typed.js / vanilla | Cheap motion that reads premium |
| 24 | **Glitch / scanline overlay** — subtle CRT red-team vibe | CSS only | Atmosphere without hurting readability |
| 25 | **Neon grid / parallax background** — animated wireframe floor | CSS / canvas | Synthwave depth behind content |
| 26 | **Dark / light theme toggle** — "SOC mode" vs "report mode" (the résumé page already covers "report mode") | CSS variables | Accessibility + recruiter comfort |
| 27 | **Threat-actor profile card** — your bio styled like an APT dossier | CSS | Memorable, shareable, very cyber |
| 28 | **Certification badge wall** — CISSP/CISM crests with verify links | CSS grid | Trust signals, front and center |

---

## 🛠️ Utility & conversion

| # | Concept | Library | Notes |
|---|---------|---------|-------|
| 29 | ~~Printable / PDF resume view~~ — *built* (`resume.html` + PDF) | print CSS | Recruiters still want a PDF |
| 30 | **QR to LinkedIn / vCard** — scannable hand-off for in-person events | qrcode.js | Bridges digital ↔ physical networking |
| 31 | **Filterable graph legend + URL deep-links** — share a pre-filtered view | History API | "Here's my M&A subgraph" in one link |
| 32 | **JSON-driven everything** — already implemented; one data file feeds all visuals | — | Update once, the whole site re-renders |

---

### How to add one

1. Add/extend the relevant block in [`docs/data/resume-data.json`](docs/data/resume-data.json).
2. Drop a new module in [`docs/js/`](docs/js/) that listens for the `resume:ready` event.
3. Add its section + a `<canvas>`/container to [`docs/index.html`](docs/index.html).
4. Style it with the existing CSS variables in [`docs/css/style.css`](docs/css/style.css).

The architecture is intentionally modular — every visual is independent and reads from the same single source of truth.
