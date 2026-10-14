import { subscribeSuccessMetadata, subscribeSuccessPage } from "@/lib/pages";

export const metadata = subscribeSuccessMetadata("en");

export default function Page() {
  return subscribeSuccessPage("en");
}
