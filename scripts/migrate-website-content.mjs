/**
 * Copy the current website (fallback) content into Sanity project 3sbwydux,
 * dataset production.
 *
 * Default is a dry-run. Nothing is written until you pass --write and set
 * SANITY_AUTH_TOKEN (Editor, create). Existing documents are never
 * overwritten or deleted. Missing documents are created with createIfNotExists.
 *
 * If Home or Site Settings already exist, a draft of the full website copy is
 * prepared instead. Publishing that draft is a manual step in Studio.
 *
 *   npm run migrate:content
 *   npm run migrate:content -- --write
 */
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";

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

const WRITE = process.argv.includes("--write");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3sbwydux";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

const apiBase = `https://${projectId}.api.sanity.io/v${apiVersion}`;

async function sanityQuery(query) {
  const url = `${apiBase}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Sanity query failed (${response.status}): ${await response.text()}`);
  }
  const payload = await response.json();
  return payload.result;
}

async function sanityMutate(mutations) {
  const response = await fetch(`${apiBase}/data/mutate/${dataset}?returnIds=true`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mutations }),
  });
  if (!response.ok) {
    throw new Error(`Sanity mutate failed (${response.status}): ${await response.text()}`);
  }
  return response.json();
}

function contentTypeFor(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "application/octet-stream";
}

async function uploadImage(filePath) {
  const abs = resolve(process.cwd(), filePath);
  const filename = basename(abs);
  const url = `${apiBase}/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentTypeFor(abs),
    },
    body: createReadStream(abs),
    duplex: "half",
  });
  if (!response.ok) {
    throw new Error(`Image upload failed for ${filename} (${response.status}): ${await response.text()}`);
  }
  const payload = await response.json();
  return payload.document._id;
}

function block(text, style = "normal", key) {
  const k = key || text.slice(0, 24).replace(/\s+/g, "-").toLowerCase() || "block";
  return {
    _type: "block",
    _key: k,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${k}-s`, text, marks: [] }],
  };
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parsePrice(label) {
  if (!label) return {};
  const match = label.match(/£([\d,]+)/);
  if (match) {
    return {
      startingPrice: Number(match[1].replace(/,/g, "")),
      priceQualifier: /^from\b/i.test(label) ? "From" : "From",
    };
  }
  return { priceQualifier: label };
}

function button(label, href, style = "primary") {
  return { _type: "ctaButton", label, href, style };
}

function seo(title, description) {
  return { _type: "seo", title, description };
}

function slug(current) {
  return { _type: "slug", current };
}

const IMAGES = {
  homeHero: {
    file: "public/brand/hero.jpg",
    alt: "Guests celebrating around a SwingSmart golf cart on the course",
    hotspot: { x: 0.5, y: 0.44 },
  },
  about: {
    file: "public/migrated/about.webp",
    alt: "Chris and Ryan, SwingSmart’s founding duo, at a golf simulator bay",
  },
  offer: {
    file: "public/migrated/what-we-offer.webp",
    alt: "Guests using a SwingSmart golf simulator at an outdoor event",
  },
  mission: {
    file: "public/migrated/beyond-golf.webp",
    alt: "SwingSmart Beyond Golf artwork",
  },
  charity: {
    file: "public/migrated/charity.webp",
    alt: "SwingSmart charity day artwork",
  },
  packagesIndex: {
    file: "public/migrated/packages/index.webp",
    alt: "SwingSmart outdoor golf simulator on the course",
  },
  golfer: {
    file: "public/migrated/packages/golfer.webp",
    alt: "Golfer using a SwingSmart simulator",
  },
  countryClub: {
    file: "public/migrated/packages/country-club.webp",
    alt: "Country Club package golf simulator setup",
  },
  ryderCup: {
    file: "public/migrated/packages/ryder-cup.jpg",
    alt: "Corporate guests around a SwingSmart bay",
  },
  championship: {
    file: "public/migrated/packages/championship.webp",
    alt: "Long-term SwingSmart simulator hire in a venue",
  },
  stAndrews: {
    file: "public/migrated/packages/st-andrews.webp",
    alt: "Two-bay SwingSmart competition setup",
  },
  phoenixOpen: {
    file: "public/migrated/packages/phoenix-open.webp",
    alt: "Wedding guests using a SwingSmart golf simulator",
  },
  juniorOpen: {
    file: "public/migrated/packages/junior-open.webp",
    alt: "Junior golfer on a SwingSmart simulator",
  },
  buildYourOwn: {
    file: "public/migrated/packages/build-your-own.webp",
    alt: "Custom SwingSmart golf simulator concept",
  },
  galleryCourse: {
    file: "public/migrated/gallery/course-35.webp",
    alt: "SwingSmart event photography on the golf course",
  },
  galleryBay: {
    file: "public/migrated/gallery/event-bay.webp",
    alt: "Guests at a SwingSmart golf simulator event",
  },
  galleryEnclosure: {
    file: "public/migrated/gallery/enclosure.webp",
    alt: "SwingSmart simulator enclosure at an event",
  },
  galleryTee: {
    file: "public/migrated/gallery/tee.webp",
    alt: "Players teeing off on a SwingSmart bay",
  },
  galleryEvening: {
    file: "public/migrated/gallery/evening.webp",
    alt: "Evening SwingSmart golf event",
  },
  gallerySummer: {
    file: "public/migrated/gallery/summer.webp",
    alt: "Summer event with a SwingSmart golf simulator",
  },
  galleryCrowd: {
    file: "public/migrated/gallery/crowd.webp",
    alt: "Crowd around a SwingSmart outdoor bay",
  },
  galleryHero49: {
    file: "public/migrated/gallery/hero-49.webp",
    alt: "SwingSmart golf simulator on a course during an event",
  },
  galleryHero52: {
    file: "public/migrated/gallery/hero-52.webp",
    alt: "Guests gathered around a SwingSmart outdoor bay",
  },
  galleryHero02: {
    file: "public/migrated/gallery/hero-02.webp",
    alt: "SwingSmart simulator setup on the golf course",
  },
  galleryCountryClub2: {
    file: "public/migrated/gallery/country-club-2.webp",
    alt: "Country Club golf simulator at a venue",
  },
};

