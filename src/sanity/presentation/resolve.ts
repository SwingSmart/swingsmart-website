import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";

function pagePath(slug?: string | null) {
  if (!slug || slug === "home") return "/";
  return `/${slug}`;
}

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    {
      route: "/",
      filter: `_type == "page" && slug.current == "home"`,
    },
    {
      route: "/packages/:slug",
      filter: `_type == "eventPackage" && slug.current == $slug`,
    },
    {
      route: "/:slug",
      filter: `_type == "page" && slug.current == $slug`,
    },
  ]),
  locations: {
    page: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Page",
            href: pagePath(doc?.slug),
          },
        ],
      }),
    }),
    eventPackage: defineLocations({
      select: { title: "name", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Package",
            href: `/packages/${doc?.slug || ""}`,
          },
          { title: "All packages", href: "/packages" },
        ],
      }),
    }),
    galleryItem: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Gallery", href: "/gallery" }],
      }),
    }),
    galleryCategory: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Gallery category", href: "/gallery" }],
      }),
    }),
    partner: defineLocations({
      select: { title: "name" },
      resolve: () => ({
        locations: [{ title: "Partnerships", href: "/partnerships" }],
      }),
    }),
    testimonial: defineLocations({
      select: { title: "person" },
      resolve: () => ({
        locations: [{ title: "Home", href: "/" }],
      }),
    }),
    siteSettings: defineLocations({
      message: "These details appear across the whole website.",
      tone: "positive",
    }),
    navigation: defineLocations({
      message: "This menu appears in the header and footer.",
      tone: "positive",
    }),
  },
};
