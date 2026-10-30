"use client";

import { useRef, useState } from "react";
import { CmsPhoto } from "@/components/ui/CmsPhoto";
import { EmptyState } from "@/components/ui/EmptyState";
import { Container, Section, SectionIntro } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { isDirectVideoUrl } from "@/lib/page-video";
import type { VideoSection } from "@/lib/types";
import { hasCmsImage, imageSrc } from "@/sanity/image";

function PlayIconMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-8 w-8 fill-current sm:h-10 sm:w-10">
      <path d="M8 5.75v12.5L19 12 8 5.75Z" />
    </svg>
  );
}

export function VideoSectionView({ section }: { section: VideoSection }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const src = isDirectVideoUrl(section.videoUrl) ? section.videoUrl : undefined;
  const poster = imageSrc(section.poster, 1800);
  const posterAlt = section.posterAlt || section.poster?.alt || section.title || "Video";
  const playLabel = section.title ? `Play video: ${section.title}` : "Play video";

  function start() {
    setStarted(true);
    const node = videoRef.current;
    if (!node) return;
    const play = node.play();
    if (play) play.catch(() => undefined);
  }

  if (!src) {
    return (
      <Section>
        <Container>
          <SectionIntro heading={section.title} intro={section.subtitle} />
          <EmptyState
            title="A video belongs here"
            text="Upload an MP4 or paste a direct video file URL in the Studio."
          />
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionIntro heading={section.title} intro={section.subtitle} />
          <figure>
            <div className="img-frame video-frame relative aspect-video overflow-hidden bg-bg">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                controls={started}
                playsInline
                preload="metadata"
                poster={poster}
                onPlay={() => setStarted(true)}
              >
                <source src={src} />
              </video>
              {!started ? (
                <>
                  {hasCmsImage(section.poster) ? (
                    <CmsPhoto
                      image={section.poster}
                      alt={posterAlt}
                      fill
                      sizes="(min-width: 1280px) 80rem, 100vw"
                      width={1800}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-surface" aria-hidden="true" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/20 to-bg/10" />
                  <button
                    type="button"
                    onClick={start}
                    aria-label={playLabel}
                    className="absolute inset-0 z-10 flex items-center justify-center"
                  >
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-green text-on-green shadow-lg shadow-black/40 transition-colors hover:bg-green-mid sm:h-24 sm:w-24">
                      <PlayIconMark />
                    </span>
                  </button>
                </>
              ) : null}
            </div>
            {section.caption ? (
              <figcaption className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                {section.caption}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
