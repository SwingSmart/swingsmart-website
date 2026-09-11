import { CmsPhoto } from "@/components/ui/CmsPhoto";
import { Container, DisplayHeading, Section, SectionIntro } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { RichBody } from "@/components/portable-text/RichBody";
import type { Partner, PartnerGridSection } from "@/lib/types";
import { hasCmsImage } from "@/sanity/image";

export function PartnerGridView({
  section,
  partners,
}: {
  section: PartnerGridSection;
  partners: Partner[];
}) {
  const layout = section.layout || "cards";
  const showDescriptions = section.showDescriptions !== false;
  const list = section.featuredOnly
    ? partners.filter((partner) => partner.featured)
    : partners;

  return (
    <Section className={layout === "featured" ? "" : "bg-bg-raised"}>
      <Container>
        <Reveal>
          <SectionIntro heading={section.heading} intro={section.intro} />
        </Reveal>
        {list.length ? (
          layout === "featured" ? (
            <FeaturedPartners partners={list} showDescriptions={showDescriptions} />
          ) : layout === "logos" ? (
            <LogoGrid partners={list} />
          ) : (
            <PartnerCards partners={list} showDescriptions={showDescriptions} />
          )
        ) : (
          <EmptyState
            title="Partners will land here"
            text="Add a partner in the Studio — name, logo, website and a short description — and it appears in this grid."
          />
        )}
      </Container>
    </Section>
  );
}

function PartnerLogo({ partner, compact = false }: { partner: Partner; compact?: boolean }) {
  return (
    <div className={`logo-well rounded-card bg-cream ${compact ? "min-h-20" : ""}`}>
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
        <p className="font-display text-2xl leading-none text-bg">{partner.name}</p>
      )}
    </div>
  );
}

function FeaturedPartners({
  partners,
  showDescriptions,
}: {
  partners: Partner[];
  showDescriptions: boolean;
}) {
  return (
    <ul className="grid gap-6 lg:grid-cols-2">
      {partners.map((partner, index) => (
        <li key={partner._id || partner.name}>
          <Reveal
            delay={index * 50}
            className="flex h-full flex-col border border-rule bg-bg-raised p-7 sm:p-10"
          >
            {hasCmsImage(partner.logo) ? <PartnerLogo partner={partner} /> : null}
            <DisplayHeading as="h3" className={`${hasCmsImage(partner.logo) ? "mt-8" : "mt-0"} text-3xl sm:text-4xl`}>
              {partner.name}
            </DisplayHeading>
            {showDescriptions && partner.summary ? (
              <p className="mt-4 text-base leading-7 text-muted">{partner.summary}</p>
            ) : null}
            {showDescriptions && partner.description?.length ? (
              <div className="mt-4">
                <RichBody value={partner.description} />
              </div>
            ) : null}
            {partner.url ? (
              <a
                href={partner.url}
                className="mt-6 inline-flex text-sm text-green-soft hover:text-cream"
                rel="noopener noreferrer"
                target="_blank"
              >
                Visit {partner.name}
              </a>
            ) : null}
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function LogoGrid({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-4">
      {partners.map((partner, index) => {
        const inner = (
          <>
            <PartnerLogo partner={partner} compact />
            {hasCmsImage(partner.logo) ? (
              <p className="mt-4 text-center text-sm text-cream">{partner.name}</p>
            ) : null}
          </>
        );
        return (
          <li key={partner._id || partner.name}>
            <Reveal delay={index * 40} className="h-full bg-bg-raised p-6 sm:p-8">
              {partner.url ? (
                <a
                  href={partner.url}
                  className="flex h-full flex-col items-center outline-offset-4"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex h-full flex-col items-center">{inner}</div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

function PartnerCards({
  partners,
  showDescriptions,
}: {
  partners: Partner[];
  showDescriptions: boolean;
}) {
  return (
    <ul className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
      {partners.map((partner, index) => {
        const inner = (
          <>
            <PartnerLogo partner={partner} />
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-cream">{partner.name}</h3>
              {showDescriptions && partner.summary ? (
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
                  rel="noopener noreferrer"
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
  );
}
