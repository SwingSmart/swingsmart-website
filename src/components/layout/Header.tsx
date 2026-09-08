"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Layout";
import type { Navigation, SiteSettings } from "@/lib/types";

export function Header({
  navigation,
  settings,
}: {
  navigation: Navigation;
  settings: SiteSettings;
}) {
  const pathname = usePathname();
  const [route, setRoute] = useState(pathname);
  const [open, setOpen] = useState(false);
  const [openChild, setOpenChild] = useState<string | null>(null);
  const [deskMenu, setDeskMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  if (route !== pathname) {
    setRoute(pathname);
    setOpen(false);
    setOpenChild(null);
    setDeskMenu(null);
  }
  const phone = settings.contact.phones[0];
  const ctaHref = settings.primaryCta?.href || navigation.ctaHref;
  const ctaLabel = settings.primaryCta?.label || navigation.ctaLabel || "Enquire";
  const items = navigation.items.filter((item) => item.href !== "/");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setDeskMenu(null);
        setOpenChild(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
    <header
      className={`sticky top-0 z-50 overflow-visible border-b transition-colors duration-300 ${
        open
          ? "border-rule bg-bg-raised"
          : scrolled
            ? "border-rule bg-bg-raised/95 backdrop-blur-md"
            : "border-transparent bg-gradient-to-b from-bg/85 to-transparent"
      }`}
    >
      <Container className="flex h-[4.25rem] items-stretch justify-between gap-6 sm:h-[4.75rem]">
        <div className="flex items-center">
          <Logo priority />
        </div>
        <nav className="hidden items-stretch gap-7 lg:flex" aria-label="Main">
          {items.map((item) =>
            item.children?.length ? (
              <div
                key={item.href}
                className="relative flex"
                onMouseEnter={() => setDeskMenu(item.href)}
                onMouseLeave={() => setDeskMenu(null)}
                onFocus={() => setDeskMenu(item.href)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setDeskMenu(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center text-sm ${
                    pathname.startsWith(item.href)
                      ? "text-cream"
                      : "text-muted hover:text-cream"
                  }`}
                  aria-expanded={deskMenu === item.href}
                  aria-haspopup="true"
                >
                  {item.label}
                </Link>
                {deskMenu === item.href ? (
                  <ul className="absolute left-0 top-full z-50 min-w-56 border border-rule bg-surface py-2 shadow-lg shadow-black/40">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block px-4 py-2 text-sm hover:bg-bg hover:text-cream ${
                            pathname === child.href ? "text-cream" : "text-muted"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center text-sm ${
                  pathname === item.href ? "text-cream" : "text-muted hover:text-cream"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          {phone ? (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-sm text-muted hover:text-cream"
            >
              {phone}
            </a>
          ) : null}
          {ctaHref ? <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink> : null}
        </div>
        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex h-3.5 w-5 flex-col justify-between">
            <span
              className={`h-px w-full bg-cream transition ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span className={`h-px w-full bg-cream transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-full bg-cream transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Container>
    </header>
      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-[4.25rem] z-40 overflow-y-auto border-t border-rule bg-bg sm:top-[4.75rem] lg:hidden"
        >
          <Container className="flex min-h-full flex-col gap-1 py-8">
            {items.map((item) => (
              <div key={item.href} className="border-b border-rule py-3">
                <Link
                  href={item.href}
                  className="block font-display text-3xl text-cream"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="text-xs uppercase tracking-[0.16em] text-muted"
                      onClick={() =>
                        setOpenChild((value) => (value === item.href ? null : item.href))
                      }
                    >
                      {openChild === item.href ? "Hide packages" : "All packages"}
                    </button>
                    {openChild === item.href ? (
                      <ul className="mt-3 space-y-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="text-sm text-muted"
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
            <div className="mt-8 flex flex-col gap-4 pb-8">
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm text-cream">
                  {phone}
                </a>
              ) : null}
              {settings.contact.email ? (
                <a href={`mailto:${settings.contact.email}`} className="text-sm text-muted">
                  {settings.contact.email}
                </a>
              ) : null}
              {ctaHref ? (
                <ButtonLink href={ctaHref} className="w-fit">
                  {ctaLabel}
                </ButtonLink>
              ) : null}
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
}
