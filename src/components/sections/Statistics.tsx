import { Container, Section, SectionIntro } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import type { StatisticsSection } from "@/lib/types";

export function StatisticsView({ section }: { section: StatisticsSection }) {
  const items = section.items ?? [];

  return (
    <Section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionIntro heading={section.heading} intro={section.intro} />
        </Reveal>
        {items.length ? (
          <ul className="grid border-y border-rule sm:grid-cols-3">
            {items.map((item, index) => (
              <li
                key={item._key}
                className={`py-8 sm:px-8 sm:py-10 ${
                  index > 0 ? "border-t border-rule sm:border-t-0 sm:border-l" : ""
                }`}
              >
                <Reveal delay={index * 70}>
                  <p className="font-display text-4xl leading-none text-green sm:text-5xl">
                    {item.value}
                  </p>
                  {item.label ? (
                    <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
                      {item.label}
                    </p>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Figures will line up here"
            text="Add a few stats in the Studio — hours, bay size, years, anything that earns the booking."
          />
        )}
      </Container>
    </Section>
  );
}
