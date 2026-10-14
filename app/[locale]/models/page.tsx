import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { modelsMetadata, modelsPage } from "@/lib/pages";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return isLocale(locale) ? modelsMetadata(locale) : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return modelsPage(locale);
}
