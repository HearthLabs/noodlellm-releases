import { movedMetadata, movedPage, pricingFor } from "@/lib/pages";

export const metadata = movedMetadata;

export default function Page() {
  return movedPage(pricingFor("en"));
}
