import { PhotoFrame } from "@/components/ui/CmsPhoto";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import type { ImageSection } from "@/lib/types";
import { hasCmsImage } from "@/sanity/image";

export function ImageBlockView({ section }: { section: ImageSection }) {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[90rem] sm:px-8 lg:px-10 xl:px-12">
        <Reveal>
          {hasCmsImage(section.image) ? (
            <figure>
              <PhotoFrame
                image={section.image}
                zoom
                className="aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[21/9] lg:min-h-[28rem]"
                sizes="100vw"
                width={2400}
              />
              {section.caption ? (
                <figcaption className="mt-4 max-w-2xl px-5 text-sm leading-6 text-muted sm:px-0">
                  {section.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : (
            <div className="px-5 sm:px-0">
              <EmptyState
                title="A photograph belongs here"
                text="Add a photo in the Studio and it will fill this space, edge to edge."
              />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
