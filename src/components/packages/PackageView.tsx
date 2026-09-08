import { ButtonLink } from "@/components/ui/ButtonLink";
import { CmsPhoto } from "@/components/ui/CmsPhoto";
import { Container, DisplayHeading, Eyebrow, Section } from "@/components/ui/Layout";
import { RichBody } from "@/components/portable-text/RichBody";
import type { EventPackage } from "@/lib/types";

export function PackageView({ pkg }: { pkg: EventPackage }) {
  const ctaHref = pkg.cta?.href || "/contact";
  const ctaLabel = pkg.cta?.label || "Enquire";

  return (
    <>
      <section className="relative min-h-[62vh] overflow-hidden bg-bg">
        {pkg.heroImage ? (
          <div className="absolute inset-0">
            <CmsPhoto
              image={pkg.heroImage}
              priority
              className="h-full w-full object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-bg/40" />
          </div>
        ) : null}
        <Container className="relative flex min-h-[62vh] flex-col justify-end pb-16 pt-12 sm:pb-20">
          {pkg.shortName ? <Eyebrow>{pkg.shortName}</Eyebrow> : null}
          <DisplayHeading as="h1" className="max-w-3xl text-5xl sm:text-6xl">
            {pkg.title}
          </DisplayHeading>
          {pkg.subtitle ? (
            <p className="mt-4 max-w-xl text-lg text-cream/90">{pkg.subtitle}</p>
          ) : null}
          <p className="mt-6 text-sm font-medium text-cream">
            {pkg.priceLabel}
            {pkg.durationLabel ? (
              <span className="ml-2 font-normal text-muted">{pkg.durationLabel}</span>
            ) : null}
          </p>
          <div className="mt-8">
            <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
          </div>
        </Container>
      </section>

      {pkg.summary || pkg.description?.length ? (
        <Section>
          <Container className="max-w-3xl">
            {pkg.summary ? <p className="text-lg leading-8 text-muted">{pkg.summary}</p> : null}
            {pkg.description?.length ? (
              <div className={pkg.summary ? "mt-8" : ""}>
                <RichBody value={pkg.description} />
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {pkg.includes?.length || pkg.extras?.length ? (
        <Section className="bg-bg-raised">
          <Container className="grid gap-12 lg:grid-cols-2">
            {pkg.includes?.length ? (
              <div>
                <DisplayHeading className="mb-6 text-3xl">What’s included</DisplayHeading>
                <ul className="space-y-3 text-sm leading-6 text-muted">
                  {pkg.includes.map((item) => (
                    <li key={item} className="border-b border-rule pb-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {pkg.extras?.length ? (
              <div>
                <DisplayHeading className="mb-6 text-3xl">Optional extras</DisplayHeading>
                <ul className="space-y-3 text-sm leading-6 text-muted">
                  {pkg.extras.map((item) => (
                    <li key={item} className="border-b border-rule pb-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {pkg.gallery?.length ? (
        <Section>
          <Container>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pkg.gallery.map((image, index) => (
                <li key={image.asset?._ref || image.url || index} className="overflow-hidden rounded-card">
                  <CmsPhoto
                    image={image}
                    className="aspect-[4/3] w-full object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
