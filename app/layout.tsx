import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";
import { Header, Footer } from "@/components/navigation";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Creator Mitra — Your Mitra in the Creator Economy",
    template: "%s | Creator Mitra",
  },
  description:
    "Find creators that fit your brand. Discover Indian creators, plan influencer campaigns, and create authentic UGC with Creator Mitra.",
  openGraph: {
    title: "Creator Mitra",
    description: "Find the right creators. Create campaigns that perform.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Creator Mitra",
            description:
              "A creator collaboration platform concept connecting brands with creators.",
            inLanguage: "en-IN",
            ...(process.env.NEXT_PUBLIC_SITE_URL
              ? { url: process.env.NEXT_PUBLIC_SITE_URL }
              : {}),
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
