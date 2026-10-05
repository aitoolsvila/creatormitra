import type { NextConfig } from "next";
const staticExport = process.env.CREATOR_MITRA_STATIC_EXPORT === "1";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  ...(staticExport
    ? {
        output: "export",
        trailingSlash: true,
        distDir: ".next-export",
        images: { unoptimized: true },
      }
    : {}),
};
export default nextConfig;
