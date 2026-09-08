import {
  CaseIcon,
  CogIcon,
  DocumentsIcon,
  EnvelopeIcon,
  ImagesIcon,
  MenuIcon,
  StarIcon,
  UsersIcon,
} from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { pageBuilderField } from "./sections";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentsIcon,
  groups: [
    { name: "content", title: "Page", default: true },
    { name: "seo", title: "Search & social" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "Internal name and the default heading.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "content",
      description:
        "The end of the URL. Home should be “home”. About should be “about”. Package pages use packages/golfer and so on.",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    { ...pageBuilderField, group: "content" },
    defineField({
      name: "seo",
      title: "Search & social",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return {
        title: title || "Untitled page",
        subtitle: slug === "home" ? "/" : `/${slug || ""}`,
      };
    },
  },
});

export const eventPackage = defineType({
  name: "eventPackage",
  title: "Package",
  type: "document",
  icon: StarIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "pricing", title: "Price & time" },
    { name: "includes", title: "What’s included" },
    { name: "photos", title: "Photos" },
    { name: "cta", title: "Button" },
    { name: "seo", title: "Search & social" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "details",
      description: "For example: The Golfer",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name",
      type: "string",
      group: "details",
      description: "A few words shown above the name. For example: Individual",
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "details",
      description: "Added after /packages/. For example golfer becomes /packages/golfer",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "details",
      description: "A short line under the name.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "details",
      description: "Used on the packages list. Two or three sentences is enough.",
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "portableBody",
      group: "details",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "details",
      description: "Show this package in “featured only” lists.",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "List order",
      type: "number",
      group: "details",
      description: "Lower numbers appear first. 1 is the top of the list.",
    }),
    defineField({
      name: "startingPrice",
      title: "Starting price",
      type: "number",
      group: "pricing",
      description: "Numbers only, in pounds. Leave empty for Price on application.",
    }),
    defineField({
      name: "priceQualifier",
      title: "Price label",
      type: "string",
      group: "pricing",
      description: "Shown in front of the price. For example: From   or   POA",
      initialValue: "From",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "pricing",
      description: "For example: Minimum 4 hours",
    }),
    defineField({
      name: "includes",
      title: "Included items",
      type: "array",
      group: "includes",
      of: [defineArrayMember({ type: "string" })],
      description: "One item per line. Drag to reorder.",
    }),
    defineField({
      name: "extras",
      title: "Optional extras",
      type: "array",
      group: "includes",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "heroImage",
      title: "Hero photo",
      type: "image",
      group: "photos",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Describe the photo", type: "string" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "photos",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Describe the photo", type: "string" }),
          ],
        }),
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "ctaButton",
      group: "cta",
      description: "Usually “Enquire” linking to /contact.",
    }),
    { ...pageBuilderField, group: "details", title: "Extra page sections", description: "Optional extra blocks below the package details. Drag to reorder." },
    defineField({
      name: "seo",
      title: "Search & social",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "List order",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "shortName", media: "heroImage" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Untitled package", subtitle, media };
    },
  },
});

export const galleryCategory = defineType({
  name: "galleryCategory",
  title: "Gallery category",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      description: "For example: Weddings",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "A short name for this photo.",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Describe the photo",
          type: "string",
          description: "Used if the separate description field below is empty.",
        }),
      ],
    }),
    defineField({
      name: "alt",
      title: "Describe the photo",
      type: "string",
      description: "For people who cannot see the picture. Also used by Google.",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional line shown with the photo.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "galleryCategory" }] }],
      description: "Used to filter the gallery.",
    }),
    defineField({
      name: "venue",
      title: "Event or venue",
      type: "string",
      description: "Where or what this was. For example: Cornwall wedding",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Optional.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "venue", media: "image" },
  },
});

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      fields: [
        defineField({ name: "alt", title: "Describe the logo", type: "string" }),
      ],
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      description: "Their homepage. Visitors can open this from the partners page.",
    }),
    defineField({
      name: "summary",
      title: "Short description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "portableBody",
      description: "Optional. Only needed if you want a longer write-up.",
    }),
    defineField({
      name: "caseStudyUrl",
      title: "Case study link",
      type: "url",
      description: "Optional. A page or article about this partnership.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "List order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [
    {
      title: "List order",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "summary", media: "logo" },
  },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "person",
      title: "Person",
      type: "string",
      description: "Who said it. Leave empty for a general attribution such as Wedding hire.",
    }),
    defineField({
      name: "organisation",
      title: "Organisation",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "For example: Golf club manager",
    }),
    defineField({
      name: "image",
      title: "Photo or logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "quote", subtitle: "person", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title: title ? `“${title.slice(0, 60)}${title.length > 60 ? "…" : ""}”` : "Testimonial",
        subtitle,
        media,
      };
    },
  },
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "items",
      title: "Menu",
      type: "array",
      description: "Drag to reorder. The logo already links to Home, so you do not need a Home item.",
      of: [defineArrayMember({ type: "navItem" })],
    }),
    defineField({
      name: "ctaLabel",
      title: "Header button text",
      type: "string",
      description: "Used if Site settings does not have a main button. For example: Plan an event",
    }),
    defineField({
      name: "ctaHref",
      title: "Header button destination",
      type: "string",
      description: "For example /contact",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "business", title: "Business", default: true },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "Search & social" },
  ],
  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      group: "business",
      initialValue: "SwingSmart UK",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "business",
      initialValue: "Beyond Golf.",
    }),
    defineField({
      name: "footerText",
      title: "Footer text",
      type: "text",
      rows: 3,
      group: "business",
      description: "Short line in the footer about the business.",
    }),
    defineField({
      name: "primaryCta",
      title: "Main button",
      type: "ctaButton",
      group: "business",
      description: "Shown in the header. Usually Plan an event → /contact",
    }),
    defineField({
      name: "secondaryCta",
      title: "Second button",
      type: "ctaButton",
      group: "business",
      description: "Optional. For example View packages → /packages",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phones",
      title: "Phone numbers",
      type: "array",
      group: "contact",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "address",
      title: "Address / region",
      type: "string",
      group: "contact",
      description: "For example: Cornwall, United Kingdom",
    }),
    defineField({
      name: "socials",
      title: "Social media links",
      type: "array",
      group: "contact",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default search & social",
      type: "seo",
      group: "seo",
      description: "Used when a page does not have its own search details.",
    }),
  ],
  preview: {
    select: { title: "businessName" },
    prepare({ title }) {
      return { title: title || "Site settings" };
    },
  },
});

export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  icon: EnvelopeIcon,
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "eventDate", title: "Preferred date", type: "string" }),
    defineField({ name: "packageInterest", title: "Package", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "receivedAt", title: "Received", type: "datetime" }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
});
