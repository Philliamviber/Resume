# Professional Notes on Resume Portfolio
## Philip Stiber · CISSP, CISM — Career Brand Review

**Reviewed by:** Senior Resume Consultant  
**Date:** 2026-06-19  
**Source:** `c:\Data\repo\Resume` (all HTML, CSS, JS, JSON, and Markdown files reviewed)  
**Live site:** https://philliamviber.github.io/Resume/

---

## 1. Portfolio Overview

This is a single-page interactive career portfolio hosted on GitHub Pages, built entirely in vanilla HTML, CSS, and JavaScript with three vendored libraries (vis-network, Chart.js, wordcloud2.js). All content is driven from a single data file (`docs/data/resume-data.json`), making it genuinely easy to maintain. There are no trackers, no backend, and no build pipeline — the architecture is intentionally minimal and offline-capable.

The aesthetic is cohesive and deliberate: a dark "BloodHound / red-team" theme (near-black canvas, neon green `#39ff14`, cyan `#00e5ff`, amber `#ffb000`, red `#ff2e63`, violet `#bd00ff`) that directly references the security tooling most hiring managers in this space will recognize. The hero section opens with a styled terminal prompt (`root@stiber-sec: ~/career`), and the career graph is framed as an "attack-path map" — a specific signal to a security-literate audience.

**First-glance professional impression:** Strong and unusual. This portfolio communicates technical fluency the moment it loads — before a recruiter reads a word. The use of vis-network for a force-directed career graph, the animated count-up stat cards, the skill radar and heatmap, and the integration brand wall together create a product that reads more like a security operations dashboard than a resume. For the roles this candidate is targeting — Director of IT, VP of Infrastructure, CISO, Head of M&A Integration — this is exactly the right register.

The repo README and DESIGNS.md are also well-constructed artifacts that signal architectural discipline, which matters to technically literate hiring audiences.

---

## 2. Content Strengths

### Headline credentials
The dual-certification positioning — CISSP (June 2023) and CISM (June 2024) — is a genuine differentiator. The portfolio correctly identifies that fewer than 5% of security practitioners hold both simultaneously, and it explains the division of labor: CISSP validates the builder-and-defender capability, CISM validates the program-governance and executive-facing capability. Both are independently verifiable via live Credly links, which is handled well in the certifications section.

### Quantified achievement density
The impact section leads with six animated metric cards drawn from real work:
- **10 M&A integrations within 12 months**
- **#4 largest U.S. craft brewer enabled**
- **900+ employees onboarded via Entra**
- **350+ endpoints and servers reimaged**
- **160 staff moved remote in 48 hours**
- **65+ sites, brew pubs, and offices supported**

These are specific, verifiable, and attached to business outcomes — not just activity counts. This is the right way to quantify IT leadership.

### The Tilray Brands engagement
This is the portfolio's anchor role and it earns its prominence. The brief's action section reads: "Built and led a 10-person infrastructure team running back-to-back M&A takeovers — AB InBev and Molson Coors plant cutovers, 6 Entra tenant-to-tenant migrations, and AD / Meraki / O365 consolidations — while wiring SOX ITGC, system hardening, and incident response into daily operations." The outcome: "10 organizations integrated within 12 months · 900+ employees onboarded to unified governed identity · 4 production facilities transferred with zero unplanned downtime." This is boardroom-grade storytelling backed by operational specifics.

### Baker Tilly Baker engagement
The COVID-19 continuity story — "160 employees productive remotely within 48 hours by co-authoring the firm's COVID-19 technical strategy with the COO" — is a standout line. Every hiring manager who lived through 2020 understands exactly what that required, and the 48-hour figure is memorable.

### The "Crossing" section
Eight named value propositions, each with a title and explanatory paragraph, replace the generic "skills summary" most resumes carry. Titles like "Build it, then defend it," "Merge companies, not just mailboxes," and "Lead without losing the keyboard" are well-written and specific enough to be differentiated. This section does genuine positioning work.

