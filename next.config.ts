import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/our-mission", destination: "/about", permanent: true },
      { source: "/our-mission-1", destination: "/", permanent: true },
      { source: "/our-mission-1-1", destination: "/packages", permanent: true },
      { source: "/our-mission-2", destination: "/packages/golfer", permanent: true },
      {
        source: "/our-mission-2-1",
        destination: "/packages/country-club",
        permanent: true,
      },
      { source: "/our-mission-2-2", destination: "/packages/ryder-cup", permanent: true },
      {
        source: "/our-mission-2-2-1",
        destination: "/packages/phoenix-open",
        permanent: true,
      },
      {
        source: "/our-mission-2-2-2",
        destination: "/packages/championship",
        permanent: true,
      },
      {
        source: "/our-mission-2-2-3",
        destination: "/packages/st-andrews",
        permanent: true,
      },
      {
        source: "/our-mission-2-2-2-1",
        destination: "/packages/junior-open",
        permanent: true,
      },
      {
        source: "/our-mission-2-2-3-1",
        destination: "/packages/build-your-own",
        permanent: true,
      },
      { source: "/our-mission-3", destination: "/charity", permanent: true },
      { source: "/our-mission-3-1", destination: "/faq", permanent: true },
      { source: "/gallery-reviews", destination: "/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
