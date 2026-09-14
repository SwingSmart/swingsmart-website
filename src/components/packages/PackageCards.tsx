import Link from "next/link";
import { PhotoFrame } from "@/components/ui/CmsPhoto";
import { EmptyState } from "@/components/ui/EmptyState";
import type { EventPackage } from "@/lib/types";
import { hasCmsImage } from "@/sanity/image";

export function PackageCards({ packages }: { packages: EventPackage[] }) {
  if (!packages.length) {
    return (
      <EmptyState
        title="Packages are being prepared"
        text="Published hire packages will appear here as cards, each linking through to its own page."
      />
    );
  }

  const featuredSlug = packages.find((item) => item.featured)?.slug;

  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:gap-10">
      {packages.map((item) => {
        const featured = item.slug === featuredSlug;
        return (
          <li key={item.slug} className={featured ? "sm:col-span-2" : ""}>
            <Link
              href={`/packages/${item.slug}`}
              className={`group flex h-full overflow-hidden bg-bg ${
                featured ? "flex-col lg:grid lg:grid-cols-2" : "flex-col"
              }`}
            >
              <PhotoFrame
                image={item.heroImage}
                zoom={hasCmsImage(item.heroImage)}
                className={
                  featured
                    ? "aspect-[16/10] w-full lg:aspect-auto lg:min-h-[28rem] xl:min-h-[32rem]"
                    : "aspect-[16/10] w-full"
                }
                sizes={
                  featured
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 640px) 50vw, 100vw"
                }
                width={featured ? 1800 : 1200}
              />
              <div
                className={`flex flex-1 flex-col justify-end ${
                  featured ? "p-8 sm:p-10 lg:p-12" : "p-6 sm:p-8"
                }`}
              >
                {item.shortName ? (
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-cream/50">
                    {item.shortName}
                  </p>
                ) : null}
                <h3
                  className={`mt-3 font-display font-medium tracking-[-0.02em] text-cream ${
                    featured ? "text-4xl sm:text-5xl" : "text-3xl"
                  }`}
                >
                  {item.title}
                </h3>
                {item.summary ? (
                  <p
                    className={`mt-4 text-sm leading-7 text-muted ${
                      featured ? "max-w-lg sm:text-base" : "line-clamp-3"
                    }`}
                  >
                    {item.summary}
                  </p>
                ) : null}
                {item.priceLabel ? (
                  <p className="mt-8 text-[0.8rem] tracking-[0.08em] text-cream/80">
                    {item.priceLabel}
                    {item.durationLabel ? (
                      <span className="ml-3 text-muted">{item.durationLabel}</span>
                    ) : null}
                  </p>
                ) : null}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
