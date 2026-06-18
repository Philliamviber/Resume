# Brand logo assets — sourcing

The Integration Portfolio section (`#estate`) renders a logo tile per brand listed under
`estate.brands` in `docs/data/resume-data.json`. Each tile expects a logo file at the `logo` path
below. **Until a file is present, the tile renders a clean text chip** (the brand name) — so the
site works before any art is added. Drop **SVG** (preferred) or transparent **PNG** into this folder
using the exact filename.

> Marks are third-party trademarks shown only to illustrate integration scope (no endorsement
> implied). Use the official press-kit / brand art linked below — do not restyle the marks. The
> `data-vertical="wellness"` tile (Manitoba Harvest) is the only non-beverage mark; other-vertical
> products are intentionally not shown.

| File (in this folder) | Brand | Official source |
|---|---|---|
| `sweetwater.svg` | SweetWater Brewing | sweetwaterbrew.com/downloads-home/sweetwater-logos (press: /our-story/press/) |
| `montauk.svg` | Montauk Brewing | montaukbrewingco.com — News/Press section |
| `breckenridge.svg` | Breckenridge Brewery | breckbrew.com; fallback Wikimedia Commons / brandfetch.com/breckenridgebrewery.com |
| `bluepoint.svg` | Blue Point Brewing | bluepointbrewing.com; fallback Wikimedia Commons |
| `10barrel.svg` | 10 Barrel Brewing | 10barrel.com; fallback Wikimedia Commons |
| `redhook.svg` | Redhook Brewery | redhook.com; fallback Wikimedia Commons |
| `widmer.svg` | Widmer Brothers | widmerbrothers.com; fallback Wikimedia Commons |
| `shocktop.svg` | Shock Top | brandfetch.com/shocktop.com; fallback Wikimedia Commons |
| `terrapin.svg` | Terrapin Beer Co. | terrapinbeer.com (use the current 2026 mark) |
| `hopvalley.svg` | Hop Valley Brewing | hopvalleybrewing.com; fallback Wikimedia Commons |
| `brewdog.svg` | BrewDog | brandfolder.com/brewdog-uk-international/brand + presshub.brewdog.com/presshub/brewdog-logo (assets: design@brewdog.com) |
| `manitobaharvest.svg` | Manitoba Harvest | manitobaharvest.com/pages/media-press (media@manitobaharvest.com) |

Notes:
- The eight Anheuser-Busch craft brands (Breckenridge, Blue Point, 10 Barrel, Redhook, Widmer, Shock
  Top, + Square Mile Cider, HiBall Energy) were acquired by Tilray on **Aug 8, 2023** — public, so the
  association is verifiable. Tilray Investor Relations (`ir.tilray.com`) can also supply portfolio art.
- **Atwater Brewery is intentionally excluded** from the portfolio.
- To add/remove a brand, edit `estate.brands` in `resume-data.json`; the wall re-renders from data.
