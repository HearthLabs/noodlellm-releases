import type { Locale } from "@/lib/i18n";
import { Hero, IndividualBlock, Shot, Why } from "@/components/sections";

/**
 * The homepage, and the only page that says what the app does.
 *
 * It used to ask who you are and send you to an Individuals or a Practices page, but those
 * two repeated each other and this page almost line for line. Now it is one page: the
 * download, what it does (with one line for practices), why run it yourself, and the
 * screenshot. Prices live on Pricing and nowhere else.
 */
export default function Home({ locale }: { locale: Locale }) {
  return (
    <main>
      <Hero locale={locale} />
      <IndividualBlock locale={locale} />
      <Why locale={locale} />
      <Shot locale={locale} />
    </main>
  );
}
