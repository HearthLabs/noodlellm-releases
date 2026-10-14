import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { modelMetadata, modelPage, modelSlugs } from "@/lib/pages";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const generateStaticParams = modelSlugs;

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  return isLocale(locale) ? modelMetadata(locale, slug) : {};
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  return modelPage(locale, slug);
}
