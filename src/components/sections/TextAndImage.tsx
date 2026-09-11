import { ButtonLink } from "@/components/ui/ButtonLink";
import { PhotoFrame } from "@/components/ui/CmsPhoto";
import { Container, DisplayHeading, Section } from "@/components/ui/Layout";
import { RichBody } from "@/components/portable-text/RichBody";
import { Reveal } from "@/components/ui/Reveal";
import type { TextAndImageSection } from "@/lib/types";

export function TextAndImageView({ section }: { section: TextAndImageSection }) {
  const imageLeft = section.imagePosition === "left";

  return (
    <Section>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={imageLeft ? "lg:order-2" : ""}>
          {section.heading ? (
            <DisplayHeading className="mb-6">{section.heading}</DisplayHeading>
          ) : null}
          <RichBody value={section.body} />
          {section.cta?.href ? (
            <div className="mt-8">
              <ButtonLink href={section.cta.href} style={section.cta.style}>
                {section.cta.label}
              </ButtonLink>
            </div>
          ) : null}
        </Reveal>
        <Reveal
          className={imageLeft ? "order-first lg:order-1" : "order-first lg:order-2"}
          delay={80}
        >
          <PhotoFrame
            image={section.image}
            zoom
            className="aspect-[4/5] w-full sm:aspect-[5/6] lg:min-h-[36rem] lg:aspect-auto"
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={1400}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
