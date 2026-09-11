import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(filename) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

if (!projectId || !token) {
  console.error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local before seeding.",
  );
  process.exit(1);
}

console.warn(
  "seed-sanity.mjs writes starter documents. For live Squarespace copy, run node scripts/migrate-from-squarespace.mjs instead.",
);

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function block(text, style = "normal") {
  const key = text.slice(0, 24).replace(/\s+/g, "-").toLowerCase() || "block";
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
  };
}

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    businessName: "SwingSmart UK",
    tagline: "Beyond Golf.",
    footerText:
      "Mobile golf simulation for homes, venues, weddings, clubs and events. Based in Cornwall, available across the UK.",
    email: "hello@swingsmart.co.uk",
    phones: ["+44 (0) 7453 312 916", "+44 (0) 7805 019 849"],
    address: "Cornwall, United Kingdom",
    primaryCta: { _type: "ctaButton", label: "Plan an event", href: "/contact", style: "primary" },
    secondaryCta: {
      _type: "ctaButton",
      label: "View packages",
      href: "/packages",
      style: "secondary",
    },
    socials: [
      {
        _type: "socialLink",
        _key: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/swingsmart-uk",
      },
    ],
    defaultSeo: {
      _type: "seo",
      title: "SwingSmart UK. Beyond Golf.",
      description:
        "We bring a professional golf simulator to you — anytime, anywhere. Packages for individuals, corporates, weddings, clubs and junior golfers.",
    },
  },
  {
    _id: "navigation",
    _type: "navigation",
    items: [
      {
        _type: "navItem",
        _key: "packages",
        label: "Packages",
        href: "/packages",
        children: [
          { _key: "golfer", label: "The Golfer", href: "/packages/golfer" },
          { _key: "country-club", label: "Country Club", href: "/packages/country-club" },
        ],
      },
      { _type: "navItem", _key: "gallery", label: "Gallery", href: "/gallery" },
      { _type: "navItem", _key: "partnerships", label: "Partnerships", href: "/partnerships" },
      { _type: "navItem", _key: "about", label: "About", href: "/about" },
      { _type: "navItem", _key: "contact", label: "Contact", href: "/contact" },
    ],
    ctaLabel: "Plan an event",
    ctaHref: "/contact",
  },
  {
    _id: "page-home",
    _type: "page",
    title: "Home",
    slug: { _type: "slug", current: "home" },
    seo: {
      _type: "seo",
      title: "SwingSmart UK. Beyond Golf.",
      description: "Professional golf simulation, brought to you.",
    },
    sections: [
      {
        _type: "hero",
        _key: "home-hero",
        eyebrow: "Beyond Golf",
        heading: "Golf, wherever you are.",
        subheading: "A professional simulator for homes, venues, weddings and events.",
        overlay: "medium",
        primaryCta: { _type: "ctaButton", label: "Plan an event", href: "/contact", style: "primary" },
        secondaryCta: {
          _type: "ctaButton",
          label: "View packages",
          href: "/packages",
          style: "secondary",
        },
      },
      {
        _type: "packageGrid",
        _key: "home-packages",
        heading: "Packages",
        intro:
          "From a private four-hour session to a full tournament bay. Choose a starting point — or build your own.",
      },
      {
        _type: "richText",
        _key: "home-intro",
        heading: "Brought to you",
        body: [
          block(
            "Chris and Ryan bring a full golf bay to you — no clubhouse rebuild, no weather delays. Seeded from Sanity so you can edit this in the Studio.",
          ),
        ],
      },
      {
        _type: "cta",
        _key: "home-cta",
        heading: "Ready when you are",
        text: "Tell us the date and we’ll take it from there.",
        button: { _type: "ctaButton", label: "Plan an event", href: "/contact", style: "primary" },
      },
    ],
  },
  {
    _id: "package-golfer",
    _type: "eventPackage",
    name: "The Golfer",
    shortName: "Individual",
    slug: { _type: "slug", current: "golfer" },
    subtitle: "Individual package",
    summary:
      "Perfect for solo players or small groups. Fine-tune your swing or host a private golf night.",
    description: [block("A complete bay for one player or a handful of friends.")],
    featured: true,
    sortOrder: 1,
    startingPrice: 395,
    priceQualifier: "From",
    duration: "Minimum 4 hours",
    includes: ["Launch monitor and software", "Clubs and hitting mat", "Setup and take-down"],
    extras: ["Junior clubs on request"],
    cta: { _type: "ctaButton", label: "Enquire", href: "/contact", style: "primary" },
  },
  {
    _id: "gallery-category-corporate",
    _type: "galleryCategory",
    title: "Corporate",
    slug: { _type: "slug", current: "corporate" },
    sortOrder: 1,
  },
  {
    _id: "gallery-category-weddings",
    _type: "galleryCategory",
    title: "Weddings",
    slug: { _type: "slug", current: "weddings" },
    sortOrder: 2,
  },
  {
    _id: "gallery-category-hotels",
    _type: "galleryCategory",
    title: "Hotels & Holiday Parks",
    slug: { _type: "slug", current: "hotels-holiday-parks" },
    sortOrder: 3,
  },
  {
    _id: "gallery-category-exhibitions",
    _type: "galleryCategory",
    title: "Exhibitions",
    slug: { _type: "slug", current: "exhibitions" },
    sortOrder: 4,
  },
  {
    _id: "gallery-category-private",
    _type: "galleryCategory",
    title: "Private Events",
    slug: { _type: "slug", current: "private-events" },
    sortOrder: 5,
  },
  {
    _id: "gallery-category-installations",
    _type: "galleryCategory",
    title: "Long-Term Installations",
    slug: { _type: "slug", current: "long-term-installations" },
    sortOrder: 6,
  },
  {
    _id: "gallery-category-golf-events",
    _type: "galleryCategory",
    title: "Golf Events",
    slug: { _type: "slug", current: "golf-events" },
    sortOrder: 7,
  },
  {
    _id: "partner-wellington",
    _type: "partner",
    name: "Wellington School",
    summary: "Official supplier — an all-weather game for pupils.",
    website: "https://www.wellington-school.org.uk",
    featured: true,
    sortOrder: 1,
  },
  {
    _id: "partner-newton-abbot",
    _type: "partner",
    name: "Newton Abbot Races",
    summary: "Family Day partner — a simulator on site for visitors of every age.",
    website: "https://www.newtonabbotracing.com",
    featured: false,
    sortOrder: 2,
  },
  {
    _id: "partner-graphic-mill",
    _type: "partner",
    name: "Graphic Mill",
    summary: "Exhibition partners — high-impact stands with a full-scale SwingSmart bay.",
    website: "https://www.graphicmill.co.uk",
    featured: true,
    sortOrder: 3,
  },
  {
    _id: "partner-sauermann",
    _type: "partner",
    name: "Sauermann UK",
    summary: "InstallerSHOW at the NEC — an interactive stand that gets the conversation started.",
    featured: true,
    sortOrder: 4,
  },
  {
    _id: "testimonial-wedding",
    _type: "testimonial",
    quote:
      "Everyone ended up on the tee — including people who had never held a club. It was the unexpected highlight of the day.",
    person: "Wedding hire",
    organisation: "Cornwall",
    featured: true,
  },
  {
    _id: "page-packages",
    _type: "page",
    title: "Packages",
    slug: { _type: "slug", current: "packages" },
    sections: [
      {
        _type: "hero",
        _key: "packages-hero",
        heading: "Packages",
        subheading: "From a single bay to a full event.",
        overlay: "medium",
      },
      {
        _type: "packageGrid",
        _key: "packages-grid",
        heading: "Choose a starting point",
      },
    ],
  },
  {
    _id: "page-gallery",
    _type: "page",
    title: "Gallery",
    slug: { _type: "slug", current: "gallery" },
    sections: [
      {
        _type: "hero",
        _key: "gallery-hero",
        heading: "Gallery",
        overlay: "medium",
      },
      { _type: "gallery", _key: "gallery-grid", heading: "Photographs", showFilters: true },
    ],
  },
  {
    _id: "page-partnerships",
    _type: "page",
    title: "Partnerships",
    slug: { _type: "slug", current: "partnerships" },
    sections: [
      {
        _type: "hero",
        _key: "partners-hero",
        heading: "Partnerships",
        overlay: "medium",
      },
      { _type: "partnerGrid", _key: "partners-featured", heading: "Featured partners", layout: "featured", featuredOnly: true, showDescriptions: true },
      { _type: "partnerGrid", _key: "partners-logos", heading: "Who we’ve teed up with", layout: "logos", showDescriptions: false },
      {
        _type: "cta",
        _key: "partners-cta",
        heading: "Want to partner with SwingSmart?",
        text: "Schools, venues, hotels, exhibitions and clubs — if you have the space, we’ll bring the course.",
        button: { _type: "ctaButton", label: "Become a partner", href: "/contact", style: "primary" },
      },
    ],
  },
  {
    _id: "page-about",
    _type: "page",
    title: "About",
    slug: { _type: "slug", current: "about" },
    sections: [
      {
        _type: "hero",
        _key: "about-hero",
        heading: "The brains behind the bays",
        subheading: "Chris and Ryan, from Cornwall.",
        overlay: "medium",
      },
      {
        _type: "richText",
        _key: "about-copy",
        body: [block("We bring golf to everyone — rain or shine.")],
      },
    ],
  },
  {
    _id: "page-contact",
    _type: "page",
    title: "Contact",
    slug: { _type: "slug", current: "contact" },
    sections: [
      {
        _type: "hero",
        _key: "contact-hero",
        heading: "Contact us",
        overlay: "medium",
      },
      {
        _type: "contactBlock",
        _key: "contact-form",
        heading: "Send an enquiry",
        showForm: true,
        showDetails: true,
      },
    ],
  },
];

const transaction = client.transaction();
for (const doc of docs) {
  transaction.createOrReplace(doc);
}

await transaction.commit();
console.log(`Seeded ${docs.length} documents into ${projectId}/${dataset}.`);
