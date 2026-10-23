"use client";

import { useEffect, useRef, useState } from "react";
import { CmsPhoto } from "@/components/ui/CmsPhoto";
import { EmptyState } from "@/components/ui/EmptyState";
import { Container, Section, SectionIntro } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import {
  isDirectVideoUrl,
  vimeoIdFromInput,
  vimeoPlaybackSrc,
  youtubeIdFromInput,
  youtubePlaybackSrc,
} from "@/lib/page-video";
import type { VideoSection } from "@/lib/types";
import { hasCmsImage, imageSrc } from "@/sanity/image";

const aspectClass = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "9/16": "aspect-[9/16]",
} as const;

const widthClass = {
  full: "w-full",
  wide: "mx-auto w-full max-w-5xl",
  medium: "mx-auto w-full max-w-3xl",
} as const;

function PlayIconMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-7 w-7 fill-current sm:h-8 sm:w-8">
      <path d="M8 5.75v12.5L19 12 8 5.75Z" />
    </svg>
  );
}

export function VideoSectionView({ section }: { section: VideoSection }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const src = section.videoUrl;
  const youtubeId = youtubeIdFromInput(src);
  const vimeoId = vimeoIdFromInput(src);
  const fileUrl = !youtubeId && !vimeoId && src && isDirectVideoUrl(src) ? src : undefined;
  const poster = imageSrc(section.image, 1800);
  const posterAlt = section.image?.alt || section.title || "Video";
  const playLabel = section.title ? `Play video: ${section.title}` : "Play video";
  const ratio = aspectClass[section.aspectRatio || "16/9"] ?? aspectClass["16/9"];
  const width = widthClass[section.width || "full"] ?? widthClass.full;

  useEffect(() => {
    if (!started || !fileUrl) return;
    const node = videoRef.current;
    if (!node) return;
    const play = node.play();
    if (play) play.catch(() => undefined);
  }, [started, fileUrl]);

  function start() {
    setStarted(true);
  }

  if (!fileUrl && !youtubeId && !vimeoId) {
    return (
      <Section>
        <Container>
          <SectionIntro heading={section.title} intro={section.subtitle} />
          <EmptyState
            title="A video belongs here"
            text="Upload an MP4 or paste a video link in the Studio."
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
          <figure className={width}>
            <div className={`img-frame video-frame relative overflow-hidden bg-bg ${ratio}`}>
              {fileUrl ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  controls={started}
                  playsInline
                  preload="metadata"
                  poster={poster}
                >
                  <source src={fileUrl} />
                </video>
              ) : null}
              {started && youtubeId ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={youtubePlaybackSrc(youtubeId)}
                  title={playLabel}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : null}
              {started && vimeoId ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={vimeoPlaybackSrc(vimeoId)}
                  title={playLabel}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
              {!started ? (
                <>
                  {hasCmsImage(section.image) ? (
                    <CmsPhoto
                      image={section.image}
                      alt={posterAlt}
                      fill
                      className="hero-media"
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
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green text-on-green shadow-lg shadow-black/40 transition-colors hover:bg-green-mid sm:h-20 sm:w-20">
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