### Tech stack depth
The stack as listed in `resume-data.json` covers: Active Directory, Microsoft Exchange, Hyper-V, VMware, ServiceNow, Cisco Meraki (enterprise systems); Microsoft 365, Azure IaaS, Azure Arc, Okta, Duo, Entra ID (cloud); Palo Alto NGFW, Microsoft Sentinel, Defender for Endpoint, NIST 800-53, SOX ITGC, CIS Controls, Application Whitelisting, Network Segmentation, Zero Trust (security); PowerShell, SQL, KQL, WMI, Python, Perl, PHP, ASP, C++, Terraform, GitHub Actions (languages and IaC). The breadth is credible given the 15-year trajectory.

### GitHub public work section
Grouping eleven public repositories into three named categories — Security & Detection Engineering, Cloud & Infrastructure as Code, Automation / DevSecOps / Enablement — turns a GitHub profile link into a structured proof-of-work section. The flagship repo callout (`azure-ad-landing-zone` is flagged with `"flagship": true`) is the right move. This section answers the question most executives and senior hiring managers have: "Does this person actually ship things?" The answer provided here is yes, with durable artifacts anyone can inspect.

### The Rare by the Numbers section
Statistic cards including "2-in-1 CISSP + CISM held together," "70–90% of M&A deals miss their goals," "US + CAN authorized to work in both countries," and "2 → 900+ users, two-person office to global enterprise" are effective positioning devices. The dual citizenship point is a concrete operational advantage for cross-border M&A work that most candidates would not think to mention.

### Integration Portfolio (estate section)
Naming and showing logos for 15 craft beer brands integrated across Anheuser-Busch and Molson Coors transactions — SweetWater, Montauk, Breckenridge, Blue Point, 10 Barrel, Redhook, Widmer Brothers, Shock Top, Hiball Energy, Hop Valley, Terrapin, Revolver, Alpine, Green Flash, BrewDog — transforms an abstract claim about M&A scale into a visible, verifiable portfolio. This is a strong differentiator with no direct equivalent in a traditional resume format.

### Travel section context
The White House visit photos and captions (2017) — "At the North Portico of the White House," "Inside the White House James S. Brady Press Briefing Room," "Behind the podium in the West Wing press room" — reinforce the resume's claim about advising "two former U.S. Senators" at Bogart & Daugherty. These are credibility markers, not vanity content, for anyone reading the portfolio carefully.

---

## 3. Career Narrative

### Coherence and arc
The portfolio tells a clear 15-year story from desktop-to-server generalist (Sarasotasupport.com, 2009) through fractional IT leadership (Bogart & Daugherty, Complete Sentient) and into progressively larger organizational responsibility (Collins Barrow, Baker Tilly, Tilray). The certifications — CISSP in 2023, CISM in 2024 — land at exactly the right point in the arc: they formalize what the work had already demonstrated, rather than appearing as credentials acquired before the experience to back them up.

### Central claim
The portfolio's thesis — "Engineer × Security Leader × M&A Integrator — hands-on to boardroom" — is stated in the tagline and substantiated by the evidence. The three-domain positioning is reinforced across every section: the crossing cards, the experience briefs, the graph node types, and the "Rare by the Numbers" section all return to the same argument.

### Roles and industries this positions for
Based on the content, the portfolio is well-aligned for:
- **IT Infrastructure Director / VP of IT** at a mid-to-large enterprise undergoing M&A activity
- **Head of Technology Integration** at a private equity portfolio company or roll-up strategy
- **CISO or Deputy CISO** with dual infrastructure and GRC scope
- **M&A Technology Lead** at a management consulting or Big 4 firm
- **IT Security Manager / Director** at a publicly traded company with SOX obligations

The Tilray Brands role in a CPG / beverage-alcohol context is sector-specific, but the skills it demonstrates (multi-entity tenant consolidation, SOX ITGC, global infrastructure at 65+ sites) transfer cleanly to any regulated industry with M&A activity: healthcare, financial services, professional services, manufacturing.

### Gap in the narrative
The education section lists "Coursework in Computer Engineering — University of South Florida" and "Coursework in Network Engineering & Windows Server Administration — State College of Florida" — neither is a completed degree. The word "coursework" is honest but understated in a portfolio that otherwise speaks with authority. The current phrasing is accurate and appropriate; it should remain as-is rather than be inflated, but the candidate should be prepared for this to surface in screening conversations for roles that filter on formal degree requirements.

