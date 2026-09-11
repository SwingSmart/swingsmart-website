import { PhotoFrame } from "@/components/ui/CmsPhoto";
import { Container, Section, SectionIntro } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import type { Testimonial, TestimonialsSection } from "@/lib/types";
import { hasCmsImage } from "@/sanity/image";

export function TestimonialsView({
  section,
  testimonials,
}: {
  section: TestimonialsSection;
  testimonials: Testimonial[];
}) {
  const list = (
    section.featuredOnly
      ? testimonials.filter((item) => item.featured)
      : testimonials
  ).slice(0, section.limit || testimonials.length);

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionIntro heading={section.heading} intro={section.intro} />
        </Reveal>
        {list.length ? (
          <ul className="grid gap-6 lg:grid-cols-12">
            {list.map((item, index) => {
              const featured = index === 0 && list.length > 2;
              return (
                <li
                  key={item._id || item.quote}
                  className={featured ? "lg:col-span-12" : "lg:col-span-4"}
                >
                  <Reveal delay={index * 60} className="h-full">
                    <figure
                      className={`flex h-full flex-col border-l-2 border-green px-6 py-2 ${
                        featured ? "lg:px-10 lg:py-4" : ""
                      }`}
                    >
                      <blockquote
                        className={`font-display leading-snug text-cream ${
                          featured
                            ? "text-3xl sm:text-4xl lg:text-5xl"
                            : "text-xl sm:text-2xl"
                        }`}
                      >
                        “{item.quote}”
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-3 text-sm text-muted">
                        {hasCmsImage(item.image) ? (
                          <PhotoFrame
                            image={item.image}
                            className="h-10 w-10 shrink-0 rounded-full"
                            sizes="40px"
                            width={120}
                            height={120}
                          />
                        ) : null}
                        <span>
                          {[item.attribution, item.organisation, item.role]
                            .filter(
                              (value, idx, all) => value && all.indexOf(value) === idx,
                            )
                            .join(" · ")}
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState
            title="Words from the tee"
            text="Published testimonials will show here. Until then, this space stays quiet."
          />
        )}
      </Container>
    </Section>
  );
}
