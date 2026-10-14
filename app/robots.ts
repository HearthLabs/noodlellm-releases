import type { MetadataRoute } from "next";
import { SITE } from "@/lib/catalog";

// Written once at build time: a static export has no server to generate it per request.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The creator portal is auth-gated and has nothing to index.
      disallow: ["/portal/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
