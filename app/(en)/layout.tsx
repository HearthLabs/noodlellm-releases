import Shell from "@/components/Shell";
import { layoutMetadata } from "@/lib/pages";
import "../globals.css";

/** English: the addresses the site always had, unprefixed, so no existing link breaks. */
export const metadata = layoutMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <Shell locale="en">{children}</Shell>;
}
