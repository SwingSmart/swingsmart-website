"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Navigation } from "@/lib/types";

export function Header({
  navigation,
  siteName,
}: {
  navigation: Navigation;
  siteName: string;
}) {
  const [open, setOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="font-display text-xl tracking-tight text-mist">
          {siteName}
          <span className="ml-2 text-green">.</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="Main">
          {navigation.items.map((item) =>
            item.children?.length ? (
              <div key={item.href} className="group relative">
                <Link href={item.href} className="text-mist/80 hover:text-green">
                  {item.label}
                </Link>
                <div className="invisible absolute left-0 top-full z-50 w-56 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="rounded-xl border border-line bg-panel p-3">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-mist/80 hover:bg-ink hover:text-green"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-mist/80 hover:text-green"
              >
                {item.label}
              </Link>
            ),
          )}
          {navigation.ctaHref ? (
            <ButtonLink href={navigation.ctaHref}>{navigation.ctaLabel || "Book"}</ButtonLink>
          ) : null}
        </nav>
        <button
          type="button"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-6 w-7 flex-col justify-between">
            <span className="h-0.5 w-full bg-mist" />
            <span className="h-0.5 w-full bg-mist" />
            <span className="h-0.5 w-full bg-mist" />
          </span>
        </button>
      </Container>
      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-ink/95 lg:hidden">
          <Container className="flex flex-col gap-3 py-6">
            {navigation.items.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-1 text-mist"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div className="ml-3 mt-1 space-y-1">
                    <button
                      type="button"
                      className="text-xs text-muted"
                      onClick={() => setPackagesOpen((value) => !value)}
                    >
                      {packagesOpen ? "Hide packages" : "Show packages"}
                    </button>
                    {packagesOpen
                      ? item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-1 text-sm text-muted"
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))
                      : null}
                  </div>
                ) : null}
              </div>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
