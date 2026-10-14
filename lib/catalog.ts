import fs from "node:fs";
import path from "node:path";
import { INTL_TAG, strings, type Locale } from "./i18n";

export interface ModelFile {
  id: string;
  version: string;
  quantization: string;
  size_bytes: number;
  sha256: string | null;
  min_vram_mb: number;
  min_ram_mb: number;
  context_length: number;
  measured: boolean;
  download_url: string;
  /** Memory per further 1,000 tokens of conversation, from the model's real layout. Mirrors
   * the same field on apps/desktop/src/lib/types.ts's ModelFile. */
  kv_mb_per_1k?: number | null;
}

export type GoodFor =
  | "allround"
  | "code"
  | "writing"
  | "reasoning"
  | "instructions"
  | "speed"
  | "longchats";

export interface Model {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description_md: string;
  /** The same two in the other languages, keyed by locale. English is the fallback. */
  tagline_i18n?: Record<string, string>;
  description_md_i18n?: Record<string, string>;
  kind: "base" | "lora";
  license: string;
  /** When the model was published by its creator (ISO date). Not when Noodle LLM listed it. */
  released_at: string;
  /** Which card this is recommended for: 8, 16 or 24. Editorial, not computed. */
  tier_gb?: number;
  /** What it is good at, from a fixed list named in every language (strings: models.goodFor). */
  good_for?: GoodFor[];
  /** What it does well and less well, a few words each. Editorial until scores exist. */
  best_at?: string[];
  best_at_i18n?: Record<string, string[]>;
  weaker_at?: string[];
  weaker_at_i18n?: Record<string, string[]>;
  /** Editorial, like good_for -- not something the app can use yet. See callers. */
  vision?: boolean;
  /** Hugging Face downloads over the last 30 days, not all time. */
  hf_downloads_30d?: number;
  hf_likes?: number;
  stats_as_of?: string;
  price_cents: number;
  /** A creator model's price for a practice (up to 15 computers). Absent on curated models. */
  practice_price_cents?: number | null;
  price_model: string;
  published: boolean;
  creator_handle: string;
  files: ModelFile[];
}

export interface Creator {
  handle: string;
  display_name: string;
  bio: string;
}

interface Seed {
  models: Model[];
  creators: Creator[];
}

/**
 * Reads the catalog.
 *
 * The web store and the in-app store render the same rows. This reads the seed file on
 * disk; swapping in Supabase means replacing the body of this function and nothing else.
 */
function seed(): Seed {
  const file = path.join(process.cwd(), "catalog/catalog.seed.json");
  const curated = JSON.parse(fs.readFileSync(file, "utf-8")) as Seed;
  // Creator-portal models, fetched from the live catalog by scripts/fetch-portal-catalog.mjs
  // before each build. Absent offline or before any are approved; the seed then stands alone.
  const portalFile = path.join(process.cwd(), ".catalog/portal.json");
  if (!fs.existsSync(portalFile)) return curated;
  const portal = JSON.parse(fs.readFileSync(portalFile, "utf-8")) as Seed;
  const slugs = new Set(curated.models.map((m) => m.slug));
  const handles = new Set(curated.creators.map((c) => c.handle));
  return {
    ...curated,
    models: [...curated.models, ...portal.models.filter((m) => !slugs.has(m.slug))],
    creators: [...curated.creators, ...portal.creators.filter((c) => !handles.has(c.handle))],
  };
}

export function allModels(): Model[] {
  return seed().models.filter((m) => m.published);
}

export function modelBySlug(slug: string): Model | undefined {
  return allModels().find((m) => m.slug === slug);
}

export function allCreators(): Creator[] {
  return seed().creators;
}

export function creatorByHandle(handle: string): Creator | undefined {
  return allCreators().find((c) => c.handle === handle);
}

export function modelsByCreator(handle: string): Model[] {
  return allModels().filter((m) => m.creator_handle === handle);
}

/** The same GB Windows Explorer will show for the downloaded file -- 1024-based, matching
 * `vram()` below and apps/desktop/src/lib/format.ts's `bytes()`, not the SI 10^9 a raw byte
 * count suggests. Mixing the two made a download read smaller on this page than the same
 * file shows once it lands on disk. */
export function gb(bytes: number): string {
  return bytes >= 1024 ** 3 ? `${(bytes / 1024 ** 3).toFixed(1)} GB` : `${Math.round(bytes / 1024 ** 2)} MB`;
}

