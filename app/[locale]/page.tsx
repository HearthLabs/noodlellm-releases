import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { homePage } from "@/lib/pages";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return homePage(locale);
}
