import type { EventPackage, SiteSettings } from "@/lib/types";
import { siteUrl } from "@/sanity/env";

export function localBusinessJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: settings.siteName,
    description: settings.defaultSeo.description,
    url: siteUrl,
    image: `${siteUrl}/brand/hero.jpg`,
    email: settings.contact.email,
    telephone: settings.contact.phones[0],
    areaServed: "GB",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Cornwall",
      addressCountry: "GB",
    },
    sameAs: settings.socials.map((social) => social.url).filter(Boolean),
  };
}

export function packageJsonLd(pkg: EventPackage) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: pkg.title,
    description: pkg.summary,
    url: `${siteUrl}/packages/${pkg.slug}`,
    availability: "https://schema.org/InStock",
    areaServed: "GB",
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