---

## 4. Visual and UX Presentation

### What works well

**The terminal hero** is the right first impression for this audience. The Kali-style prompt (`┌──(operator㉿stiber)-[~/career]` and `└─$ whoami --full`) with a blinking cursor, monospace typography, and the candidate's name rendered in `clamp(1.7rem, 4vw, 2.8rem)` font creates an immediate, coherent signal. It is not gimmicky — it is genre-appropriate.

**The rotating avatar** implementation is technically clean: photos crossfade every 5 seconds via CSS `opacity` transitions, face framing is controlled per-image via `object-position` in the data file, and `prefers-reduced-motion` stops the rotation for users who need it. The spectral ring effect (`conic-gradient` rotating behind the circular crop) reinforces the color palette without being distracting.

**The career graph** (vis-network, force-directed) is the signature element and it earns that position. Node types are color-coded (root = red, company = cyan, achievement = green, skill = amber, cert = violet) matching the global palette, search and filter controls are visible and labeled, and clicking a node surfaces detail in a panel below the canvas. The "operator → engagements → objectives → capabilities → credentials" framing is a direct translation of BloodHound's "attack path" concept into career storytelling — a creative and memorable move that will be immediately understood by any security professional and explained well enough in the section header for anyone else.

**The achievement drill-down** — hover or tab-focus any achievement line in the experience section to reveal its "Business objective elevated" panel — is a clever interaction that adds depth without cluttering the default view. The CSS implementation (`max-height` transition from 0 to 320px) is smooth, and the `tabindex="0"` and `aria-describedby` attributes make it keyboard- and screen-reader-accessible.

**The Situation → Action → Outcome brief structure** within each experience card gives each role a narrative structure that goes beyond a bullet list. The outcome cell is visually emphasized with a green top border and glow, which correctly signals that the payoff is the most important element.

**Typography** is well-chosen: Inter (sans-serif) for body, JetBrains Mono for code, numbers, labels, and UI elements. The dual-font system reinforces the "technical person who can also communicate" identity.

**Accessibility** is treated with care: skip link present and functional, `prefers-reduced-motion` respected throughout, ARIA labels on all interactive elements, `role="application"` on the graph canvas with a descriptive label, keyboard navigation on the travel carousel (arrow keys with focus management), screen-reader-readable impact text hidden behind the hover interaction via `role="note"`. These are not afterthoughts.

**The tech-brand background scatter** (`<div class="tech-bg">` with 35 terms at 2.8% opacity) adds atmosphere without competing with readable content — a good judgment call. The opacity value (`opacity: 0.028`) is chosen carefully.

### Areas that need attention

**Mobile navigation** collapses all nav links except `graph` and `linkedin ↗` at 760px. The behavior is implemented correctly (`display: none` on non-`.always` links), but the result is that mobile users lose direct access to sections like `#experience`, `#certs`, `#repos`, and others. A hamburger menu or a horizontal scroll on the nav bar would restore this access without changing the desktop layout.

**The "contact" CTA button in the hero** (`<a class="btn alt" href="https://www.linkedin.com/in/pstiber/">contact</a>`) points to the LinkedIn profile, same as the "view linkedin" button immediately to its left. A visitor clicking "contact" expecting a contact form or email will simply land on LinkedIn — the same destination as the adjacent button. This creates redundancy and wastes a primary CTA slot. The "contact" button should link to a mailto or a LinkedIn messaging URL, or be replaced with a more differentiating action.

**The Credly iframe embeds** in the certifications section depend on an external script (`//cdn.credly.com/assets/utilities/embed.js`) loaded asynchronously. If Credly is slow or the user is offline, the `min-height: 270px` placeholder will render as a blank space. This is a minor risk given the site otherwise vendors all its dependencies, but it is worth noting.

**The chip filter active state** has an incomplete CSS rule: `.chip[data-active="true"] { color: #04210a; }` sets only `color` and not `background` or `border-color`. The active-state styling for chips is applied via JavaScript inline styles in `graph.js`, which means the CSS selector alone does not convey the active state — this is a minor architecture inconsistency that does not break the feature but couples the filter state to JavaScript.

