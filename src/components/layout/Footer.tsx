import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import type { Navigation, SiteSettings } from "@/lib/types";

export function Footer({
  settings,
  navigation,
}: {
  settings: SiteSettings;
  navigation: Navigation;
}) {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl text-mist">
            {settings.siteName}
            <span className="text-green">.</span>
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-green">
            {settings.tagline}
          </p>
          {settings.footerNote ? (
            <p className="mt-4 max-w-md text-sm leading-6 text-muted">{settings.footerNote}</p>
          ) : null}
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {navigation.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-green">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href={`mailto:${settings.contact.email}`} className="hover:text-green">
                {settings.contact.email}
              </a>
            </li>
            {settings.contact.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-green">
                  {phone}
                </a>
              </li>
            ))}
            {settings.socials.map((social) => (
              <li key={social.url}>
                <a href={social.url} className="hover:text-green" target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="border-t border-line py-6 text-xs text-muted">
        © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
      </Container>
    </footer>
  );
}
