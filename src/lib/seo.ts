import type { Metadata } from "next";
import { siteUrl } from "@/sanity/env";
import { imageSrc } from "@/sanity/image";
import type { SeoFields, SiteSettings } from "@/lib/types";

export function buildMetadata(
  seo: SeoFields | undefined,
  settings: SiteSettings,
  path: string,
): Metadata {
  const title = seo?.title || settings.defaultSeo.title || settings.siteName;
  const description =
    seo?.description || settings.defaultSeo.description || settings.tagline;
  const canonical = `${siteUrl}${path === "/" ? "" : path}`;
  const og = imageSrc(seo?.ogImage || settings.defaultSeo.ogImage, 1200);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings.siteName,
      locale: "en_GB",
      type: "website",
      images: og ? [{ url: og }] : undefined,
    },
    twitter: {
      card: og ? "summary_large_image" : "summary",
      title,
      description,
      images: og ? [og] : undefined,
    },
  };
}
