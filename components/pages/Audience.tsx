import type { Locale } from "@/lib/i18n";
import {
  IndividualBlock,
  PracticeBlock,
  Shot,
  Steps,
  Why,
} from "@/components/sections";

/**
 * The pages the homepage's question leads to, each built from the same sections.
 *
 * Each says a thing once: what you get (the cards), why run it yourself (the four points),
 * how (three steps, with the download, and a real screenshot). The comparison table, and
 * separate sections for reading files and for memory, were cut because every line of them
 * restated a card or a point.
 */

export function Individuals({ locale }: { locale: Locale }) {
  return (
    <main>
      <IndividualBlock locale={locale} />
      <Why locale={locale} />
      <Steps locale={locale} />
      <Shot locale={locale} />
    </main>
  );
}

export function Practices({ locale }: { locale: Locale }) {
  return (
    <main>
      <PracticeBlock locale={locale} />
      <Why locale={locale} />
      <Steps locale={locale} />
      <Shot locale={locale} />
    </main>
  );
}
