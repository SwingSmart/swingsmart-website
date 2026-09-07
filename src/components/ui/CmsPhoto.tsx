import Image from "next/image";
import { imageSrc } from "@/sanity/image";
import type { CmsImage } from "@/lib/types";

export function CmsPhoto({
  image,
  className = "",
  sizes = "100vw",
  priority = false,
  width = 1600,
}: {
  image?: CmsImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
}) {
  const src = imageSrc(image, width);
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={image?.alt || ""}
      width={width}
      height={Math.round(width * 0.62)}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
