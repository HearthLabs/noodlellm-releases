import Link from "next/link";
import { href, strings, type Locale } from "@/lib/i18n";
import { Hero } from "@/components/sections";

/**
 * The homepage: the argument, the download, and one question.
 *
 * Everything else used to follow on one long page, which asked a solicitor to scroll past a
 * pitch to model developers and a hobbyist past data-processing agreements. Now the page
 * asks who you are and sends you to the one written for you. The headline and the download
 * stay here, above the question, because they are true for everyone.
 */

/** Where each answer goes, in the order the cards appear. */
// "/developers" is parked until the creator side comes back as an add-on.
export const AUDIENCES = ["/individuals", "/practices"] as const;

function IconPerson() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className="h-6 w-6 stroke-accent" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}
function IconOffice() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className="h-6 w-6 stroke-accent" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" />
      <path d="M8 7.5h2M14 7.5h2M8 11.5h2M14 11.5h2M10.5 20.5v-4h3v4" />
    </svg>
  );
}
const ICONS = [IconPerson, IconOffice];

export default function Home({ locale }: { locale: Locale }) {
  const t = strings(locale).home;

  return (
    <main>
      <Hero locale={locale} />

      <section className="border-t border-edge bg-surface-1/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.chooserTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">{t.chooserIntro}</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {t.chooser.map((choice, i) => {
              const Icon = ICONS[i];
              return (
                <Link
                  key={AUDIENCES[i]}
                  href={href(locale, AUDIENCES[i])}
                  className="group flex flex-col rounded-xl border border-edge bg-surface-1 p-6 transition-colors hover:border-accent"
                >
                  <Icon />
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{choice.t}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{choice.b}</p>
                  <span className="mt-6 text-sm font-medium text-accent">
                    {t.chooserMore} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
