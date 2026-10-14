import { downloadMetadata, downloadPage } from "@/lib/pages";

export const metadata = downloadMetadata("en");

export default function Page() {
  return downloadPage("en");
}
