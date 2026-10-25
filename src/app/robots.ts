import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/shared/lib/site-url";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const siteOrigin = getSiteOrigin();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
