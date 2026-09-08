"use client";

import { useEffect, useState } from "react";
import { youtubeBackgroundSrc, youtubeIdFromInput } from "@/lib/hero-video";

export function HeroVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const [allowMotion, setAllowMotion] = useState(false);
  const youtubeId = youtubeIdFromInput(src);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!allowMotion) return null;

  if (youtubeId) {
    return (
      <div className="hero-youtube pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <iframe
          src={youtubeBackgroundSrc(youtubeId)}
          title="Hero video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
          tabIndex={-1}
        />
      </div>
    );
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} />
    </video>
  );
}
