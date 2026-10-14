import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { creatorHandles, creatorMetadata, creatorPage } from "@/lib/pages";

type Props = { params: Promise<{ locale: string; handle: string }> };

export const generateStaticParams = creatorHandles;

export async function generateMetadata({ params }: Props) {
  const { locale, handle } = await params;
  return isLocale(locale) ? creatorMetadata(locale, handle) : {};
}

export default async function Page({ params }: Props) {
  const { locale, handle } = await params;
  if (!isLocale(locale)) notFound();
  return creatorPage(locale, handle);
}
