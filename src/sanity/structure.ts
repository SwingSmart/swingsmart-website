import {
  CaseIcon,
  CogIcon,
  DocumentsIcon,
  EnvelopeIcon,
  ImagesIcon,
  MenuIcon,
  StarIcon,
  UsersIcon,
} from "./studioIcons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website")
    .items([
      S.listItem()
        .title("Pages")
        .icon(DocumentsIcon)
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("Packages")
        .icon(StarIcon)
        .child(S.documentTypeList("eventPackage").title("Packages")),
      S.divider(),
      S.listItem()
        .title("Gallery")
        .icon(ImagesIcon)
        .child(
          S.list()
            .title("Gallery")
            .items([
              S.listItem()
                .title("Photos")
                .icon(ImagesIcon)
                .child(S.documentTypeList("galleryItem").title("Photos")),
              S.listItem()
                .title("Categories")
                .icon(CaseIcon)
                .child(S.documentTypeList("galleryCategory").title("Categories")),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Partners")
        .icon(UsersIcon)
        .child(S.documentTypeList("partner").title("Partners")),
      S.listItem()
        .title("Testimonials")
        .icon(StarIcon)
        .child(S.documentTypeList("testimonial").title("Testimonials")),
      S.divider(),
      S.listItem()
        .title("Navigation")
        .icon(MenuIcon)
        .id("navigation")
        .child(S.document().schemaType("navigation").documentId("navigation").title("Navigation")),
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings"),
        ),
      S.divider(),
      S.listItem()
        .title("Enquiries")
        .icon(EnvelopeIcon)
        .child(S.documentTypeList("enquiry").title("Enquiries")),
    ]);
