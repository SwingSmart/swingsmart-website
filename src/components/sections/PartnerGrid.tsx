import { CmsPhoto } from "@/components/ui/CmsPhoto";
import { Container, Section, SectionIntro } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import type { Partner, PartnerGridSection } from "@/lib/types";
import { hasCmsImage } from "@/sanity/image";

export function PartnerGridView({
  section,
  partners,
}: {
  section: PartnerGridSection;
  partners: Partner[];
}) {
  const list = section.featuredOnly
    ? partners.filter((partner) => partner.featured)
    : partners;

  return (
    <Section className="bg-bg-raised">
      <Container>
        <Reveal>
          <SectionIntro heading={section.heading} intro={section.intro} />
        </Reveal>
        {list.length ? (
          <ul className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {list.map((partner, index) => {
              const inner = (
                <>
                  <div className="logo-well rounded-card bg-cream">
                    {hasCmsImage(partner.logo) ? (
                      <CmsPhoto
                        image={partner.logo}
                        alt={partner.logo?.alt || `${partner.name} logo`}
                        mode="contain"
                        width={800}
                        height={400}
                        className="h-16 w-auto max-w-[11rem] object-contain"
                        sizes="(min-width: 1024px) 20vw, 50vw"
                      />
                    ) : (
                      <p className="font-display text-2xl leading-none text-bg">
                        {partner.name}
                      </p>
                    )}
                  </div>
                  <div className="mt-6">
                    {hasCmsImage(partner.logo) ? (
                      <h3 className="text-sm font-semibold text-cream">{partner.name}</h3>
                    ) : null}
                    {partner.summary ? (
                      <p className="mt-2 text-sm leading-6 text-muted">{partner.summary}</p>
                    ) : null}
                    {partner.caseStudyUrl ? (
                      <span className="mt-4 inline-block text-sm text-green-soft">
                        Read the story
                      </span>
                    ) : null}
                  </div>
                </>
              );

              return (
                <li key={partner._id || partner.name}>
                  <Reveal delay={index * 50} className="h-full bg-bg-raised p-7 sm:p-8">
                    {partner.url ? (
                      <a
                        href={partner.url}
                        className="flex h-full flex-col outline-offset-4"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex h-full flex-col">{inner}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState
            title="Partners will land here"
            text="Logos and names added in the Studio appear in this grid, sized to sit cleanly together."
          />
        )}
      </Container>
    </Section>
  );
}
