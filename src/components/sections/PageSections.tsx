"use client";

import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import { Hero } from "@/components/sections/Hero";
import { ContactBlockView } from "@/components/sections/ContactBlock";
import { CtaView } from "@/components/sections/Cta";
import { FaqView } from "@/components/sections/Faq";
import { FeatureGridView } from "@/components/sections/FeatureGrid";
import { GallerySectionView } from "@/components/sections/GallerySection";
import { ImageBlockView } from "@/components/sections/ImageBlock";
import { PackageGridView } from "@/components/sections/PackageGrid";
import { PartnerGridView } from "@/components/sections/PartnerGrid";
import { RichTextSectionView } from "@/components/sections/RichText";
import { StatisticsView } from "@/components/sections/Statistics";
import { TestimonialsView } from "@/components/sections/Testimonials";
import { TextAndImageView } from "@/components/sections/TextAndImage";
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
  documentId,
  documentType = "page",
  sections,
  settings,
  packages,
  gallery,
  galleryCategories,
  partners,
  testimonials,
}: {
  documentId?: string;
  documentType?: string;
  sections: PageSection[];
  settings: SiteSettings;
  packages: EventPackage[];
  gallery: GalleryItem[];
  galleryCategories: GalleryCategory[];
  partners: Partner[];
  testimonials: Testimonial[];
}) {
  const liveSections = useOptimistic<PageSection[], { sections?: PageSection[] }>(
    sections,
    (current, action) => {
      if (!documentId) return current;
      const left = action.id.replace(/^drafts\./, "");
      const right = documentId.replace(/^drafts\./, "");
      if (left !== right) return current;
      const incoming = action.document.sections;
      if (!Array.isArray(incoming)) return current;
      const byKey = new Map(current.map((section) => [section._key, section]));
      return incoming.map((section) => byKey.get(section._key) ?? section);
    },
  );

  const faqSection = liveSections.find((section) => section._type === "faq");
  const parentAttr = documentId
    ? createDataAttribute({
        id: documentId,
        type: documentType,
        path: "sections",
      }).toString()
    : undefined;

  if (!liveSections.length) {
    return (
      <div className="mx-auto max-w-shell px-5 py-24 sm:px-8">
        <p className="font-display text-3xl text-cream">This page is still being built.</p>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted">
          Add sections in the Studio and they will appear here, in the order you arrange them.
        </p>
      </div>
    );
  }

  return (
    <div data-sanity={parentAttr}>
      {faqSection && faqSection._type === "faq" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqSection.items || [])) }}
        />
      ) : null}
      {liveSections.map((section, index) => {
        const attr = documentId
          ? createDataAttribute({
              id: documentId,
              type: documentType,
              path: `sections[_key=="${section._key}"]`,
            }).toString()
          : undefined;

        return (
          <div key={section._key} data-sanity={attr}>
            {renderSection(section, {
              settings,
              packages,
              gallery,
              galleryCategories,
              partners,
              testimonials,
              heroPriority: index === 0,
            })}
          </div>
        );
      })}
    </div>
  );
}

function renderSection(
  section: PageSection,
  context: {
    settings: SiteSettings;
    packages: EventPackage[];
    gallery: GalleryItem[];
    galleryCategories: GalleryCategory[];
    partners: Partner[];
    testimonials: Testimonial[];
    heroPriority: boolean;
  },
) {
  switch (section._type) {
    case "hero":
      return <Hero section={section} priority={context.heroPriority} />;
    case "richText":
      return <RichTextSectionView section={section} />;
    case "textAndImage":
      return <TextAndImageView section={section} />;
    case "imageBlock":
      return <ImageBlockView section={section} />;
    case "gallery":
      return (
        <GallerySectionView
          section={section}
          items={context.gallery}
          categories={context.galleryCategories}
        />
      );
    case "partnerGrid":
      return <PartnerGridView section={section} partners={context.partners} />;
    case "packageGrid":
      return <PackageGridView section={section} packages={context.packages} />;
    case "featureGrid":
      return <FeatureGridView section={section} />;
    case "testimonials":
      return <TestimonialsView section={section} testimonials={context.testimonials} />;
    case "statistics":
      return <StatisticsView section={section} />;
    case "faq":
      return <FaqView section={section} />;
    case "cta":
      return <CtaView section={section} />;
    case "contactBlock":
      return (
        <ContactBlockView
          section={section}
          settings={context.settings}
          packages={context.packages}
        />
      );
    default:
      return null;
  }
}
