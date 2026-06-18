# Brand logo assets — sourcing & manifest

The Integration Portfolio section (`#estate`) renders one logo tile per brand in `estate.brands`
(`docs/data/resume-data.json`). Each `logo` path below points to a file in this folder. Tiles seat
the logo on a light "logo card," so transparent and opaque art (SVG / PNG / JPG) all render cleanly.
If a `logo` path has no matching file, that tile falls back to a text chip (no breakage).

> Marks are third-party trademarks shown only to illustrate integration scope (no endorsement
> implied). Use official press-kit / brand art; do not restyle the marks beyond format/color-variant
> selection.

## Current manifest (10 brands, beverage-alcohol)

| File | Brand | Format | Official source |
|---|---|---|---|
| `sweetwater.svg` | SweetWater Brewing | SVG · recolored* | sweetwaterbrew.com/downloads-home/sweetwater-logos |
| `breckenridge.png` | Breckenridge Brewery | PNG | breckbrew.com |
| `bluepoint.png` | Blue Point Brewing | PNG (navy logotype) | bluepointbrewing.com |
| `10barrel.svg` | 10 Barrel Brewing | SVG · recolored* | 10barrel.com |
| `widmer.jpg` | Widmer Brothers | JPG | widmerbrothers.com |
| `shocktop.png` | Shock Top | PNG | brandfetch.com/shocktop.com |
| `hopvalley.png` | Hop Valley Brewing | PNG | hopvalleybrewing.com |
| `revolver.jpg` | Revolver Brewing | JPG | revolverbrewing.com |
| `terrapin.png` | Terrapin Beer Co. | PNG | terrapinbeer.com |
| `brewdog.png` | BrewDog | PNG | brandfolder.com/brewdog-uk-international/brand |

\* **Recolored:** `sweetwater.svg` and `10barrel.svg` were supplied as white "knockout" versions
(built for dark backgrounds) and would be invisible on the light logo card, so their fill was
changed to dark monochrome (`#141414`). Swap in a full-color press-kit version any time.

## Notes
- **Revolver Brewing** has no `acquiredVia` badge — the deal it came through (vs. Anheuser-Busch /
  Molson Coors) wasn't confirmed. Add `"acquiredVia": "molson-coors"` (or `"anheuser-busch"`) to its
  entry in `resume-data.json` to show the badge.
- **Atwater Brewery is intentionally excluded.**
- Not currently shown (no art supplied): **Montauk**, **Redhook**, **Manitoba Harvest** (the
  wellness/CPG tile). Drop a logo in this folder and add an entry to `estate.brands` to include any
  of them.
- To add/remove/reorder a brand, edit `estate.brands` in `resume-data.json`; the wall re-renders
  from data.