**The `<h3 id="timeline">` in `index.html`** is used as both a semantic heading and an anchor target — but the section's scroll target is `#cloud` (the wrapping section), not `#timeline`. The nav link `<a href="#timeline">` will scroll to the `<h3>` inside the panel, not the section top. This may produce an unexpected visual jump on some browsers.

**No print or PDF export** exists. The DESIGNS.md catalog acknowledges this as item 29 ("Printable / PDF resume view — one-click clean export") and flags it as not yet built. For a portfolio targeting senior hiring managers and recruiters, the absence of a one-click PDF is a real gap — many recruiting workflows require a portable document.

---

## 5. Recommendations

### High priority

**H1. Add a print/PDF stylesheet or one-click PDF export.**  
This is the most consequential missing feature. Many corporate ATS systems and recruiting coordinators need a PDF. The DESIGNS.md catalog already identifies this as item 29. A `@media print` CSS block that hides the graph, travel carousel, and interactive chrome while rendering the text content cleanly would take a few hours to implement and immediately close a practical friction point. Mark it as the next build task.

**H2. Fix the "contact" button destination.**  
The hero CTA row has three buttons: "launch career graph," "view linkedin," and "contact." The "contact" button currently points to the same LinkedIn URL as "view linkedin." Replace it with `mailto:` (if the candidate is comfortable sharing email publicly) or a LinkedIn message URL (`https://www.linkedin.com/messaging/compose?recipient=pstiber`) so the buttons are functionally distinct. A dead or redundant CTA in the hero wastes attention.

**H3. Restore mobile navigation.**  
At 760px the nav collapses to only "graph" and "linkedin." Add a hamburger toggle or a scrollable nav strip so mobile visitors can reach Experience, Certifications, Repos, and other sections without scrolling the entire page to find them. Mobile traffic from recruiter quick-looks on a phone is a realistic scenario and currently underserved.

**H4. Address the education framing proactively.**  
The two education entries read: "Coursework in Computer Engineering" and "Coursework in Network Engineering & Windows Server Administration." This is accurate and honest. The recommendation is not to change the wording — inflation would be a mistake — but to ensure the portfolio's other content makes the case so strongly that the education line becomes a footnote, not a question. The current portfolio largely succeeds at this. Consider adding a one-sentence framing note near the education section such as: "Hands-on certifications from (ISC)² and ISACA supplement formal coursework and reflect the actual validation standard in the field." This preempts the question.

### Medium priority

**M1. Surface a downloadable PDF or printable version before the Credly section.**  
Related to H1. Even before a full print stylesheet is built, a note like "Download PDF resume [link]" somewhere in the certifications or experience section would serve visitors who need a portable artifact.

**M2. Add a MITRE ATT&CK coverage matrix.**  
DESIGNS.md item 15 — a tactics-column grid showing coverage cells. Given the detection engineering work (KQL hunts in Microsoft Sentinel, "coverage mapped to MITRE ATT&CK" per the `crossing` data), this section would be directly evidenced by actual work and would speak fluently to security hiring managers and technical reviewers. It is more relevant to the candidate's actual body of work than several of the other proposed visualizations.

**M3. Add a Radar comparison overlay for target role alignment.**  
DESIGNS.md item 17. If the candidate is actively applying to specific roles, a second dataset on the radar chart showing a target role's benchmark against the current domain scores would be a differentiating feature. Even a static "target: CISO" overlay would make the portfolio more useful as a conversation piece in an interview context.

**M4. Fix the chip active-state CSS.**  
The `.chip[data-active="true"]` rule in `style.css` only sets `color`. Move the active-state background and border styling into CSS to make the behavior fully declarative and remove the dependency on JavaScript inline style assignment. Low effort, improves maintainability.

**M5. Resolve the `#timeline` anchor collision.**  
In `index.html`, `<h3 id="timeline">` and `<div class="timeline" id="timeline-list">` coexist inside the `#cloud` section. The nav link `<a href="#timeline">` targets the `<h3>`, not the section. Rename the h3's `id` to something like `timeline-heading` and confirm the nav anchor points where intended.

### Low priority

