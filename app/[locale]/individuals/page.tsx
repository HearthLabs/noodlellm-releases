import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { individualsMetadata, individualsPage } from "@/lib/pages";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return isLocale(locale) ? individualsMetadata(locale) : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return individualsPage(locale);
}
