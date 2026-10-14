import Link from "next/link";
import { gb, modelsByCreator, tagline, type Creator as CreatorRow } from "@/lib/catalog";
import { href, strings, type Locale } from "@/lib/i18n";

/** Everything one maker has in the catalog. Their name and bio are theirs, in their words. */
export default function Creator({ creator, locale }: { creator: CreatorRow; locale: Locale }) {
  const t = strings(locale).creator;
  const models = modelsByCreator(creator.handle);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{creator.display_name}</h1>
      <p className="mt-2 text-ink-dim">{creator.bio}</p>

      <h2 className="mb-3 mt-10 text-lg font-medium">{t.count(models.length)}</h2>

      <div className="grid gap-3">
        {models.map((m) => (
          <Link
            key={m.id}
            href={href(locale, `/models/${m.slug}`)}
            className="rounded-lg border border-edge bg-surface-1 p-4 transition-colors hover:border-accent"
          >
            <div className="font-medium">{m.name}</div>
            <div className="mt-1 text-sm text-ink-dim">{tagline(m, locale)}</div>
            <div className="mt-2 text-[11px] text-ink-faint">
              {m.license} · {t.from(gb(Math.min(...m.files.map((f) => f.size_bytes))))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
