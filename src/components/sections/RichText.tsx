import { Container, DisplayHeading, Section } from "@/components/ui/Layout";
import { RichBody } from "@/components/portable-text/RichBody";
import { Reveal } from "@/components/ui/Reveal";
import type { RichTextSection } from "@/lib/types";

export function RichTextSectionView({ section }: { section: RichTextSection }) {
  if (!section.heading && !section.body?.length) {
    return null;
  }

  return (
    <Section>
      <Container className="max-w-3xl">
        <Reveal>
          {section.heading ? (
            <DisplayHeading className="mb-8">{section.heading}</DisplayHeading>
          ) : null}
          <div className="text-lg leading-8">
            <RichBody value={section.body} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
