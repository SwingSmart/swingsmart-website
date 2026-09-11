import { PhotoFrame } from "@/components/ui/CmsPhoto";
import { Container, Section } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import type { ImageSection } from "@/lib/types";
import { hasCmsImage } from "@/sanity/image";

export function ImageBlockView({ section }: { section: ImageSection }) {
  return (
    <Section className="py-8 sm:py-12 lg:py-16">
      <Container>
        <Reveal>
          {hasCmsImage(section.image) ? (
            <figure>
              <PhotoFrame
                image={section.image}
                zoom
                className="aspect-[16/10] w-full sm:aspect-[21/9]"
                sizes="100vw"
                width={2200}
              />
              {section.caption ? (
                <figcaption className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                  {section.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : (
            <EmptyState
              title="A photograph belongs here"
              text="Add a photo in the Studio and it will fill this space, edge to edge."
            />
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
