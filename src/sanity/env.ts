export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3sbwydux";

export const isSanityConfigured = Boolean(projectId);

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const previewOrigin = (
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

export const studioUrl = (
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "https://swingsmart-cms.sanity.studio"
).replace(/\/$/, "");
