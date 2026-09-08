"use client";

import { useEffect, useMemo, useState } from "react";
import { PhotoFrame } from "@/components/ui/CmsPhoto";
import { EmptyState } from "@/components/ui/EmptyState";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

export function GalleryGrid({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories?: GalleryCategory[];
}) {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((item) => item.categories.includes(active));
  }, [active, items]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div>
      {categories?.length ? (
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

      {filtered.length ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {filtered.map((item, index) => {
            const wide = index % 6 === 0;
            return (
              <li
                key={item._id || `${item.title}-${index}`}
                className={wide ? "lg:col-span-8" : "lg:col-span-4"}
              >
                <button
                  type="button"
                  className="group block w-full text-left"
                  onClick={() => setOpen(item)}
                >
                  <PhotoFrame
                    image={item.image}
                    alt={item.image?.alt || item.alt || item.title}
                    zoom
                    className={
                      wide
                        ? "aspect-[16/10] min-h-0 w-full lg:aspect-[16/9] lg:min-h-[22rem]"
                        : "aspect-[4/3] w-full"
                    }
                    sizes={
                      wide
                        ? "(min-width: 1024px) 66vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    width={wide ? 1800 : 1100}
                  />
                  {item.caption || item.venue ? (
                    <p className="mt-2 text-sm text-muted">
                      {item.caption || item.venue}
                    </p>
                  ) : (
                    <p className="sr-only">{item.title}</p>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState
          title="Nothing in this category yet"
          text="Try another filter, or add photographs to this category in the Studio."
        />
      )}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/92 p-4 sm:p-8"
          onClick={() => setOpen(null)}
        >
          <figure
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <PhotoFrame
              image={open.image}
              alt={open.image?.alt || open.alt || open.title}
              className="aspect-[16/10] w-full"
              sizes="90vw"
              width={2200}
            />
            <figcaption className="mt-4 flex items-start justify-between gap-6 text-sm text-muted">
              <span>{open.caption || open.venue || open.title}</span>
              <button
                type="button"
                className="text-cream hover:text-green-soft"
                onClick={() => setOpen(null)}
              >
                Close
              </button>
            </figcaption>
          </figure>
        </div>
      ) : null}
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
      className={`shrink-0 rounded-tight px-4 py-2 text-sm ${
        active
          ? "bg-green text-on-green"
          : "border border-rule text-muted hover:text-cream"
      }`}
    >
      {label}
    </button>
  );
}
