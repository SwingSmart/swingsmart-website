import { Container, Section, SectionIntro } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { PackageCards } from "@/components/packages/PackageCards";
import { Reveal } from "@/components/ui/Reveal";
import type { EventPackage, PackageGridSection } from "@/lib/types";

export function PackageGridView({
  section,
  packages,
}: {
  section: PackageGridSection;
  packages: EventPackage[];
}) {
  const list = section.featuredOnly
    ? packages.filter((item) => item.featured)
    : packages;

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionIntro heading={section.heading} intro={section.intro} />
        </Reveal>
        {list.length ? (
          <PackageCards packages={list} />
        ) : (
          <EmptyState
            title="Packages are being prepared"
            text="Once hire packages are published in the Studio, they will appear here as cards."
          />
        )}
      </Container>
    </Section>
  );
}
