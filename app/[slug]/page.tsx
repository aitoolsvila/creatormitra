export const dynamicParams = false;
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import {
  ServicePage,
  BrandsPage,
  CreatorsPage,
  LiveCampaignsPage,
  AboutPage,
  CareersPage,
  LegalPage,
} from "@/components/content-pages";
const pages: Record<string, { title: string; description: string }> = {
  "for-brands": {
    title: "For Brands",
    description:
      "Discover creators, plan influencer campaigns, and keep collaborations together.",
  },
  "for-creators": {
    title: "For Creators",
    description:
      "Build your creator profile and explore brand collaboration opportunities.",
  },
  "live-campaigns": {
    title: "Campaign Opportunities — Demo",
    description: "Explore illustrative creator campaign opportunities.",
  },
  about: {
    title: "About Creator Mitra",
    description:
      "Your Mitra in the Creator Economy. Built around people, made for connection.",
  },
  careers: {
    title: "Careers",
    description: "Help build the next connection in the creator economy.",
  },
  privacy: {
    title: "Privacy Notice",
    description:
      "How the Creator Mitra demo stores local drafts and protects your information.",
  },
  terms: {
    title: "Demo Terms",
    description:
      "Clear expectations for the Creator Mitra product demonstration.",
  },
};
export function generateStaticParams() {
  return [...Object.keys(pages), ...services.map((s) => s.slug)].map(
    (slug) => ({ slug }),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return (
    pages[slug] || {
      title: s?.name || "Page not found",
      description: s?.description,
    }
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (services.some((s) => s.slug === slug)) return <ServicePage slug={slug} />;
  switch (slug) {
    case "for-brands":
      return <BrandsPage />;
    case "for-creators":
      return <CreatorsPage />;
    case "live-campaigns":
      return <LiveCampaignsPage />;
    case "about":
      return <AboutPage />;
    case "careers":
      return <CareersPage />;
    case "privacy":
      return <LegalPage kind="privacy" />;
    case "terms":
      return <LegalPage kind="terms" />;
    default:
      notFound();
  }
}
