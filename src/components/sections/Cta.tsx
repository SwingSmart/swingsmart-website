import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container, Eyebrow, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import type { CtaSection } from "@/lib/types";

export function CtaView({ section }: { section: CtaSection }) {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            <div className="absolute inset-x-0 top-0 h-px bg-green" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-rule" />
            <Eyebrow>{section.eyebrow || "Enquire"}</Eyebrow>
            <h2 className="font-display max-w-3xl text-4xl font-medium tracking-[-0.02em] text-cream sm:text-5xl lg:text-6xl">
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
