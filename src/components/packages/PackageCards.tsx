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

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {packages.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/packages/${item.slug}`}
            className="group flex h-full flex-col bg-surface"
          >
            <PhotoFrame
              image={item.heroImage}
              zoom={hasCmsImage(item.heroImage)}
              className="aspect-[16/10] w-full"
              sizes="(min-width: 640px) 50vw, 100vw"
              width={1200}
            />
            <div className="flex flex-1 flex-col border border-t-0 border-rule p-6 transition-colors group-hover:border-green-soft">
              {item.shortName ? (
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-green-soft">
                  {item.shortName}
                </p>
              ) : null}
              <h3 className="mt-3 font-display text-3xl text-cream group-hover:text-green-soft">
                {item.title}
              </h3>
              {item.summary ? (
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{item.summary}</p>
              ) : null}
              {item.priceLabel ? (
                <p className="mt-6 text-sm font-medium text-cream">
                  {item.priceLabel}
                  {item.durationLabel ? (
                    <span className="ml-2 font-normal text-muted">{item.durationLabel}</span>
                  ) : null}
                </p>
              ) : null}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
