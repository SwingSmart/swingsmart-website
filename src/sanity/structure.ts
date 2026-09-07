import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("SwingSmart")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Navigation")
        .id("navigation")
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("eventPackage").title("Packages"),
      S.divider(),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.documentTypeListItem("galleryCategory").title("Gallery categories"),
      S.documentTypeListItem("partner").title("Partners"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      S.documentTypeListItem("enquiry").title("Enquiries"),
    ]);
