import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { href, strings, type Locale } from "@/lib/i18n";

/**
 * The sections the homepage and the audience pages are built from.
 *
 * Originally the homepage.
 *
 * It argues before it lists. Everybody arriving already uses a cloud AI or has heard of
 * one, and already knows those are cleverer; a page that pretends otherwise loses them in
 * the first sentence. So it concedes that at the very top, in the headline, and then spends
 * the next screen on why cleverness was never the whole question -- who sets the terms, what
 * "good enough" means, what trying again costs, where the files go, what you own. The
 * features come after, as the evidence for an argument already made.
 *
 * Two rules from before still hold. Nothing here needs looking up: not VRAM, not inference,
 * not quantization -- the people who need this most are bookkeepers and solicitors. And it
 * shows rather than claims: the screenshot is the real app on a real machine.
 */

const ICON = "h-5 w-5 shrink-0 stroke-accent";

function IconUnlimited() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <path d="M6.5 8.5a3.5 3.5 0 1 0 0 7c2 0 3-1.5 5.5-3.5s3.5-3.5 5.5-3.5a3.5 3.5 0 1 1 0 7c-2 0-3-1.5-5.5-3.5S8.5 8.5 6.5 8.5Z" />
    </svg>
  );
}
function IconPrivate() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <rect x="4" y="10.5" width="16" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}
function IconFiles() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6Z" />
      <path d="M13 3v6h6M9 14h6M9 17.5h4" />
    </svg>
  );
}
function IconEasy() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <path d="M9 4.5v-1M4.5 9h-1M6.2 6.2 5.5 5.5M11.8 6.2l.7-.7M6.2 11.8l-.7.7" />
      <path d="M9.5 9.5 20 13.5l-4.6 1.9L13.5 20 9.5 9.5Z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  );
}
function IconGauge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="M12 17l4.5-5" strokeLinecap="round" />
    </svg>
  );
}
function IconOffline() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path d="M5.5 10.5a9 9 0 0 1 4-2.3M2.5 7.5a13 13 0 0 1 4-2.6M17 8.6a9 9 0 0 1 1.6 1.1M14 5.3a13 13 0 0 1 3.6 1.8M8.8 14a5 5 0 0 1 5.4.6M12 19h.01" />
    </svg>
  );
}
function IconSteady() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <path d="M12 3.5 19 6.5v5c0 4.3-2.9 7.6-7 9-4.1-1.4-7-4.7-7-9v-5l7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconMemory() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
      <path d="M8 8h8M8 11.5h8M8 15h5" strokeLinecap="round" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5Z" />
    </svg>
  );
}
function IconSeat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={ICON} aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16.5 7.2a3 3 0 0 1 0 5.6M18.5 20a5.2 5.2 0 0 0-2.4-4.3" />
    </svg>
  );
}

// The icons pair with the cards in the strings by position; the words are per language,
// the pictures are not.
const INDIVIDUAL_ICONS = [IconFiles, IconMemory, IconUnlimited, IconEasy, IconPhone, IconGlobe];
const PRACTICE_ICONS = [IconPrivate, IconFiles, IconEasy, IconSeat];

function Card({ Icon, t, b }: { Icon: () => React.JSX.Element; t: string; b: string }) {
  return (
    <div className="rounded-lg border border-edge bg-surface-1 p-5">
      <Icon />
      <h3 className="mt-3 text-sm font-medium">{t}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{b}</p>
    </div>
  );
}

/**
 * Downloads the installer directly, Windows first and the Mac beside it, with each system's
 * first-run warning said up front.
 */
function DownloadButton({ locale, label }: { locale: Locale; label: string }) {
  const t = strings(locale);
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <a
          href={SITE.installerUrl}
          className="inline-block rounded-md bg-accent px-6 py-3 font-medium text-surface-0 hover:brightness-110"
        >
          {label}
        </a>
        <a
          href={SITE.macInstallerUrl}
          className="inline-block rounded-md border border-edge px-6 py-3 font-medium text-ink hover:bg-surface-2"
        >
          {t.home.downloadMac}
        </a>
      </div>
      <p className="mt-2 text-xs text-ink-faint">{t.nav.smartscreen}</p>
      <p className="mt-1 text-xs text-ink-faint">{t.nav.gatekeeper}</p>
    </div>
  );
}


/**
 * The detail behind "it reads your own files", folded away: the cards make the claim, and
 * whoever needs to know whether their .doc files count can open this and find out.
 */
