import { Container, Section, SectionIntro } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Reveal } from "@/components/ui/Reveal";
import type { GalleryCategory, GalleryItem, GallerySection } from "@/lib/types";

export function GallerySectionView({
  section,
  items,
  categories,
}: {
  section: GallerySection;
  items: GalleryItem[];
  categories: GalleryCategory[];
}) {
  const filtered = items.filter((item) => {
    if (section.featuredOnly && !item.featured) return false;
    if (section.categorySlug && !item.categories.includes(section.categorySlug)) {
      return false;
    }
    return true;
  });
  const limited = section.limit ? filtered.slice(0, section.limit) : filtered;
  const showFilters = !section.categorySlug;

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionIntro heading={section.heading} intro={section.intro} />
        </Reveal>
        {limited.length ? (
          <GalleryGrid
            items={limited}
            categories={showFilters ? categories : undefined}
          />
        ) : (
          <EmptyState
            title="The gallery is warming up"
            text="Event photography will appear here once it is added in the Studio."
          />
        )}
      </Container>
    </Section>
  );
}
