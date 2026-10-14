import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { SITE, ctx, description, gb, price, releaseLabel, tagline, versionKind, vram, type Model } from "@/lib/catalog";
import { href, strings, type Locale } from "@/lib/i18n";
import { checkoutEnabled } from "@/lib/billing";
import BuyModelButton from "@/components/BuyModelButton";

/** One model: what it is for, in the reader's language, and every version of it. */
export default function ModelDetail({ model, locale }: { model: Model; locale: Locale }) {
  const t = strings(locale).model;
  const names = strings(locale).models.versionNames;
  const smallest = model.files.reduce((a, b) => (a.size_bytes <= b.size_bytes ? a : b));

  // Structured data so the model page can appear as a rich result. A store that only lives
  // inside the app is invisible to search engines, and that free traffic is why this
  // surface exists at all.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: model.name,
    description: tagline(model, locale),
    inLanguage: locale,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows",
    // Only where there is a price of its own. A model included in the subscription has no
    // separate offer, and declaring one at 0.00 tells Google the product is free -- which is
    // both untrue and the single worst thing for a search result to say about it.
    ...(model.price_cents > 0
      ? { offers: { "@type": "Offer", price: (model.price_cents / 100).toFixed(2), priceCurrency: "USD" } }
      : {}),
    license: model.license,
    datePublished: model.released_at,
    author: { "@type": "Organization", name: model.creator_handle },
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href={href(locale, "/models")} className="text-sm text-ink-dim hover:text-ink">
        {t.back}
      </Link>

      <header className="mt-5">
        <h1 className="text-3xl font-semibold tracking-tight">{model.name}</h1>
        <p className="mt-2 text-lg text-ink-dim">{tagline(model, locale)}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-faint">
          <Link href={href(locale, `/creators/${model.creator_handle}`)} className="hover:text-ink">
            {model.creator_handle}
          </Link>
          <span>{model.license}</span>
          <span>{price(model.price_cents, locale)}</span>
          {model.released_at && <span>{releaseLabel(model.released_at, locale)}</span>}
        </div>
      </header>

      <div className="my-8 rounded-lg border border-edge bg-surface-1 p-5">
        {/* A paid creator model is bought here first; the app installs it once the licence
            is in. The install link stays for people who already own it. */}
        {model.price_cents > 0 && checkoutEnabled() && (
          <div className="mb-4 border-b border-edge pb-4">
            <div className="flex flex-wrap gap-3">
              <BuyModelButton
                modelId={model.id}
                tier="personal"
                label={t.buy(`$${(model.price_cents / 100).toFixed(2)}`)}
                openingLabel={t.buyOpening}
                errorLabel={t.buyError}
              />
              {model.practice_price_cents ? (
                <BuyModelButton
                  modelId={model.id}
                  tier="practice"
                  label={t.buyPractice(`$${(model.practice_price_cents / 100).toFixed(2)}`)}
                  openingLabel={t.buyOpening}
                  errorLabel={t.buyError}
                />
              ) : null}
            </div>
            <p className="mt-2 text-sm text-ink-faint">{t.buyNote}</p>
          </div>
        )}
        <a
          href={`noodlellm://install/${smallest.id}`}
          className="inline-block rounded-md bg-accent px-5 py-2.5 font-medium text-surface-0 hover:brightness-110"
        >
          {t.install(SITE.name)}
        </a>
        {/* Protocol detection is unreliable, so the fallback is always visible rather than
            shown only when the handler is missing. */}
        <p className="mt-3 text-sm text-ink-faint">
          {t.noApp}{" "}
          <Link href={href(locale, "/download")} className="text-accent hover:underline">
            {t.getApp}
          </Link>
        </p>
      </div>

      <section className="mb-10 max-w-none space-y-3 leading-relaxed text-ink-dim">
        <ReactMarkdown>{description(model, locale)}</ReactMarkdown>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-medium">{t.versions}</h2>
        <div className="overflow-x-auto rounded-lg border border-edge">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-2.5 font-medium">{t.colVersion}</th>
                <th className="px-4 py-2.5 font-medium">{t.colSize}</th>
                <th className="px-4 py-2.5 font-medium">{t.colGraphics}</th>
                <th className="px-4 py-2.5 font-medium">{t.colRam}</th>
                <th className="px-4 py-2.5 font-medium">{t.colContext}</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {model.files.map((f) => (
                <tr key={f.id} className="border-t border-edge">
                  <td className="px-4 py-3">
                    <span className="font-medium">{names[versionKind(f.quantization)]}</span>
                    <span className="ml-2 text-[11px] text-ink-faint">{f.quantization}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-dim">{gb(f.size_bytes)}</td>
                  <td className="px-4 py-3 text-ink-dim">
                    {vram(f.min_vram_mb)}
                    {!f.measured && (
                      <span title={t.estTitle} className="ml-1.5 cursor-help text-[11px] text-ink-faint">
                        {t.est}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink-dim">{vram(f.min_ram_mb)}</td>
                  <td className="px-4 py-3 text-ink-dim">{ctx(f.context_length)}</td>
                  <td className="px-4 py-3 text-right">
                    <a href={`noodlellm://install/${f.id}`} className="text-accent hover:underline">
                      {t.installOne}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-faint">{t.note}</p>
      </section>
    </main>
  );
}
