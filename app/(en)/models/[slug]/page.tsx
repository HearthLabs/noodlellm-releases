import { modelMetadata, modelPage, modelSlugs } from "@/lib/pages";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = modelSlugs;

export async function generateMetadata({ params }: Props) {
  return modelMetadata("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return modelPage("en", (await params).slug);
}
