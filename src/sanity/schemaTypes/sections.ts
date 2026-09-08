import {
  BlockElementIcon,
  BoltIcon,
  CommentIcon,
  DocumentTextIcon,
  EarthGlobeIcon,
  HelpCircleIcon,
  ImageIcon,
  ImagesIcon,
  InlineElementIcon,
  NumberIcon,
  StarIcon,
  UsersIcon,
} from "@sanity/icons";
import type { ComponentType } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";

const sectionPreview = (fallback: string, media?: ComponentType) => ({
  select: { heading: "heading", image: "image" },
  prepare({ heading, image }: { heading?: string; image?: unknown }) {
    return {
      title: heading || fallback,
      subtitle: fallback,
      media: (image as ComponentType | undefined) || media,
    };
  },
});

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small line above the heading",
      type: "string",
      description: "Optional. For example: Beyond Golf",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Supporting text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Background photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Describe the photo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "primaryCta",
      title: "Main button",
      type: "ctaButton",
    }),
    defineField({
      name: "secondaryCta",
      title: "Second button",
      type: "ctaButton",
    }),
    defineField({
      name: "overlay",
      title: "Photo darkening",
      type: "string",
      description: "Darker makes the heading easier to read over a busy photo.",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Medium", value: "medium" },
          { title: "Dark", value: "dark" },
        ],
        layout: "radio",
      },
      initialValue: "medium",
    }),
  ],
  preview: sectionPreview("Hero", ImageIcon),
});

export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Optional heading above the text.",
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "portableBody",
    }),
  ],
  preview: sectionPreview("Rich text", DocumentTextIcon),
});

export const textAndImage = defineType({
  name: "textAndImage",
  title: "Text + image",
  type: "object",
  icon: InlineElementIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Text", type: "portableBody" }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Describe the photo", type: "string" }),
      ],
    }),
    defineField({
      name: "imagePosition",
      title: "Photo position",
      type: "string",
      options: {
        list: [
          { title: "Right", value: "right" },
          { title: "Left", value: "left" },
        ],
        layout: "radio",
      },
      initialValue: "right",
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "ctaButton",
      description: "Optional. Leave empty if this block is just text and a photo.",
    }),
  ],
  preview: sectionPreview("Text + image", InlineElementIcon),
});

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Standalone image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Describe the photo", type: "string" }),
      ],
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional line under the photo.",
    }),
  ],
  preview: sectionPreview("Image", ImageIcon),
});

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "category",
      title: "Show only this category",
      type: "reference",
      to: [{ type: "galleryCategory" }],
      description: "Leave empty to show every photo.",
    }),
    defineField({
      name: "featuredOnly",
      title: "Show featured photos only",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "limit",
      title: "Maximum photos",
      type: "number",
      description: "Leave empty to show all.",
    }),
  ],
  preview: sectionPreview("Gallery", ImagesIcon),
});

export const partnerGrid = defineType({
  name: "partnerGrid",
  title: "Partner grid",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "featuredOnly",
      title: "Show featured partners only",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: sectionPreview("Partner grid", EarthGlobeIcon),
});

export const packageGrid = defineType({
  name: "packageGrid",
  title: "Package grid",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "featuredOnly",
      title: "Show featured packages only",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: sectionPreview("Package grid", StarIcon),
});

export const featureGrid = defineType({
  name: "featureGrid",
  title: "Feature grid",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "text" },
          },
        }),
      ],
    }),
  ],
  preview: sectionPreview("Feature grid", BlockElementIcon),
});

export const testimonials = defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "object",
  icon: CommentIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "featuredOnly",
      title: "Show featured testimonials only",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "limit",
      title: "Maximum quotes",
      type: "number",
      description: "Leave empty to show all.",
    }),
  ],
  preview: sectionPreview("Testimonials", CommentIcon),
});

export const statistics = defineType({
  name: "statistics",
  title: "Statistics",
  type: "object",
  icon: NumberIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Figures",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Figure",
              type: "string",
              description: "For example: 4 hours  or  4m × 3m × 3m",
            }),
            defineField({
              name: "label",
              title: "What it means",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
    }),
  ],
  preview: sectionPreview("Statistics", NumberIcon),
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        }),
      ],
    }),
  ],
  preview: sectionPreview("FAQ", HelpCircleIcon),
});

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  icon: BoltIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "text", title: "Supporting text", type: "text", rows: 2 }),
    defineField({ name: "button", title: "Button", type: "ctaButton" }),
  ],
  preview: sectionPreview("Call to action", BoltIcon),
});

export const contactBlock = defineType({
  name: "contactBlock",
  title: "Contact",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "text",
      title: "Supporting text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "showDetails",
      title: "Show phone, email and address",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showForm",
      title: "Show the enquiry form",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: sectionPreview("Contact", UsersIcon),
});

export const pageBuilderField = defineField({
  name: "sections",
  title: "Page sections",
  type: "array",
  description:
    "Build the page in blocks. Drag the handle on the left to reorder. Click + to add a block.",
  of: [
    defineArrayMember({ type: "hero" }),
    defineArrayMember({ type: "richText" }),
    defineArrayMember({ type: "textAndImage" }),
    defineArrayMember({ type: "imageBlock" }),
    defineArrayMember({ type: "gallery" }),
    defineArrayMember({ type: "partnerGrid" }),
    defineArrayMember({ type: "packageGrid" }),
    defineArrayMember({ type: "featureGrid" }),
    defineArrayMember({ type: "testimonials" }),
    defineArrayMember({ type: "statistics" }),
    defineArrayMember({ type: "faq" }),
    defineArrayMember({ type: "cta" }),
    defineArrayMember({ type: "contactBlock" }),
  ],
  options: {
    sortable: true,
    insertMenu: {
      filter: true,
      showIcons: true,
      groups: [
        { name: "intro", title: "Top of page", of: ["hero"] },
        {
          name: "content",
          title: "Content",
          of: ["richText", "textAndImage", "imageBlock"],
        },
        {
          name: "lists",
          title: "Lists & galleries",
          of: [
            "gallery",
            "partnerGrid",
            "packageGrid",
            "featureGrid",
            "testimonials",
            "statistics",
            "faq",
          ],
        },
        { name: "action", title: "Get in touch", of: ["cta", "contactBlock"] },
      ],
      views: [{ name: "list" }, { name: "grid" }],
    },
  },
});
