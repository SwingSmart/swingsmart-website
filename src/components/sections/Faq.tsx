import { Container, DisplayHeading, Section } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import type { FaqSection } from "@/lib/types";

export function FaqView({ section }: { section: FaqSection }) {
  const items = section.items ?? [];

  return (
    <Section>
      <Container className="max-w-3xl">
        <Reveal>
          {section.heading ? (
            <DisplayHeading className="mb-10">{section.heading}</DisplayHeading>
          ) : null}
        </Reveal>
        {items.length ? (
          <div className="border-y border-rule">
            {items.map((item) => (
              <details key={item._key} className="faq-item group border-b border-rule last:border-b-0">
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left text-lg font-semibold text-cream sm:py-6">
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center text-green-soft transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-7 text-muted sm:pb-6">{item.answer}</p>
              </details>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Questions will open here"
            text="Add the usual booking questions in the Studio. Guests can open each one on the page."
          />
        )}
      </Container>
    </Section>
  );
}
