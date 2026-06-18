# Brand logo assets — sourcing & manifest

The Integration Portfolio section (`#estate`) renders one logo tile per brand in `estate.brands`
(`docs/data/resume-data.json`). Each `logo` path below points to a file in this folder. Tiles seat
the logo on a clean white "logo card," so transparent and opaque art all render cleanly. If a `logo`
path has no matching file, that tile falls back to a text chip (no breakage).

> Marks are third-party trademarks shown only to illustrate integration scope (no endorsement
> implied). Use official press-kit / brand art; do not restyle the marks beyond format/color-variant
> selection.

## Current manifest (15 brands, beverage-alcohol)

| File | Brand | Format | Acquired via | Official source |
|---|---|---|---|---|
| `sweetwater.png` | SweetWater Brewing | PNG | direct | sweetwaterbrew.com |
| `montauk.png` | Montauk Brewing | PNG | direct | montaukbrewingco.com |
| `breckenridge.png` | Breckenridge Brewery | PNG | Anheuser-Busch | breckbrew.com |
| `bluepoint.png` | Blue Point Brewing | PNG | Anheuser-Busch | bluepointbrewing.com |
| `10barrel.png` | 10 Barrel Brewing | PNG | Anheuser-Busch | 10barrel.com |
| `redhook.png` | Redhook Brewery | PNG · knockout* | Anheuser-Busch | redhook.com |
| `widmer.png` | Widmer Brothers | PNG | Anheuser-Busch | widmerbrothers.com |
| `shocktop.png` | Shock Top | PNG | Anheuser-Busch | shocktop.com |
| `hiball.png` | Hiball Energy | PNG | Anheuser-Busch | hiballer.com |
| `hopvalley.png` | Hop Valley Brewing | PNG | Molson Coors | hopvalleybrewing.com |
| `terrapin.png` | Terrapin Beer Co. | PNG | — | terrapinbeer.com |
| `revolver.png` | Revolver Brewing | PNG · knockout* | — | revolverbrewing.com |
| `alpine.png` | Alpine Beer Company | PNG | — | alpinebeerco.com |
| `greenflash.png` | Green Flash Brewing | PNG | — | greenflashbrew.com |
| `brewdog.png` | BrewDog | PNG | — | brandfolder.com/brewdog-uk-international/brand |

\* **Knockout:** `redhook.png` and `revolver.png` are white-on-transparent marks (built for dark
backgrounds). On the light logo card they'd be invisible, so the renderer flags them
(`"knockout": true` in `resume-data.json`) and CSS inverts them to dark ink. Swap in a dark/color
version any time and remove the flag.

## Notes
- **Blue Point** — `bluepoint.png` is the brand's own public logotype, which includes the brewery's
  coordinates (`40.77,-73.02`) as a design element. It's public brand art, not an internal
  disclosure, but if you'd rather not show any coordinates, replace it with a coordinate-free
  variant or drop the brand.
- **Atwater Brewery is intentionally excluded.**
- **Not included (by design):** `humbleseed` and `liquidlove` from the source folder are
  hemp/wellness marks; they reintroduce the vertical kept off the site. Add an entry to
  `estate.brands` only if you decide to surface that vertical.
- `acquiredVia` accepts `"anheuser-busch"` or `"molson-coors"` and renders a small provenance badge;
  omit it for directly-held brands.
- To add/remove/reorder a brand, edit `estate.brands` in `resume-data.json`; the wall re-renders
  from data.
