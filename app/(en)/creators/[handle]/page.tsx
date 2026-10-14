import { creatorHandles, creatorMetadata, creatorPage } from "@/lib/pages";

type Props = { params: Promise<{ handle: string }> };

export const generateStaticParams = creatorHandles;

export async function generateMetadata({ params }: Props) {
  return creatorMetadata("en", (await params).handle);
}

export default async function Page({ params }: Props) {
  return creatorPage("en", (await params).handle);
}
