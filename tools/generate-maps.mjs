/* =============================================================
   generate-maps.mjs — BUILD-TIME ONLY (not shipped to the site).

   Produces the two dependency-free base maps and the data block
   for the "Field Footprint" section:
     - docs/assets/north-america.svg   (country outlines)
     - docs/assets/europe.svg          (country outlines)
     - patches docs/data/resume-data.json with a "footprint" block
       whose cluster markers are pre-projected into each map's
       viewBox, so the live site needs ZERO projection math.

   Source geometry: Natural Earth via the public-domain `world-atlas`
   package (countries-50m). Projection: d3-geo (Albers for NA,
   Conic Conformal for Europe). Run with:  node tools/generate-maps.mjs
   ============================================================= */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { geoAlbers, geoConicConformal, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repo = resolve(__dirname, "..");
const docs = resolve(repo, "docs");

/* ---- 1. Load Natural Earth countries (public domain) ---- */
const topo = JSON.parse(
  readFileSync(resolve(__dirname, "node_modules/world-atlas/countries-50m.json"), "utf8")
);
const countries = feature(topo, topo.objects.countries).features;
const byName = (names) => ({
  type: "FeatureCollection",
  features: countries.filter((f) => names.includes(f.properties.name)),
});

const NA_NAMES = [
  "Canada", "United States of America", "Mexico", "Greenland",
  "Guatemala", "Belize", "Honduras", "El Salvador", "Nicaragua",
  "Costa Rica", "Panama", "Cuba", "Haiti", "Dominican Rep.", "Jamaica",
  "The Bahamas", "Puerto Rico",
];
const EU_NAMES = [
  "United Kingdom", "Ireland", "France", "Germany", "Belgium",
  "Netherlands", "Luxembourg", "Switzerland", "Austria", "Italy",
  "Spain", "Portugal", "Denmark", "Czechia", "Poland", "Norway",
  "Sweden", "Slovenia", "Croatia", "Andorra", "Monaco",
];

/* ---- 2. City coordinates [lat, lon] (hand-geocoded, offline) ---- */
const C = {
  // Florida
  "Tampa, FL": [27.951, -82.457], "St. Petersburg, FL": [27.767, -82.640],
  "Temple Terrace, FL": [28.035, -82.389], "Brandon, FL": [27.938, -82.286],
  "Bradenton, FL": [27.499, -82.575], "Sarasota, FL": [27.337, -82.531],
  "Longboat Key, FL": [27.412, -82.659], "Venice, FL": [27.100, -82.454],
  "North Port, FL": [27.044, -82.236], "Naples, FL": [26.142, -81.795],
  "Sanibel Island, FL": [26.448, -82.013], "Miami, FL": [25.762, -80.192],
  "Ft. Lauderdale, FL": [26.122, -80.137], "Orlando, FL": [28.538, -81.379],
  // Other US
  "Atlanta, GA": [33.749, -84.388], "New York City, NY": [40.713, -74.006],
  "Patchogue, NY": [40.766, -73.015], "Montauk, NY": [41.036, -71.954],
  "Moorestown, NJ": [39.969, -74.949], "Columbus, OH": [39.961, -82.999],
  "Detroit, MI": [42.331, -83.046], "Denver, CO": [39.739, -104.990],
  "Breckenridge, CO": [39.482, -106.039], "San Antonio, TX": [29.424, -98.494],
  "Boise, ID": [43.615, -116.202], "Seattle, WA": [47.606, -122.332],
  "Portland, OR": [45.515, -122.678], "Eugene, OR": [44.052, -123.087],
  "Springfield, OR": [44.046, -123.022], "Bend, OR": [44.058, -121.315],
  // Canada
  "Downtown Toronto, ON": [43.651, -79.383], "Mississauga, ON": [43.589, -79.644],
  "Markham, ON": [43.857, -79.337], "Pickering, ON": [43.836, -79.090],
  "Ajax, ON": [43.851, -79.020], "Whitby, ON": [43.897, -78.943],
  "Oshawa, ON": [43.897, -78.866], "Bowmanville, ON": [43.912, -78.688],
  "Peterborough, ON": [44.309, -78.320], "Lindsay, ON": [44.357, -78.737],
  "Cobourg, ON": [43.959, -78.166], "Trenton, ON": [44.101, -77.576],
  "Belleville, ON": [44.163, -77.383], "Niagara Falls, ON": [43.090, -79.075],
  "Cayuga, ON": [42.948, -79.847], "London, ON": [42.984, -81.245],
  "Leamington, ON": [42.053, -82.599], "Gatineau, QC": [45.477, -75.701],
  "Sainte-Agathe-des-Monts, QC": [46.049, -74.281], "Winnipeg, MB": [49.895, -97.138],
  "Nanaimo, BC": [49.166, -123.940],
  // Europe
  "London, UK": [51.507, -0.128], "Densborn, DE": [50.155, 6.467],
  "Neumünster, DE": [54.072, 9.982], "Cantanhede, PT": [40.347, -8.594],
  "Cairo Montenotte, IT": [44.401, 8.277],
};

/* ---- 3. Regions: tight groups collapse to one marker; list keeps every city ---- */
const NA_REGIONS = [
  ["Tampa Bay & Sarasota", ["Tampa, FL","St. Petersburg, FL","Temple Terrace, FL","Brandon, FL","Bradenton, FL","Sarasota, FL","Longboat Key, FL","Venice, FL","North Port, FL"]],
  ["Southwest Florida", ["Naples, FL","Sanibel Island, FL"]],
  ["South Florida", ["Miami, FL","Ft. Lauderdale, FL"]],
  ["Orlando, FL", ["Orlando, FL"]],
  ["Atlanta, GA", ["Atlanta, GA"]],
  ["New York & Long Island", ["New York City, NY","Patchogue, NY","Montauk, NY"]],
  ["Moorestown, NJ", ["Moorestown, NJ"]],
  ["Columbus, OH", ["Columbus, OH"]],
  ["Detroit, MI", ["Detroit, MI"]],
  ["Denver & the Rockies", ["Denver, CO","Breckenridge, CO"]],
  ["San Antonio, TX", ["San Antonio, TX"]],
  ["Boise, ID", ["Boise, ID"]],
  ["Seattle, WA", ["Seattle, WA"]],
  ["Portland & Willamette Valley", ["Portland, OR","Eugene, OR","Springfield, OR"]],
  ["Bend, OR", ["Bend, OR"]],
  ["Greater Toronto & Durham", ["Downtown Toronto, ON","Mississauga, ON","Markham, ON","Pickering, ON","Ajax, ON","Whitby, ON","Oshawa, ON","Bowmanville, ON"]],
  ["Kawartha Lakes", ["Peterborough, ON","Lindsay, ON"]],
  ["Cobourg–Quinte corridor", ["Cobourg, ON","Trenton, ON","Belleville, ON"]],
  ["Niagara & Haldimand", ["Niagara Falls, ON","Cayuga, ON"]],
  ["Southwest Ontario", ["London, ON","Leamington, ON"]],
  ["Ottawa–Gatineau", ["Gatineau, QC"]],
  ["Laurentians, QC", ["Sainte-Agathe-des-Monts, QC"]],
  ["Winnipeg, MB", ["Winnipeg, MB"]],
  ["Nanaimo, BC", ["Nanaimo, BC"]],
];
const EU_REGIONS = [
  ["London, UK", ["London, UK"]],
  ["Densborn, Germany", ["Densborn, DE"]],
  ["Neumünster, Germany", ["Neumünster, DE"]],
  ["Cantanhede, Portugal", ["Cantanhede, PT"]],
  ["Cairo Montenotte, Italy", ["Cairo Montenotte, IT"]],
];

/* ---- 4. Build each map: frame the projection around the actual city
          points (with padding), clip the rendered land to the viewBox,
          and project region centroids into that same viewBox. ---- */
function buildMap({ width, height, projection, padding, fc, regions }) {
  // Collect every city as a point so the map frames exactly the area worked in.
  const pts = [];
  for (const [, cities] of regions) {
    for (const c of cities) {
      if (!C[c]) throw new Error(`Missing coordinates for "${c}"`);
      const [lat, lon] = C[c];
      pts.push([lon, lat]);
    }
  }
  const pointsFC = { type: "MultiPoint", coordinates: pts };
  const pad = padding ?? 48;
  projection.fitExtent([[pad, pad], [width - pad, height - pad]], pointsFC);
  // Clip generated paths to the viewBox: trims off-canvas arctic/ocean geometry
  // (smaller files) and crops the land cleanly to the frame.
  projection.clipExtent([[0, 0], [width, height]]);
  const path = geoPath(projection);

  const paths = fc.features
    .map((f) => path(f))
    .filter(Boolean)
    .map((d) => `<path class="country" d="${d}"/>`) // styled via CSS
    .join("\n");

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" ` +
    `class="footprint-map" role="img" preserveAspectRatio="xMidYMid meet">\n` +
    `<g class="land">\n${paths}\n</g>\n<g class="map-markers"></g>\n</svg>\n`;

  const clusters = regions.map(([label, cities], i) => {
    const pts = cities.map((c) => {
      if (!C[c]) throw new Error(`Missing coordinates for "${c}"`);
      const [lat, lon] = C[c];
      return projection([lon, lat]);
    });
    const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    return {
      id: `${i}`.padStart(2, "0"),
      label,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      cities,
    };
  });

  // Sanity check: every marker should land inside the viewBox.
  for (const c of clusters) {
    if (c.x < 0 || c.x > width || c.y < 0 || c.y > height) {
      console.warn(`! "${c.label}" projects outside viewBox: (${c.x}, ${c.y})`);
    }
  }
  return { svg, clusters };
}

const na = buildMap({
  width: 1000, height: 720,
  projection: geoAlbers().rotate([98, 0]).center([0, 38]).parallels([29.5, 49.5]),
  padding: 70,
  fc: byName(NA_NAMES),
  regions: NA_REGIONS,
});

const eu = buildMap({
  width: 520, height: 620,
  projection: geoConicConformal().rotate([-9, 0]).center([0, 50]).parallels([40, 58]),
  padding: 60,
  fc: byName(EU_NAMES),
  regions: EU_REGIONS,
});

/* ---- 5. Write the SVG assets ---- */
writeFileSync(resolve(docs, "assets/north-america.svg"), na.svg);
writeFileSync(resolve(docs, "assets/europe.svg"), eu.svg);

/* ---- 6. Patch resume-data.json with the footprint block ---- */
const dataPath = resolve(docs, "data/resume-data.json");
const data = JSON.parse(readFileSync(dataPath, "utf8"));
data.footprint = {
  intro: "Cities across North America and Europe where I've delivered hands-on IT, infrastructure, and security work. Dense regions are grouped — hover a marker or a city to link the two.",
  maps: [
    { id: "na", title: "North America", asset: "assets/north-america.svg", viewBox: "0 0 1000 720", clusters: na.clusters },
    { id: "eu", title: "Europe", asset: "assets/europe.svg", viewBox: "0 0 520 620", clusters: eu.clusters },
  ],
};
writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");

const naCities = NA_REGIONS.reduce((s, r) => s + r[1].length, 0);
const euCities = EU_REGIONS.reduce((s, r) => s + r[1].length, 0);
console.log(`OK  NA: ${na.clusters.length} markers / ${naCities} cities · EU: ${eu.clusters.length} markers / ${euCities} cities`);
