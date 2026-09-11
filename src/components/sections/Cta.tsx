import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container, Eyebrow, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import type { CtaSection } from "@/lib/types";

export function CtaView({ section }: { section: CtaSection }) {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden border-y border-green bg-bg-raised px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <Eyebrow>{section.eyebrow || "Enquire"}</Eyebrow>
            <h2 className="font-display max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
              {section.heading}
            </h2>
            {section.text ? (
              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                {section.text}
              </p>
            ) : null}
            {section.button?.href ? (
              <div className="mt-8">
                <ButtonLink href={section.button.href} style={section.button.style}>
                  {section.button.label}
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
