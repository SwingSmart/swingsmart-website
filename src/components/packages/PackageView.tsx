import { ButtonLink } from "@/components/ui/ButtonLink";
import { CmsPhoto, PhotoFrame } from "@/components/ui/CmsPhoto";
import { Container, DisplayHeading, Eyebrow, Section } from "@/components/ui/Layout";
import { RichBody } from "@/components/portable-text/RichBody";
import { photos } from "@/lib/content-helpers";
import type { EventPackage } from "@/lib/types";
import { hasCmsImage } from "@/sanity/image";

export function PackageView({ pkg }: { pkg: EventPackage }) {
  const ctaHref = pkg.cta?.href || "/contact";
  const ctaLabel = pkg.cta?.label || "Enquire";
  const heroImage = hasCmsImage(pkg.heroImage) ? pkg.heroImage : photos.hero;

  return (
    <>
      <section className="relative min-h-[88svh] overflow-hidden bg-bg">
        {hasCmsImage(heroImage) ? (
          <div className="absolute inset-0">
            <CmsPhoto
              image={heroImage}
              fill
              priority
              className="hero-media"
              sizes="100vw"
              width={2400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/50 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(11,110,22,0.28),_transparent_55%)]" />
        )}
        <Container className="relative flex min-h-[88svh] flex-col justify-end pb-16 pt-28 sm:pb-24">
          {pkg.shortName ? <Eyebrow>{pkg.shortName}</Eyebrow> : null}
          <DisplayHeading as="h1" className="max-w-3xl text-[2.6rem] sm:text-6xl">
            {pkg.title}
          </DisplayHeading>
          {pkg.subtitle ? (
            <p className="mt-4 max-w-xl text-lg text-cream/90">{pkg.subtitle}</p>
          ) : null}
          {pkg.priceLabel ? (
            <p className="mt-6 text-sm font-medium text-cream">
              {pkg.priceLabel}
              {pkg.durationLabel ? (
                <span className="ml-2 font-normal text-muted">{pkg.durationLabel}</span>
              ) : null}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ctaHref} className="w-full sm:w-auto">
              {ctaLabel}
            </ButtonLink>
            <ButtonLink href="/packages" style="secondary" className="w-full sm:w-auto">
              All packages
            </ButtonLink>
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
                <ul className="space-y-0 text-sm leading-6 text-muted">
                  {pkg.includes.map((item) => (
                    <li key={item} className="border-b border-rule py-3 first:pt-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {pkg.extras?.length ? (
              <div>
                <DisplayHeading className="mb-6 text-3xl">Optional extras</DisplayHeading>
                <ul className="space-y-0 text-sm leading-6 text-muted">
                  {pkg.extras.map((item) => (
                    <li key={item} className="border-b border-rule py-3 first:pt-0">
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
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pkg.gallery.map((image, index) => (
                <li key={image.asset?._ref || image.url || index}>
                  <PhotoFrame
                    image={image}
                    zoom
                    className="aspect-[4/3] w-full"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    width={1100}
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
