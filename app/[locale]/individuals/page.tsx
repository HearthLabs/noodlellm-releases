import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { movedMetadata, movedPage, homeFor } from "@/lib/pages";

type Props = { params: Promise<{ locale: string }> };

export const metadata = movedMetadata;

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return movedPage(homeFor(locale));
}
