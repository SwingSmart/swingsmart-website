import { ButtonLink } from "@/components/ui/ButtonLink";
import { CmsPhoto } from "@/components/ui/CmsPhoto";
import { Container, DisplayHeading, Eyebrow, Section } from "@/components/ui/Layout";
import { RichBody } from "@/components/portable-text/RichBody";
import type {
  ContactBlockSection,
  CtaSection,
  FaqSection,
  FeatureGridSection,
  GalleryItem,
  GallerySection,
  ImageSection,
  PackageGridSection,
  EventPackage,
  Partner,
  PartnerGridSection,
  RichTextSection,
  StatisticsSection,
  Testimonial,
  TestimonialsSection,
  TextAndImageSection,
} from "@/lib/types";
import { ContactForm } from "@/components/forms/ContactForm";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PackageCards } from "@/components/packages/PackageCards";
import type { SiteSettings } from "@/lib/types";

export function RichTextSectionView({ section }: { section: RichTextSection }) {
  return (
    <Section>
      <Container className="max-w-3xl">
        {section.heading ? (
          <DisplayHeading className="mb-8">{section.heading}</DisplayHeading>
        ) : null}
        <RichBody value={section.body} />
      </Container>
    </Section>
  );
}

export function TextAndImageView({ section }: { section: TextAndImageSection }) {
  const imageLeft = section.imagePosition === "left";
  return (
    <Section>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={imageLeft ? "lg:order-2" : ""}>
          {section.heading ? (
            <DisplayHeading className="mb-6">{section.heading}</DisplayHeading>
          ) : null}
          <RichBody value={section.body} />
          {section.cta?.href ? (
            <div className="mt-8">
              <ButtonLink href={section.cta.href} style={section.cta.style}>
                {section.cta.label}
              </ButtonLink>
            </div>
          ) : null}
        </div>
        <div className={`overflow-hidden rounded-card ${imageLeft ? "lg:order-1" : ""}`}>
          <CmsPhoto
            image={section.image}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Container>
    </Section>
  );
}

export function ImageBlockView({ section }: { section: ImageSection }) {
  return (
    <Section className="py-8 sm:py-12">
      <Container>
        <figure>
          <div className="overflow-hidden rounded-card">
            <CmsPhoto image={section.image} className="w-full object-cover" />
          </div>
          {section.caption ? (
            <figcaption className="mt-3 text-sm text-muted">{section.caption}</figcaption>
          ) : null}
        </figure>
      </Container>
    </Section>
  );
}

