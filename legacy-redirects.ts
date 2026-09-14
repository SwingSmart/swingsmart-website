/**
 * Permanent 301s from the indexed Squarespace URLs.
 * Kept in one place so next.config and the launch audit stay in sync
 * with migration/url-mapping.csv.
 */
export const squarespaceRedirects: { source: string; destination: string }[] = [
  { source: "/home", destination: "/" },
  { source: "/our-mission", destination: "/about" },
  { source: "/our-mission-1", destination: "/" },
  { source: "/our-mission-1-1", destination: "/packages" },
  { source: "/our-mission-2", destination: "/packages/golfer" },
  { source: "/our-mission-2-1", destination: "/packages/country-club" },
  { source: "/our-mission-2-2", destination: "/packages/ryder-cup" },
  { source: "/our-mission-2-2-1", destination: "/packages/phoenix-open" },
  { source: "/our-mission-2-2-2", destination: "/packages/championship" },
  { source: "/our-mission-2-2-3", destination: "/packages/st-andrews" },
  { source: "/our-mission-2-2-2-1", destination: "/packages/junior-open" },
  { source: "/our-mission-2-2-3-1", destination: "/packages/build-your-own" },
  { source: "/our-mission-3", destination: "/charity" },
  { source: "/our-mission-3-1", destination: "/faq" },
  { source: "/gallery-reviews", destination: "/gallery" },
];

export const extraPermanentRedirects: { source: string; destination: string }[] = [
  { source: "/faqs", destination: "/faq" },
];
