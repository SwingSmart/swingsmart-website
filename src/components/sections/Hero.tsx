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
}: {
  section: HeroSection;
  priority?: boolean;
}) {
  const image = hasCmsImage(section.image) ? section.image : photos.hero;
  const poster = imageSrc(image, 2400);
  const videoSrc = section.videoUrl;
  const overlayClass =
    section.overlay === "light"
      ? "from-bg/75 via-bg/30 to-bg/15"
      : section.overlay === "dark"
        ? "from-bg via-bg/70 to-bg/35"
        : "from-bg/90 via-bg/45 to-bg/20";

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-bg">
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
        <div className="absolute inset-0 bg-gradient-to-r from-bg/55 via-bg/15 to-transparent" />
      </div>

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-24">
        <Reveal>
          {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
          <DisplayHeading
            as="h1"
            className="max-w-4xl text-[2.6rem] sm:text-6xl lg:text-[4.85rem]"
          >
            {section.heading}
          </DisplayHeading>
          {section.subheading ? (
            <p className="mt-5 max-w-xl text-base leading-7 text-cream/88 sm:text-lg sm:leading-8">
              {section.subheading}
            </p>
          ) : null}
          {section.primaryCta?.href || section.secondaryCta?.href ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
