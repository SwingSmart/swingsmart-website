import { block, photos } from "./content-helpers";
import type { EventPackage, PageDoc, SiteContent } from "./types";

const settings: SiteContent["settings"] = {
  siteName: "SwingSmart UK",
  tagline: "Beyond Golf.",
  footerNote:
    "Mobile golf simulation for homes, venues, weddings, clubs and events. Based in Cornwall, available across the UK.",
  contact: {
    email: "hello@swingsmart.co.uk",
    phones: ["+44 (0) 7453 312 916", "+44 (0) 7805 019 849"],
    location: "Cornwall, United Kingdom",
  },
  socials: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/swingsmart-uk",
    },
  ],
  defaultSeo: {
    title: "SwingSmart UK. Beyond Golf.",
    description:
      "We bring a professional golf simulator to you — anytime, anywhere. Packages for individuals, corporates, weddings, clubs and junior golfers.",
  },
  primaryCta: { label: "Plan an event", href: "/contact", style: "primary" },
  secondaryCta: { label: "View packages", href: "/packages", style: "secondary" },
};

const navigation: SiteContent["navigation"] = {
  items: [
    { label: "Home", href: "/" },
    {
      label: "Packages",
      href: "/packages",
      children: [
        { label: "The Golfer", href: "/packages/golfer" },
        { label: "Country Club", href: "/packages/country-club" },
        { label: "The Ryder Cup", href: "/packages/ryder-cup" },
        { label: "The Championship", href: "/packages/championship" },
        { label: "St Andrews", href: "/packages/st-andrews" },
        { label: "Phoenix Open", href: "/packages/phoenix-open" },
        { label: "Junior Open", href: "/packages/junior-open" },
        { label: "Build Your Own", href: "/packages/build-your-own" },
      ],
    },
    { label: "Gallery", href: "/gallery" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  ctaLabel: "Plan an event",
  ctaHref: "/contact",
};

const packages: EventPackage[] = [
  {
    title: "The Golfer",
    shortName: "Individual",
    slug: "golfer",
    subtitle: "Individual package",
    summary:
      "Perfect for solo players or small groups. Fine-tune your swing, play world-famous courses from home, or host a private golf night.",
    priceLabel: "From £395",
    durationLabel: "Minimum 4 hours",
    featured: true,
    includes: [
      "Launch monitor: 1× SkyTrak Plus & software",
      "Clubs: 1× Cobra Fly XL 11-piece set (junior clubs on request)",
      "Projector: 1× short throw with floor-mounted case and impact screen",
      "Golf balls: Callaway (models vary by hire type)",
      "Hitting mat: 1.5m × 1.5m, left and right-handed",
      "Protective equipment: launch monitor casing and golf enclosure (4m × 3m × 3m)",
      "Installation: setup and take-down of all equipment",
    ],
  },
  {
    title: "Country Club",
    shortName: "Classic",
    slug: "country-club",
    subtitle: "Our classic package",
    summary:
      "Ideal for casual events and intimate gatherings. An immersive, enjoyable environment on world-class courses for every skill level.",
    priceLabel: "From £595",
    durationLabel: "Minimum 4 hours",
    featured: true,
    includes: [
      "Launch monitor: 1× SkyTrak Plus & software",
      "Clubs: 1× Cobra Fly XL 11-piece set (junior clubs on request)",
      "Projector: 1× short throw with floor-mounted case and impact screen",
      "Golf balls: Callaway (models vary by hire type)",
      "Hitting mat: 1.5m × 1.5m, left and right-handed",
      "Protective equipment: launch monitor casing and golf enclosure (4m × 3m × 3m)",
      "Installation: setup and take-down of all equipment",
      "Member of staff: 1 or 2 depending on booking size",
    ],
  },
  {
    title: "The Ryder Cup",
    shortName: "Corporate",
    slug: "ryder-cup",
    subtitle: "Corporate package",
    summary:
      "For businesses looking to make a lasting impression. Team-building, client entertainment and corporate functions with a clubhouse feel.",
    priceLabel: "From £695",
    durationLabel: "Minimum 4 hours",
    featured: true,
    includes: [
      "Launch monitor: 1× SkyTrak Plus & software",
      "Gaming computer: Windows 11 desktop PC with large monitor",
      "Clubs: 1× Cobra Fly XL 11-piece set (additional left/right sets if needed)",
      "Projector: 1× short throw with floor-mounted case and impact screen",
      "Golf balls: Callaway (models vary by hire type)",
      "Hitting mat: 1.5m × 1.5m, left and right-handed",
      "Protective equipment: launch monitor casing and golf enclosure (4m × 3m × 3m)",
      "Installation: setup and take-down of all equipment",
      "Member of staff: 1 or 2 depending on booking size",
    ],
    extras: [
      "55\" TV for external viewing",
      "Custom branding on marquee sheets",
      "Interactive leaderboard tracking",
      "Prizes — or tell us what you need",
    ],
  },
  {
    title: "The Championship",
    shortName: "Short / long term",
    slug: "championship",
    subtitle: "Short and long-term hire",
    summary:
      "A flexible, cost-effective simulator for clubs, venues, businesses and private users who want world-class virtual golf without a permanent install.",
    priceLabel: "POA",
    durationLabel: "Minimum 1 week",
    featured: true,
    includes: [
      "Launch monitor: 1× SkyTrak Plus & software",
      "Gaming computer: Windows 11 desktop PC with large monitor (if needed)",
      "Clubs: 1× Cobra Fly XL 13-piece set (if needed; junior clubs on request)",
      "Projector: 1× short throw with floor-mounted case and impact screen",
      "Golf balls: Callaway (if needed)",
      "Hitting mat: 1.5m × 1.5m, left and right-handed",
      "Protective equipment: launch monitor casing and golf enclosure (4m × 3m × 3m)",
      "Installation: setup and take-down of all equipment",
      "Ongoing maintenance and support when needed",
    ],
  },
  {
    title: "St Andrews",
    shortName: "The Ultimate",
    slug: "st-andrews",
    subtitle: "The ultimate competition package",
    summary:
      "Tournament-style golf with two bays, advanced shot tracking and leaderboards. Match play, closest to the pin, or a full virtual tournament.",
    priceLabel: "From £1,195",
    durationLabel: "Minimum 4 hours",
    featured: true,
    includes: [
      "Launch monitor: 2× SkyTrak Plus & software",
      "Gaming computer: Windows 11 desktop PC with large monitor",
      "Clubs: 2× Cobra Fly XL 11-piece sets (junior and left/right on request)",
      "Projector: 2× short throw with floor-mounted case and impact screen",
      "Golf balls: Callaway (models vary by hire type)",
      "Hitting mats: 2× 1.5m × 1.5m, left and right-handed",
      "Protective equipment: 2× launch monitor casings and enclosures (4m × 3m × 3m)",
      "Installation: setup and take-down of all equipment",
      "Members of staff: 2 or more depending on booking size",
    ],
    extras: [
      "55\" TV for external viewing",
      "Custom branding on marquee sheets",
      "Interactive leaderboard tracking",
      "Competitions and prizes",
    ],
  },
  {
    title: "Phoenix Open",
    shortName: "Weddings",
    slug: "phoenix-open",
    subtitle: "The wedding experience",
    summary:
      "A unique entertainment feature for your big day. Luxury simulator setup, wedding-themed challenges, and settings to match your venue.",
    priceLabel: "From £795",
    durationLabel: "From 4 hours",
    featured: true,
    includes: [
      "Launch monitor: 1× SkyTrak Plus & software",
      "Gaming computer: Windows 11 desktop PC with large monitor",
      "Clubs: 1× Cobra Fly XL 11-piece set (additional left/right sets if needed)",
      "Projector: 1× short throw with floor-mounted case and impact screen",
      "Golf balls: Callaway (models vary by hire type)",
      "Hitting mat: 1.5m × 1.5m, left and right-handed",
      "Protective equipment: launch monitor casing and golf enclosure (4m × 3m × 3m)",
      "Installation: setup and take-down of all equipment",
      "Member of staff: 1 or 2 depending on booking size",
    ],
    extras: [
      "55\" TV for external viewing",
      "Custom branding on marquee sheets",
      "Interactive leaderboard tracking",
      "Competitions and prizes",
    ],
  },
  {
    title: "Junior Open",
    shortName: "Ages 6–14",
    slug: "junior-open",
    subtitle: "Where it all begins",
    summary:
      "Tailored for young golfers aged 6–14. Junior-sized equipment, age-appropriate courses and interactive challenges — fun first, skills second.",
    priceLabel: "From £395",
    durationLabel: "From 4 hours",
    featured: true,
    includes: [
      "Launch monitor: 1× SkyTrak Plus & software",
      "Games: over 7 playing modes",
      "Clubs: Cobra Fly XL set plus junior clubs on request",
      "Projector: Optoma short throw with floor-mounted case and impact screen",
      "Golf balls: Callaway (models vary by hire type)",
      "Hitting mat: 1.5m × 1.5m, left and right-handed",
      "Protective equipment: launch monitor casing and golf enclosure (4m × 3m × 3m)",
      "Installation: setup and take-down of all equipment",
      "Member of staff: 1 or 2 depending on booking size",
    ],
  },
  {
    title: "Build Your Own",
    shortName: "Dream golf",
    slug: "build-your-own",
    subtitle: "A custom simulator",
    summary:
      "A personalised setup for your home, office or venue. We design around your space, style and budget — and stay with you every step of the way.",
    priceLabel: "Price on application",
    featured: false,
    includes: [
      "That’s completely up to you. We will be there every step of the way to make sure your dream becomes a reality.",
    ],
  },
];

function packagePage(pkg: EventPackage, imageUrl: string): PageDoc {
  return {
    title: pkg.title,
    slug: `packages/${pkg.slug}`,
    seo: {
      title: `${pkg.title} | SwingSmart UK`,
      description: pkg.summary,
    },
    sections: [
      {
        _type: "hero",
        _key: `${pkg.slug}-hero`,
        eyebrow: pkg.subtitle,
        heading: pkg.title,
        subheading: `${pkg.priceLabel}${pkg.durationLabel ? ` · ${pkg.durationLabel}` : ""}`,
        image: { url: imageUrl, alt: `${pkg.title} golf simulator experience` },
        primaryCta: { label: "Enquire", href: "/contact", style: "primary" },
        secondaryCta: {
          label: "All packages",
          href: "/packages",
          style: "secondary",
        },
      },
      {
        _type: "richText",
        _key: `${pkg.slug}-intro`,
        heading: "What’s included",
        body: [block(pkg.summary), ...pkg.includes.map((item, i) => block(item, "normal", `${pkg.slug}-inc-${i}`))],
      },
      ...(pkg.extras?.length
        ? [
            {
              _type: "featureGrid" as const,
              _key: `${pkg.slug}-extras`,
              heading: "Optional extras (POA)",
              items: pkg.extras.map((text, i) => ({
                _key: `${pkg.slug}-ex-${i}`,
                title: text.split("—")[0] || text,
                text: text,
              })),
            },
          ]
        : []),
      {
        _type: "cta",
        _key: `${pkg.slug}-cta`,
        heading: "Ready to grip it and rip it?",
        text: "Tell us the date, the venue and how many people. We’ll build the right setup.",
        button: { label: "Get in touch", href: "/contact", style: "primary" },
      },
    ],
  };
}

const pages: Record<string, PageDoc> = {
  home: {
    title: "Home",
    slug: "home",
    seo: {
      title: "SwingSmart UK. Beyond Golf. | Book today",
      description:
        "Experience golf simulation like never before. We bring the course to you — rain or shine.",
    },
    sections: [
      {
        _type: "hero",
        _key: "home-hero",
        eyebrow: "Beyond Golf",
        heading: "We bring the course to you",
        subheading:
          "Professional golf simulation for corporate days, weddings, hotels, exhibitions and private events. Set the tee time — we’ll be there.",
        image: photos.hero,
        primaryCta: { label: "Plan an event", href: "/contact", style: "primary" },
        secondaryCta: {
          label: "View packages",
          href: "/packages",
          style: "secondary",
        },
      },
      {
        _type: "featureGrid",
        _key: "home-offer",
        heading: "Built for the occasion",
        items: [
          {
            _key: "f1",
            title: "Corporate events",
            text: "Client entertainment and team days with a clubhouse feel, wherever you host.",
          },
          {
            _key: "f2",
            title: "Weddings",
            text: "Get everyone on the tee on the same day — guests, wedding party, bride and groom.",
          },
          {
            _key: "f3",
            title: "Hotels & holiday parks",
            text: "A managed bay that earns its keep, without a permanent install.",
          },
          {
            _key: "f4",
            title: "Exhibitions",
            text: "A stand people stop at, stay at, and talk about after the show.",
          },
          {
            _key: "f5",
            title: "Private events",
            text: "Birthdays, clubs and competitions. Rain or Mondays — we still turn up.",
          },
          {
            _key: "f6",
            title: "Long-term hire",
            text: "Venues and clubs who want year-round golf without buying the kit outright.",
          },
        ],
      },
      {
        _type: "textAndImage",
        _key: "home-mission",
        heading: "Photography first. Equipment included.",
        imagePosition: "right",
        image: photos.indoor,
        body: [
          block(
            "We bring the enclosure, the launch monitor, the clubs and the staff. You bring the people.",
          ),
          block(
            "Based in Cornwall. Available across the UK.",
          ),
        ],
      },
      {
        _type: "cta",
        _key: "home-cta",
        heading: "Tell us the date and the room",
        text: "We’ll recommend a package and arrive with everything you need.",
        button: { label: "Get in touch", href: "/contact", style: "primary" },
      },
    ],
  },
  packages: {
    title: "Packages",
    slug: "packages",
    seo: {
      title: "Packages | SwingSmart UK",
      description:
        "Golf simulator hire packages for individuals, corporates, weddings, juniors, clubs and custom builds.",
    },
    sections: [
      {
        _type: "hero",
        _key: "pkg-hero",
        eyebrow: "Hire",
        heading: "Our packages",
        subheading:
          "Every package includes professional equipment, installation, and a setup built around your event.",
        image: photos.range,
        primaryCta: { label: "Talk to us", href: "/contact", style: "primary" },
      },
      {
        _type: "packageGrid",
        _key: "pkg-grid",
        heading: "Choose your round",
      },
      {
        _type: "faq",
        _key: "pkg-faq",
        heading: "The usual questions",
        items: [
          {
            _key: "q1",
            question: "How much space is required?",
            answer:
              "It depends on the booking. The majority of packages need a minimum of 4m × 3m × 3m (W × L × H).",
          },
          {
            _key: "q2",
            question: "How long does setup and take-down take?",
            answer:
              "Setup typically takes 60–90 minutes. Take-down is around 45–60 minutes. We schedule around your event to minimise disruption.",
          },
          {
            _key: "q3",
            question: "Is it waterproof for outdoor events?",
            answer: "Yes. We offer a fully waterproof enclosure.",
          },
          {
            _key: "q4",
            question: "Can branding or customisation be added?",
            answer:
              "Absolutely. We can run through options during your booking consultation.",
          },
          {
            _key: "q5",
            question: "What are the payment terms?",
            answer:
              "50% of the total is payable on booking confirmation (via BACS). The remaining balance is due 7 days before the booking date.",
          },
          {
            _key: "q6",
            question: "What is the cancellation policy?",
            answer:
              "Cancel up to 10 days before your booking and we return all monies paid. After that we keep the 50% paid at confirmation.",
          },
        ],
      },
    ],
  },
  gallery: {
    title: "Gallery",
    slug: "gallery",
    seo: {
      title: "Gallery | SwingSmart UK",
      description: "Event photography from SwingSmart golf simulator hires, weddings, corporates and clubs.",
    },
    sections: [
      {
        _type: "hero",
        _key: "gal-hero",
        eyebrow: "The course, wherever you are",
        heading: "Gallery",
        subheading: "From the bay — SwingSmart events, venues and hire.",
        image: photos.event,
      },
      {
        _type: "gallery",
        _key: "gal-grid",
        heading: "Recent setups",
      },
    ],
  },
  partnerships: {
    title: "Partnerships",
    slug: "partnerships",
    seo: {
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
        image: photos.corporate,
        primaryCta: { label: "Start a conversation", href: "/contact", style: "primary" },
      },
      {
        _type: "richText",
        _key: "pt-intro",
        heading: "A new revenue stream, without a permanent install",
        body: [
          block(
            "Got under-used space? Inside or outside, we can use it. Rent doesn’t reduce in winter — an empty room still costs money.",
          ),
          block(
            "We provide a fully managed, semi-permanent golf simulator with minimal upfront investment: a new attraction, a new revenue stream, and no structural risk to the venue.",
          ),
        ],
      },
      {
        _type: "partnerGrid",
        _key: "pt-grid",
        heading: "Who we’ve teed up with",
      },
      {
        _type: "cta",
        _key: "pt-cta",
        heading: "Let’s have the conversation",
        text: "Chris and Ryan are always happy to take a call.",
        button: { label: "Contact SwingSmart", href: "/contact", style: "primary" },
      },
    ],
  },
  about: {
    title: "About",
    slug: "about",
    seo: {
      title: "About | SwingSmart UK",
      description:
        "Meet Chris and Ryan, the founding duo behind SwingSmart UK — bringing golf to everyone from Cornwall.",
    },
    sections: [
      {
        _type: "hero",
        _key: "ab-hero",
        eyebrow: "Who we are",
        heading: "The brains behind the bays",
        subheading: "SwingSmart’s founding duo.",
        image: photos.club,
      },
      {
        _type: "richText",
        _key: "ab-copy",
        body: [
          block("Hey, Chris and Ryan here."),
          block(
            "We had a simple idea: tee up and make golf a game for everyone. We saw how the sport could feel a bit out of bounds — especially in the UK, where rain checks are more common than birdies. We would know: we are based in Cornwall.",
          ),
          block(
            "With our love for the game (even though we are not great — we try) and a dream bigger than a 350-yard drive, we decided to change it.",
          ),
          block(
            "Why should the pros have all the fun? We want everyone to have the chance of feeling that buzz of a perfect drive, the joy of a cheeky chip-in, and the laughs shared over a round — no dodgy weather, no pressure. Just good times, great swings, and golf for all.",
          ),
          block(
            "So… clubs in hand, we bring the course to you. Rain or shine. Beginner or seasoned slicer. Game on.",
          ),
        ],
      },
      {
        _type: "cta",
        _key: "ab-cta",
        heading: "Ready to grip it and rip it?",
        button: { label: "Book your game", href: "/contact", style: "primary" },
      },
    ],
  },
  contact: {
    title: "Contact",
    slug: "contact",
    seo: {
      title: "Contact | SwingSmart UK",
      description:
        "Get in touch with SwingSmart UK. Email hello@swingsmart.co.uk or call to book a golf simulator experience.",
    },
    sections: [
      {
        _type: "hero",
        _key: "ct-hero",
        eyebrow: "Bookings & enquiries",
        heading: "Contact us",
        subheading:
          "Ready to team up? Jot down your details and we’ll chat soon. Can’t wait to catch up.",
        image: photos.green,
      },
      {
        _type: "contactBlock",
        _key: "ct-form",
        heading: "Send an enquiry",
        text: "Charity bookings and anything else — phone or email and we’ll answer.",
      },
    ],
  },
  ...Object.fromEntries(
    packages.map((pkg) => {
      const images: Record<string, string> = {
        golfer: photos.hero.url,
        "country-club": photos.indoor.url,
        "ryder-cup": photos.corporate.url,
        championship: photos.club.url,
        "st-andrews": photos.night.url,
        "phoenix-open": photos.wedding.url,
        "junior-open": photos.junior.url,
        "build-your-own": photos.range.url,
      };
      return [`packages/${pkg.slug}`, packagePage(pkg, images[pkg.slug] || photos.hero.url)];
    }),
  ),
};

export const fallbackContent: SiteContent = {
  settings,
  navigation,
  pages,
  packages,
  galleryCategories: [
    { title: "Events", slug: "events" },
    { title: "Weddings", slug: "weddings" },
    { title: "Corporate", slug: "corporate" },
    { title: "Clubs", slug: "clubs" },
  ],
  gallery: [
    { title: "Dusk tee shot", image: photos.hero, categories: ["events"] },
    { title: "Fairway light", image: photos.indoor, categories: ["clubs"] },
    { title: "Night competition", image: photos.night, categories: ["events", "corporate"] },
    { title: "Wedding bay", image: photos.wedding, categories: ["weddings"] },
    { title: "Range bays", image: photos.range, categories: ["clubs"] },
    { title: "Team day", image: photos.corporate, categories: ["corporate"] },
  ],
  partners: [
    {
      name: "Wellington School",
      summary: "Official supplier — heritage, excellence and an all-weather game for pupils.",
      url: "https://www.wellington-school.org.uk",
    },
    {
      name: "Newton Abbot Races",
      summary: "Family Day partner — a simulator on site for visitors of every age.",
      url: "https://www.newtonabbotracing.com",
    },
    {
      name: "Graphic Mill",
      summary: "Exhibition partners — high-impact stands with a full-scale SwingSmart bay.",
      url: "https://www.graphicmill.co.uk",
    },
    {
      name: "Sauermann UK",
      summary: "InstallerSHOW at the NEC — an interactive stand that gets the conversation started.",
    },
  ],
  testimonials: [
    {
      quote:
        "Everyone ended up on the tee — including people who had never held a club. It was the unexpected highlight of the day.",
      attribution: "Wedding hire",
      role: "Cornwall",
    },
    {
      quote:
        "Setup was slick, the bay looked the part, and our clients actually talked to each other instead of staring at their phones.",
      attribution: "Corporate event",
      role: "Team day",
    },
    {
      quote:
        "An all-weather option our members have been asking for, without turning the clubhouse into a building site.",
      attribution: "Golf club",
      role: "Long-term hire",
    },
  ],
};
