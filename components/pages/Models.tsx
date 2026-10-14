import Link from "next/link";
import {
  SITE,
  allModels,
  gb,
  popularity,
  releaseLabel,
  tagline,
  usableVramMb,
  versionKind,
  vram,
  type Model,
  type ModelFile,
} from "@/lib/catalog";
import { href, strings, type Locale } from "@/lib/i18n";

/**
 * The models by card, each with what it is good at and every version with its size and what
 * it needs.
 *
 * The relative ages ("2 years old") are fixed when the site is built, so the build is re-run
 * nightly (.github/workflows/site.yml).
 */

/** Card names are the same in every language, so they live here rather than in the strings. */
const EXAMPLES: Record<number, string> = {
  8: "RTX 3060 Ti, RTX 4060, RTX 2070",
  12: "RTX 3060 12GB, RTX 4070",
  16: "RTX 4060 Ti 16GB, RX 7800 XT",
  24: "RTX 3090, RTX 4090, RX 7900 XTX",
  32: "RTX 5090",
};
export default function Models({ locale }: { locale: Locale }) {
  const t = strings(locale).models;
  const models = allModels();
  const usable24 = usableVramMb(24 * 1024);
  const usable32 = usableVramMb(32 * 1024);

  // What a 32 GB card adds: versions that do not fit 24 GB but do fit 32.
  const extra32 = models.flatMap((m) =>
    m.files
      .filter((f) => f.min_vram_mb > usable24 && f.min_vram_mb <= usable32)
      .map((f) => ({ model: m, file: f })),
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">{t.lead(SITE.name)}</p>

      {/* ------------------------------------------------------------ by card */}
      {t.tiers.map((tier) => {
        const rows =
          tier.gb === 32
            ? // The same cards as above, each listing only the versions a 32GB card adds.
              models
                .map((m) => ({ model: m, files: extra32.filter((e) => e.model.id === m.id).map((e) => e.file) }))
                .filter((r) => r.files.length > 0)
            : models
                .filter((m) => m.tier_gb === tier.gb)
                .sort((a, b) => (b.hf_downloads_30d ?? 0) - (a.hf_downloads_30d ?? 0))
                .map((m) => ({ model: m, files: m.files }));
        if (rows.length === 0) return null;

        return (
          <section key={tier.gb} className="mt-14">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-edge pb-3">
              <h2 className="text-xl font-semibold tracking-tight">{tier.title}</h2>
              <span className="text-xs text-ink-faint">{EXAMPLES[tier.gb]}</span>
            </div>
            <p className="mt-2.5 text-sm text-ink-dim">{tier.note}</p>
            <div className="mt-5 grid gap-3">
              {rows.map(({ model, files }) => (
                <ModelRow key={model.id} model={model} files={files} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}

    </main>
  );
}

function ModelRow({ model, files, locale }: { model: Model; files: ModelFile[]; locale: Locale }) {
  const t = strings(locale).models;

  return (
    <Link
      href={href(locale, `/models/${model.slug}`)}
      className="flex flex-col gap-4 rounded-lg border border-edge bg-surface-1 p-4 transition-colors hover:border-accent md:flex-row md:items-start md:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="font-medium">{model.name}</span>
          <span className="text-[11px] text-ink-faint">{model.creator_handle}</span>
        </div>
        <div className="mt-1 text-sm text-ink-dim">{tagline(model, locale)}</div>
        {((model.good_for && model.good_for.length > 0) || model.vision) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {model.good_for?.map((g) => (
              <span key={g} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-ink-dim">
                {t.goodFor[g]}
              </span>
            ))}
            {model.vision && (
              <span className="rounded-full border border-dashed border-edge px-2 py-0.5 text-[11px] text-ink-faint">
                {t.visionComing}
              </span>
            )}
          </div>
        )}
        <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-ink-faint">
          {model.released_at && <span>{releaseLabel(model.released_at, locale)}</span>}
          <span>{model.license}</span>
          {model.hf_downloads_30d ? <span>{popularity(model.hf_downloads_30d, locale)}</span> : null}
        </div>
      </div>

      {/* Every version, smallest first: what it is, how big, and what it needs. */}
      <dl className="shrink-0 space-y-1.5 text-xs md:w-[23rem]">
        {files.map((f) => (
          <div key={f.id} className="flex items-baseline justify-between gap-3">
            <dt className="whitespace-nowrap text-ink-dim">{t.versionNames[versionKind(f.quantization)]}</dt>
            <dd className="whitespace-nowrap text-right text-ink-faint">
              {t.download(gb(f.size_bytes))} · {t.needs(vram(f.min_vram_mb))}
              {!f.measured && (
                <span title={t.estimatedTitle} className="ml-1 cursor-help opacity-70">
                  *
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}
