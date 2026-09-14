import type { Metadata } from "next";
import { photos } from "@/lib/content-helpers";
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
  const og =
    imageSrc(seo?.ogImage || settings.defaultSeo.ogImage || photos.homeHero, 1200) ||
    `${siteUrl}/brand/hero.jpg`;

  return {
    title: { absolute: title },
    description,
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings.siteName,
      locale: "en_GB",
      type: "website",
      images: [{ url: og, width: 1200, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
  };
}
