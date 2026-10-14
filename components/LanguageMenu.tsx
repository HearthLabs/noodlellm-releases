"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_NAMES, href, unlocalised, type Locale } from "@/lib/i18n";

/** Where a choice made here is remembered, so the English pages stop offering it again. */
export const LANGUAGE_CHOSEN = "noodlellm_language_chosen";

/**
 * The five languages, each leading to the same page in that language.
 *
 * A globe and the current language's own name, because someone who cannot read the page
 * cannot read a label saying "Language" either -- but will recognise the name of their own.
 */
export default function LanguageMenu({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? "/";
  const here = unlocalised(pathname);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={label}
        className="flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-surface-1 hover:text-ink"
      >
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className="h-4 w-4 stroke-current" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5Z" />
        </svg>
        <span>{LOCALE_NAMES[locale]}</span>
      </button>
      {open && (
        <ul className="absolute right-0 z-20 mt-2 min-w-36 overflow-hidden rounded-md border border-edge bg-surface-1 py-1 shadow-xl shadow-black/40">
          {LOCALES.map((l) => (
            <li key={l}>
              <Link
                href={href(l, here)}
                lang={l}
                onClick={() => {
                  try {
                    localStorage.setItem(LANGUAGE_CHOSEN, l);
                  } catch {
                    // A private window may refuse; the menu still works.
                  }
                  setOpen(false);
                }}
                className={[
                  "block px-3.5 py-2 text-sm hover:bg-surface-2",
                  l === locale ? "text-ink" : "text-ink-dim",
                ].join(" ")}
              >
                {LOCALE_NAMES[l]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
