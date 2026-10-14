import Link from "next/link";
import { href, strings, type Locale } from "@/lib/i18n";

export default function NotFound({ locale }: { locale: Locale }) {
  const t = strings(locale).notFound;
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
      <p className="mt-2 text-ink-dim">{t.body}</p>
      <Link
        href={href(locale, "/models")}
        className="mt-6 inline-block rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface-0 hover:brightness-110"
      >
        {t.browse}
      </Link>
    </main>
  );
}
