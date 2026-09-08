import { draftMode } from "next/headers";
import { fallbackContent } from "@/lib/fallback";
import type {
  EventPackage,
  GalleryCategory,
  GalleryItem,
  Navigation,
  PageDoc,
  Partner,
  SiteSettings,
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
  pagesQuery,
  partnersQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/sanity/queries";

async function fetchQuery<T>(
  query: string,
  params?: Record<string, string>,
  options?: { stega?: boolean },
): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    let isEnabled = false;
    try {
      const draft = await draftMode();
      isEnabled = draft.isEnabled;
    } catch {
      isEnabled = false;
    }
    const { data } = await sanityFetch({
      query,
      params,
      perspective: isEnabled ? "drafts" : "published",
      stega: options?.stega ?? isEnabled,
    });
    return (data as T) ?? null;
  } catch (error) {
    console.error("Sanity query failed", error);
    return null;
  }
}

function withSettingsDefaults(data: Partial<SiteSettings> | null): SiteSettings {
  const fallback = fallbackContent.settings;
  if (!data?.siteName && !data?.contact?.email) return fallback;
  return {
    siteName: data.siteName || fallback.siteName,
    tagline: data.tagline || fallback.tagline,
    footerNote: data.footerNote || fallback.footerNote,
    contact: {
      email: data.contact?.email || fallback.contact.email,
      phones: data.contact?.phones?.length ? data.contact.phones : fallback.contact.phones,
      location: data.contact?.location || fallback.contact.location,
    },
    socials: data.socials?.length ? data.socials : fallback.socials,
    defaultSeo: {
      title: data.defaultSeo?.title || fallback.defaultSeo.title,
      description: data.defaultSeo?.description || fallback.defaultSeo.description,
      ogImage: data.defaultSeo?.ogImage || fallback.defaultSeo.ogImage,
    },
    primaryCta: data.primaryCta || fallback.primaryCta,
    secondaryCta: data.secondaryCta || fallback.secondaryCta,
  };
}

function withNavigationDefaults(data: Navigation | null): Navigation {
  const fallback = fallbackContent.navigation;
  if (!data?.items?.length) return fallback;
  return {
    items: data.items,
    ctaLabel: data.ctaLabel || data.cta?.label || fallback.ctaLabel,
    ctaHref: data.ctaHref || data.cta?.href || fallback.ctaHref,
  };
}

export async function getSettings() {
  const data = await fetchQuery<SiteSettings>(siteSettingsQuery, undefined, { stega: false });
  return withSettingsDefaults(data);
}

export async function getNavigation() {
  const data = await fetchQuery<Navigation>(navigationQuery);
  return withNavigationDefaults(data);
}

export async function getPage(slug: string): Promise<PageDoc | undefined> {
  const data = await fetchQuery<PageDoc>(pageBySlugQuery, { slug });
  if (data?._id) {
    return { ...data, sections: data.sections || [] };
  }
  return fallbackContent.pages[slug];
}

export async function getPackages(): Promise<EventPackage[]> {
  const data = await fetchQuery<EventPackage[]>(packagesQuery, undefined, { stega: false });
  return data?.length ? data : fallbackContent.packages;
}

export async function getPackage(slug: string): Promise<EventPackage | undefined> {
  const data = await fetchQuery<EventPackage>(packageBySlugQuery, { slug });
  if (data?._id || data?.slug) return data;
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

export async function getPageSlugs() {
  const data = await fetchQuery<{ slug: string }[]>(pagesQuery, undefined, { stega: false });
  const fromCms = (data || []).map((item) => item.slug).filter(Boolean);
  return [...new Set([...fromCms, ...Object.keys(fallbackContent.pages)])];
}

export async function getSiteUrlMap() {
  const [packages, slugs] = await Promise.all([getPackages(), getPageSlugs()]);
  const reserved = new Set(["home", "packages"]);
  const pagePaths = slugs
    .filter((slug) => !reserved.has(slug) && !slug.startsWith("packages/"))
    .map((slug) => `/${slug}`);

  return [
    "",
    "/packages",
    ...packages.map((item) => `/packages/${item.slug}`),
    ...pagePaths,
  ];
}
