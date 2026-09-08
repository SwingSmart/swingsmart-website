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
    <footer className="border-t border-rule bg-bg-raised">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
            {settings.footerNote}
          </p>
        </div>
        <div className="lg:col-span-2">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-green-soft">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/90 hover:text-green-soft">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-green-soft">
            Packages
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {packages.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-green-soft">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/90">
            <li>
              <a href={`mailto:${settings.contact.email}`} className="hover:text-green-soft">
                {settings.contact.email}
              </a>
            </li>
            {settings.contact.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-green-soft">
                  {phone}
                </a>
              </li>
            ))}
            {settings.contact.location ? (
              <li className="text-muted">{settings.contact.location}</li>
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
      <Container className="flex flex-col gap-2 border-t border-rule py-5 text-xs text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {settings.siteName}
        </p>
        <p>{settings.tagline}</p>
      </Container>
    </footer>
  );
}
