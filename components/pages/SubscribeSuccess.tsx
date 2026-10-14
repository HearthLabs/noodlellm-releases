import Link from "next/link";
import { href, strings, type Locale } from "@/lib/i18n";

/**
 * Where Stripe sends the browser after someone subscribes from the app. The app collects the
 * licence itself, so this page only says to go back to it.
 */
export default function SubscribeSuccess({ locale }: { locale: Locale }) {
  const t = strings(locale).subscribeSuccess;
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
      <p className="mt-4 leading-relaxed text-ink-dim">{t.body}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink-faint">{t.manageBody}</p>
      <Link href={href(locale, "/")} className="mt-8 inline-block text-sm text-ink underline underline-offset-4 hover:text-accent">
        {t.backHome}
      </Link>
    </main>
  );
}
