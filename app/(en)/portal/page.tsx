import type { Metadata } from "next";
import Portal from "@/components/portal/Portal";

export const metadata: Metadata = {
  title: "Creator portal",
  description: "List your model in the Noodle LLM store.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Portal />;
}
