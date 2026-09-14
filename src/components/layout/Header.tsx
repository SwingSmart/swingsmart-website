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
  const [deskMenu, setDeskMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  if (route !== pathname) {
    setRoute(pathname);
    setOpen(false);
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setDeskMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkClass = (active: boolean) =>
    `relative flex items-center text-[0.8rem] tracking-[0.06em] transition-colors ${
      active ? "text-cream" : "text-cream/62 hover:text-cream"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 overflow-visible border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          open
            ? "border-rule bg-bg"
            : scrolled
              ? "border-rule/80 bg-bg/90 backdrop-blur-md"
              : "border-transparent bg-gradient-to-b from-bg/80 to-transparent"
        }`}
      >
        <Container className="flex h-[4.5rem] items-stretch justify-between gap-6 sm:h-[5rem] xl:h-[5.25rem]">
          <div className="flex items-center">
            <Logo priority />
          </div>
          <nav className="hidden items-stretch gap-5 xl:gap-8 lg:flex" aria-label="Main">
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
                    className={linkClass(pathname.startsWith(item.href))}
                    aria-expanded={deskMenu === item.href}
                    aria-haspopup="true"
                  >
                    {item.label}
                    {pathname.startsWith(item.href) ? (
                      <span className="absolute inset-x-0 bottom-[1.15rem] h-px bg-cream/80" />
                    ) : null}
                  </Link>
                  {deskMenu === item.href ? (
                    <ul className="absolute left-0 top-full z-50 min-w-60 border border-rule bg-bg py-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-5 py-2 text-[0.8rem] tracking-[0.04em] hover:text-cream ${
                              pathname === child.href ? "text-cream" : "text-cream/60"
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
                  className={linkClass(pathname === item.href)}
                >
                  {item.label}
                  {pathname === item.href ? (
                    <span className="absolute inset-x-0 bottom-[1.15rem] h-px bg-cream/80" />
                  ) : null}
                </Link>
              ),
            )}
          </nav>
          <div className="hidden items-center gap-6 lg:flex">
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="hidden text-[0.8rem] tracking-[0.04em] text-cream/55 hover:text-cream xl:inline"
              >
                {phone}
              </a>
            ) : null}
            {ctaHref ? (
              <ButtonLink href={ctaHref} className="min-h-11 px-5">
                {ctaLabel}
              </ButtonLink>
            ) : null}
          </div>
          <button
            type="button"
            className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
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
          className="fixed inset-0 top-[4.5rem] z-40 overflow-y-auto bg-bg sm:top-[5rem] lg:hidden"
        >
          <Container className="flex min-h-full flex-col pb-12 pt-6">
            <nav aria-label="Mobile">
              {items.map((item) => (
                <div key={item.href} className="border-b border-rule/80 py-5">
                  <Link
                    href={item.href}
                    className="block font-display text-[2.15rem] font-medium leading-none tracking-[-0.02em] text-cream"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
                      {item.children.map((child) => (
                        <li key={child.href} className="mb-2 break-inside-avoid">
                          <Link
                            href={child.href}
                            className="text-sm text-cream/60 hover:text-cream"
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4 pt-10">
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm text-cream">
                  {phone}
                </a>
              ) : null}
              {settings.contact.email ? (
                <a href={`mailto:${settings.contact.email}`} className="text-sm text-cream/55">
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
