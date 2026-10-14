import Link from "next/link";
import { SITE } from "@/lib/catalog";
import { href, strings, type Locale } from "@/lib/i18n";
import SubscribeButton from "@/components/SubscribeButton";
import { PRICES, type Plan } from "@/lib/billing";

/** The pricing page. */

/** Which plan is highlighted, by position -- the words are per language. */
const FEATURED = 1;

/** Plan ids by card position, matching t.plans' order. Index 0 ("Try it") has no checkout --
 * it is the free trial, already the app's default state -- so it gets a download link
 * instead of a Subscribe button. */
const PLAN_IDS: (Plan | null)[] = [null, "founding", "practice"];

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 stroke-accent" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing({ locale }: { locale: Locale }) {
  const t = strings(locale).pricing;
  const link = "text-ink underline underline-offset-4 hover:text-accent";

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-dim">{t.lead}</p>

      {/* Monthly or yearly, without any client-side code: two radios, and each price shows or
          hides itself with a :has() selector on the group. Display only -- the Subscribe
          buttons (when live) still start a monthly checkout; yearly is chosen in the app. */}
      <div className="group">
      <fieldset className="mt-10 inline-flex rounded-lg border border-edge bg-surface-1 p-1 text-sm">
        <legend className="sr-only">{t.billingMonthly} / {t.billingYearly}</legend>
        <label className="cursor-pointer rounded-md px-4 py-1.5 text-ink-dim has-checked:bg-surface-2 has-checked:text-ink">
          <input type="radio" name="interval" id="interval-month" defaultChecked className="sr-only" />
          {t.billingMonthly}
        </label>
        <label className="cursor-pointer rounded-md px-4 py-1.5 text-ink-dim has-checked:bg-surface-2 has-checked:text-ink">
          <input type="radio" name="interval" id="interval-year" className="sr-only" />
          {t.billingYearly} <span className="ml-1 text-xs text-accent">{t.yearlySave}</span>
        </label>
      </fieldset>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-3">
        {t.plans.map((p, i) => {
          const id = PLAN_IDS[i];
          // The founding card shows the standard price struck through: what everyone after
          // the first 100 pays.
          const was = id === "founding" ? PRICES.standard : null;
          return (
          <div
            key={p.name}
            className={[
              "rounded-xl border p-6",
              i === FEATURED ? "border-accent/60 bg-surface-1 ring-1 ring-accent/20" : "border-edge bg-surface-1/50",
            ].join(" ")}
          >
            <h2 className="text-sm font-medium text-ink-dim">{p.name}</h2>
            {id ? (
              <>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 group-has-[#interval-year:checked]:hidden">
                  {was && <span className="text-xl text-ink-faint line-through">{t.money(was.month)}</span>}
                  <span className="text-3xl font-semibold tracking-tight">{t.money(PRICES[id].month)}</span>
                  <span className="text-sm text-ink-faint">{p.per}</span>
                </div>
                <div className="mt-2 hidden flex-wrap items-baseline gap-x-2 group-has-[#interval-year:checked]:flex">
                  {was && <span className="text-xl text-ink-faint line-through">{t.money(was.year)}</span>}
                  <span className="text-3xl font-semibold tracking-tight">{t.money(PRICES[id].year)}</span>
                  <span className="text-sm text-ink-faint">{p.perYear}</span>
                </div>
              </>
            ) : (
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight">{p.price}</span>
                <span className="text-sm text-ink-faint">{p.per}</span>
              </div>
            )}
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">{p.blurb}</p>
            <ul className="mt-5 space-y-2.5">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 text-sm text-ink-dim">
                  <Tick />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            {p.note && <p className="mt-5 text-xs text-ink-faint">{p.note}</p>}
            {id ? (
              <SubscribeButton
                plan={id}
                label={t.checkoutButton}
                openingLabel={t.checkoutOpening}
                errorLabel={t.checkoutError}
                className={[
                  "w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                  i === FEATURED
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "border border-edge text-ink-dim hover:bg-surface-2 hover:text-ink",
                ].join(" ")}
              />
            ) : (
              <>
                <Link
                  href={href(locale, "/download")}
                  className="mt-5 block rounded-md border border-edge px-4 py-2 text-center text-sm font-medium text-ink-dim transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {t.tryItButton}
                </Link>
              </>
            )}
          </div>
          );
        })}
      </div>
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
          <Link href={href(locale, "/download")} className={link}>
            {t.ctaDownload}
          </Link>{" "}
          &mdash; {t.ctaOr}{" "}
          <Link href={href(locale, "/models")} className={link}>
            {t.ctaModels}
          </Link>{" "}
          {t.ctaFirst}
        </p>
      </section>
    </main>
  );
}
