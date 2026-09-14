import type { NextConfig } from "next";
import { extraPermanentRedirects, squarespaceRedirects } from "./legacy-redirects";

function permanentRedirects() {
  return [...squarespaceRedirects, ...extraPermanentRedirects].flatMap(
    ({ source, destination }) => [
      { source, destination, statusCode: 301 as const },
      { source: `${source}/`, destination, statusCode: 301 as const },
    ],
  );
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return permanentRedirects();
  },
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