export function GallerySectionView({
  section,
  items,
  categories,
}: {
  section: GallerySection;
  items: GalleryItem[];
  categories: { title: string; slug: string }[];
}) {
  const filtered = items.filter((item) => {
    if (section.featuredOnly && !item.featured) return false;
    if (section.categorySlug && !item.categories.includes(section.categorySlug)) return false;
    return true;
  });
  const limited = section.limit ? filtered.slice(0, section.limit) : filtered;

  return (
    <Section>
      <Container>
        {section.heading ? (
          <DisplayHeading className={section.intro ? "mb-4" : "mb-10"}>
            {section.heading}
          </DisplayHeading>
        ) : null}
        {section.intro ? <p className="mb-10 max-w-2xl text-muted">{section.intro}</p> : null}
        <GalleryGrid
          items={limited}
          categories={section.categorySlug ? undefined : categories}
        />
      </Container>
    </Section>
  );
}

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
        {section.heading ? (
          <DisplayHeading className="mb-4">{section.heading}</DisplayHeading>
        ) : null}
        {section.intro ? <p className="mb-10 max-w-2xl text-muted">{section.intro}</p> : null}
        <ul className="grid gap-4 sm:grid-cols-2">
          {list.map((partner) => (
            <li
              key={partner._id || partner.name}
              className="rounded-card border border-rule bg-surface p-6"
            >
              <h3 className="text-lg font-semibold text-cream">{partner.name}</h3>
              {partner.summary ? (
                <p className="mt-2 text-sm leading-6 text-muted">{partner.summary}</p>
              ) : null}
              {partner.url ? (
                <a
                  href={partner.url}
                  className="mt-4 inline-block text-sm text-green-soft hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  Visit website
                </a>
              ) : null}
              {partner.caseStudyUrl ? (
                <a
                  href={partner.caseStudyUrl}
                  className="mt-2 block text-sm text-muted hover:text-cream"
                  rel="noreferrer"
                  target="_blank"
                >
                  Read the story
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

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
        {section.heading ? (
          <DisplayHeading className="mb-4">{section.heading}</DisplayHeading>
        ) : null}
        {section.intro ? <p className="mb-10 max-w-2xl text-muted">{section.intro}</p> : null}
        <PackageCards packages={list} />
      </Container>
    </Section>
  );
}

export function FeatureGridView({ section }: { section: FeatureGridSection }) {
  return (
    <Section className="bg-bg-raised">
      <Container>
        {section.heading ? (
          <DisplayHeading className={section.intro ? "mb-4" : "mb-10"}>
            {section.heading}
          </DisplayHeading>
        ) : null}
        {section.intro ? <p className="mb-10 max-w-2xl text-muted">{section.intro}</p> : null}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(section.items ?? []).map((item) => (
            <li key={item._key} className="rounded-card border border-rule p-6">
              <h3 className="text-lg font-semibold text-cream">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function TestimonialsView({
  section,
  testimonials,
}: {
  section: TestimonialsSection;
  testimonials: Testimonial[];
}) {
  const list = (section.featuredOnly
    ? testimonials.filter((item) => item.featured)
    : testimonials
  ).slice(0, section.limit || testimonials.length);

  return (
    <Section>
      <Container>
        {section.heading ? (
          <DisplayHeading className={section.intro ? "mb-4" : "mb-10"}>
            {section.heading}
          </DisplayHeading>
        ) : null}
        {section.intro ? <p className="mb-10 max-w-2xl text-muted">{section.intro}</p> : null}
        <ul className="grid gap-6 lg:grid-cols-3">
          {list.map((item) => (
            <li
              key={item._id || item.quote}
              className="flex flex-col justify-between rounded-card border border-rule bg-surface p-6"
            >
              <blockquote className="font-display text-xl leading-8 text-cream">
                “{item.quote}”
              </blockquote>
              <p className="mt-6 text-sm text-muted">
                {[item.attribution, item.organisation, item.role]
                  .filter((value, index, all) => value && all.indexOf(value) === index)
                  .join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function StatisticsView({ section }: { section: StatisticsSection }) {
  return (
    <Section className="py-12 sm:py-16">
      <Container>
        {section.heading ? (
          <DisplayHeading className={section.intro ? "mb-4" : "mb-10"}>
            {section.heading}
          </DisplayHeading>
        ) : null}
        {section.intro ? <p className="mb-10 max-w-2xl text-muted">{section.intro}</p> : null}
        <ul className="grid gap-8 border-y border-rule py-10 sm:grid-cols-3">
          {(section.items ?? []).map((item) => (
            <li key={item._key}>
              <p className="font-display text-3xl text-green sm:text-4xl">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function FaqView({ section }: { section: FaqSection }) {
  return (
    <Section>
      <Container className="max-w-3xl">
        {section.heading ? (
          <DisplayHeading className="mb-10">{section.heading}</DisplayHeading>
        ) : null}
        <dl className="space-y-6">
          {(section.items ?? []).map((item) => (
            <div key={item._key} className="border-b border-rule pb-6">
              <dt className="text-lg font-semibold text-cream">{item.question}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export function CtaView({ section }: { section: CtaSection }) {
  return (
    <Section>
      <Container>
        <div className="border border-rule bg-surface px-8 py-12 sm:px-14 sm:py-16">
          <Eyebrow>Enquire</Eyebrow>
          <h2 className="font-display text-4xl text-cream sm:text-5xl">{section.heading}</h2>
          {section.text ? <p className="mt-4 max-w-xl text-muted">{section.text}</p> : null}
          {section.button?.href ? (
            <div className="mt-8">
              <ButtonLink href={section.button.href}>
                {section.button.label}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export function ContactBlockView({
  section,
  settings,
  packages,
}: {
  section: ContactBlockSection;
  settings: SiteSettings;
  packages: EventPackage[];
}) {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          {section.heading ? (
            <DisplayHeading className="mb-4">{section.heading}</DisplayHeading>
          ) : null}
          {section.text ? <p className="text-muted">{section.text}</p> : null}
          {section.showDetails === false ? null : (
            <ul className="mt-8 space-y-3 text-sm">
              {settings.contact.email ? (
                <li>
                  <a
                    className="text-green-soft hover:underline"
                    href={`mailto:${settings.contact.email}`}
                  >
                    {settings.contact.email}
                  </a>
                </li>
              ) : null}
              {(settings.contact.phones || []).map((phone) => (
                <li key={phone}>
                  <a className="hover:text-green" href={`tel:${phone.replace(/\s/g, "")}`}>
                    {phone}
                  </a>
                </li>
              ))}
              {settings.contact.location ? (
                <li className="text-muted">{settings.contact.location}</li>
              ) : null}
            </ul>
          )}
        </div>
        {section.showForm === false ? null : <ContactForm packages={packages} />}
      </Container>
    </Section>
  );
}
