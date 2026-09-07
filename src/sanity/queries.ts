import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  footerNote,
  contact,
  socials,
  defaultSeo{ title, description, ogImage }
}`;

export const navigationQuery = groq`*[_type == "navigation"][0]{
  items[]{ label, href, children[]{ label, href } },
  ctaLabel,
  ctaHref
}`;

export const pagesQuery = groq`*[_type == "page"]{
  title,
  "slug": slug.current,
  seo,
  sections[]{
    ...,
    image{ ..., asset, alt, "url": asset->url },
    body
  }
}`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seo{ title, description, ogImage },
  sections[]{
    _key,
    _type,
    eyebrow,
    heading,
    subheading,
    intro,
    text,
    caption,
    categorySlug,
    limit,
    featuredOnly,
    imagePosition,
    image{ alt, asset, hotspot, "url": asset->url },
    primaryCta,
    secondaryCta,
    button,
    items,
    body
  }
}`;

export const packagesQuery = groq`*[_type == "eventPackage"] | order(order asc, title asc){
  _id,
  title,
  shortName,
  "slug": slug.current,
  subtitle,
  summary,
  priceLabel,
  durationLabel,
  includes,
  extras,
  featured,
  seo,
  sections[]{
    _key,
    _type,
    eyebrow,
    heading,
    subheading,
    intro,
    text,
    caption,
    categorySlug,
    limit,
    featuredOnly,
    imagePosition,
    image{ alt, asset, hotspot, "url": asset->url },
    primaryCta,
    secondaryCta,
    button,
    items,
    body
  }
}`;

export const packageBySlugQuery = groq`*[_type == "eventPackage" && slug.current == $slug][0]{
  _id,
  title,
  shortName,
  "slug": slug.current,
  subtitle,
  summary,
  priceLabel,
  durationLabel,
  includes,
  extras,
  featured,
  seo,
  sections[]{
    _key,
    _type,
    eyebrow,
    heading,
    subheading,
    intro,
    text,
    caption,
    categorySlug,
    limit,
    featuredOnly,
    imagePosition,
    image{ alt, asset, hotspot, "url": asset->url },
    primaryCta,
    secondaryCta,
    button,
    items,
    body
  }
}`;

export const galleryQuery = groq`*[_type == "galleryItem"] | order(_createdAt desc){
  _id,
  title,
  "categories": categories[]->slug.current,
  image{ alt, asset, hotspot, "url": asset->url }
}`;

export const galleryCategoriesQuery = groq`*[_type == "galleryCategory"] | order(title asc){
  title,
  "slug": slug.current
}`;

export const partnersQuery = groq`*[_type == "partner"] | order(name asc){
  _id,
  name,
  summary,
  url,
  logo{ alt, asset, "url": asset->url }
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc){
  _id,
  quote,
  attribution,
  role
}`;
