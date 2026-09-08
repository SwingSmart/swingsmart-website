import { ButtonLink } from "@/components/ui/ButtonLink";
import { CmsPhoto } from "@/components/ui/CmsPhoto";
import { Container, DisplayHeading, Eyebrow } from "@/components/ui/Layout";
import type { HeroSection } from "@/lib/types";

export function Hero({ section }: { section: HeroSection }) {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-bg">
      <div className="absolute inset-0">
        <CmsPhoto
          image={section.image}
          priority
          className="h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bg/40" />
      </div>
      <Container className="relative flex min-h-[78vh] flex-col justify-end pb-16 pt-12 sm:pb-20">
        {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
        <DisplayHeading as="h1" className="max-w-3xl text-5xl sm:text-6xl lg:text-[4.75rem]">
          {section.heading}
        </DisplayHeading>
        {section.subheading ? (
          <p className="mt-6 max-w-xl text-lg leading-8 text-cream/90">
            {section.subheading}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {section.primaryCta?.href ? (
            <ButtonLink href={section.primaryCta.href} style={section.primaryCta.style}>
              {section.primaryCta.label}
            </ButtonLink>
          ) : null}
          {section.secondaryCta?.href ? (
            <ButtonLink
              href={section.secondaryCta.href}
              style={section.secondaryCta.style || "secondary"}
            >
              {section.secondaryCta.label}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
