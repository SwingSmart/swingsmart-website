import Link from "next/link";
import type { EventPackage } from "@/lib/types";

export function PackageCards({ packages }: { packages: EventPackage[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {packages.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/packages/${item.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition hover:border-green"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">
              {item.shortName}
            </p>
            <h3 className="mt-3 font-display text-3xl text-mist group-hover:text-green-bright">
              {item.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted">{item.summary}</p>
            <p className="mt-6 text-sm font-semibold text-mist">
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
