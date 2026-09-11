import { draftMode } from "next/headers";
import { photos } from "@/lib/content-helpers";
import { fallbackContent } from "@/lib/fallback";
import { hasCmsImage } from "@/sanity/image";
import type {
  EventPackage,
  GalleryCategory,
  GalleryItem,
  Navigation,
  PageDoc,
  PageSection,
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
    const page = { ...data, sections: data.sections || [] };
    if (page.slug === "home") return restoreHomeLayout(page);
    return page;
  }
  return fallbackContent.pages[slug];
}

function isPlaceholderHero(section: Extract<PageSection, { _type: "hero" }>) {
  const blob = `${section.eyebrow || ""} ${section.heading || ""}`.toLowerCase();
  return /cms preview|golf from the cms/.test(blob);
}

function restoreHomeLayout(page: PageDoc): PageDoc {
  const fallbackSections = fallbackContent.pages.home.sections;
  const fallbackHero = fallbackSections.find((section) => section._type === "hero");
  const current = page.sections || [];
  const types = new Set(current.map((section) => section._type));
  const fallbackHeroImage =
    fallbackHero?._type === "hero" ? fallbackHero.image : photos.homeHero;
  const next: PageSection[] = current.map((section) => {
    if (section._type !== "hero") return section;
    const fromFallback =
      isPlaceholderHero(section) && fallbackHero?._type === "hero" ? fallbackHero : null;
    return {
      ...section,
      ...(fromFallback
        ? {
            eyebrow: fromFallback.eyebrow,
            heading: fromFallback.heading,
            subheading: fromFallback.subheading,
            overlay: fromFallback.overlay,
            primaryCta: fromFallback.primaryCta,
            secondaryCta: fromFallback.secondaryCta,
          }
        : {}),
      videoUrl: undefined,
      image: hasCmsImage(section.image) ? section.image : fallbackHeroImage,
    };
  });

  for (const section of fallbackSections) {
    if (section._type === "hero" || types.has(section._type)) continue;
    if (section._type === "packageGrid") {
      const heroIndex = next.findIndex((item) => item._type === "hero");
      next.splice(heroIndex >= 0 ? heroIndex + 1 : 0, 0, section);
    } else {
      next.push(section);
    }
    types.add(section._type);
  }

  return {
    ...page,
    seo: page.seo?.title ? page.seo : fallbackContent.pages.home.seo,
    sections: next,
  };
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
  const items = data?.length ? data : fallbackContent.gallery;
  return items.map((item) => ({
    ...item,
    categories: (item.categories || []).filter(Boolean),
  }));
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
