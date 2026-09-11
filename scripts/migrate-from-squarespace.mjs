/**
 * Push migrated Squarespace content into Sanity.
 * Prefer this over `npm run seed` for live copy.
 * Requires SANITY_API_WRITE_TOKEN in .env.local.
 *
 * Does not create a second Home document — it patches the existing Home page
 * and keeps its current hero photograph.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "node:fs";
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3sbwydux";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

if (!token) {
  console.error("Set SANITY_API_WRITE_TOKEN in .env.local to write migrated content to Sanity.");
  console.error("Fallback copy, local images, redirects and /migration/url-mapping.csv are already in the repo.");
  process.exit(1);
}

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

function imageRef(assetId, alt) {
  if (!assetId) return undefined;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
}

async function upload(filePath, filename) {
  const abs = resolve(process.cwd(), filePath);
  if (!existsSync(abs)) {
    console.warn("missing file", filePath);
    return null;
  }
  const asset = await client.assets.upload("image", createReadStream(abs), { filename });
  console.log("uploaded", filename, asset._id);
  return asset._id;
}

const assets = {
  about: await upload("public/migrated/about.webp", "about.webp"),
  offer: await upload("public/migrated/what-we-offer.webp", "what-we-offer.webp"),
  mission: await upload("public/migrated/beyond-golf.webp", "beyond-golf.webp"),
  charity: await upload("public/migrated/charity.webp", "charity.webp"),
  packagesIndex: await upload("public/migrated/packages/index.webp", "packages-index.webp"),
  golfer: await upload("public/migrated/packages/golfer.webp", "golfer.webp"),
  countryClub: await upload("public/migrated/packages/country-club.webp", "country-club.webp"),
  ryderCup: await upload("public/migrated/packages/ryder-cup.jpg", "ryder-cup.jpg"),
  championship: await upload("public/migrated/packages/championship.webp", "championship.webp"),
  stAndrews: await upload("public/migrated/packages/st-andrews.webp", "st-andrews.webp"),
  phoenixOpen: await upload("public/migrated/packages/phoenix-open.webp", "phoenix-open.webp"),
  juniorOpen: await upload("public/migrated/packages/junior-open.webp", "junior-open.webp"),
  buildYourOwn: await upload("public/migrated/packages/build-your-own.webp", "build-your-own.webp"),
  galleryCourse: await upload("public/migrated/gallery/course-35.webp", "gallery-course.webp"),
  galleryBay: await upload("public/migrated/gallery/event-bay.webp", "gallery-bay.webp"),
  galleryEnclosure: await upload("public/migrated/gallery/enclosure.webp", "gallery-enclosure.webp"),
  galleryTee: await upload("public/migrated/gallery/tee.webp", "gallery-tee.webp"),
  galleryEvening: await upload("public/migrated/gallery/evening.webp", "gallery-evening.webp"),
  gallerySummer: await upload("public/migrated/gallery/summer.webp", "gallery-summer.webp"),
  galleryCrowd: await upload("public/migrated/gallery/crowd.webp", "gallery-crowd.webp"),
  galleryHero49: await upload("public/migrated/gallery/hero-49.webp", "gallery-hero-49.webp"),
  galleryHero52: await upload("public/migrated/gallery/hero-52.webp", "gallery-hero-52.webp"),
  galleryHero02: await upload("public/migrated/gallery/hero-02.webp", "gallery-hero-02.webp"),
  galleryCountryClub2: await upload("public/migrated/gallery/country-club-2.webp", "gallery-country-club-2.webp"),
};

const faqs = [
  {
    _key: "q1",
    question: "How much space is required?",
    answer:
      "It really depends on your booking, however the majority of our packages require a minimum of 4m x 3m x 3m (W,L,H).",
  },
  {
    _key: "q2",
    question: "How long does setup/takedown take?",
    answer:
      "Setup typically takes 60–90 minutes. Takedown is around 45–60 minutes. We schedule around your event to minimise disruption.",
  },
  {
    _key: "q3",
    question: "Is it waterproof for outdoor events?",
    answer: "Yes, we offer a fully waterproof enclosure.",
  },
  {
    _key: "q4",
    question: "Can branding or customisation be added for events?",
    answer:
      "Absolutely! We can run through this option with you during your booking consultation.",
  },
  {
    _key: "q5",
    question: "What are the payment terms?",
    answer:
      "50% of total payment to be paid on booking confirmation (via BACS). Remaining balance to be paid 7 days before booking date.",
  },
  {
    _key: "q6",
    question: "What is the cancellation policy?",
    answer:
      "If you cancel your booking up until 10 days before your booking, we will return all monies paid. If you cancel after this we will keep the 50% paid at the time of booking confirmation.",
  },
];

const packageDocs = [
  {
    _id: "package-golfer",
    name: "The Golfer",
    shortName: "Individual",
    slug: "golfer",
    subtitle: "Individual package",
    summary:
      "Perfect for solo players or small groups, this package lets you enjoy a top-tier golf experience on your terms. Whether you want to fine-tune your swing, play a round on world-famous courses from the comfort of your home, or host a private golf night, our high-quality simulator setup delivers a seamless and immersive game.",
    startingPrice: 395,
    priceQualifier: "From",
    duration: "Minimum duration 4 hours",
    image: assets.golfer,
    alt: "Golfer using a SwingSmart simulator",
    sortOrder: 1,
    includes: [
      "Launch Monitor: 1x Skytrak Plus & Software",
      "Clubs: 1x Cobra Fly XL 11 Piece Set (Junior clubs available - please request on booking)",
      "Projector: 1x short throw with floor mounted case and impact screen",
      "Golf balls: Callaway (Various different models depending on type of hire)",
      "Hitting Mat: 1x 1.5m x 1.5m (Supporting left and right hand swings)",
      "Protective equipment: 1x Launch monitor casing, golf enclosure (4m (L) x 3m (W) x 3m (H))",
      "Installation: Setup and take down of all equipment",
    ],
  },
  {
    _id: "package-country-club",
    name: "Country Club",
    shortName: "Classic",
    slug: "country-club",
    subtitle: "Our classic package",
    summary:
      "Ideal for casual events and intimate gatherings, this experience transports you to a variety of world-class golf courses, providing an immersive and enjoyable environment for all skill levels. Whether you're hosting a small get-together or simply looking to add something unique to your event, it promises an engaging and memorable experience for everyone involved.",
    startingPrice: 595,
    priceQualifier: "From",
    duration: "Minimum duration 4 hours",
    image: assets.countryClub,
    alt: "Country Club package golf simulator setup",
    sortOrder: 2,
    includes: [
      "Launch Monitor: 1x Skytrak Plus & Software",
      "Clubs: 1x Cobra Fly XL 11 Piece Set (Junior clubs available - please request on booking)",
      "Projector: 1x short throw with floor mounted case and impact screen",
      "Golf balls: Callaway (Various different models depending on type of hire)",
      "Hitting Mat: 1x 1.5m x 1.5m (Supporting left and right hand swings)",
      "Protective equipment: 1x Launch monitor casing, golf enclosure (4m (L) x 3m (W) x 3m (H))",
      "Installation: Setup and take down of all equipment",
      "Member of Staff: 1 or 2 depending on size of booking",
    ],
  },
  {
    _id: "package-ryder-cup",
    name: "The Ryder Cup",
    shortName: "Corporate",
    slug: "ryder-cup",
    subtitle: "Corporate package",
    summary:
      "Perfect for businesses looking to make a lasting impression, this golf experience offers an engaging and interactive way to connect with clients or strengthen team dynamics. Whether you're aiming to drive engagement or build rapport off the course, our flexible setup—complete with multiple simulators and custom-branded features—sets the stage for a hole-in-one event. Ideal for corporate functions, team-building days, or client entertainment, it delivers a memorable atmosphere with all the feel of a top-tier clubhouse.",
    startingPrice: 695,
    priceQualifier: "From",
    duration: "Minimum duration 4 hours",
    image: assets.ryderCup,
    alt: "Corporate guests around a SwingSmart bay",
    sortOrder: 3,
    includes: [
      "Launch Monitor: 1x Skytrak Plus & Software",
      "Gaming computer: Windows 11 Desktop PC with large monitor",
      "Clubs: 1x Cobra Fly XL 11 Piece Set (Additional sets included if needed, left and right handed)",
      "Projector: 1x short throw with floor mounted case and impact screen",
      "Golf balls: Callaway (Various different models depending on type of hire)",
      "Hitting Mat: 1x 1.5m x 1.5m (Supporting left and right hand swings)",
      "Protective equipment: 1x Launch monitor casing, golf enclosure (4m (L) x 3m (W) x 3m (H))",
      "Installation: Setup and take down of all equipment",
      "Member of Staff: 1 or 2 depending on size of booking",
    ],
    extras: [
      "55” TV for external viewing",
      "Custom branding on all golf marquee sheets",
      "Interactive leaderboard tracking",
      "Prizes (anything else, let us know)",
    ],
  },
  {
    _id: "package-championship",
    name: "The Championship",
    shortName: "Short / long term",
    slug: "championship",
    subtitle: "Short and long-term hire",
    summary:
      "Perfect for golf clubs, venues, businesses, and private users looking to elevate their space with an immersive golf experience. Our long-term simulator rental offers a flexible and cost-effective solution for those who want to enjoy world-class virtual golf without the need for a permanent installation or large upfront investment. Whether you’re enhancing a hospitality venue, creating a unique staff amenity, or upgrading your personal entertainment space, this extended hire option delivers lasting engagement, entertainment, and year-round enjoyment.",
    priceQualifier: "POA",
    duration: "Minimum duration 1 week",
    image: assets.championship,
    alt: "Long-term SwingSmart simulator hire in a venue",
    sortOrder: 4,
    includes: [
      "Launch Monitor: 1x Skytrak Plus & Software",
      "Gaming computer: 1x Windows 11 Desktop PC with large monitor (If needed)",
      "Clubs: 1x Cobra Fly XL 13 Piece Set (Junior clubs available - please request on booking - If needed)",
      "Projector: 1x short throw with floor mounted case and impact screen",
      "Golf balls: Callaway (Various different models depending on type of hire) (If needed)",
      "Hitting Mat: 1x 1.5m x 1.5m (Supporting left and right hand swings)",
      "Protective equipment: 1x Launch monitor casing, golf enclosure (4m (L) x 3m (W) x 3m (H))",
      "Installation: Setup and take down of all equipment",
    ],
    extras: ["Ongoing maintenance and support when needed"],
  },
  {
    _id: "package-st-andrews",
    name: "St Andrews",
    shortName: "The Ultimate",
    slug: "st-andrews",
    subtitle: "The ultimate competition package",
    summary:
      "Built for those who thrive under pressure and love the thrill of competition, this package delivers a true tournament-style experience. Featuring advanced shot tracking, leaderboard integration, and fully customisable game formats, it brings out the competitive spirit in every player. Whether it’s match play, closest to the pin, or a full-blown virtual tournament, this setup turns any event into a high-stakes, high-energy golf showdown.",
    startingPrice: 1195,
    priceQualifier: "From",
    duration: "Minimum duration 4 hours",
    image: assets.stAndrews,
    alt: "Two-bay SwingSmart competition setup",
    sortOrder: 5,
    includes: [
      "Launch Monitor: 2x Skytrak Plus & Software",
      "Gaming computer: Windows 11 Desktop PC with large monitor",
      "Clubs: 2x Cobra Fly XL 11 Piece Set (Junior clubs, left/right handed available - request on booking)",
      "Projector: 2x short throw with floor mounted case and impact screen",
      "Golf balls: Callaway (Various different models depending on type of hire)",
      "Hitting Mat: 2x 1.5m x 1.5m (Supporting left and right hand swings)",
      "Protective equipment: 2x Launch monitor casing, golf enclosure (4m (L) x 3m (W) x 3m (H))",
      "Installation: Setup and take down of all equipment",
      "Member of Staff: 2 or more depending on size of booking",
    ],
    extras: [
      "55” TV for external viewing",
      "Custom branding on all golf marquee sheets",
      "Interactive leaderboard tracking",
      "Competitions and prizes (anything else, let us know)",
    ],
  },
  {
    _id: "package-phoenix-open",
    name: "Phoenix Open",
    shortName: "Weddings",
    slug: "phoenix-open",
    subtitle: "The wedding experience",
    summary:
      "A unique entertainment feature for your big day. Includes a luxury golf simulator setup, wedding-themed challenges, and customised settings to match your venue and style. Time to get all your loved ones on the tee at the same time!",
    startingPrice: 795,
    priceQualifier: "From",
    duration: "Duration starts from 4 hours",
    image: assets.phoenixOpen,
    alt: "Wedding guests using a SwingSmart golf simulator",
    sortOrder: 6,
    includes: [
      "Launch Monitor: 1x Skytrak Plus & Software",
      "Gaming computer: Windows 11 Desktop PC with large monitor",
      "Clubs: 1x Cobra Fly XL 11 Piece Set (Additional sets included if needed, left and right handed)",
      "Projector: 1x short throw with floor mounted case and impact screen",
      "Golf balls: Callaway (Various different models depending on type of hire)",
      "Hitting Mat: 1x 1.5m x 1.5m (Supporting left and right hand swings)",
      "Protective equipment: 1x Launch monitor casing, golf enclosure (4m (L) x 3m (W) x 3m (H))",
      "Installation: Setup and take down of all equipment",
      "Member of Staff: 1 or 2 depending on size of booking",
    ],
    extras: [
      "55” TV for external viewing",
      "Custom branding on all golf marquee sheets",
      "Interactive leaderboard tracking",
      "Competitions and prizes (anything else, let us know)",
    ],
  },
  {
    _id: "package-junior-open",
    name: "Junior Open",
    shortName: "Ages 6–14",
    slug: "junior-open",
    subtitle: "Where it all begins",
    summary:
      "Tailored for young golfers ages 6-14, The Junior Golfer package offers a fun and engaging golf simulator experience. With junior-sized equipment, age-appropriate courses, and interactive challenges, it’s the perfect way for kids to develop their skills while having fun.",
    startingPrice: 395,
    priceQualifier: "From",
    duration: "Duration starts from 4 hours",
    image: assets.juniorOpen,
    alt: "Junior golfer on a SwingSmart simulator",
    sortOrder: 7,
    includes: [
      "Launch Monitor: 1x Skytrak Plus & Software",
      "Games: Over 7 playing modes and games to enjoy!",
      "Clubs: 1x Cobra Fly XL 11 Piece Set (Junior clubs available - please request on booking)",
      "Projector: 1x Optoma short throw with floor mounted case and impact screen",
      "Golf balls: Callaway (Various different models depending on type of hire)",
      "Hitting Mat: 1x 1.5m x 1.5m (Supporting left and right hand swings)",
      "Protective equipment: 1x Launch monitor casing, golf enclosure (4m (L) x 3m (W) x 3m (H))",
      "Installation: Setup and take down of all equipment",
      "Member of Staff: 1 or 2 depending on size of booking",
    ],
  },
  {
    _id: "package-build-your-own",
    name: "Build Your Own",
    shortName: "Dream golf",
    slug: "build-your-own",
    subtitle: "A custom simulator",
    summary:
      "At Swingsmart, we believe that every golfer deserves a personalised, immersive experience. That’s why we offer the opportunity to build your own dream golf simulator setup — a custom solution designed to bring world-class golf to your home, office, or business space.",
    description: [
      block(
        "Whether you're looking to practice your swing in your own private space, create a high-end entertainment setup, or insert a professional-grade simulator for your venue, our team is here to help you design a setup that meets your needs, style, and budget.",
      ),
    ],
    priceQualifier: "Price on application",
    image: assets.buildYourOwn,
    alt: "Custom SwingSmart golf simulator concept",
    sortOrder: 8,
    includes: [
      "That’s completely up to you! (We will be there every step of the way to make sure your dream becomes a reality)!",
    ],
  },
];

const reviews = [
  ["Guys, it was our honour and absolute pleasure to have you there as our summer party entertainment!!", "Ildiko Sealey"],
  ["Thank you again for being part of the night, we loved working with you and hope to do it again very soon. If anyone’s looking to level up their event, these guys are the ones to call!", "Jennifer Jane Law"],
  ["Was a great evening, it really is quite addictive - I kept thinking \"I'll do better next time!\" Great setup you've built, really impressed", "Dan Sealey"],
  ["Great idea for The South West Business Show, the 'stand' created a good athmosphere ... Ideal for business or social events", "Rory Woolridge"],
  ["The guys were really engaging and I thought the whole set up was professional and friendly.", "Emma Smith"],
  ["We really enjoyed using the golf sim at a recent event. The guys who ran it were really engaging and great with the kids. I highly reccomend them and what they can offer.", "Lauren Phipps"],
  ["Chris and Ryan were great. Interacted with everyone really well. I hope they return as it's a fun bit of competition with great prizes", "David Wilkey"],
  ["Super fun simulator that would work for both business and pleasure activities. We had great fun at the TUFC fan zone, enjoying some healthy competition amongst friends and family. Chris and Ryan were very helpful, supportive and just fun to be around. The entire experience was great and would highly recommend to anyone hosting a party or networking event. Great idea to help get conversations flowing.", "Luke Moss"],
  ["Really enjoyed the Golf Sim experience with Ryan & Chris, If your simply looking for ways to improve your game then the simulator is a great way to do this. Also a fantastic opportunity for parties / offices / corporates to take advantage of a fantastic team building session - Ryan & Chris will be at your side for any guidance & support; Highly recommended and looking forward to our next meet up !", "David Spark"],
  ["Great simulator experience for any event, much better than one I trialled elsewhere", "Phil Murphy"],
];

const transaction = client.transaction();

transaction.createOrReplace({
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
  secondaryCta: { _type: "ctaButton", label: "View packages", href: "/packages", style: "secondary" },
  socials: [
    { _type: "socialLink", _key: "instagram", label: "Instagram", url: "https://www.instagram.com/swingsmartuk/" },
    { _type: "socialLink", _key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/swingsmart-uk" },
  ],
  defaultSeo: {
    _type: "seo",
    title: "SwingSmart UK. Beyond Golf. | Experience Golf Convenience - Book Today",
    description:
      "Explore SwingSmart UK for immersive golf simulation experiences, events, and packages. Convenient, flexible golf options for all skill levels and occasions.",
  },
});

transaction.createOrReplace({
  _id: "navigation",
  _type: "navigation",
  items: [
    {
      _type: "navItem",
      _key: "packages",
      label: "Packages",
      href: "/packages",
      children: packageDocs.map((pkg) => ({
        _key: pkg.slug,
        _type: "navItem",
        label: pkg.name,
        href: `/packages/${pkg.slug}`,
      })),
    },
    { _type: "navItem", _key: "gallery", label: "Gallery", href: "/gallery" },
    { _type: "navItem", _key: "partnerships", label: "Partnerships", href: "/partnerships" },
    { _type: "navItem", _key: "charity", label: "Charity", href: "/charity" },
    { _type: "navItem", _key: "faq", label: "FAQs", href: "/faq" },
    { _type: "navItem", _key: "about", label: "About", href: "/about" },
    { _type: "navItem", _key: "contact", label: "Contact", href: "/contact" },
  ],
  ctaLabel: "Plan an event",
  ctaHref: "/contact",
});

for (const pkg of packageDocs) {
  transaction.createOrReplace({
    _id: pkg._id,
    _type: "eventPackage",
    name: pkg.name,
    shortName: pkg.shortName,
    slug: { _type: "slug", current: pkg.slug },
    subtitle: pkg.subtitle,
    summary: pkg.summary,
    description: pkg.description,
    featured: true,
    sortOrder: pkg.sortOrder,
    startingPrice: pkg.startingPrice,
    priceQualifier: pkg.priceQualifier,
    duration: pkg.duration,
    includes: pkg.includes,
    extras: pkg.extras,
    heroImage: imageRef(pkg.image, pkg.alt),
    seo: {
      _type: "seo",
      title: `${pkg.name} | SwingSmart UK`,
      description: pkg.summary,
    },
  });
}

reviews.forEach(([quote, person], index) => {
  transaction.createOrReplace({
    _id: `testimonial-${person.toLowerCase().replace(/[^a-z]+/g, "-")}`,
    _type: "testimonial",
    quote,
    person,
    featured: true,
  });
});

const galleryCats = [
  { _id: "gallery-cat-corporate", title: "Corporate", slug: "corporate", sortOrder: 1 },
  { _id: "gallery-cat-weddings", title: "Weddings", slug: "weddings", sortOrder: 2 },
  { _id: "gallery-cat-hotels", title: "Hotels & Holiday Parks", slug: "hotels-holiday-parks", sortOrder: 3 },
  { _id: "gallery-cat-exhibitions", title: "Exhibitions", slug: "exhibitions", sortOrder: 4 },
  { _id: "gallery-cat-private", title: "Private Events", slug: "private-events", sortOrder: 5 },
  { _id: "gallery-cat-installations", title: "Long-Term Installations", slug: "long-term-installations", sortOrder: 6 },
  { _id: "gallery-cat-golf-events", title: "Golf Events", slug: "golf-events", sortOrder: 7 },
];
for (const cat of galleryCats) {
  transaction.createOrReplace({
    _id: cat._id,
    _type: "galleryCategory",
    title: cat.title,
    slug: { _type: "slug", current: cat.slug },
    sortOrder: cat.sortOrder,
  });
}

const galleryItems = [
  ["gallery-course", "On the course", "SwingSmart on the golf course", assets.galleryCourse, "SwingSmart event photography on the golf course", ["gallery-cat-golf-events"], true],
  ["gallery-bay", "Event bay", "Guests around the bay", assets.galleryBay, "Guests at a SwingSmart golf simulator event", ["gallery-cat-private", "gallery-cat-golf-events"], false],
  ["gallery-enclosure", "Enclosure", "A fully managed enclosure", assets.galleryEnclosure, "SwingSmart simulator enclosure at an event", ["gallery-cat-installations", "gallery-cat-golf-events"], false],
  ["gallery-tee", "Tee time", "Players on the tee", assets.galleryTee, "Players teeing off on a SwingSmart bay", ["gallery-cat-golf-events", "gallery-cat-private"], true],
  ["gallery-evening", "Evening hire", "Evening corporate hire", assets.galleryEvening, "Evening SwingSmart golf event", ["gallery-cat-corporate", "gallery-cat-private"], false],
  ["gallery-summer", "Summer event", "Summer gathering", assets.gallerySummer, "Summer event with a SwingSmart golf simulator", ["gallery-cat-private", "gallery-cat-golf-events"], false],
  ["gallery-crowd", "Outdoor crowd", "A crowd around an outdoor bay", assets.galleryCrowd, "Crowd around a SwingSmart outdoor bay", ["gallery-cat-corporate", "gallery-cat-exhibitions"], false],
  ["gallery-hero-49", "On-course bay", "Simulator on the course", assets.galleryHero49, "SwingSmart golf simulator on a course during an event", ["gallery-cat-golf-events"], true],
  ["gallery-hero-52", "Outdoor gathering", "Guests at an outdoor setup", assets.galleryHero52, "Guests gathered around a SwingSmart outdoor bay", ["gallery-cat-golf-events", "gallery-cat-private"], false],
  ["gallery-hero-02", "Course setup", "Bay on the fairway", assets.galleryHero02, "SwingSmart simulator setup on the golf course", ["gallery-cat-golf-events"], false],
  ["gallery-country-club-2", "Classic hire", "A longer-term venue setup", assets.galleryCountryClub2, "Country Club golf simulator at a venue", ["gallery-cat-installations", "gallery-cat-hotels"], false],
  ["gallery-wedding", "Wedding bay", "Wedding guests on the simulator", assets.phoenixOpen, "Wedding guests using a SwingSmart golf simulator", ["gallery-cat-weddings", "gallery-cat-private"], false],
];
for (const [id, title, caption, assetId, alt, catIds, featured] of galleryItems) {
  transaction.createOrReplace({
    _id: id,
    _type: "galleryItem",
    title,
    caption,
    featured,
    alt,
    categories: catIds.map((catId) => ({ _type: "reference", _ref: catId, _key: catId })),
    image: imageRef(assetId, alt),
  });
}

const partners = [
  {
    _id: "partner-wellington",
    name: "Wellington School",
    summary: "Official supplier — heritage, excellence and an all-weather game for pupils.",
    website: "https://www.wellington-school.org.uk",
    featured: true,
    sortOrder: 1,
  },
  {
    _id: "partner-newton-abbot",
    name: "Newton Abbot Races",
    summary: "Family Day partner — a simulator on site for visitors of every age.",
    website: "https://www.newtonabbotracing.com",
    featured: false,
    sortOrder: 2,
  },
  {
    _id: "partner-graphic-mill",
    name: "Graphic Mill",
    summary: "Exhibition partners — high-impact stands with a full-scale SwingSmart bay.",
    website: "https://www.graphicmill.co.uk",
    featured: true,
    sortOrder: 3,
  },
  {
    _id: "partner-sauermann",
    name: "Sauermann UK",
    summary: "InstallerSHOW at the NEC — an interactive stand that gets the conversation started.",
    featured: true,
    sortOrder: 4,
  },
];
for (const partner of partners) {
  transaction.createOrReplace({
    _id: partner._id,
    _type: "partner",
    name: partner.name,
    summary: partner.summary,
    website: partner.website,
    featured: partner.featured,
    sortOrder: partner.sortOrder,
  });
}

transaction.createOrReplace({
  _id: "page-about",
  _type: "page",
  title: "About",
  slug: { _type: "slug", current: "about" },
  seo: {
    _type: "seo",
    title: "Who Are We? | Experience Golf Today - Book Your Game — SwingSmart UK. Beyond Golf.",
    description:
      "Discover golf experiences for all skill levels with SwingSmart UK. We bring the course to you, rain or shine, for memorable, inclusive golf events.",
  },
  sections: [
    {
      _type: "hero",
      _key: "ab-hero",
      eyebrow: "Who we are",
      heading: "The brains behind the bays",
      subheading: "SwingSmart’s founding duo.",
      overlay: "medium",
      image: imageRef(assets.about, "Chris and Ryan, SwingSmart’s founding duo, at a golf simulator bay"),
    },
    {
      _type: "richText",
      _key: "ab-copy",
      body: [
        block("Hey, Chris and Ryan here!"),
        block(
          "We had a simple idea: tee up and make golf a game for everyone! We saw how the sport could feel a bit out of bounds—especially in the UK, where rain checks are more common than birdies - we would know we are based in Cornwall! But with our love for the game (even though we are not great - we try) and a dream bigger than a 350-yard drive, we decided to change it.",
        ),
        block(
          "Why should the pros have all the fun? We want everyone to have the chance of feeling that buzz of a perfect drive, the joy of a cheeky chip-in, and the laughs shared over a round— no dodgy weather, no pressure. Just good times, great swings, and golf for all.",
        ),
        block("So… clubs in hand, we bring the course to you. Rain or shine. Beginner or seasoned slicer. Game on."),
      ],
    },
    {
      _type: "textAndImage",
      _key: "ab-mission",
      heading: "Beyond golf",
      imagePosition: "right",
      image: imageRef(assets.mission, "SwingSmart Beyond Golf artwork"),
      body: [
        block("At SwingsmartUK, we make golf accessible to anyone, no matter your experience, location, or skill."),
        block(
          "Whether you are looking to play the postage stamp at Royal Troon, or hold a Long Drive contest with your friends, we bring everything you need, and you don’t have to worry about anything!",
        ),
        block(
          "Our cutting-edge realism creates a fun, inclusive experience, perfect for pros, beginners, and casual players alike. Special occasions, team building or just a friendly competition, we bring the ultimate golf experience to you — anytime, anywhere.",
        ),
        block("Our mission is simple: bring golf to everyone!"),
      ],
    },
    {
      _type: "cta",
      _key: "ab-cta",
      heading: "Ready to grip it and rip it?",
      button: { _type: "ctaButton", label: "Book your game", href: "/contact", style: "primary" },
    },
  ],
});

transaction.createOrReplace({
  _id: "page-contact",
  _type: "page",
  title: "Contact",
  slug: { _type: "slug", current: "contact" },
  seo: {
    _type: "seo",
    title: "Contact | Get in Touch Today — SwingSmart UK. Beyond Golf.",
    description:
      "Contact SwingSmart UK for inquiries, bookings, or more information about our golf events and services. Reach out today to start your golf experience.",
  },
  sections: [
    {
      _type: "hero",
      _key: "ct-hero",
      heading: "Contact Us",
      subheading: "Ready to team up? Jot down your details and we’ll chat soon. Can’t wait to catch up!",
      overlay: "medium",
      image: imageRef(assets.offer, "Guests using a SwingSmart golf simulator at an outdoor event"),
    },
    {
      _type: "contactBlock",
      _key: "ct-form",
      heading: "Send an enquiry",
      showForm: true,
      showDetails: true,
    },
  ],
});

transaction.createOrReplace({
  _id: "page-charity",
  _type: "page",
  title: "Charity Days",
  slug: { _type: "slug", current: "charity" },
  seo: {
    _type: "seo",
    title: "Charity Days — SwingSmart UK. Beyond Golf.",
    description:
      "SwingSmart Charity Day options help organisations raise funds and create memorable golf simulation experiences.",
  },
  sections: [
    {
      _type: "hero",
      _key: "ch-hero",
      eyebrow: "We are Beyond Golf",
      heading: "Golf for a Cause — Make Every Swing Count",
      overlay: "medium",
      image: imageRef(assets.charity, "SwingSmart charity day artwork"),
      primaryCta: { _type: "ctaButton", label: "Get in touch", href: "/contact", style: "primary" },
    },
    {
      _type: "richText",
      _key: "ch-copy",
      body: [
        block(
          "At Swingsmart, we believe golf is more than a game—it’s a powerful way to bring people together and make a difference. Our Charity Day options are designed to help organisations raise funds, increase awareness, and create memorable experiences through the immersive world of golf simulation.",
        ),
        block(
          "Whether you're planning a charity golf day, gala fundraiser, or corporate giving initiative, our flexible simulator setups can be tailored to suit your event's goals.",
        ),
        block("Let’s bring golf to everyone!"),
      ],
    },
  ],
});

transaction.createOrReplace({
  _id: "page-faq",
  _type: "page",
  title: "FAQs",
  slug: { _type: "slug", current: "faq" },
  seo: {
    _type: "seo",
    title: "FAQ’s — SwingSmart UK. Beyond Golf.",
    description:
      "Space, setup times, waterproof enclosures, branding, payment terms and cancellation policy for SwingSmart golf simulator hire.",
  },
  sections: [
    {
      _type: "hero",
      _key: "faq-hero",
      heading: "FAQ’s",
      subheading: "Anything else? Get in touch and we will answer your questions!",
      overlay: "medium",
      image: imageRef(assets.packagesIndex, "SwingSmart outdoor golf simulator on the course"),
    },
    { _type: "faq", _key: "faq-list", heading: "FAQ’s", items: faqs },
  ],
});

transaction.createOrReplace({
  _id: "page-gallery",
  _type: "page",
  title: "Gallery",
  slug: { _type: "slug", current: "gallery" },
  seo: {
    _type: "seo",
    title: "Gallery & Reviews — SwingSmart UK. Beyond Golf.",
    description: "Event photography from SwingSmart golf simulator hires, weddings, corporates and clubs.",
  },
  sections: [
    {
      _type: "hero",
      _key: "gal-hero",
      eyebrow: "The course, wherever you are",
      heading: "Gallery",
      subheading:
        "Here’s what our customers say about us with some cool pics we’ve taken along the way. Please note, everyone in these photos are happy to be in them and no golf balls were lost in the making (maybe 1 or 2)…",
      overlay: "medium",
      image: imageRef(assets.galleryBay, "Guests at a SwingSmart golf simulator event"),
    },
    {
      _type: "gallery",
      _key: "gal-grid",
      heading: "Photographs",
      intro: "Filter by category, or open a picture to view it larger.",
      showFilters: true,
    },
    { _type: "testimonials", _key: "gal-quotes", heading: "Reviews" },
  ],
});

transaction.createOrReplace({
  _id: "page-partnerships",
  _type: "page",
  title: "Partnerships",
  slug: { _type: "slug", current: "partnerships" },
  seo: {
    _type: "seo",
    title: "Partnerships | SwingSmart UK",
    description:
      "Partner with SwingSmart for schools, venues, exhibitions and events. Fully managed golf simulation.",
  },
  sections: [
    {
      _type: "hero",
      _key: "pt-hero",
      eyebrow: "Work with us",
      heading: "Partnerships",
      subheading:
        "Activate unused space, draw a crowd to a stand, or give members an all-weather game. We bring the bay.",
      overlay: "medium",
      image: imageRef(assets.ryderCup, "Corporate guests around a SwingSmart bay"),
      primaryCta: { _type: "ctaButton", label: "Start a conversation", href: "/contact", style: "primary" },
    },
    {
      _type: "richText",
      _key: "pt-intro",
      heading: "A new revenue stream, without a permanent install",
      body: [
        block("Got under-used space? Inside or outside, we can use it. Rent doesn’t reduce in winter — an empty room still costs money."),
        block(
          "We provide a fully managed, semi-permanent golf simulator with minimal upfront investment: a new attraction, a new revenue stream, and no structural risk to the venue.",
        ),
      ],
    },
    {
      _type: "partnerGrid",
      _key: "pt-featured",
      heading: "Featured partners",
      intro: "A few of the organisations already teeing it up with SwingSmart.",
      layout: "featured",
      featuredOnly: true,
      showDescriptions: true,
    },
    {
      _type: "partnerGrid",
      _key: "pt-logos",
      heading: "Who we’ve teed up with",
      intro: "Logos and names are added in the Studio. Click through to their sites.",
      layout: "logos",
      showDescriptions: false,
    },
    {
      _type: "cta",
      _key: "pt-cta",
      eyebrow: "Partner with us",
      heading: "Want to partner with SwingSmart?",
      text: "Schools, venues, hotels, exhibitions and clubs — if you have the space, we’ll bring the course. Chris and Ryan are ready to talk.",
      button: { _type: "ctaButton", label: "Become a partner", href: "/contact", style: "primary" },
    },
  ],
});

const home = await client.fetch(`*[_type == "page" && slug.current == "home"][0]{_id, sections}`);
if (home?._id) {
  const sections = (home.sections || []).map((section) => {
    if (section._type !== "hero") return section;
    return {
      ...section,
      eyebrow: "Beyond Golf",
      heading: "We bring the course to you",
      subheading:
        "Experience golf simulation like never before. Set the tee time and we’ll be there. Tee off any time. Seriously. We don’t even close for rain. Or Mondays…",
      overlay: section.overlay || "medium",
    };
  });
  transaction.patch(home._id).set({
    sections,
    seo: {
      _type: "seo",
      title: "SwingSmart UK. Beyond Golf. | Experience Golf Convenience - Book Today",
      description:
        "Explore SwingSmart UK for immersive golf simulation experiences, events, and packages. Convenient, flexible golf options for all skill levels and occasions.",
    },
  });
  if (!home._id.startsWith("drafts.")) {
    const draftId = `drafts.${home._id}`;
    const draft = await client.getDocument(draftId);
    if (draft) {
      const draftSections = (draft.sections || []).map((section) => {
        if (section._type !== "hero") return section;
        return {
          ...section,
          eyebrow: "Beyond Golf",
          heading: "We bring the course to you",
          subheading:
            "Experience golf simulation like never before. Set the tee time and we’ll be there. Tee off any time. Seriously. We don’t even close for rain. Or Mondays…",
        };
      });
      transaction.patch(draftId).set({ sections: draftSections });
    }
  }
}

await transaction.commit();
console.log("Sanity migration committed.");
console.log("email set to hello@swingsmart.co.uk");
console.log("packages", packageDocs.length);
console.log("testimonials", reviews.length);
console.log("images uploaded", Object.values(assets).filter(Boolean).length);
