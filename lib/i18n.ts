import type { Metadata } from "next";
import { en, type Strings } from "./strings/en";
import { zh } from "./strings/zh";
import { ja } from "./strings/ja";
import { es } from "./strings/es";
import { de } from "./strings/de";

/**
 * The five languages, the same five the app speaks.
 *
 * English lives at the root with the addresses it always had, so no link anyone has made
 * breaks; the others sit under their own prefix. A static site cannot read a visitor's
 * language on a server, and redirecting on first load would confuse both people and search
 * engines, so English pages offer the reader's language instead (see LanguageHint).
 */
export const LOCALES = ["en", "zh", "ja", "es", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const OTHER_LOCALES = LOCALES.filter((l) => l !== "en") as Exclude<Locale, "en">[];

const STRINGS: Record<Locale, Strings> = { en, zh, ja, es, de };

export function strings(locale: Locale): Strings {
  return STRINGS[locale];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Each language named in itself, which is the only name its speakers are looking for. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  ja: "日本語",
  es: "Español",
  de: "Deutsch",
};

/** For `<html lang>` and search engines. Chinese is Simplified, as in the app. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  ja: "ja",
  es: "es",
  de: "de",
};

/** For dates written the way each language writes them. */
export const INTL_TAG: Record<Locale, string> = {
  en: "en-GB",
  zh: "zh-CN",
  ja: "ja-JP",
  es: "es-ES",
  de: "de-DE",
};

/** A path in `locale`. English keeps the bare path; the others are prefixed. */
export function href(locale: Locale, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** The path with any language prefix taken off: the same page in no particular language. */
export function unlocalised(pathname: string): string {
  const m = pathname.match(/^\/(zh|ja|es|de)(?=\/|$)/);
  if (!m) return pathname || "/";
  return pathname.slice(m[0].length) || "/";
}

/**
 * The canonical address of this page, and where it lives in every other language, so a
 * search engine shows each reader the version in their own language.
 */
export function alternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: href(locale, path),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], href(l, path)])),
      "x-default": path,
    },
  };
}
