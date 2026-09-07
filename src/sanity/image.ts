import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";
import type { CmsImage } from "@/lib/types";

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset,
});

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export function imageSrc(
  image: CmsImage | undefined,
  width = 1600,
): string | undefined {
  if (!image) return undefined;
  if (image.url && !image.asset) return image.url;
  if (image.asset) {
    return urlFor(image).width(width).auto("format").quality(80).url();
  }
  return image.url;
}
