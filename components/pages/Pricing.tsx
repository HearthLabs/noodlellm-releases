import Link from "next/link";
import { href, strings, type Locale } from "@/lib/i18n";
import { PRICES, type Plan } from "@/lib/prices";

/** The pricing page. */

/** Which plan is highlighted, by position -- the words are per language. */
const FEATURED = 1;

/** Plan ids by card position, matching t.plans' order. Index 0 ("Try it") is the free
 * trial, the app's default state, so it gets a download link. Subscribing happens in the
 * app, so the paid plans have no button here. */
const PLAN_IDS: (Plan | null)[] = [null, "founding", "standard", "practice"];

export default function Pricing({ locale }: { locale: Locale }) {
  const t = strings(locale).pricing;
  const link = "text-ink underline underline-offset-4 hover:text-accent";

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-dim">{t.lead}</p>

      {/* Every card the same height, one price each, with the yearly or lifetime option under
          it. The benefits are the same on every plan and live in the lead and the FAQ; a card
          lists only what limits it. Plans are chosen in the app, so paid cards have no button. */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.plans.map((p, i) => {
          const id = PLAN_IDS[i];
          // Founding shows the Individuals price struck through: what everyone after the first 100 pays.
          const founding = id === "founding";
          const saving = id && !founding ? PRICES[id].month! * 12 - PRICES[id].year! : 0;
          return (
          <div
            key={p.name}
            className={[
              "flex flex-col rounded-xl border p-6",
              i === FEATURED ? "border-accent/60 bg-surface-1 ring-1 ring-accent/20" : "border-edge bg-surface-1/50",
            ].join(" ")}
          >
            <h2 className="text-sm font-medium text-ink-dim">{p.name}</h2>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
              {founding && <span className="text-xl text-ink-faint line-through">{t.money(PRICES.standard.month!)}</span>}
              <span className="text-3xl font-semibold tracking-tight">{id ? t.money(PRICES[id].month!) : p.price}</span>
              <span className="text-sm text-ink-faint">{p.per}</span>
            </div>
            {/* Always present, empty on the trial, so the blurbs line up across the row. */}
            <p className="mt-1 min-h-5 text-sm font-medium text-accent">
              {founding
                ? t.lifetime(t.money(PRICES.founding.once!))
                : id
                  ? t.yearly(t.money(PRICES[id].year!), t.money(saving))
                  : ""}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">{p.blurb}</p>
            <ul className="mt-5 space-y-2">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-center gap-2.5 text-sm text-ink-dim">
                  <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                  {pt}
                </li>
              ))}
            </ul>
            {!id && (
              <div className="mt-auto pt-6">
              <Link
                href={`${href(locale, "/")}#download`}
                className="block rounded-md border border-edge px-4 py-2 text-center text-sm font-medium text-ink-dim transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {t.tryItButton}
              </Link>
              </div>
            )}
          </div>
          );
        })}
      </div>

      <section className="mt-16 border-t border-edge pt-10">
        <h2 className="text-xl font-semibold tracking-tight">{t.faqTitle}</h2>
        <dl className="mt-6 grid gap-8 sm:grid-cols-2">
          {t.faq.map(([q, a]) => (
            <div key={q}>
              <dt className="text-sm font-medium">{q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-dim">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 border-t border-edge pt-10">
        <p className="text-sm text-ink-dim">
          <Link href={`${href(locale, "/")}#download`} className={link}>
            {t.ctaDownload}
          </Link>
        </p>
      </section>
    </main>
  );
}