const FAQS = [
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

const PACKAGES = [
  {
    id: "package-golfer",
    name: "The Golfer",
    shortName: "Individual",
    slug: "golfer",
    subtitle: "Individual package",
    imageKey: "golfer",
    sortOrder: 1,
    priceLabel: "From £395",
    duration: "Minimum duration 4 hours",
    summary:
      "Perfect for solo players or small groups, this package lets you enjoy a top-tier golf experience on your terms. Whether you want to fine-tune your swing, play a round on world-famous courses from the comfort of your home, or host a private golf night, our high-quality simulator setup delivers a seamless and immersive game.",
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
    id: "package-country-club",
    name: "Country Club",
    shortName: "Classic",
    slug: "country-club",
    subtitle: "Our classic package",
    imageKey: "countryClub",
    sortOrder: 2,
    priceLabel: "From £595",
    duration: "Minimum duration 4 hours",
    summary:
      "Ideal for casual events and intimate gatherings, this experience transports you to a variety of world-class golf courses, providing an immersive and enjoyable environment for all skill levels. Whether you're hosting a small get-together or simply looking to add something unique to your event, it promises an engaging and memorable experience for everyone involved.",
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
    id: "package-ryder-cup",
    name: "The Ryder Cup",
    shortName: "Corporate",
    slug: "ryder-cup",
    subtitle: "Corporate package",
    imageKey: "ryderCup",
    sortOrder: 3,
    priceLabel: "From £695",
    duration: "Minimum duration 4 hours",
    summary:
      "Perfect for businesses looking to make a lasting impression, this golf experience offers an engaging and interactive way to connect with clients or strengthen team dynamics. Whether you're aiming to drive engagement or build rapport off the course, our flexible setup—complete with multiple simulators and custom-branded features—sets the stage for a hole-in-one event. Ideal for corporate functions, team-building days, or client entertainment, it delivers a memorable atmosphere with all the feel of a top-tier clubhouse.",
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
    id: "package-championship",
    name: "The Championship",
    shortName: "Short / long term",
    slug: "championship",
    subtitle: "Short and long-term hire",
    imageKey: "championship",
    sortOrder: 4,
    priceLabel: "POA",
    duration: "Minimum duration 1 week",
    summary:
      "Perfect for golf clubs, venues, businesses, and private users looking to elevate their space with an immersive golf experience. Our long-term simulator rental offers a flexible and cost-effective solution for those who want to enjoy world-class virtual golf without the need for a permanent installation or large upfront investment. Whether you’re enhancing a hospitality venue, creating a unique staff amenity, or upgrading your personal entertainment space, this extended hire option delivers lasting engagement, entertainment, and year-round enjoyment.",
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
    id: "package-st-andrews",
    name: "St Andrews",
    shortName: "The Ultimate",
    slug: "st-andrews",
    subtitle: "The ultimate competition package",
    imageKey: "stAndrews",
    sortOrder: 5,
    priceLabel: "From £1,195",
    duration: "Minimum duration 4 hours",
    summary:
      "Built for those who thrive under pressure and love the thrill of competition, this package delivers a true tournament-style experience. Featuring advanced shot tracking, leaderboard integration, and fully customisable game formats, it brings out the competitive spirit in every player. Whether it’s match play, closest to the pin, or a full-blown virtual tournament, this setup turns any event into a high-stakes, high-energy golf showdown.",
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
    id: "package-phoenix-open",
    name: "Phoenix Open",
    shortName: "Weddings",
    slug: "phoenix-open",
    subtitle: "The wedding experience",
    imageKey: "phoenixOpen",
    sortOrder: 6,
    priceLabel: "From £795",
    duration: "Duration starts from 4 hours",
    summary:
      "A unique entertainment feature for your big day. Includes a luxury golf simulator setup, wedding-themed challenges, and customised settings to match your venue and style. Time to get all your loved ones on the tee at the same time!",
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
    id: "package-junior-open",
    name: "Junior Open",
    shortName: "Ages 6–14",
    slug: "junior-open",
    subtitle: "Where it all begins",
    imageKey: "juniorOpen",
    sortOrder: 7,
    priceLabel: "From £395",
    duration: "Duration starts from 4 hours",
    summary:
      "Tailored for young golfers ages 6-14, The Junior Golfer package offers a fun and engaging golf simulator experience. With junior-sized equipment, age-appropriate courses, and interactive challenges, it’s the perfect way for kids to develop their skills while having fun.",
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
    id: "package-build-your-own",
    name: "Build Your Own",
    shortName: "Dream golf",
    slug: "build-your-own",
    subtitle: "A custom simulator",
    imageKey: "buildYourOwn",
    sortOrder: 8,
    priceLabel: "Price on application",
    summary:
      "At Swingsmart, we believe that every golfer deserves a personalised, immersive experience. That’s why we offer the opportunity to build your own dream golf simulator setup — a custom solution designed to bring world-class golf to your home, office, or business space.",
    description: [
      block(
        "Whether you're looking to practice your swing in your own private space, create a high-end entertainment setup, or insert a professional-grade simulator for your venue, our team is here to help you design a setup that meets your needs, style, and budget.",
        "normal",
        "byo-desc",
      ),
    ],
    includes: [
      "That’s completely up to you! (We will be there every step of the way to make sure your dream becomes a reality)!",
    ],
  },
];

const GALLERY_CATEGORIES = [
  { id: "gallery-category-events", title: "Events", slug: "events" },
  { id: "gallery-category-weddings", title: "Weddings", slug: "weddings" },
  { id: "gallery-category-corporate", title: "Corporate", slug: "corporate" },
  { id: "gallery-category-clubs", title: "Clubs", slug: "clubs" },
];

const GALLERY_ITEMS = [
  { title: "On the course", imageKey: "galleryCourse", categories: ["events"], featured: true },
  { title: "Event bay", imageKey: "galleryBay", categories: ["events"] },
  { title: "Enclosure", imageKey: "galleryEnclosure", categories: ["clubs"] },
  { title: "Tee time", imageKey: "galleryTee", categories: ["events"], featured: true },
  { title: "Evening hire", imageKey: "galleryEvening", categories: ["events", "corporate"] },
  { title: "Summer event", imageKey: "gallerySummer", categories: ["events"] },
  { title: "Outdoor crowd", imageKey: "galleryCrowd", categories: ["corporate"] },
  { title: "On-course bay", imageKey: "galleryHero49", categories: ["events"], featured: true },
  { title: "Outdoor gathering", imageKey: "galleryHero52", categories: ["events"] },
  { title: "Course setup", imageKey: "galleryHero02", categories: ["events"] },
  { title: "Classic hire", imageKey: "galleryCountryClub2", categories: ["clubs"] },
  { title: "Wedding bay", imageKey: "phoenixOpen", categories: ["weddings"] },
];

const PARTNERS = [
  {
    id: "partner-wellington-school",
    name: "Wellington School",
    summary: "Official supplier — heritage, excellence and an all-weather game for pupils.",
    website: "https://www.wellington-school.org.uk",
    sortOrder: 1,
    featured: true,
  },
  {
    id: "partner-newton-abbot-races",
    name: "Newton Abbot Races",
    summary: "Family Day partner — a simulator on site for visitors of every age.",
    website: "https://www.newtonabbotracing.com",
    sortOrder: 2,
    featured: true,
  },
  {
    id: "partner-graphic-mill",
    name: "Graphic Mill",
    summary: "Exhibition partners — high-impact stands with a full-scale SwingSmart bay.",
    website: "https://www.graphicmill.co.uk",
    sortOrder: 3,
    featured: true,
  },
  {
    id: "partner-sauermann-uk",
    name: "Sauermann UK",
    summary: "InstallerSHOW at the NEC — an interactive stand that gets the conversation started.",
    sortOrder: 4,
    featured: true,
  },
];

const TESTIMONIALS = [
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

function imagePlaceholder(imageKey) {
  return { _migrateImage: imageKey };
}

function collectImageKeys(value, bag = new Set()) {
  if (!value || typeof value !== "object") return bag;
  if (value._migrateImage) {
    bag.add(value._migrateImage);
    return bag;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectImageKeys(item, bag);
    return bag;
  }
  for (const item of Object.values(value)) collectImageKeys(item, bag);
  return bag;
}

function replaceImages(value, assets) {
  if (!value || typeof value !== "object") return value;
  if (value._migrateImage) {
    const assetId = assets[value._migrateImage];
    const meta = IMAGES[value._migrateImage];
    if (!assetId || !meta) return undefined;
    return {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
      alt: meta.alt,
      ...(meta.hotspot ? { hotspot: { _type: "sanity.imageHotspot", ...meta.hotspot } } : {}),
    };
  }
  if (Array.isArray(value)) {
    return value.map((item) => replaceImages(item, assets)).filter((item) => item !== undefined);
  }
  const next = {};
  for (const [key, item] of Object.entries(value)) {
    const resolved = replaceImages(item, assets);
    if (resolved !== undefined) next[key] = resolved;
  }
  return next;
}

function siteSettingsDoc() {
  return {
    _id: "siteSettings",
    _type: "siteSettings",
    businessName: "SwingSmart UK",
    tagline: "Beyond Golf.",
    footerText:
      "Mobile golf simulation for homes, venues, weddings, clubs and events. Based in Cornwall, available across the UK.",
    email: "hello@swingsmart.co.uk",
    phones: ["+44 (0) 7453 312 916", "+44 (0) 7805 019 849"],
    address: "Cornwall, United Kingdom",
    primaryCta: button("Plan an event", "/contact"),
    secondaryCta: button("View packages", "/packages", "secondary"),
    socials: [
      {
        _type: "socialLink",
        _key: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/swingsmartuk/",
      },
      {
        _type: "socialLink",
        _key: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/swingsmart-uk",
      },
    ],
    defaultSeo: seo(
      "SwingSmart UK. Beyond Golf. | Experience Golf Convenience - Book Today",
      "Explore SwingSmart UK for immersive golf simulation experiences, events, and packages. Convenient, flexible golf options for all skill levels and occasions.",
    ),
  };
}

function navigationDoc() {
  return {
    _id: "navigation",
    _type: "navigation",
    items: [
      {
        _type: "navItem",
        _key: "packages",
        label: "Packages",
        href: "/packages",
        children: PACKAGES.map((pkg) => ({
          _key: pkg.slug,
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
  };
}

function pages() {
  return [
    {
      _id: "page-home",
      _type: "page",
      title: "Home",
      slug: slug("home"),
      seo: seo(
        "SwingSmart UK. Beyond Golf. | Experience Golf Convenience - Book Today",
        "Explore SwingSmart UK for immersive golf simulation experiences, events, and packages. Convenient, flexible golf options for all skill levels and occasions.",
      ),
      sections: [
        {
          _type: "hero",
          _key: "home-hero",
          eyebrow: "Beyond Golf",
          heading: "We bring the course to you",
          subheading:
            "Experience golf simulation like never before. Set the tee time and we’ll be there. Tee off any time. Seriously. We don’t even close for rain. Or Mondays…",
          image: imagePlaceholder("homeHero"),
          overlay: "medium",
          primaryCta: button("Plan an event", "/contact"),
          secondaryCta: button("View packages", "/packages", "secondary"),
        },
        {
          _type: "packageGrid",
          _key: "home-packages",
          heading: "Packages",
          intro:
            "From a private four-hour session to a full tournament bay. Choose a starting point — or build your own.",
        },
        {
          _type: "featureGrid",
          _key: "home-offer",
          heading: "What we offer",
          items: [
            {
              _key: "f1",
              title: "Corporate Events",
              text: "Elevate your next corporate gathering with a premium golf simulation experience. Whether you're hosting a team-building event, entertaining clients, or organising a company retreat, our state-of-the-art golf simulators provide a fun and engaging way to connect, compete, and create lasting memories.",
            },
            {
              _key: "f2",
              title: "Weddings",
              text: "Make your special day even more memorable by adding a unique and interactive golf experience. Whether for the bride and groom, wedding party, or guests, our golf simulators offer an exciting entertainment option that keeps everyone engaged while adding a touch of elegance and fun to your celebration. When are you going to have a tee time with all of your friends and family on the same day!",
            },
            {
              _key: "f3",
              title: "Golf Clubs",
              text: "Enhance your golf club’s offerings with cutting-edge simulation technology. Whether you’re looking to provide members with an all-weather practise option, host virtual tournaments, or attract new players, our simulators bring a new level of excitement and versatility to your venue.",
            },
            {
              _key: "f4",
              title: "Short/Long Term Rental",
              text: "Looking for an extended golf simulation setup? Our flexible long-term rental options are perfect for businesses, clubs, or individuals who want to enjoy the thrill of golf over an extended period. Whether for ongoing training, seasonal events, or private entertainment, we provide hassle-free solutions tailored to your needs.",
            },
            {
              _key: "f5",
              title: "Competitions (All Weather)",
              text: "Never let the weather dictate your game again! Our advanced golf simulators allow you to host exciting competitions and tournaments year-round, no matter the conditions outside. From friendly matches to high-stakes challenges, players of all skill levels can compete on world-class courses without worrying about rain, wind, or extreme temperatures.",
            },
            {
              _key: "f6",
              title: "Individual Hire",
              text: "Whether you're looking to practise your swing, enjoy a round of golf from the comfort of your home, or host a private golf night, this package is perfect for solo players or small groups. Includes a high-quality simulator setup, a variety of world-famous courses, and customisable gameplay settings.",
            },
            {
              _key: "f7",
              title: "Junior Hire",
              text: "Is project Tiger well and truly in place? Can you hear the crowds of Augusta chanting the name of your mini McIlroy? Unlock the world of golf right from the outset with our Junior Golfer package! Designed for junior players looking to practise or show off their swing to friends and family whatever the weather! This package includes everything needed to create an immersive and fun virtual golfing experience. Perfect for ages 6-14, the package combines a user-friendly simulator with junior-sized clubs (regular also included), a comfortable setup, and engaging features that make the experience top class for all!",
            },
            {
              _key: "f8",
              title: "Sports Bar/Pub Competition",
              text: "We really are bringing golf to anyone, anywhere! If you think your locals need a change from the traditional pool, darts or GK Quiz, let us know! Or are you a local that’s want to bring golf to your boozer, let us know!",
            },
          ],
        },
        {
          _type: "textAndImage",
          _key: "home-mission",
          heading: "Beyond golf",
          imagePosition: "right",
          image: imagePlaceholder("offer"),
          body: [
            block(
              "At SwingsmartUK, we make golf accessible to anyone, no matter your experience, location, or skill.",
              "normal",
              "home-m1",
            ),
            block(
              "Whether you are looking to play the postage stamp at Royal Troon, or hold a Long Drive contest with your friends, we bring everything you need, and you don’t have to worry about anything!",
              "normal",
              "home-m2",
            ),
            block("Our mission is simple: bring golf to everyone.", "normal", "home-m3"),
          ],
        },
        {
          _type: "statistics",
          _key: "home-stats",
          heading: "Built around the booking",
          items: [
            {
              _key: "s1",
              value: "4 hours",
              label: "Typical minimum hire — long enough for a proper round of laughs.",
            },
            {
              _key: "s2",
              value: "4m × 3m × 3m",
              label: "The bay most packages need. Tell us if the room is tighter.",
            },
            {
              _key: "s3",
              value: "UK-wide",
              label: "Based in Cornwall. We turn up wherever the event is.",
            },
          ],
        },
        {
          _type: "testimonials",
          _key: "home-quotes",
          heading: "Here’s what our customers say",
          limit: 3,
        },
        {
          _type: "partnerGrid",
          _key: "home-partners",
          heading: "Partners",
          intro: "Schools, racecourses, exhibitors and venues who have teed it up with us.",
        },
        {
          _type: "cta",
          _key: "home-cta",
          heading: "Tell us the date and the room",
          text: "We’ll recommend a package and arrive with everything you need.",
          button: button("Get in touch", "/contact"),
        },
      ],
    },
    {
      _id: "page-packages",
      _type: "page",
      title: "Packages",
      slug: slug("packages"),
      seo: seo(
        "Packages | SwingSmart UK",
        "Golf simulator hire packages for individuals, corporates, weddings, juniors, clubs and custom builds.",
      ),
      sections: [
        {
          _type: "hero",
          _key: "pkg-hero",
          eyebrow: "Hire",
          heading: "Our packages",
          subheading:
            "Every package includes professional equipment, installation, and a setup built around your event.",
          image: imagePlaceholder("packagesIndex"),
          overlay: "medium",
          primaryCta: button("Talk to us", "/contact"),
        },
        { _type: "packageGrid", _key: "pkg-grid", heading: "Choose your round" },
        { _type: "faq", _key: "pkg-faq", heading: "The usual questions", items: FAQS },
      ],
    },
    {
      _id: "page-gallery",
      _type: "page",
      title: "Gallery",
      slug: slug("gallery"),
      seo: seo(
        "Gallery & Reviews — SwingSmart UK. Beyond Golf.",
        "Event photography from SwingSmart golf simulator hires, weddings, corporates and clubs.",
      ),
      sections: [
        {
          _type: "hero",
          _key: "gal-hero",
          eyebrow: "The course, wherever you are",
          heading: "Gallery",
          subheading:
            "Here’s what our customers say about us with some cool pics we’ve taken along the way. Please note, everyone in these photos are happy to be in them and no golf balls were lost in the making (maybe 1 or 2)…",
          image: imagePlaceholder("galleryBay"),
          overlay: "medium",
        },
        { _type: "gallery", _key: "gal-grid", heading: "Recent setups" },
        { _type: "testimonials", _key: "gal-quotes", heading: "Reviews" },
      ],
    },
    {
      _id: "page-partnerships",
      _type: "page",
      title: "Partnerships",
      slug: slug("partnerships"),
      seo: seo(
        "Partnerships | SwingSmart UK",
        "Partner with SwingSmart for schools, venues, exhibitions and events. Fully managed golf simulation.",
      ),
      sections: [
        {
          _type: "hero",
          _key: "pt-hero",
          eyebrow: "Work with us",
          heading: "Partnerships",
          subheading:
            "Activate unused space, draw a crowd to a stand, or give members an all-weather game. We bring the bay.",
          image: imagePlaceholder("ryderCup"),
          overlay: "medium",
          primaryCta: button("Start a conversation", "/contact"),
        },
        {
          _type: "richText",
          _key: "pt-intro",
          heading: "A new revenue stream, without a permanent install",
          body: [
            block(
              "Got under-used space? Inside or outside, we can use it. Rent doesn’t reduce in winter — an empty room still costs money.",
              "normal",
              "pt-1",
            ),
            block(
              "We provide a fully managed, semi-permanent golf simulator with minimal upfront investment: a new attraction, a new revenue stream, and no structural risk to the venue.",
              "normal",
              "pt-2",
            ),
          ],
        },
        { _type: "partnerGrid", _key: "pt-grid", heading: "Who we’ve teed up with" },
        {
          _type: "cta",
          _key: "pt-cta",
          heading: "Let’s have the conversation",
          text: "Chris and Ryan are always happy to take a call.",
          button: button("Contact SwingSmart", "/contact"),
        },
      ],
    },
    {
      _id: "page-about",
      _type: "page",
      title: "About",
      slug: slug("about"),
      seo: seo(
        "Who Are We? | Experience Golf Today - Book Your Game — SwingSmart UK. Beyond Golf.",
        "Discover golf experiences for all skill levels with SwingSmart UK. We bring the course to you, rain or shine, for memorable, inclusive golf events.",
      ),
      sections: [
        {
          _type: "hero",
          _key: "ab-hero",
          eyebrow: "Who we are",
          heading: "The brains behind the bays",
          subheading: "SwingSmart’s founding duo.",
          image: imagePlaceholder("about"),
          overlay: "medium",
        },
        {
          _type: "richText",
          _key: "ab-copy",
          body: [
            block("Hey, Chris and Ryan here!", "normal", "ab-1"),
            block(
              "We had a simple idea: tee up and make golf a game for everyone! We saw how the sport could feel a bit out of bounds—especially in the UK, where rain checks are more common than birdies - we would know we are based in Cornwall! But with our love for the game (even though we are not great - we try) and a dream bigger than a 350-yard drive, we decided to change it.",
              "normal",
              "ab-2",
            ),
            block(
              "Why should the pros have all the fun? We want everyone to have the chance of feeling that buzz of a perfect drive, the joy of a cheeky chip-in, and the laughs shared over a round— no dodgy weather, no pressure. Just good times, great swings, and golf for all.",
              "normal",
              "ab-3",
            ),
            block(
              "So… clubs in hand, we bring the course to you. Rain or shine. Beginner or seasoned slicer. Game on.",
              "normal",
              "ab-4",
            ),
          ],
        },
        {
          _type: "textAndImage",
          _key: "ab-mission",
          heading: "Beyond golf",
          imagePosition: "right",
          image: imagePlaceholder("mission"),
          body: [
            block(
              "At SwingsmartUK, we make golf accessible to anyone, no matter your experience, location, or skill.",
              "normal",
              "ab-m1",
            ),
            block(
              "Whether you are looking to play the postage stamp at Royal Troon, or hold a Long Drive contest with your friends, we bring everything you need, and you don’t have to worry about anything!",
              "normal",
              "ab-m2",
            ),
            block(
              "Our cutting-edge realism creates a fun, inclusive experience, perfect for pros, beginners, and casual players alike. Special occasions, team building or just a friendly competition, we bring the ultimate golf experience to you — anytime, anywhere.",
              "normal",
              "ab-m3",
            ),
            block("Our mission is simple: bring golf to everyone!", "normal", "ab-m4"),
          ],
        },
        {
          _type: "cta",
          _key: "ab-cta",
          heading: "Ready to grip it and rip it?",
          button: button("Book your game", "/contact"),
        },
      ],
    },
    {
      _id: "page-contact",
      _type: "page",
      title: "Contact",
      slug: slug("contact"),
      seo: seo(
        "Contact | Get in Touch Today — SwingSmart UK. Beyond Golf.",
        "Contact SwingSmart UK for inquiries, bookings, or more information about our golf events and services. Reach out today to start your golf experience.",
      ),
      sections: [
        {
          _type: "hero",
          _key: "ct-hero",
          eyebrow: "Bookings & enquiries",
          heading: "Contact us",
          subheading: "Ready to team up? Jot down your details and we’ll chat soon. Can’t wait to catch up.",
          image: imagePlaceholder("offer"),
          overlay: "medium",
        },
        {
          _type: "contactBlock",
          _key: "ct-form",
          heading: "Send an enquiry",
          text: "Jot down your details and we’ll chat soon. Can’t wait to catch up.",
          showDetails: true,
          showForm: true,
        },
      ],
    },
    {
      _id: "page-charity",
      _type: "page",
      title: "Charity Days",
      slug: slug("charity"),
      seo: seo(
        "Charity Days — SwingSmart UK. Beyond Golf.",
        "SwingSmart Charity Day options help organisations raise funds and create memorable golf simulation experiences.",
      ),
      sections: [
        {
          _type: "hero",
          _key: "ch-hero",
          eyebrow: "We are Beyond Golf",
          heading: "Golf for a Cause — Make Every Swing Count",
          subheading:
            "Please get in touch via phone or email for all charity enquiries. We look forward to partnering with you!",
          image: imagePlaceholder("charity"),
          overlay: "medium",
          primaryCta: button("Get in touch", "/contact"),
        },
        {
          _type: "richText",
          _key: "ch-copy",
          body: [
            block(
              "At Swingsmart, we believe golf is more than a game—it’s a powerful way to bring people together and make a difference. Our Charity Day options are designed to help organisations raise funds, increase awareness, and create memorable experiences through the immersive world of golf simulation.",
              "normal",
              "ch-1",
            ),
            block(
              "Whether you're planning a charity golf day, gala fundraiser, or corporate giving initiative, our flexible simulator setups can be tailored to suit your event's goals.",
              "normal",
              "ch-2",
            ),
            block("Let’s bring golf to everyone!", "normal", "ch-3"),
          ],
        },
        {
          _type: "cta",
          _key: "ch-cta",
          heading: "Let’s bring golf to everyone",
          text: "Please get in touch via phone or email for all charity enquiries.",
          button: button("Contact us", "/contact"),
        },
      ],
    },
    {
      _id: "page-faq",
      _type: "page",
      title: "FAQs",
      slug: slug("faq"),
      seo: seo("FAQ’s — SwingSmart UK. Beyond Golf.", "Space, setup times, waterproof enclosures, branding, payment terms and cancellation policy for SwingSmart golf simulator hire."),
      sections: [
        {
          _type: "hero",
          _key: "faq-hero",
          eyebrow: "FAQs",
          heading: "FAQ’s",
          subheading: "Anything else? Get in touch and we will answer your questions!",
          image: imagePlaceholder("packagesIndex"),
          overlay: "medium",
          primaryCta: button("Contact us", "/contact"),
        },
        { _type: "faq", _key: "faq-list", heading: "FAQ’s", items: FAQS },
      ],
    },
  ];
}

function plannedDocuments() {
  const packageDocs = PACKAGES.map((pkg) => ({
    _id: pkg.id,
    _type: "eventPackage",
    name: pkg.name,
    shortName: pkg.shortName,
    slug: slug(pkg.slug),
    subtitle: pkg.subtitle,
    summary: pkg.summary,
    description: pkg.description,
    featured: true,
    sortOrder: pkg.sortOrder,
    ...parsePrice(pkg.priceLabel),
    duration: pkg.duration,
    includes: pkg.includes,
    extras: pkg.extras,
    heroImage: imagePlaceholder(pkg.imageKey),
    cta: button("Enquire", "/contact"),
    seo: seo(`${pkg.name} | SwingSmart UK`, pkg.summary),
  }));

  const categoryDocs = GALLERY_CATEGORIES.map((item) => ({
    _id: item.id,
    _type: "galleryCategory",
    title: item.title,
    slug: slug(item.slug),
  }));

  const galleryDocs = GALLERY_ITEMS.map((item) => ({
    _id: `gallery-item-${slugify(item.title)}`,
    _type: "galleryItem",
    title: item.title,
    image: imagePlaceholder(item.imageKey),
    alt: IMAGES[item.imageKey].alt,
    featured: Boolean(item.featured),
    categories: item.categories.map((categorySlug) => ({
      _type: "reference",
      _key: categorySlug,
      _ref: `gallery-category-${categorySlug}`,
    })),
  }));

  const partnerDocs = PARTNERS.map((item) => ({
    _id: item.id,
    _type: "partner",
    name: item.name,
    summary: item.summary,
    website: item.website,
    featured: item.featured,
    sortOrder: item.sortOrder,
  }));

  const testimonialDocs = TESTIMONIALS.map(([quote, person]) => ({
    _id: `testimonial-${slugify(person)}`,
    _type: "testimonial",
    quote,
    person,
    featured: true,
  }));

  return [
    { group: "Site Settings", match: "singleton", doc: siteSettingsDoc() },
    { group: "Navigation", match: "singleton", doc: navigationDoc() },
    ...pages().map((doc) => ({ group: "Pages", match: "slug", doc })),
    ...packageDocs.map((doc) => ({ group: "Packages", match: "slug", doc })),
    ...categoryDocs.map((doc) => ({ group: "Gallery Categories", match: "slug", doc })),
    ...galleryDocs.map((doc) => ({ group: "Gallery", match: "title", doc })),
    ...partnerDocs.map((doc) => ({ group: "Partners", match: "name", doc })),
    ...testimonialDocs.map((doc) => ({ group: "Testimonials", match: "person", doc })),
  ];
}

function isPlaceholderHome(existing) {
  const blob = `${existing?.hero?.eyebrow || ""} ${existing?.hero?.heading || ""}`.toLowerCase();
  return /cms preview|golf from the cms/.test(blob);
}

function labelFor(item) {
  const doc = item.doc;
  return doc.title || doc.name || doc.person || doc.businessName || doc._id;
}

function detailFor(item) {
  const doc = item.doc;
  if (doc._type === "page") {
    const hero = doc.sections?.find((section) => section._type === "hero");
    const sectionTypes = (doc.sections || []).map((section) => section._type).join(", ");
    return `/${doc.slug.current} — ${hero?.heading || "no hero"} [${sectionTypes}]`;
  }
  if (doc._type === "eventPackage") {
    const price = doc.startingPrice
      ? `${doc.priceQualifier || "From"} £${doc.startingPrice}`
      : doc.priceQualifier;
    return `${price || "no price"} · ${doc.duration || "no duration"} · ${doc.includes?.length || 0} included`;
  }
  if (doc._type === "galleryItem") {
    return `${IMAGES[doc.image._migrateImage].file} · ${doc.categories.map((ref) => ref._ref.replace("gallery-category-", "")).join(", ")}`;
  }
  if (doc._type === "galleryCategory") return `/${doc.slug.current}`;
  if (doc._type === "partner") return doc.website || "no website";
  if (doc._type === "testimonial") return `“${doc.quote.slice(0, 80)}${doc.quote.length > 80 ? "…" : ""}”`;
  if (doc._type === "navigation") {
    return doc.items.map((item) => item.label).join(", ");
  }
  if (doc._type === "siteSettings") {
    return `${doc.email} · ${doc.phones.join(" · ")}`;
  }
  return doc._id;
}

async function fetchExisting() {
  return sanityQuery(`{
    "pages": *[_type == "page"]{ _id, title, "slug": slug.current, "hero": sections[_type == "hero"][0]{ heading, eyebrow } },
    "packages": *[_type == "eventPackage"]{ _id, name, "slug": slug.current },
    "gallery": *[_type == "galleryItem"]{ _id, title },
    "categories": *[_type == "galleryCategory"]{ _id, title, "slug": slug.current },
    "partners": *[_type == "partner"]{ _id, name },
    "testimonials": *[_type == "testimonial"]{ _id, person, quote },
    "navigation": *[_type == "navigation"]{ _id },
    "siteSettings": *[_type == "siteSettings"]{ _id, businessName, email },
    "drafts": ${token ? '*[_id in path("drafts.**") && _type in ["page","siteSettings","navigation"]]{_id,_type}' : "[]"}
  }`);
}

function findExisting(item, existing) {
  const doc = item.doc;
  if (doc._type === "page") {
    return existing.pages.find((row) => row.slug === doc.slug.current || row._id === doc._id);
  }
  if (doc._type === "eventPackage") {
    return existing.packages.find((row) => row.slug === doc.slug.current || row._id === doc._id);
  }
  if (doc._type === "galleryItem") {
    return existing.gallery.find((row) => row.title === doc.title || row._id === doc._id);
  }
  if (doc._type === "galleryCategory") {
    return existing.categories.find((row) => row.slug === doc.slug.current || row._id === doc._id);
  }
  if (doc._type === "partner") {
    return existing.partners.find((row) => row.name === doc.name || row._id === doc._id);
  }
  if (doc._type === "testimonial") {
    return existing.testimonials.find(
      (row) => row._id === doc._id || (row.person === doc.person && row.quote === doc.quote),
    );
  }
  if (doc._type === "navigation") return existing.navigation[0];
  if (doc._type === "siteSettings") return existing.siteSettings[0];
  return undefined;
}

function decideAction(item, existing) {
  const found = findExisting(item, existing);
  if (!found) {
    return { action: "create", id: item.doc._id };
  }

  const draftId = found._id.startsWith("drafts.") ? found._id : `drafts.${found._id}`;
  const draftExists = (existing.drafts || []).some((row) => row._id === draftId);

  if (item.doc._type === "page" && item.doc.slug.current === "home" && isPlaceholderHome(found)) {
    if (draftExists) {
      return {
        action: "skip",
        id: found._id,
        reason: `Home already exists (${found._id}) and a draft is already waiting in Studio.`,
      };
    }
    return {
      action: "draft",
      id: draftId,
      publishedId: found._id,
      reason: `Published Home is a placeholder (“${found.hero?.heading || "Golf from the CMS."}”). A draft of the live homepage will be created. Published Home is not changed.`,
    };
  }

  if (item.doc._type === "siteSettings") {
    if (draftExists) {
      return {
        action: "skip",
        id: found._id,
        reason: "Site Settings already exists and a draft is already waiting in Studio.",
      };
    }
    return {
      action: "draft",
      id: draftId,
      publishedId: found._id,
      reason:
        "Site Settings already exists. A draft with the current website contact details, footer and buttons will be created. Published settings are not changed.",
    };
  }

  return {
    action: "skip",
    id: found._id,
    reason: `Already in Sanity as ${found._id}.`,
  };
}

function printInventory(rows) {
  const groups = new Map();
  for (const row of rows) {
    if (!groups.has(row.item.group)) groups.set(row.item.group, []);
    groups.get(row.item.group).push(row);
  }

  console.log(`\nProject: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Mode:    ${WRITE ? "WRITE (createIfNotExists / drafts only)" : "DRY-RUN (no writes)"}\n`);

  for (const [group, items] of groups) {
    console.log(`## ${group}`);
    for (const row of items) {
      const mark =
        row.decision.action === "create"
          ? "CREATE"
          : row.decision.action === "draft"
            ? "DRAFT "
            : "SKIP  ";
      console.log(`  [${mark}] ${labelFor(row.item)}`);
      console.log(`           ${detailFor(row.item)}`);
      if (row.decision.reason) console.log(`           ${row.decision.reason}`);
    }
    console.log("");
  }

  const counts = rows.reduce(
    (acc, row) => {
      acc[row.decision.action] += 1;
      return acc;
    },
    { create: 0, draft: 0, skip: 0 },
  );

  const imageKeys = new Set();
  for (const row of rows) {
    if (row.decision.action === "skip") continue;
    collectImageKeys(row.item.doc, imageKeys);
  }

  console.log("## Images that would be uploaded (only for CREATE / DRAFT)");
  for (const key of imageKeys) {
    const meta = IMAGES[key];
    const exists = existsSync(resolve(process.cwd(), meta.file));
    console.log(`  ${exists ? "ok" : "MISSING"}  ${meta.file} — ${meta.alt}`);
  }

  console.log(`\n${counts.create} to create, ${counts.draft} draft(s) of existing documents, ${counts.skip} skipped.`);
  console.log("Existing published documents are never overwritten or deleted.");
}

async function uploadNeededImages(rows) {
  const keys = new Set();
  for (const row of rows) {
    if (row.decision.action === "skip") continue;
    collectImageKeys(row.item.doc, keys);
  }

  const assets = {};
  for (const key of keys) {
    const meta = IMAGES[key];
    const abs = resolve(process.cwd(), meta.file);
    if (!existsSync(abs)) {
      console.warn(`Missing image, skipping upload: ${meta.file}`);
      continue;
    }
    const assetId = await uploadImage(meta.file);
    console.log(`uploaded ${basename(abs)} ${assetId}`);
    assets[key] = assetId;
  }
  return assets;
}

async function writeDocuments(rows, assets) {
  const mutations = [];

  for (const row of rows) {
    if (row.decision.action === "skip") continue;
    const resolved = replaceImages(row.item.doc, assets);
    resolved._id = row.decision.id;
    mutations.push({ createIfNotExists: resolved });
  }

  if (!mutations.length) {
    console.log("Nothing to write.");
    return;
  }

  await sanityMutate(mutations);
  console.log(`Wrote ${mutations.length} document(s) with createIfNotExists.`);
}

async function main() {
  if (WRITE && !token) {
    console.error("Write mode needs SANITY_AUTH_TOKEN in the environment or .env.local.");
    console.error(
      "Create an Editor token with create permission at https://www.sanity.io/manage/project/3sbwydux/api#tokens",
    );
    console.error("The token is read from the environment. It is never hard-coded.");
    process.exit(1);
  }

  const existing = await fetchExisting();
  const rows = plannedDocuments().map((item) => ({
    item,
    decision: decideAction(item, existing),
  }));

  printInventory(rows);

  if (!WRITE) {
    console.log("\nNo content was written. To create the missing documents:\n");
    console.log("  1. Create an Editor token (create permission) for project 3sbwydux");
    console.log("  2. Add SANITY_AUTH_TOKEN to .env.local, or export it in the shell");
    console.log("  3. Run:  npm run migrate:content -- --write\n");
    return;
  }

  const assets = await uploadNeededImages(rows);
  await writeDocuments(rows, assets);
  console.log("\nDone. Review drafts for Home and Site Settings in Studio before publishing.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
