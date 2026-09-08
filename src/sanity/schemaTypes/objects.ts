import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "Search & social",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Search title",
      type: "string",
      description: "Shown in Google and browser tabs. Keep it under 60 characters.",
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 3,
      description: "One or two sentences for Google. Keep it under 160 characters.",
    }),
    defineField({
      name: "ogImage",
      title: "Image for social media",
      type: "image",
      description: "Used when this page is shared on WhatsApp, LinkedIn or Facebook.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Describe the image",
          type: "string",
          description: "For people who cannot see the picture.",
        }),
      ],
    }),
  ],
});

export const ctaButton = defineType({
  name: "ctaButton",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button text",
      type: "string",
      description: "For example: Plan an event",
    }),
    defineField({
      name: "href",
      title: "Goes to",
      type: "string",
      description: "A page on this website, starting with /. For example /contact",
    }),
    defineField({
      name: "style",
      title: "Look",
      type: "string",
      description: "Green is the main action. Outline is quieter.",
      options: {
        list: [
          { title: "Green", value: "primary" },
          { title: "Outline", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
    prepare({ title, subtitle }) {
      return { title: title || "Button", subtitle };
    },
  },
});

export const portableBody = defineType({
  name: "portableBody",
  title: "Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
      ],
      lists: [
        { title: "Bullet list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                title: "Web address",
                type: "url",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
            ],
          },
        ],
      },
    },
  ],
});

export const navItem = defineType({
  name: "navItem",
  title: "Menu item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "What visitors see in the menu.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Page address",
      type: "string",
      description: "Start with /. Examples: /packages  /about  /contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "children",
      title: "Dropdown links",
      type: "array",
      description: "Optional extra links that appear under this item. Used for Packages.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Page address",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Name",
      type: "string",
      description: "For example: LinkedIn",
    }),
    defineField({
      name: "url",
      title: "Web address",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
