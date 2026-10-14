// Before each build: fetch the live catalog.json and keep its creator-portal models, so the
// site gets a page for every approved listing. Curated models still come from
// catalog/catalog.seed.json; only entries marked `source: "portal"` are taken from here.
//
// Never fails the build. Offline, or before the catalog has any portal models, the site
// simply builds from the seed alone, as it always has.
import fs from "node:fs";
import path from "node:path";

const URL =
  process.env.CATALOG_URL ?? "https://pub-e75b4834507a4bdf9ad4fabfe16ef9ea.r2.dev/catalog.json";
const out = path.join(process.cwd(), ".catalog", "portal.json");

try {
  const res = await fetch(URL, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const live = await res.json();
  const models = (live.models ?? []).filter((m) => m.source === "portal" && m.published && m.files?.length);
  const creators = (live.creators ?? []).filter((c) => c.source === "portal");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ models, creators }, null, 2));
  console.log(`portal catalog: ${models.length} creator model(s) from ${URL}`);
} catch (e) {
  fs.rmSync(out, { force: true });
  console.warn(`portal catalog: skipped (${e.message}); building from the seed alone`);
}
