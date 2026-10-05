export const dynamic = "force-static";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/login", "/start-campaign", "/creator-signup"],
    },
    ...(process.env.NEXT_PUBLIC_SITE_URL
      ? {
          sitemap: `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/sitemap.xml`,
        }
      : {}),
  };
}
