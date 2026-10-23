import { youtubeIdFromInput } from "./hero-video";

const VIDEO_FILE = /\.(mp4|webm|ogg|mov|m4v)(?:$|\?)/i;

export function youtubePlaybackSrc(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    controls: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    fs: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function vimeoIdFromInput(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value.trim());
    if (!url.hostname.includes("vimeo.com")) return undefined;
    const id = url.pathname.split("/").filter(Boolean).pop();
    return id && /^\d+$/.test(id) ? id : undefined;
  } catch {
    return undefined;
  }
}

export function vimeoPlaybackSrc(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    title: "0",
    byline: "0",
    portrait: "0",
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}

export function isDirectVideoUrl(value?: string) {
  if (!value) return false;
  if (VIDEO_FILE.test(value)) return true;
  if (youtubeIdFromInput(value) || vimeoIdFromInput(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export { youtubeIdFromInput };
