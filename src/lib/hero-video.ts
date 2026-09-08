const YOUTUBE_ID = /^[a-zA-Z0-9_-]{11}$/;

export function youtubeIdFromInput(value?: string) {
  if (!value) return undefined;
  const trimmed = value.trim();
  const iframeSrc = trimmed.match(/src=["']([^"']+)["']/i)?.[1];
  const candidate = iframeSrc || trimmed;

  try {
    const url = new URL(candidate, "https://www.youtube.com");
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return YOUTUBE_ID.test(id || "") ? id : undefined;
    }
    const fromQuery = url.searchParams.get("v");
    if (fromQuery && YOUTUBE_ID.test(fromQuery)) return fromQuery;
    const embed = url.pathname.match(/\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/);
    if (embed) return embed[1];
  } catch {
    // Fall through to a loose match for pasted embed snippets.
  }

  const loose = candidate.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed|shorts|live)\/|v=)([a-zA-Z0-9_-]{11})/,
  );
  return loose?.[1];
}

export function youtubeBackgroundSrc(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    playsinline: "1",
    loop: "1",
    playlist: id,
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    fs: "0",
    disablekb: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}
