"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CmsPhoto, PhotoFrame } from "@/components/ui/CmsPhoto";
import { EmptyState } from "@/components/ui/EmptyState";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

export function GalleryGrid({
  items,
  categories,
  showFilters = true,
}: {
  items: GalleryItem[];
  categories?: GalleryCategory[];
  showFilters?: boolean;
}) {
  const [active, setActive] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const filterRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const labelId = useId();

  const filters = useMemo(
    () => [{ title: "All", slug: "all" }, ...(categories || [])],
    [categories],
  );

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((item) => (item.categories || []).includes(active));
  }, [active, items]);

  const openItem = openIndex === null ? null : filtered[openIndex] || null;

  const closeLightbox = useCallback(() => {
    const index = openIndex;
    setOpenIndex(null);
    if (index !== null) {
      requestAnimationFrame(() => triggerRefs.current.get(index)?.focus());
    }
  }, [openIndex]);

  const moveLightbox = useCallback(
    (direction: 1 | -1) => {
      if (!filtered.length) return;
      setOpenIndex((current) => {
        if (current === null) return 0;
        return (current + direction + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (openIndex !== null && openIndex >= filtered.length) {
      setOpenIndex(null);
    }
  }, [filtered.length, openIndex]);

  return (
    <div>
      {showFilters && filters.length > 1 ? (
        <div
          role="toolbar"
          aria-label="Filter photographs"
          className="mb-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onKeyDown={(event) => {
            const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
            if (!keys.includes(event.key)) return;
            event.preventDefault();
            const current = filterRefs.current.findIndex(
              (node) => node === document.activeElement,
            );
            const last = filters.length - 1;
            let next = current < 0 ? 0 : current;
            if (event.key === "ArrowRight") next = current >= last ? 0 : current + 1;
            if (event.key === "ArrowLeft") next = current <= 0 ? last : current - 1;
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = last;
            filterRefs.current[next]?.focus();
            const slug = filters[next]?.slug;
            if (slug) setActive(slug);
          }}
        >
          {filters.map((filter, index) => (
            <button
              key={filter.slug}
              type="button"
              ref={(node) => {
                filterRefs.current[index] = node;
              }}
              aria-pressed={active === filter.slug}
              onClick={() => setActive(filter.slug)}
              className={`shrink-0 rounded-tight px-4 py-2 text-sm transition-colors ${
                active === filter.slug
                  ? "bg-green text-on-green"
                  : "border border-rule text-muted hover:text-cream"
              }`}
            >
              {filter.title}
            </button>
          ))}
        </div>
      ) : null}

      {filtered.length ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {filtered.map((item, index) => {
            const portrait =
              Boolean(item.image?.width && item.image?.height) &&
              (item.image.height || 0) > (item.image.width || 0) * 1.05;
            const wide = !portrait && index % 5 === 0;
            const label = item.image?.alt || item.alt || item.title;
            const caption = item.caption || item.venue;
            return (
              <li
                key={item._id || `${item.title}-${index}`}
                className={wide ? "lg:col-span-8" : "lg:col-span-4"}
              >
                <button
                  type="button"
                  className="group block w-full text-left outline-offset-4"
                  aria-haspopup="dialog"
                  aria-label={`View ${label}`}
                  ref={(node) => {
                    if (node) triggerRefs.current.set(index, node);
                    else triggerRefs.current.delete(index);
                  }}
                  onClick={() => setOpenIndex(index)}
                >
                  <div className="relative">
                    <PhotoFrame
                      image={item.image}
                      alt={label}
                      zoom
                      className={
                        wide
                          ? "aspect-[16/10] w-full lg:aspect-[16/9] lg:min-h-[22rem]"
                          : portrait
                            ? "aspect-[3/4] w-full"
                            : "aspect-[4/3] w-full"
                      }
                      sizes={
                        wide
                          ? "(min-width: 1024px) 66vw, 100vw"
                          : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      }
                      width={wide ? 1800 : 1100}
                    />
                    {caption ? (
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/85 to-transparent px-4 pb-3 pt-10 text-sm text-cream opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                        {caption}
                      </span>
                    ) : null}
                  </div>
                  {caption ? <span className="sr-only">{caption}</span> : null}
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

      {openItem ? (
        <Lightbox
          item={openItem}
          labelId={labelId}
          index={openIndex || 0}
          total={filtered.length}
          onClose={closeLightbox}
          onPrev={() => moveLightbox(-1)}
          onNext={() => moveLightbox(1)}
        />
      ) : null}
    </div>
  );
}

function Lightbox({
  item,
  labelId,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  labelId: string;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const label = item.image?.alt || item.alt || item.title;
  const caption = item.caption || item.venue || item.title;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const root = dialogRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key !== "Tab" || !root) return;
      const nodes = [
        ...root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((node) => !node.hasAttribute("disabled"));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/94 p-4 sm:p-8"
      onClick={onClose}
    >
      <figure
        className="relative flex max-h-[90vh] w-full max-w-6xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex max-h-[78vh] min-h-[12rem] items-center justify-center overflow-hidden bg-bg">
          <CmsPhoto
            image={item.image}
            alt={label}
            mode="contain"
            width={2400}
            className="max-h-[78vh] w-auto max-w-full object-contain"
            sizes="90vw"
          />
        </div>
        <figcaption className="mt-4 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p id={labelId} className="text-base text-cream">
              {caption}
            </p>
            <p className="mt-1">
              {index + 1} of {total}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {total > 1 ? (
              <>
                <button
                  type="button"
                  className="min-h-11 border border-rule px-4 text-cream hover:text-green-soft"
                  onClick={onPrev}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="min-h-11 border border-rule px-4 text-cream hover:text-green-soft"
                  onClick={onNext}
                >
                  Next
                </button>
              </>
            ) : null}
            <button
              ref={closeRef}
              type="button"
              className="min-h-11 bg-green px-4 text-on-green hover:bg-green-mid"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
