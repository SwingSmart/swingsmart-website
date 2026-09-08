"use client";

import { useMemo, useState } from "react";
import { CmsPhoto } from "@/components/ui/CmsPhoto";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

export function GalleryGrid({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories?: GalleryCategory[];
}) {
  const [active, setActive] = useState("all");
  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((item) => item.categories.includes(active));
  }, [active, items]);

  return (
    <div>
      {categories?.length ? (
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          {categories.map((category) => (
            <FilterChip
              key={category.slug}
              label={category.title}
              active={active === category.slug}
              onClick={() => setActive(category.slug)}
            />
          ))}
        </div>
      ) : null}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <li key={item._id || item.title} className="overflow-hidden rounded-card">
            <CmsPhoto
              image={item.image}
              className="aspect-[4/3] w-full object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <p className="sr-only">{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-tight px-4 py-2 text-sm ${
        active ? "bg-green text-on-green" : "border border-rule text-muted hover:text-cream"
      }`}
    >
      {label}
    </button>
  );
}
