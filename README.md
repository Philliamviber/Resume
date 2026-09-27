<div align="center">

# Philip Stiber · CISSP, CISM

### Infrastructure & Security Leadership · Secure Enterprise Transformation · Controls & Resilience

[![CISSP](https://img.shields.io/badge/CISSP-(ISC)%C2%B2-39ff14?style=for-the-badge&labelColor=05080d)](https://www.credly.com/badges/e7398140-fb0e-4ce8-86be-ecc8999d3d64/public_url)
[![CISM](https://img.shields.io/badge/CISM-ISACA-ffb000?style=for-the-badge&labelColor=05080d)](https://www.credly.com/badges/af84d868-20c3-43b2-9d26-e2656fb7868a/public_url)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-pstiber-00e5ff?style=for-the-badge&logo=linkedin&labelColor=05080d)](https://www.linkedin.com/in/pstiber/)

**[Portfolio →](https://philliamviber.github.io/Resume/)** · **[Résumé (PDF) →](docs/Philip-Stiber-Resume.pdf)**

</div>

---

## Summary

> A technically grounded infrastructure leader who develops capable teams, directs secure enterprise transformation, and connects architecture, operational resilience and controls to measurable business value.

I lead the global infrastructure team at **Tilray Brands**, a multinational, regulated enterprise that grows by acquisition. My team integrates what the business acquires, retires what it no longer needs, and runs more than 50 of the SOX IT general controls it is audited on. I set direction, challenge designs and weigh cost against risk; experienced engineers own the plans, the delivery and the playbooks.

| Delivered | Underway |
|---|---|
| **10** acquired organizations integrated in 12 months | Phased consolidation of an acquired Azure/AWS estate, targeting a six-figure annual OPEX reduction |
| **900+** employees moved onto unified identity (6 Entra tenant migrations) | Azure Virtual Desktop deployed as code (Bicep) |
| **50+** SOX IT general controls run and maintained | |
| **~⅔** of the virtual-machine estate retired, with a six-figure annual OPEX reduction | IT's GMP compliance work: system validation, ITGCs and RPO/RTO attestations for lab systems and one site's ERP |
| Microsoft CAF program: governed Azure landing zones and a Meraki SD-WAN hub in Azure | |
| **160** staff moved remote in 48 hours (COVID-19) | |

---

## The site

A static, single-page GitHub Pages site with a dark "SOC console" look. One JSON file drives every section.

| Section | What it shows |
|---|---|
| **Hero** | Positioning, a live status log, and an animated network canvas |
| **Profile** | The four business problems I'm brought in to solve |
| **By the numbers** | Delivered outcomes only, plus profile facts |
| **Selected work** | Six case files (problem, constraints, role, team, decisions, outcome) with animated, illustrative diagrams and a delivered / underway / ongoing status on each |
| **Leadership approach** | An interactive delivery loop showing who owns each step |
| **Capabilities** | Five capability areas, a NIST CSF 2.0 practice map, a radar chart and the tooling stack |
| **Career graph** | A BloodHound-style force-directed map of roles, outcomes, capabilities and credentials |
| **Experience** | A timeline rail plus role cards with a hover-to-reveal business impact for each achievement |
| **Credentials** | Credly-verified CISSP and CISM, what each one maps to in the work, and current direction |
| **Résumé** | [`resume.html`](docs/resume.html): an ATS-friendly, print-ready résumé built from the same facts, plus a PDF |

All motion is generated in code (canvas and SVG), with no video files. It pauses when off-screen and turns off completely for visitors who set *prefers-reduced-motion*.

---

## Security and privacy posture

This is a security leader's site, so it holds itself to the same bar:

- **Strict Content-Security-Policy.** Scripts load only from this origin, plus Credly's badge embed. No inline scripts.
- **No trackers, analytics or third-party fonts.** Inter and JetBrains Mono are self-hosted under the SIL OFL.
- **Images are re-encoded without EXIF**, so no GPS, device or timestamp metadata is published. [`tools/check-site.py`](tools/check-site.py) enforces this in CI on every push and PR.
- **No email or phone number** is published. Contact goes through LinkedIn.
- **Case studies are generalized.** They contain no counterparties, run-rates, site names or architecture detail, and projected savings are labelled as targets, never as results.
- **Private working notes** live in a git-ignored `private/` folder and are never committed.

---

## Run it locally

The site fetches its JSON, so serve it over HTTP instead of opening the file directly:

```bash
cd docs
python3 -m http.server 8000
# open http://localhost:8000
```

Before pushing, run the same guard CI runs:

```bash
pip install pillow && python3 tools/check-site.py
```

### Branches

- `main` is what GitHub Pages publishes (**Settings → Pages → Deploy from a branch → `main` / `/docs`**).
- `dev` is where changes are built and reviewed. Merge `dev` into `main` to go live.

---

## Repository layout

```
Resume/
├── README.md
├── DESIGNS.md                 # visual concept catalog (built + backlog)
├── tools/
│   ├── check-site.py          # CI guard: EXIF/GPS, private files, emails, assets, size
│   └── generate-maps.mjs      # build-time only: Field Footprint base maps
├── .github/workflows/         # CodeQL, Trivy, Scorecard, zizmor, site-check, lint
└── docs/                      # GitHub Pages root
    ├── index.html             # single-page portfolio
    ├── resume.html            # print/ATS résumé  → Philip-Stiber-Resume.pdf
    ├── css/                   # style.css (base) · motion.css (sections + motion) · fonts.css · resume.css
    ├── js/
    │   ├── main.js            # data loader, hero, numbers, experience, travel, nav
    │   ├── motion.js          # hero network, boot log, ticker, decrypt text, reveals
    │   ├── sections.js        # problems, leadership loop, capabilities, CSF matrix, repos
    │   ├── cases.js           # case files + animated diagrams
    │   ├── graph.js · radar.js · estate.js · map.js
    ├── data/resume-data.json  # single source of truth for every section
    ├── fonts/                 # self-hosted variable fonts (OFL)
    └── vendor/                # vis-network, Chart.js (vendored, offline-capable)
```

To update the site, edit [`docs/data/resume-data.json`](docs/data/resume-data.json). No code changes are needed.

---

<div align="center">
<sub>Vanilla HTML/CSS/JS · vis-network · Chart.js · No trackers, no backend.</sub>
</div>
