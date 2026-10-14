"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALE_NAMES, OTHER_LOCALES, href, strings, unlocalised, type Locale } from "@/lib/i18n";
import { LANGUAGE_CHOSEN } from "./LanguageMenu";

/**
 * On an English page, offers the reader's own language when the browser says it is one of
 * the other four -- once, in that language, and never again after a choice.
 *
 * An offer rather than a redirect. Redirecting on arrival sends someone who deliberately
 * opened the English page somewhere they did not ask to go, and a search engine crawling
 * from one country would never see the other versions at all.
 */
export default function LanguageHint() {
  const pathname = usePathname() ?? "/";
  const [offer, setOffer] = useState<Locale | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(LANGUAGE_CHOSEN)) return;
    } catch {
      // Storage refused: offer anyway, it is only a line of text.
    }
    const wanted = (navigator.languages ?? [navigator.language])
      .map((l) => l.toLowerCase().split("-")[0])
      .find((l) => l !== "en");
    const match = OTHER_LOCALES.find((l) => l === wanted);
    if (match) setOffer(match);
  }, []);

  if (!offer) return null;
  const t = strings(offer).nav;

  function remember(choice: Locale) {
    try {
      localStorage.setItem(LANGUAGE_CHOSEN, choice);
    } catch {
      // Nothing to do; the offer just comes back next time.
    }
  }

  return (
    <div lang={offer} className="border-b border-edge bg-surface-1">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-2.5 text-sm">
        <span className="text-ink-dim">{t.alsoIn(LOCALE_NAMES[offer])}</span>
        <Link
          href={href(offer, unlocalised(pathname))}
          onClick={() => remember(offer)}
          className="font-medium text-accent hover:underline"
        >
          {t.switchTo(LOCALE_NAMES[offer])}
        </Link>
        <button
          type="button"
          onClick={() => {
            remember("en");
            setOffer(null);
          }}
          className="ml-auto text-xs text-ink-faint hover:text-ink"
        >
          {t.dismiss}
        </button>
      </div>
    </div>
  );
}
