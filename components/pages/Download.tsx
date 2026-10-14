import { SITE } from "@/lib/site";
import { href, strings, type Locale } from "@/lib/i18n";

/**
 * The download page.
 *
 * It tells people about the SmartScreen warning before they meet it. An unsigned installer
 * shows a full-screen blue block with no visible Run button, and someone who was not warned
 * assumes they have been sent malware and closes the tab. Saying so first costs a little
 * credibility and saves most of the installs. The Mac's Gatekeeper does the same to an app
 * Apple has not notarized, so it gets the same treatment.
 */
export default function Download({ locale }: { locale: Locale }) {
  const t = strings(locale).download;
  const w = t.warn1;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t.title(SITE.name)}</h1>
      <p className="mt-3 text-lg text-ink-dim">{t.lead}</p>

      <div className="mt-9 grid gap-4 sm:grid-cols-2">
        <Platform
          title={t.windows}
          meta={t.windowsMeta}
          body={t.windowsBody(SITE.name)}
          url={SITE.installerUrl}
          button={strings(locale).home.download}
          warning={strings(locale).nav.smartscreen}
        />
        <Platform
          title={t.mac}
          meta={t.macMeta}
          body={t.macBody(SITE.name)}
          url={SITE.macInstallerUrl}
          button={strings(locale).home.downloadMac}
          warning={strings(locale).nav.gatekeeper}
        />
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-medium">{t.costTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">{t.cost1}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium">{t.warnTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">
          {w.before} <span className="text-ink">{w.quote}</span>
          {w.middle} <span className="text-ink">{w.moreInfo}</span>
          {w.then} <span className="text-ink">{w.runAnyway}</span>
          {w.after}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">{t.warn2}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium">{t.macWarnTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">{t.macWarn}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium">{t.needsTitle}</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {t.needs.map(([title, body]) => (
            <div key={title}>
              <dt className="text-sm font-medium">{title}</dt>
              <dd className="mt-1 text-xs leading-relaxed text-ink-dim">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 border-t border-edge pt-8">
        <p className="text-sm text-ink-dim">
          {t.unsure} {t.orInstall}
        </p>
      </section>
    </main>
  );
}

/** One system's download: what it runs on, the button, and the warning it will show. */
function Platform(p: { title: string; meta: string; body: string; url: string; button: string; warning: string }) {
  return (
    <div className="flex flex-col rounded-lg border border-edge bg-surface-1 p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-lg font-medium">{p.title}</h2>
        <span className="text-xs text-ink-faint">{p.meta}</span>
      </div>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-dim">{p.body}</p>
      <a
        href={p.url}
        className="mt-5 self-start rounded-md bg-accent px-6 py-3 text-sm font-medium text-surface-0 hover:brightness-110"
      >
        {p.button}
      </a>
      <p className="mt-2.5 text-xs text-ink-faint">{p.warning}</p>
    </div>
  );
}
