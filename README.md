<div align="center">

# Philip Stiber · CISSP, CISM

### Cybersecurity Leadership · IT Infrastructure Management · M&A Technology Integration

[![CISSP](https://img.shields.io/badge/CISSP-(ISC)%C2%B2-39ff14?style=for-the-badge&labelColor=05080d)](https://www.isc2.org/)
[![CISM](https://img.shields.io/badge/CISM-ISACA-ffb000?style=for-the-badge&labelColor=05080d)](https://www.isaca.org/credentialing/cism)
[![Location](https://img.shields.io/badge/Peterborough-ON,_Canada-00e5ff?style=for-the-badge&labelColor=05080d)](#)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-pstiber-bd00ff?style=for-the-badge&logo=linkedin&labelColor=05080d)](https://www.linkedin.com/in/pstiber/)

**🔗 [Launch the interactive portfolio →](https://philliamviber.github.io/Resume/)**

*A BloodHound-style, force-directed map of a 15-year cybersecurity and infrastructure career.*

</div>

---

## 🎯 Summary

Seasoned **CISSP- and CISM-certified** cybersecurity and IT infrastructure leader with extensive global experience securing and optimizing complex enterprise environments. Proven expertise in **post-merger technology integration**, **governance, risk & compliance (incl. SOX ITGC)**, and **business continuity & disaster recovery**. I align cybersecurity and infrastructure strategy with business objectives to enhance resilience, compliance, and operational efficiency — and lead high-performing, cross-functional teams that deliver secure, scalable solutions across multinational organizations.

---

## 📊 Impact at a glance

| Metric | Result |
|---|---|
| 🔀 **M&A integrations** | **10** acquired orgs integrated in **12 months** |
| 🍺 **Market outcome** | Helped make Tilray Beverages the **#4 craft brewer in the U.S.** |
| ⚡ **Facility takeover** | **4** AB InBev production facilities in **90 days** |
| 🔁 **Migration sprint** | **6** Molson Coors migrations in **60 days** |
| 👥 **Identity** | **6** Entra tenant-to-tenant migrations · **900+** employees onboarded |
| 🖥️ **Greenfield rebuild** | **350+** endpoints & servers reimaged |
| 🚨 **Continuity** | **160** staff moved remote in **48 hours** (COVID-19) |
| 🌐 **Scope** | Team of **10** supporting **65+** plants, brew pubs & offices across NA & Europe |

---

## 🕸️ The interactive portfolio

This repo is also a **GitHub Pages site** that renders the resume as a living, explorable map — built in the spirit of the [OSINT Framework](https://osintframework.com) and [BloodHound](https://github.com/SpecterOps/BloodHound) attack-path graphs.

| Section | What it shows |
|---|---|
| 🔗 **[Career Graph](https://philliamviber.github.io/Resume/#graph)** | Force-directed "attack path": **operator → engagements → objectives → capabilities → credentials**. Drag, zoom, search, and filter. |
| 🛰️ **[Skill Radar](https://philliamviber.github.io/Resume/#radar)** | Spider chart of 8 capability domains. |
| 🔥 **[Proficiency Heatmap](https://philliamviber.github.io/Resume/#radar)** | Per-skill signal-meter grid. |
| 🧰 **[Tech Arsenal](https://philliamviber.github.io/Resume/#cloud)** | Weighted word cloud of platforms & languages. |
| 🧭 **[Timeline](https://philliamviber.github.io/Resume/#timeline)** | The career kill-chain, 2010 → today. |

> 💡 Want more visuals? See **[DESIGNS.md](DESIGNS.md)** — a catalog of ~30 marketable, cyber-themed design concepts (Sankey, chord, MITRE ATT&CK matrix, geo-map, 3D graph, and more) ready to bolt on.

---

## 🧑‍💻 Experience

**Tilray Brands Inc.** — *IT Infrastructure Manager* · Toronto, ON · Jul 2023 – Present
Global infrastructure & high-tempo M&A integration for a multinational beverage/cannabis enterprise. Led 10 acquisition integrations, AB InBev & Molson Coors takeovers, 6 Entra tenant migrations, and a 10-person team across 65+ sites.

**Baker Tilly KDN LLP** — *Information Technology Manager* · Courtice, ON · Jan 2019 – Feb 2023
Matured the security program (CIS controls, firm-wide Palo Alto NGFW, threat hunting), rebuilt AD/O365 greenfield (300 endpoints + 50 servers), and ran the 48-hour COVID-19 remote-work cutover for 160 staff.

**Collins Barrow Durham LLP** — *IT Systems Administrator* · Courtice, ON · Nov 2017 – Jan 2019
Exchange→O365 migration, full Hyper-V virtualization, GPO/Windows hardening, and merger due-diligence prep.

**Complete Sentient Information Systems** — *IT Systems Technical Consultant* · Oshawa, ON · May 2016 – Nov 2017
AD/Exchange migrations, virtualization, and O365 deployments for legal, CPA, and SMB clients across the eastern GTA.

**Bogart & Daugherty Consulting** — *IT Consultant* · Sarasota, FL · Apr 2010 – Sep 2014
Exchange/BES/AD/Windows migrations, MSP escalation, and support for 30+ legal line-of-business applications.

*Full role detail lives on the [live site](https://philliamviber.github.io/Resume/#experience) and in [`docs/data/resume-data.json`](docs/data/resume-data.json).*

---

## 🎓 Education & Certifications

- **CISSP** — (ISC)² · Issued Jun 2023
- **CISM** — ISACA · Issued Jun 2024
- Coursework in **Computer Engineering** — University of South Florida (Tampa, FL)
- Coursework in **Network Engineering & Windows Server Administration** — State College of Florida (Bradenton, FL)

---

## 🛠️ Tech stack

**Enterprise:** Active Directory · Exchange · Hyper-V · VMware · ServiceNow · Cisco Meraki
**Cloud:** Microsoft 365 · Azure IaaS · Azure Arc · Okta · Duo · Entra ID
**Security:** Palo Alto NGFW · NIST 800-53 · SOX ITGC · CIS Controls
**Scripting:** PowerShell · SQL · KQL · WMI · Python

---

## 🚀 Run it locally

The site is fully static and **offline-capable** (libraries are vendored in [`docs/vendor/`](docs/vendor/)). Because it loads JSON via `fetch()`, serve it over HTTP rather than opening the file directly:

```bash
cd docs
python -m http.server 8000
# then open http://localhost:8000
```

### Enable GitHub Pages (one-time)

**Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/docs` → Save.**
The site then publishes to **https://philliamviber.github.io/Resume/**.

---

## 📁 Repository structure

```
Resume/
├── README.md                # you are here
├── DESIGNS.md               # ~30 visual concept ideas
├── LICENSE                  # MIT
└── docs/                    # GitHub Pages root
    ├── index.html           # single-page interactive site
    ├── css/style.css        # dark red-team / BloodHound theme
    ├── js/
    │   ├── main.js          # data loader + hero/stats/timeline/experience
    │   ├── graph.js         # force-directed career graph (vis-network)
    │   ├── radar.js         # skill radar (Chart.js)
    │   ├── heatmap.js       # proficiency heatmap (CSS grid)
    │   └── wordcloud.js     # tech word cloud (wordcloud2.js)
    ├── data/resume-data.json  # single source of truth for ALL visuals
    ├── assets/favicon.svg
    └── vendor/              # vendored libs (offline-capable)
```

**Architecture:** one JSON file feeds every visualization. Update [`docs/data/resume-data.json`](docs/data/resume-data.json) and the whole site re-renders — no code changes needed.

---

<div align="center">
<sub>Built with vanilla HTML/CSS/JS · vis-network · Chart.js · wordcloud2.js · No trackers, no backend.</sub><br>
<sub>📫 <a href="mailto:redacted@example.com">redacted@example.com</a> · <a href="https://www.linkedin.com/in/pstiber/">linkedin.com/in/pstiber</a></sub>
</div>
