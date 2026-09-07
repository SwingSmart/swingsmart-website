import { draftMode } from "next/headers";
import { fallbackContent } from "@/lib/fallback";
import type {
  EventPackage,
  GalleryCategory,
  GalleryItem,
  PageDoc,
  Partner,
  SiteContent,
  Testimonial,
} from "@/lib/types";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/live";
import {
  galleryCategoriesQuery,
  galleryQuery,
  navigationQuery,
  packageBySlugQuery,
  packagesQuery,
  pageBySlugQuery,
  partnersQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/sanity/queries";

async function fetchQuery<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    const { isEnabled } = await draftMode();
    const { data } = await sanityFetch({
      query,
      params,
      perspective: isEnabled ? "drafts" : "published",
      stega: isEnabled,
    });
    return (data as T) ?? null;
  } catch {
    return null;
  }
}

export async function getSettings() {
  const data = await fetchQuery<SiteContent["settings"]>(siteSettingsQuery);
  return data?.siteName ? data : fallbackContent.settings;
}

export async function getNavigation() {
  const data = await fetchQuery<SiteContent["navigation"]>(navigationQuery);
  return data?.items?.length ? data : fallbackContent.navigation;
}

export async function getPage(slug: string): Promise<PageDoc | undefined> {
  const data = await fetchQuery<PageDoc>(pageBySlugQuery, { slug });
  if (data?.sections?.length) return data;
  return fallbackContent.pages[slug];
}

export async function getPackages(): Promise<EventPackage[]> {
  const data = await fetchQuery<EventPackage[]>(packagesQuery);
  return data?.length ? data : fallbackContent.packages;
}

export async function getPackage(slug: string): Promise<EventPackage | undefined> {
  const data = await fetchQuery<EventPackage>(packageBySlugQuery, { slug });
  if (data?.slug) return data;
  return fallbackContent.packages.find((item) => item.slug === slug);
}

export async function getGallery(): Promise<GalleryItem[]> {
  const data = await fetchQuery<GalleryItem[]>(galleryQuery);
  return data?.length ? data : fallbackContent.gallery;
}

export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  const data = await fetchQuery<GalleryCategory[]>(galleryCategoriesQuery);
  return data?.length ? data : fallbackContent.galleryCategories;
}

export async function getPartners(): Promise<Partner[]> {
  const data = await fetchQuery<Partner[]>(partnersQuery);
  return data?.length ? data : fallbackContent.partners;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchQuery<Testimonial[]>(testimonialsQuery);
  return data?.length ? data : fallbackContent.testimonials;
}

export async function getSiteUrlMap() {
  const packages = await getPackages();
  return [
    "",
    "/packages",
    ...packages.map((item) => `/packages/${item.slug}`),
    "/gallery",
    "/partnerships",
    "/about",
    "/contact",
  ];
}
