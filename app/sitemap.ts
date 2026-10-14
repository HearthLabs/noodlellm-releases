import type { MetadataRoute } from "next";
import { allCreators, allModels, SITE } from "@/lib/catalog";
import { HTML_LANG, LOCALES, href } from "@/lib/i18n";

/**
 * Every page in every language, each entry listing its translations, so a search engine
 * shows a reader in Osaka the Japanese page rather than the English one.
 */
// Written once at build time: a static export has no server to generate it per request.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: [string, number][] = [
    ["/", 1],
    ["/individuals", 0.95],
    ["/practices", 0.95],
    ["/models", 0.9],
    ["/download", 0.8],
    ["/pricing", 0.8],
    ...allModels().map((m): [string, number] => [`/models/${m.slug}`, 0.7]),
    ...allCreators().map((c): [string, number] => [`/creators/${c.handle}`, 0.5]),
  ];

  const translated: MetadataRoute.Sitemap = pages.flatMap(([path, priority]) =>
    LOCALES.map((locale) => ({
      url: `${SITE.url}${href(locale, path) === "/" ? "" : href(locale, path)}`,
      lastModified: now,
      priority: locale === "en" ? priority : priority * 0.9,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [HTML_LANG[l], `${SITE.url}${href(l, path) === "/" ? "" : href(l, path)}`]),
        ),
      },
    })),
  );

  // English only, so one entry each and no translations to list.
  const legal = ["/terms", "/privacy", "/licences"].map((path) => ({ url: `${SITE.url}${path}`, lastModified: now, priority: 0.3 }));

  return [...translated, ...legal];
}