**L1. Add a dark/light mode toggle.**  
DESIGNS.md item 26 ("SOC mode vs. report mode"). Not functionally necessary — the dark theme is appropriate and coherent — but some corporate environments have strict light-mode display preferences, and some hiring managers reviewing this on a bright laptop screen will want the option. CSS custom properties are already in `:root`, so implementing a theme toggle is architecturally straightforward.

**L2. Consider a "last updated" indicator.**  
Anywhere on the page that a visitor can see "current as of [month/year]" reduces the implicit question of whether the portfolio is stale. The JSON `end: "present"` on the Tilray role implicitly signals currency, but an explicit timestamp (auto-populated from a `meta` field in the JSON) would remove any doubt.

**L3. Evaluate which travel photos serve the professional story.**  
The travel section includes 30 slides. The White House photos (slides 1–10) are directly connected to the "advised two former U.S. Senators" claim and earn their place. The T-Mobile Park Microsoft suite photo ("Microsoft suite overlooking the field") earns its place as a professional context marker. Several others — "A crisp afternoon in Central Park," "Hockey night in Toronto" — are pleasant but do not add professional credibility. Consider curating the set to 15–20 photos weighted toward location-to-work connections (integration site visits, client locations, conferences).

**L4. Add a brief note explaining the integration portfolio's geographic scope.**  
The estate section shows 15 brand logos and 6 summary stats, but a new visitor may not immediately understand that the Anheuser-Busch and Molson Coors brands represent acquisitions made by Tilray, not the original companies. The two `estate.transitions` callouts explain this, but they appear below the brand wall. A one-sentence explainer at the top of the section — something like "The brands below were acquired by Tilray Brands and integrated onto a single governed platform under my technical leadership" — would remove ambiguity.

---

## 6. Standout Elements

These are the things that would make a hiring manager stop, read more carefully, or share the link.

**The career graph is genuinely memorable.** Most candidates list skills; this one maps them as a force-directed graph with explorable nodes, filter controls, and a click-to-inspect detail panel. The "attack path" framing — operator → engagements → objectives → capabilities → credentials — is not a gimmick; it is a conceptually coherent metaphor that will resonate with anyone who has ever opened BloodHound. It will be discussed in any interview where someone reviews this portfolio in advance.

**The integration portfolio brand wall.** Showing 15 recognizable craft beer brand logos — SweetWater, Breckenridge, Blue Point, Redhook, 10 Barrel, Widmer Brothers, BrewDog, and others — as a visual portfolio of completed integrations is an approach I have not seen in an IT resume. It converts an abstract achievement ("10 M&A integrations") into a tangible, visual proof of scope.

**The "so what" hover interaction on achievements.** Every bullet point in every experience card reveals its business impact ("Business objective elevated") on hover or keyboard focus. This means the portfolio has two layers of depth: the achievement as stated, and the executive-level framing of why it mattered. The writing quality in those impact notes is high — "Made IT an audit-ready, board-defensible function," "Compressed the integration timeline so the business could exit costly Transition Service Agreements early" — and the interaction design surfaces them without cluttering the default view.

**Dual work authorization as an explicit credential.** The "US + CAN authorized to work in both countries" stat card is a quiet differentiator that a candidate from a single jurisdiction might not think to name. For cross-border M&A work at the senior level — particularly in industries like cannabis, beverage-alcohol, or financial services where Canadian and U.S. entities frequently merge — this is a genuine operational advantage that is rarely surfaced this clearly in a candidate's materials.

**The hook sentence.** "When two companies become one, the technology has to merge overnight — secure, audited, and running by Monday morning. That's the problem I get hired to solve." This is the strongest single sentence in the portfolio. It is specific, memorable, and true. It belongs in the first paragraph of any cover letter and the opening of any LinkedIn summary refresh.

**Technical depth paired with Credly verification.** The combination of live Credly badges (independently verifiable at published URLs), live GitHub repositories the recruiter can browse, and a portfolio whose own source code is inspectable creates an unusually high level of transparency for a senior-level career document. Most candidates ask the reader to trust their claims. This one invites verification.

---

*End of professional review. All observations are based on direct reading of the source files. No behavior was described that was not confirmed in the code.*
