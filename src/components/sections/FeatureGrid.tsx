import { Container, Section, SectionIntro } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import type { FeatureGridSection } from "@/lib/types";

export function FeatureGridView({ section }: { section: FeatureGridSection }) {
  const items = section.items ?? [];

  return (
    <Section className="bg-bg-raised">
      <Container>
        <Reveal>
          <SectionIntro heading={section.heading} intro={section.intro} />
        </Reveal>
        {items.length ? (
          <ul className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li key={item._key} className="bg-bg-raised">
                <Reveal delay={index * 40} className="flex h-full flex-col p-7 sm:p-8">
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-green-soft">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-2xl text-cream sm:text-3xl">
                    {item.title}
                  </h3>
                  {item.text ? (
                    <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Features will sit in this grid"
            text="Add a few short points in the Studio — occasions, venues, or what sets the hire apart."
          />
        )}
      </Container>
    </Section>
  );
}
