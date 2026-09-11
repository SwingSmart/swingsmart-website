import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";
import type { CmsImage } from "@/lib/types";

const builder = createImageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export function hasCmsImage(image?: CmsImage) {
  return Boolean(image?.asset || image?.url);
}

export function hotspotPosition(image?: CmsImage) {
  if (!image?.hotspot) return undefined;
  return `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`;
}

export function buildImage(
  image: CmsImage | undefined,
  {
    width = 1600,
    height,
    mode = "cover",
  }: {
    width?: number;
    height?: number;
    mode?: "cover" | "contain";
  } = {},
) {
  if (!image) return null;

  const aspect =
    image.width && image.height ? image.height / image.width : 0.62;
  const outWidth = width;
  const outHeight = height ?? Math.round(outWidth * aspect);

  let src: string | undefined;
  if (image.asset) {
    let next = urlFor(image).width(outWidth).auto("format").quality(80);
    if (mode === "contain") {
      next = next.fit("max");
    } else if (height) {
      next = next.height(outHeight).fit("crop");
    }
    src = next.url();
  } else {
    src = image.url;
  }

  if (!src) return null;

  return {
    src,
    width: outWidth,
    height: outHeight,
    lqip: image.lqip,
    position: hotspotPosition(image),
  };
}

export function imageSrc(
  image: CmsImage | undefined,
  width = 1600,
): string | undefined {
  return buildImage(image, { width })?.src;
}