export function vram(mb: number): string {
  return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${mb} MB`;
}

export function ctx(n: number): string {
  return n >= 1024 ? `${Math.round(n / 1024)}k` : `${n}`;
}

/** A model's one-line pitch in `locale`, or English where it has not been translated. */
export function tagline(model: Model, locale: Locale): string {
  return (locale !== "en" && model.tagline_i18n?.[locale]) || model.tagline;
}

/** What a model does well, and less well, in `locale` where translated. */
export function bestAt(model: Model, locale: Locale): string[] {
  return (locale !== "en" && model.best_at_i18n?.[locale]) || model.best_at || [];
}
export function weakerAt(model: Model, locale: Locale): string[] {
  return (locale !== "en" && model.weaker_at_i18n?.[locale]) || model.weaker_at || [];
}

/** A model's full description in `locale`, or English where it has not been translated. */
export function description(model: Model, locale: Locale): string {
  return (locale !== "en" && model.description_md_i18n?.[locale]) || model.description_md;
}

/**
 * Zero means "nothing on top of the subscription", not "free".
 *
 * Noodle LLM is a paid subscription, and the word free beside a model invites exactly the wrong
 * conclusion about the app -- in a search snippet most of all, where it may be the only
 * thing anyone reads.
 */
export function price(cents: number, locale: Locale): string {
  const f = strings(locale).format;
  return cents === 0 ? f.included : f.once(`$${(cents / 100).toFixed(2)}`);
}

/**
 * "Released September 2024 · 2 years old", in the reader's language.
 *
 * The age is the point: a non-technical buyer has no way to know whether a model name with
 * a version number in it is current or two generations stale.
 *
 * NOTE: mirrors releaseLabel in apps/desktop/src/lib/plain.ts. The two apps share no runtime
 * code today, and the months must agree or the store and the app will disagree about the
 * same model.
 */
export function releaseLabel(releasedAt: string, locale: Locale, now = new Date()): string {
  const d = new Date(releasedAt);
  if (Number.isNaN(d.getTime())) return "";
  const f = strings(locale).format;
  // Measured and formatted in UTC throughout. The catalog stores a plain date, and rendering
  // it in local time shifts it a day west of UTC -- which for anything released on the 1st
  // prints the wrong month.
  const when = d.toLocaleDateString(INTL_TAG[locale], {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const months = Math.max(
    0,
    (now.getUTCFullYear() - d.getUTCFullYear()) * 12 + (now.getUTCMonth() - d.getUTCMonth()),
  );
  const age =
    months < 1 ? f.brandNew : months < 12 ? f.months(months) : f.years(Math.floor(months / 12), months % 12);
  return `${f.released(when)} · ${age}`;
}

/**
 * "12.7M downloads/month". Rounded hard on purpose -- the precision is fake anyway, since
 * the figure is a 30-day rolling window captured on one day.
 */
export function popularity(downloads: number, locale: Locale): string {
  const f = strings(locale).format;
  if (downloads >= 1_000_000) return f.downloadsMillions((downloads / 1_000_000).toFixed(1));
  if (downloads >= 1_000) return f.downloadsThousands(String(Math.round(downloads / 1_000)));
  return f.downloads(downloads);
}

/**
 * Graphics memory a card can give a model, leaving room for Windows and everything else.
 *
 * NOTE: mirrors usableVramMb in apps/desktop/src/lib/tier.ts. The site cannot see the
 * visitor's card, but what it says a card can run must match what the app will say once it
 * can -- otherwise the site recommends something the app then calls slow.
 */
export function usableVramMb(totalMb: number): number {
  return totalMb - Math.min(2048, Math.max(1536, totalMb * 0.2));
}

/** A version's name in plain words: what it is for, rather than how it was compressed. */
export function versionKind(quantization: string): "recommended" | "higher" | "best" | "other" {
  const q = quantization.toUpperCase();
  if (/^(Q8|F16|BF16|F32)/.test(q)) return "best";
  if (/^Q[67]/.test(q)) return "higher";
  if (/^Q4/.test(q)) return "recommended";
  return "other";
}

/**
 * The shortest memory still worth having: about six pages. Below it a model is not usefully
 * "running great", however fast its replies.
 *
 * NOTE: mirrors MIN_USEFUL_CONTEXT in apps/desktop/src/lib/tier.ts -- see usableVramMb's note
 * on why the two must not diverge.
 */
const MIN_USEFUL_CONTEXT = 4096;

function kvCacheMbPer1k(sizeBytes: number, fromHeader?: number | null): number {
  if (fromHeader && fromHeader > 0) return fromHeader;
  const sizeGb = sizeBytes / 1e9;
  return Math.max(12, sizeGb * 14);
}

/**
 * Whether `file` fits `usableMb`, either at its standard length or -- when it does not --
 * with a shorter memory that is still above MIN_USEFUL_CONTEXT.
 *
 * NOTE: mirrors rankModelFile's "greatShorter" path in apps/desktop/src/lib/tier.ts. Without
 * this, the site's chooser and the app's badge disagreed on the 12GB cards the common RTX
 * 3060 12GB and 4070 are: the app calls a 16GB-class model "great, with a shorter memory"
 * where the site's strict-fit check called it nothing at all.
 */
function fitsWithPossiblyShorterMemory(file: ModelFile, usableMb: number): boolean {
  if (file.min_vram_mb <= usableMb) return true;
  const perToken = kvCacheMbPer1k(file.size_bytes, file.kv_mb_per_1k) / 1024;
  const tokens = file.context_length - (file.min_vram_mb - usableMb) / perToken;
  const fits = Math.floor(tokens / 1024) * 1024;
  return fits >= MIN_USEFUL_CONTEXT;
}

/** The best version of `model` that runs well on a card of `cardGb`, if any does -- allowing
 * a shorter memory where that is what makes it fit. */
export function bestFit(model: Model, cardGb: number): ModelFile | null {
  const usable = usableVramMb(cardGb * 1024);
  const fitting = model.files.filter((f) => fitsWithPossiblyShorterMemory(f, usable));
  return fitting.length ? fitting.reduce((a, b) => (a.size_bytes >= b.size_bytes ? a : b)) : null;
}

/** What does not change with the language. The words about it live in lib/strings. */
export const SITE = {
  name: "Noodle LLM",
  // The company behind it, as noodletechnology.com and the Terms name it.
  company: "Noodle Technology, LLC",
  companyUrl: "https://noodletechnology.com",
  // The live domain -- this also feeds canonical URLs and the sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://noodlellm.com",
  // The download buttons point straight here: GitHub serves the newest release's file.
  installerUrl: "https://github.com/HearthLabs/noodlellm-website/releases/latest/download/NoodleLLM-Setup.exe",
  macInstallerUrl: "https://github.com/HearthLabs/noodlellm-website/releases/latest/download/NoodleLLM-mac.dmg",
};
