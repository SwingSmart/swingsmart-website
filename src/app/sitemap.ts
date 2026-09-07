import type { MetadataRoute } from "next";
import { getSiteUrlMap } from "@/lib/content";
import { siteUrl } from "@/sanity/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = await getSiteUrlMap();
  const now = new Date();
  return paths.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
