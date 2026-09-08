import { groq } from "next-sanity";

const imageProjection = groq`{
  alt,
  asset,
  hotspot,
  crop,
  "url": asset->url,
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const sectionProjection = groq`{
  _key,
  _type,
  eyebrow,
  heading,
  subheading,
  intro,
  text,
  caption,
  overlay,
  imagePosition,
  featuredOnly,
  limit,
  showForm,
  showDetails,
  "categorySlug": coalesce(category->slug.current, categorySlug),
  image ${imageProjection},
  primaryCta,
  secondaryCta,
  cta,
  button,
  items,
  body
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  "siteName": coalesce(businessName, siteName),
  tagline,
  "footerNote": coalesce(footerText, footerNote),
  "contact": {
    "email": coalesce(email, contact.email),
    "phones": coalesce(phones, contact.phones),
    "location": coalesce(address, contact.location, contact.address)
  },
  "socials": coalesce(socials, social),
  defaultSeo{ title, description, ogImage ${imageProjection} },
  primaryCta,
  secondaryCta
}`;

export const navigationQuery = groq`*[_type == "navigation"][0]{
  items[]{ _key, label, href, children[]{ _key, label, href } },
  ctaLabel,
  ctaHref,
  cta
}`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  "slug": slug.current,
  seo{ title, description, ogImage ${imageProjection} },
  sections[] ${sectionProjection}
}`;

export const packagesQuery = groq`*[_type == "eventPackage"] | order(featured desc, sortOrder asc, name asc, title asc){
  _id,
  "title": coalesce(name, title),
  "shortName": coalesce(shortName, name, title),
  "slug": slug.current,
  subtitle,
  summary,
  featured,
  "priceLabel": select(
    defined(startingPrice) => coalesce(priceQualifier, "From") + " £" + string(startingPrice),
    defined(priceQualifier) => priceQualifier,
    priceLabel
  ),
  "durationLabel": coalesce(duration, durationLabel),
  heroImage ${imageProjection},
  cta
}`;

export const packageBySlugQuery = groq`*[_type == "eventPackage" && slug.current == $slug][0]{
  _id,
  _type,
  "title": coalesce(name, title),
  "shortName": coalesce(shortName, name, title),
  "slug": slug.current,
  subtitle,
  summary,
  description,
  featured,
  includes,
  extras,
  "priceLabel": select(
    defined(startingPrice) => coalesce(priceQualifier, "From") + " £" + string(startingPrice),
    defined(priceQualifier) => priceQualifier,
    priceLabel
  ),
  "durationLabel": coalesce(duration, durationLabel),
  heroImage ${imageProjection},
  gallery[] ${imageProjection},
  cta,
  seo{ title, description, ogImage ${imageProjection} },
  sections[] ${sectionProjection}
}`;

export const galleryQuery = groq`*[_type == "galleryItem"] | order(featured desc, date desc, title asc){
  _id,
  title,
  alt,
  caption,
  venue,
  date,
  featured,
  "categories": categories[]->slug.current,
  image{
    asset,
    hotspot,
    crop,
    "alt": coalesce(^.alt, alt),
    "url": asset->url,
    "lqip": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`;

export const galleryCategoriesQuery = groq`*[_type == "galleryCategory"] | order(title asc){
  _id,
  title,
  "slug": slug.current
}`;

export const partnersQuery = groq`*[_type == "partner"] | order(featured desc, sortOrder asc, name asc){
  _id,
  name,
  summary,
  description,
  featured,
  sortOrder,
  caseStudyUrl,
  "url": coalesce(website, url),
  logo ${imageProjection}
}`;

export const pagesQuery = groq`*[_type == "page" && defined(slug.current)]{
  "slug": slug.current
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(featured desc, _createdAt desc){
  _id,
  quote,
  "attribution": coalesce(person, organisation, attribution),
  person,
  organisation,
  role,
  featured,
  image ${imageProjection}
}`;
