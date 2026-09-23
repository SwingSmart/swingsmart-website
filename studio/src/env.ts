const DEFAULT_PROJECT_ID = "3sbwydux";
const DEFAULT_DATASET = "production";
const DEFAULT_API_VERSION = "2025-02-19";
const LOCAL_PREVIEW_ORIGIN = "http://localhost:3000";
const LIVE_PREVIEW_ORIGIN = "https://www.swingsmart.co.uk";

export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION || DEFAULT_API_VERSION;

export const dataset = process.env.SANITY_STUDIO_DATASET || DEFAULT_DATASET;

export const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || DEFAULT_PROJECT_ID;

export const studioHost =
  process.env.SANITY_STUDIO_HOSTNAME || "swingsmart";

function withoutTrailingSlash(value: string) {
  return value.replace(/\/$/, "");
}

export const previewOrigin = withoutTrailingSlash(
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN ||
    (process.env.NODE_ENV === "development"
      ? LOCAL_PREVIEW_ORIGIN
      : LIVE_PREVIEW_ORIGIN),
);
