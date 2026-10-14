import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Written once at build time: a static export has no server to generate it per request.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
