import { ButtonLink } from "@/components/ui/ButtonLink";
import { CmsPhoto } from "@/components/ui/CmsPhoto";
import { Container, DisplayHeading, Eyebrow } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { photos } from "@/lib/content-helpers";
import type { HeroSection } from "@/lib/types";
import { hasCmsImage, imageSrc } from "@/sanity/image";

export function Hero({
  section,
  priority = true,
  fullHeight = true,
}: {
  section: HeroSection;
  priority?: boolean;
  fullHeight?: boolean;
}) {
  const image = hasCmsImage(section.image) ? section.image : photos.homeHero;
  const poster = imageSrc(image, 2400);
  const videoSrc = section.videoUrl;
  const overlayClass = videoSrc
    ? section.overlay === "light"
      ? "from-bg/70 via-bg/25 to-bg/10"
      : section.overlay === "dark"
        ? "from-bg/90 via-bg/55 to-bg/25"
        : "from-bg/85 via-bg/35 to-bg/15"
    : section.overlay === "light"
      ? "from-bg/55 via-bg/10 to-transparent"
      : section.overlay === "dark"
        ? "from-bg/90 via-bg/35 to-bg/10"
        : "from-bg/80 via-bg/15 to-transparent";
  const height = fullHeight
    ? "min-h-[100svh]"
    : "min-h-[72svh] sm:min-h-[78svh] lg:min-h-[82svh]";

  return (
    <section className={`relative isolate overflow-hidden bg-bg ${height}`}>
      <div className="absolute inset-0">
        <CmsPhoto
          image={image}
          fill
          sizes="100vw"
          priority={priority}
          width={2400}
          className={videoSrc ? "" : "hero-media"}
        />
        {videoSrc ? <HeroVideo src={videoSrc} poster={poster} /> : null}
        <div className={`absolute inset-0 bg-gradient-to-t ${overlayClass}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/35 via-transparent to-transparent" />
      </div>

      <Container className={`relative flex ${height} flex-col justify-end pb-16 pt-28 sm:pb-24 lg:pb-28`}>
        <Reveal>
          {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
          <DisplayHeading
            as="h1"
            className="max-w-5xl text-[2.7rem] sm:text-6xl lg:text-7xl xl:text-[4.85rem] xl:leading-[0.98]"
          >
            {section.heading}
          </DisplayHeading>
          {section.subheading ? (
            <p className="mt-6 max-w-xl text-base leading-7 text-cream/82 sm:text-lg sm:leading-8">
              {section.subheading}
            </p>
          ) : null}
          {section.primaryCta?.href || section.secondaryCta?.href ? (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {section.primaryCta?.href ? (
                <ButtonLink
                  href={section.primaryCta.href}
                  style={section.primaryCta.style}
                  className="w-full sm:w-auto"
                >
                  {section.primaryCta.label}
                </ButtonLink>
              ) : null}
              {section.secondaryCta?.href ? (
                <ButtonLink
                  href={section.secondaryCta.href}
                  style={section.secondaryCta.style || "secondary"}
                  className="w-full sm:w-auto"
                >
                  {section.secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
