# 🎨 Design Concept Catalog

A menu of **marketable, cyber-themed visual concepts** for this portfolio. The site already ships the ⭐ **Built now** set; the rest are scoped, ready-to-add ideas so the portfolio can keep evolving. Each entry notes the recommended library and the "why it sells."

> Visual language throughout: **dark BloodHound / red-team aesthetic** — near-black canvas, neon green / cyan / amber / red / violet accents, node-and-edge glow, monospace headings.

---

## ⭐ Built now (live on the site)

| # | Concept | Library | Why it sells |
|---|---------|---------|--------------|
| 1 | **Career attack-path node graph** — operator → engagements → objectives → capabilities → credentials, force-directed, drag/zoom/search/filter | vis-network | The BloodHound-style centerpiece; instantly signals "security person" and rewards exploration |
| 2 | **Skill-domain radar / spider chart** — 8 domains scored 0–5 | Chart.js (radar) | One glance = whole capability profile; recruiters love it |
| 3 | **Proficiency heatmap** — per-skill 5-cell signal meter | Vanilla CSS grid | Dense, scannable, zero dependencies |
| 4 | **Tech "arsenal" word cloud** — weighted tooling terms | wordcloud2.js | Keyword-rich (great for ATS skim) and visually punchy |
| 5 | **Impact stat cards** — animated count-up of quantified wins | Vanilla JS | Numbers-first storytelling; the "wow" above the fold |
| 6 | **Career kill-chain timeline** — glowing vertical trajectory | Vanilla CSS/JS | Narrative spine connecting roles to certs |
| 7 | **Terminal / hero boot screen** — `whoami --full` Kali-style prompt | Vanilla CSS | Establishes red-team identity in the first second |
| 8 | **Global estate map** — Tilray's NA + Europe sites on an equirectangular SVG, glowing markers + hub-and-spoke links | Vanilla SVG/JS | Dependency-free, offline; visualizes the scope of operations managed (see #21) |
| 9 | **Certification badge wall + Credly embeds** — CISSP/CISM crests, hover-to-verify issuer logos, cert→work mapping | Credly embed + CSS | Trust signals, independently verifiable (see #28) |

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
| 26 | **Dark / light theme toggle** — "SOC mode" vs "report mode" | CSS variables | Accessibility + recruiter comfort |
| 27 | **Threat-actor profile card** — your bio styled like an APT dossier | CSS | Memorable, shareable, very cyber |
| 28 | **Certification badge wall** — CISSP/CISM crests with verify links | CSS grid | Trust signals, front and center |

---

## 🛠️ Utility & conversion

| # | Concept | Library | Notes |
|---|---------|---------|-------|
| 29 | **Printable / PDF resume view** — one-click clean export | window.print() + print CSS | Recruiters still want a PDF |
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
