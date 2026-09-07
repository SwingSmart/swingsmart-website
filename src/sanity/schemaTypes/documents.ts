import { defineArrayMember, defineField, defineType } from "sanity";
import { pageSections } from "./sections";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
    defineField({
      name: "sections",
      type: "array",
      of: pageSections.map((s) => defineArrayMember(s)),
    }),
  ],
});

export const eventPackage = defineType({
  name: "eventPackage",
  title: "Package",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "shortName", type: "string", title: "Short label" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "subtitle", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 4 }),
    defineField({ name: "priceLabel", type: "string", title: "Price (e.g. From £395)" }),
    defineField({ name: "durationLabel", type: "string" }),
    defineField({ name: "includes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "extras", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: true }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "seo", type: "seo" }),
    defineField({
      name: "sections",
      title: "Extra page sections",
      type: "array",
      of: pageSections.map((s) => defineArrayMember(s)),
    }),
  ],
});

export const galleryCategory = defineType({
  name: "galleryCategory",
  title: "Gallery category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
  ],
});

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery image",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "galleryCategory" }] }],
    }),
  ],
});

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "url", type: "url" }),
    defineField({
      name: "logo",
      type: "image",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "attribution", type: "string" }),
    defineField({ name: "role", type: "string" }),
  ],
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
            defineField({
              name: "children",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string" }),
                    defineField({ name: "href", type: "string" }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
    defineField({ name: "ctaLabel", type: "string" }),
    defineField({ name: "ctaHref", type: "string" }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "footerNote", type: "text", rows: 3 }),
    defineField({
      name: "contact",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phones", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "location", type: "string" }),
      ],
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
        },
      ],
    }),
    defineField({ name: "defaultSeo", type: "seo" }),
  ],
});

export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "eventDate", type: "string" }),
    defineField({ name: "packageInterest", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "receivedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
});
