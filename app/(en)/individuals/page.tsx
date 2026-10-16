import { movedMetadata, movedPage, homeFor } from "@/lib/pages";

export const metadata = movedMetadata;

export default function Page() {
  return movedPage(homeFor("en"));
}
