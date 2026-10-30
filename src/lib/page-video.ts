const EMBED_HOST = /(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo)/i;

export function isDirectVideoUrl(value?: string) {
  if (!value) return false;
  const trimmed = value.trim();
  if (EMBED_HOST.test(trimmed)) return false;

  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
