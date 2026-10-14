import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import { OTHER_LOCALES, isLocale } from "@/lib/i18n";
import { layoutMetadata } from "@/lib/pages";
import "../globals.css";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

/** Chinese, Japanese, Spanish and German, each under its own prefix. English is not here. */
export const generateStaticParams = () => OTHER_LOCALES.map((locale) => ({ locale }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params;
  return isLocale(locale) ? layoutMetadata(locale) : {};
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <Shell locale={locale}>{children}</Shell>;
}
