import Image from "next/image";
import { buildImage, hasCmsImage } from "@/sanity/image";
import type { CmsImage } from "@/lib/types";

export function CmsPhoto({
  image,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  width = 1600,
  height,
  fill = false,
  mode = "cover",
}: {
  image?: CmsImage;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  mode?: "cover" | "contain";
}) {
  const built = buildImage(image, { width, height, mode });
  const label = alt || image?.alt || "";
  const fit = mode === "contain" ? "object-contain" : "object-cover";

  if (!built) {
    return (
      <div
        className={`bg-surface ${fill ? "absolute inset-0" : "min-h-48 w-full"} ${className}`}
        role={label ? "img" : undefined}
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
      />
    );
  }

  const blurProps = built.lqip
    ? ({ placeholder: "blur" as const, blurDataURL: built.lqip } as const)
    : {};

  if (fill) {
    return (
      <Image
        src={built.src}
        alt={label}
        fill
        className={`${fit} ${className}`}
        sizes={sizes}
        priority={priority}
        style={built.position ? { objectPosition: built.position } : undefined}
        {...blurProps}
      />
    );
  }

  return (
    <Image
      src={built.src}
      alt={label}
      width={built.width}
      height={built.height}
      className={`${fit} ${className}`}
      sizes={sizes}
      priority={priority}
      style={built.position ? { objectPosition: built.position } : undefined}
      {...blurProps}
    />
  );
}

export function PhotoFrame({
  image,
  alt,
  className = "",
  sizes,
  priority,
  width,
  height,
  mode,
  zoom = false,
}: {
  image?: CmsImage;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  mode?: "cover" | "contain";
  zoom?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface ${zoom ? "photo-zoom" : ""} ${className}`}>
      {hasCmsImage(image) ? (
        <CmsPhoto
          image={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          width={width}
          height={height}
          mode={mode}
          className="h-full w-full"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-bg" />
      )}
    </div>
  );
}
