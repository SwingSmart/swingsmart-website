import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Layout";
import type { Navigation, SiteSettings } from "@/lib/types";

export function Footer({
  settings,
  navigation,
}: {
  settings: SiteSettings;
  navigation: Navigation;
}) {
  const explore = navigation.items.filter((item) => item.href !== "/");
  const packages =
    navigation.items.find((item) => item.href === "/packages")?.children ?? [];

  return (
    <footer className="border-t border-rule bg-bg">
      <Container className="grid gap-14 py-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-8 max-w-sm text-sm leading-7 text-muted">
            {settings.footerNote}
          </p>
        </div>
        <div className="lg:col-span-2">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-cream/45">
            Explore
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/80 transition-colors hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-cream/45">
            Packages
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {packages.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-cream/45">
            Contact
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-cream/80">
            <li>
              <a href={`mailto:${settings.contact.email}`} className="hover:text-cream">
                {settings.contact.email}
              </a>
            </li>
            {settings.contact.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-cream">
                  {phone}
                </a>
              </li>
            ))}
            {settings.contact.location ? (
              <li className="text-muted">{settings.contact.location}</li>
            ) : null}
            {settings.primaryCta?.href ? (
              <li className="pt-3">
                <Link
                  href={settings.primaryCta.href}
                  className="text-green-soft transition-colors hover:text-cream"
                >
                  {settings.primaryCta.label || "Plan an event"}
                </Link>
              </li>
            ) : null}
            {settings.socials.map((social) => (
              <li key={social.url}>
                <a
                  href={social.url}
                  className="text-muted hover:text-cream"
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-rule py-6 text-xs tracking-[0.06em] text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {settings.siteName}
        </p>
        <p>{settings.tagline}</p>
      </Container>
    </footer>
  );
}
