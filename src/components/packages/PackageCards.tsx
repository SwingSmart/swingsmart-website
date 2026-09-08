import Link from "next/link";
import type { EventPackage } from "@/lib/types";

export function PackageCards({ packages }: { packages: EventPackage[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {packages.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/packages/${item.slug}`}
            className="group flex h-full flex-col border border-rule bg-surface p-6 transition-colors hover:border-green-soft"
          >
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-green-soft">
              {item.shortName}
            </p>
            <h3 className="mt-3 font-display text-3xl text-cream group-hover:text-green-soft">
              {item.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted">{item.summary}</p>
            <p className="mt-6 text-sm font-medium text-cream">
              {item.priceLabel}
              {item.durationLabel ? (
                <span className="ml-2 font-normal text-muted">{item.durationLabel}</span>
              ) : null}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
