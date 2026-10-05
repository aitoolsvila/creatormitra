export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { services, creators, caseStudies, articles } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!base) return [];
  return [
    "",
    "/for-brands",
    "/for-creators",
    "/creator-discovery",
    "/creator-directory",
    "/case-studies",
    "/blog",
    "/about",
    "/contact",
    ...services.map((s) => `/${s.slug}`),
    ...creators.map((c) => `/creators/${c.id}`),
    ...caseStudies.map((s) => `/case-studies/${s.slug}`),
    ...articles.map((a) => `/blog/${a.slug}`),
  ].map((path) => ({
    url: base + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