function ReadsDetails({ locale }: { locale: Locale }) {
  const t = strings(locale).home;
  return (
    <details className="mt-4 rounded-lg border border-edge bg-surface-1 px-5 py-3.5">
      <summary className="cursor-pointer text-sm text-ink-dim hover:text-ink">{t.readsMore}</summary>
      <div className="mt-4 grid gap-6 pb-1 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium">{t.readsHeading}</h3>
          <ul className="mt-2.5 space-y-1.5">
            {t.reads.map((r) => (
              <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-ink-dim">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t.cannotHeading}</h3>
          <ul className="mt-2.5 space-y-2">
            {t.cannot.map(([what, why]) => (
              <li key={what} className="text-sm leading-relaxed">
                <span className="text-ink-dim">{what}</span>
                <span className="block text-xs text-ink-faint">{why}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const t = strings(locale).home;
  return (
    <>
    {/* ----------------------------------------------------------------- hero */}
    <section className="mx-auto max-w-5xl px-6 pt-24 pb-16">
      <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
        {t.heroTitle}
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-dim sm:text-xl">
        {t.heroBody(SITE.name)}
      </p>


      <div className="mt-9">
        <DownloadButton locale={locale} label={t.download} />
        <p className="mt-3 text-sm text-ink-faint">
          {t.trial}{" "}
          <Link href={href(locale, "/pricing")} className="underline underline-offset-4 hover:text-ink">
            {t.fromPrice}
          </Link>
        </p>
      </div>
    </section>
    </>
  );
}


export function Why({ locale }: { locale: Locale }) {
  const t = strings(locale).home;
  return (
    <>
    {/* ------------------------------------------------- the argument, in full */}
    {/* Numbered boxes in the same style as the cards above, so the page reads as one piece. */}
    <section className="border-y border-edge bg-surface-1/40">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{t.whyTitle}</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-dim">{t.whyIntro}</p>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {t.why.map((point, i) => (
            <li key={point.t} className="rounded-lg border border-edge bg-surface-1 p-5">
              <span aria-hidden className="text-sm font-semibold tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-sm font-medium">{point.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{point.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
    </>
  );
}


export function Steps({ locale }: { locale: Locale }) {
  const t = strings(locale).home;
  return (
    <>
    {/* ------------------------------------------------- three steps */}
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <h2 className="text-lg font-medium">{t.stepsTitle}</h2>
        <DownloadButton locale={locale} label={t.download} />
      </div>
      <ol className="mt-6 grid gap-8 sm:grid-cols-3">
        {t.steps.map(([title, body], i) => (
          <li key={title}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 text-sm font-medium text-accent">
              {i + 1}
            </div>
            <h3 className="mt-3.5 font-medium">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{body}</p>
          </li>
        ))}
      </ol>
    </section>
    </>
  );
}


export function Shot({ locale }: { locale: Locale }) {
  const t = strings(locale).home;
  return (
    <>
    {/* ------------------------------------------------------------ the product */}
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <figure>
        <Image
          src="/shots/chat.png"
          alt={t.shotAlt(SITE.name)}
          width={1280}
          height={820}
          className="rounded-xl border border-edge shadow-2xl shadow-black/40"
          priority
        />
        <figcaption className="mt-3 text-xs leading-relaxed text-ink-faint">{t.shotCaption}</figcaption>
      </figure>
    </section>
    </>
  );
}



export function IndividualBlock({ locale }: { locale: Locale }) {
  const t = strings(locale).home;
  return (
    <>
    {/* ------------------------------------------------------ for individuals */}
    <section className="border-y border-edge bg-surface-1/40">
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">{t.individualEyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{t.individualTitle}</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {t.individual.map((f, i) => (
            <Card key={f.t} Icon={INDIVIDUAL_ICONS[i]} {...f} />
          ))}
        </div>
        <ReadsDetails locale={locale} />
      </div>
    </section>
    </>
  );
}


export function PracticeBlock({ locale }: { locale: Locale }) {
  const t = strings(locale).home;
  return (
    <>
    {/* ------------------------------------------------------- for practices */}
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">{t.practiceEyebrow}</p>
      <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{t.practiceTitle}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-dim">{t.practiceIntro}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {t.practice.map((f, i) => (
          <Card key={f.t} Icon={PRACTICE_ICONS[i]} {...f} />
        ))}
      </div>
      <ReadsDetails locale={locale} />
    </section>
    </>
  );
}
