import Link from "next/link";
import { SITE } from "@/lib/site";
import { HTML_LANG, href, strings, type Locale } from "@/lib/i18n";
import LanguageMenu from "./LanguageMenu";
import LanguageHint from "./LanguageHint";

/**
 * The page around every page: `<html>` in the right language, the header with its language
 * menu, and the footer.
 *
 * Each language tree has its own root layout, because `<html lang>` belongs to the whole
 * document and a screen reader, a search engine and the browser's font choice for Chinese
 * and Japanese all read it. Both layouts render this, so there is one header and one footer.
 */
export default function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = strings(locale);

  /** Footer columns: only pages that exist. */
  const footer: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: t.footer.product,
      links: [
        { label: t.footer.download, href: href(locale, "/download") },
        { label: t.footer.pricing, href: href(locale, "/pricing") },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        // English only, from every language: the English text is the one that binds.
        { label: t.footer.privacy, href: "/privacy" },
        { label: t.footer.terms, href: "/terms" },
      ],
    },
  ];

  return (
    <html lang={HTML_LANG[locale]}>
      <body className="min-h-screen">
        {locale === "en" && <LanguageHint />}

        <header className="border-b border-edge">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
            <Link href={href(locale, "/")} className="flex items-center gap-2 font-semibold tracking-tight">
              <img src="/mark.svg" alt="" className="h-7 w-auto" />
              {SITE.name}
            </Link>
            <nav className="flex items-center gap-5 text-sm text-ink-dim">
              <Link href={href(locale, "/pricing")} className="hidden hover:text-ink sm:inline">
                {t.nav.pricing}
              </Link>
              <LanguageMenu locale={locale} label={t.nav.language} />
              {/* The download page, not a file: it offers Windows and Mac and their warnings. */}
              <Link
                href={href(locale, "/download")}
                className="rounded-md bg-accent px-3 py-1.5 font-medium text-surface-0 hover:brightness-110"
              >
                {t.nav.download}
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-20 border-t border-edge">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <div className="grid gap-10 sm:grid-cols-3">
              <div>
                <div className="font-semibold tracking-tight">{SITE.name}</div>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-ink-faint">
                  {t.footer.blurb(t.meta.tagline)}
                </p>
              </div>

              {footer.map((col) => (
                <div key={col.title}>
                  <h2 className="text-xs font-medium uppercase tracking-widest text-ink-faint">
                    {col.title}
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link href={l.href} className="text-ink-dim hover:text-ink">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-2 border-t border-edge pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
              {/* The same line noodletechnology.com ends with, linking back to it. */}
              <a href={SITE.companyUrl} className="hover:text-ink">
                {t.footer.rights(new Date().getFullYear(), SITE.company)}
              </a>
              <span>{t.footer.llc}</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
