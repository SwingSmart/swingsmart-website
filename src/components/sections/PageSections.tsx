import { Hero } from "@/components/sections/Hero";
import {
  ContactBlockView,
  CtaView,
  FaqView,
  FeatureGridView,
  GallerySectionView,
  ImageBlockView,
  PackageGridView,
  PartnerGridView,
  RichTextSectionView,
  StatisticsView,
  TestimonialsView,
  TextAndImageView,
} from "@/components/sections/Blocks";
import type {
  EventPackage,
  GalleryCategory,
  GalleryItem,
  PageSection,
  Partner,
  SiteSettings,
  Testimonial,
} from "@/lib/types";
import { faqJsonLd } from "@/lib/structured-data";

export function PageSections({
  sections,
  settings,
  packages,
  gallery,
  galleryCategories,
  partners,
  testimonials,
}: {
  sections: PageSection[];
  settings: SiteSettings;
  packages: EventPackage[];
  gallery: GalleryItem[];
  galleryCategories: GalleryCategory[];
  partners: Partner[];
  testimonials: Testimonial[];
}) {
  const faqSection = sections.find((section) => section._type === "faq");

  return (
    <>
      {faqSection && faqSection._type === "faq" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqSection.items)) }}
        />
      ) : null}
      {sections.map((section) => {
        switch (section._type) {
          case "hero":
            return <Hero key={section._key} section={section} />;
          case "richText":
            return <RichTextSectionView key={section._key} section={section} />;
          case "textAndImage":
            return <TextAndImageView key={section._key} section={section} />;
          case "imageBlock":
            return <ImageBlockView key={section._key} section={section} />;
          case "gallery":
            return (
              <GallerySectionView
                key={section._key}
                section={section}
                items={gallery}
                categories={galleryCategories}
              />
            );
          case "partnerGrid":
            return (
              <PartnerGridView key={section._key} section={section} partners={partners} />
            );
          case "packageGrid":
            return (
              <PackageGridView key={section._key} section={section} packages={packages} />
            );
          case "featureGrid":
            return <FeatureGridView key={section._key} section={section} />;
          case "testimonials":
            return (
              <TestimonialsView
                key={section._key}
                section={section}
                testimonials={testimonials}
              />
            );
          case "statistics":
            return <StatisticsView key={section._key} section={section} />;
          case "faq":
            return <FaqView key={section._key} section={section} />;
          case "cta":
            return <CtaView key={section._key} section={section} />;
          case "contactBlock":
            return (
              <ContactBlockView
                key={section._key}
                section={section}
                settings={settings}
                packages={packages}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
