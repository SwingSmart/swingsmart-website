import { defineArrayMember, defineField, defineType } from "sanity";

const sectionPreview = (title: string) => ({
  select: { heading: "heading" },
  prepare({ heading }: { heading?: string }) {
    return { title: heading || title, subtitle: title };
  },
});

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subheading", type: "text", rows: 3 }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({ name: "primaryCta", type: "ctaButton" }),
    defineField({ name: "secondaryCta", type: "ctaButton" }),
  ],
  preview: sectionPreview("Hero"),
});

export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "body", type: "portableBody" }),
  ],
  preview: sectionPreview("Rich text"),
});

export const textAndImage = defineType({
  name: "textAndImage",
  title: "Text and image",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "body", type: "portableBody" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "imagePosition",
      type: "string",
      options: {
        list: [
          { title: "Right", value: "right" },
          { title: "Left", value: "left" },
        ],
      },
      initialValue: "right",
    }),
  ],
  preview: sectionPreview("Text and image"),
});

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({ name: "caption", type: "string" }),
  ],
  preview: sectionPreview("Image"),
});

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "categorySlug",
      type: "string",
      title: "Category slug (optional filter)",
    }),
    defineField({ name: "limit", type: "number" }),
  ],
  preview: sectionPreview("Gallery"),
});

export const partnerGrid = defineType({
  name: "partnerGrid",
  title: "Partner / logo grid",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 2 }),
  ],
  preview: sectionPreview("Partner grid"),
});

export const packageGrid = defineType({
  name: "packageGrid",
  title: "Package grid",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 2 }),
    defineField({ name: "featuredOnly", type: "boolean", initialValue: false }),
  ],
  preview: sectionPreview("Package grid"),
});

export const featureGrid = defineType({
  name: "featureGrid",
  title: "Feature grid",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "text", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),
  ],
  preview: sectionPreview("Feature grid"),
});

export const testimonials = defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "object",
  fields: [defineField({ name: "heading", type: "string" })],
  preview: sectionPreview("Testimonials"),
});

export const statistics = defineType({
  name: "statistics",
  title: "Statistics",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", type: "string" }),
            defineField({ name: "label", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
  ],
  preview: sectionPreview("Statistics"),
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "text", rows: 4 }),
          ],
        }),
      ],
    }),
  ],
  preview: sectionPreview("FAQ"),
});

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 2 }),
    defineField({ name: "button", type: "ctaButton" }),
  ],
  preview: sectionPreview("Call to action"),
});

export const contactBlock = defineType({
  name: "contactBlock",
  title: "Contact block",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "text", type: "text", rows: 2 }),
  ],
  preview: sectionPreview("Contact block"),
});

export const pageSections = [
  { type: "hero" },
  { type: "richText" },
  { type: "textAndImage" },
  { type: "imageBlock" },
  { type: "gallery" },
  { type: "partnerGrid" },
  { type: "packageGrid" },
  { type: "featureGrid" },
  { type: "testimonials" },
  { type: "statistics" },
  { type: "faq" },
  { type: "cta" },
  { type: "contactBlock" },
];
