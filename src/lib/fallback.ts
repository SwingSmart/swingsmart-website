import { block, photos, publicFaqs } from "./content-helpers";
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
      label: "Instagram",
      url: "https://www.instagram.com/swingsmartuk/",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/swingsmart-uk",
    },
  ],
  defaultSeo: {
    title: "SwingSmart UK. Beyond Golf. | Experience Golf Convenience - Book Today",
    description:
      "Explore SwingSmart UK for immersive golf simulation experiences, events, and packages. Convenient, flexible golf options for all skill levels and occasions.",
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
    { label: "Charity", href: "/charity" },
    { label: "FAQs", href: "/faq" },
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
    heroImage: photos.golfer,
    summary:
      "Perfect for solo players or small groups, this package lets you enjoy a top-tier golf experience on your terms. Whether you want to fine-tune your swing, play a round on world-famous courses from the comfort of your home, or host a private golf night, our high-quality simulator setup delivers a seamless and immersive game.",
    priceLabel: "From £395",
    durationLabel: "Minimum duration 4 hours",
    featured: true,
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
    title: "Country Club",
    shortName: "Classic",
    slug: "country-club",
    subtitle: "Our classic package",
    heroImage: photos.countryClub,
    summary:
      "Ideal for casual events and intimate gatherings, this experience transports you to a variety of world-class golf courses, providing an immersive and enjoyable environment for all skill levels. Whether you're hosting a small get-together or simply looking to add something unique to your event, it promises an engaging and memorable experience for everyone involved.",
    priceLabel: "From £595",
    durationLabel: "Minimum duration 4 hours",
    featured: true,
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
    title: "The Ryder Cup",
    shortName: "Corporate",
    slug: "ryder-cup",
    subtitle: "Corporate package",
    heroImage: photos.ryderCup,
    summary:
      "Perfect for businesses looking to make a lasting impression, this golf experience offers an engaging and interactive way to connect with clients or strengthen team dynamics. Whether you're aiming to drive engagement or build rapport off the course, our flexible setup—complete with multiple simulators and custom-branded features—sets the stage for a hole-in-one event. Ideal for corporate functions, team-building days, or client entertainment, it delivers a memorable atmosphere with all the feel of a top-tier clubhouse.",
    priceLabel: "From £695",
    durationLabel: "Minimum duration 4 hours",
    featured: true,
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
    title: "The Championship",
    shortName: "Short / long term",
    slug: "championship",
    subtitle: "Short and long-term hire",
    heroImage: photos.championship,
    summary:
      "Perfect for golf clubs, venues, businesses, and private users looking to elevate their space with an immersive golf experience. Our long-term simulator rental offers a flexible and cost-effective solution for those who want to enjoy world-class virtual golf without the need for a permanent installation or large upfront investment. Whether you’re enhancing a hospitality venue, creating a unique staff amenity, or upgrading your personal entertainment space, this extended hire option delivers lasting engagement, entertainment, and year-round enjoyment.",
    priceLabel: "POA",
    durationLabel: "Minimum duration 1 week",
    featured: true,
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
    title: "St Andrews",
    shortName: "The Ultimate",
    slug: "st-andrews",
    subtitle: "The ultimate competition package",
    heroImage: photos.stAndrews,
    summary:
      "Built for those who thrive under pressure and love the thrill of competition, this package delivers a true tournament-style experience. Featuring advanced shot tracking, leaderboard integration, and fully customisable game formats, it brings out the competitive spirit in every player. Whether it’s match play, closest to the pin, or a full-blown virtual tournament, this setup turns any event into a high-stakes, high-energy golf showdown.",
    priceLabel: "From £1,195",
    durationLabel: "Minimum duration 4 hours",
    featured: true,
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
    title: "Phoenix Open",
    shortName: "Weddings",
    slug: "phoenix-open",
    subtitle: "The wedding experience",
    heroImage: photos.phoenixOpen,
    summary:
      "A unique entertainment feature for your big day. Includes a luxury golf simulator setup, wedding-themed challenges, and customised settings to match your venue and style. Time to get all your loved ones on the tee at the same time!",
    priceLabel: "From £795",
    durationLabel: "Duration starts from 4 hours",
    featured: true,
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
    title: "Junior Open",
    shortName: "Ages 6–14",
    slug: "junior-open",
    subtitle: "Where it all begins",
    heroImage: photos.juniorOpen,
    summary:
      "Tailored for young golfers ages 6-14, The Junior Golfer package offers a fun and engaging golf simulator experience. With junior-sized equipment, age-appropriate courses, and interactive challenges, it’s the perfect way for kids to develop their skills while having fun.",
    priceLabel: "From £395",
    durationLabel: "Duration starts from 4 hours",
    featured: true,
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
    title: "Build Your Own",
    shortName: "Dream golf",
    slug: "build-your-own",
    subtitle: "A custom simulator",
    heroImage: photos.buildYourOwn,
    summary:
      "At Swingsmart, we believe that every golfer deserves a personalised, immersive experience. That’s why we offer the opportunity to build your own dream golf simulator setup — a custom solution designed to bring world-class golf to your home, office, or business space.",
    description: [
      block(
        "Whether you're looking to practice your swing in your own private space, create a high-end entertainment setup, or insert a professional-grade simulator for your venue, our team is here to help you design a setup that meets your needs, style, and budget.",
      ),
    ],
    priceLabel: "Price on application",
    featured: true,
    includes: [
      "That’s completely up to you! (We will be there every step of the way to make sure your dream becomes a reality)!",
    ],
  },
];

function packagePage(pkg: EventPackage): PageDoc {
  return {
    title: pkg.title,
    slug: `packages/${pkg.slug}`,
    seo: {
      title: `${pkg.title} | SwingSmart UK`,
      description: pkg.summary,
    },
    sections: [],
  };
}

const pages: Record<string, PageDoc> = {
  home: {
    title: "Home",
    slug: "home",
    seo: {
      title: "SwingSmart UK. Beyond Golf. | Experience Golf Convenience - Book Today",
      description:
        "Explore SwingSmart UK for immersive golf simulation experiences, events, and packages. Convenient, flexible golf options for all skill levels and occasions.",
    },
    sections: [
      {
        _type: "hero",
        _key: "home-hero",
        eyebrow: "Beyond Golf",
        heading: "We bring the course to you",
        subheading:
          "Experience golf simulation like never before. Set the tee time and we’ll be there. Tee off any time. Seriously. We don’t even close for rain. Or Mondays…",
        image: photos.homeHero,
        overlay: "medium",
        primaryCta: { label: "Plan an event", href: "/contact", style: "primary" },
        secondaryCta: {
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
        image: photos.offer,
        body: [
          block(
            "At SwingsmartUK, we make golf accessible to anyone, no matter your experience, location, or skill.",
          ),
          block(
            "Whether you are looking to play the postage stamp at Royal Troon, or hold a Long Drive contest with your friends, we bring everything you need, and you don’t have to worry about anything!",
          ),
          block(
            "Our mission is simple: bring golf to everyone.",
          ),
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
        image: photos.packagesIndex,
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
        items: publicFaqs,
      },
    ],
  },
  gallery: {
    title: "Gallery",
    slug: "gallery",
    seo: {
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
        image: photos.galleryBay,
      },
      {
        _type: "gallery",
        _key: "gal-grid",
        heading: "Photographs",
        intro: "Filter by category, or open a picture to view it larger.",
        showFilters: true,
      },
      {
        _type: "testimonials",
        _key: "gal-quotes",
        heading: "Reviews",
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
        image: photos.ryderCup,
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
        heading: "Want to partner with SwingSmart?",
        text: "Schools, venues, hotels, exhibitions and clubs — if you have the space, we’ll bring the course. Chris and Ryan are ready to talk.",
        button: { label: "Become a partner", href: "/contact", style: "primary" },
      },
    ],
  },
  about: {
    title: "About",
    slug: "about",
    seo: {
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
        image: photos.about,
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
          block(
            "So… clubs in hand, we bring the course to you. Rain or shine. Beginner or seasoned slicer. Game on.",
          ),
        ],
      },
      {
        _type: "textAndImage",
        _key: "ab-mission",
        heading: "Beyond golf",
        imagePosition: "right",
        image: photos.mission,
        body: [
          block(
            "At SwingsmartUK, we make golf accessible to anyone, no matter your experience, location, or skill.",
          ),
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
        button: { label: "Book your game", href: "/contact", style: "primary" },
      },
    ],
  },
  contact: {
    title: "Contact",
    slug: "contact",
    seo: {
      title: "Contact | Get in Touch Today — SwingSmart UK. Beyond Golf.",
      description:
        "Contact SwingSmart UK for inquiries, bookings, or more information about our golf events and services. Reach out today to start your golf experience.",
    },
    sections: [
      {
        _type: "hero",
        _key: "ct-hero",
        eyebrow: "Bookings & enquiries",
        heading: "Contact us",
        subheading:
          "Ready to team up? Jot down your details and we’ll chat soon. Can’t wait to catch up.",
        image: photos.offer,
      },
      {
        _type: "contactBlock",
        _key: "ct-form",
        heading: "Send an enquiry",
        text: "Jot down your details and we’ll chat soon. Can’t wait to catch up.",
      },
    ],
  },
  charity: {
    title: "Charity Days",
    slug: "charity",
    seo: {
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
        subheading:
          "Please get in touch via phone or email for all charity enquiries. We look forward to partnering with you!",
        image: photos.charity,
        primaryCta: { label: "Get in touch", href: "/contact", style: "primary" },
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
      {
        _type: "cta",
        _key: "ch-cta",
        heading: "Let’s bring golf to everyone",
        text: "Please get in touch via phone or email for all charity enquiries.",
        button: { label: "Contact us", href: "/contact", style: "primary" },
      },
    ],
  },
  faq: {
    title: "FAQs",
    slug: "faq",
    seo: {
      title: "FAQ’s — SwingSmart UK. Beyond Golf.",
      description:
        "Space, setup times, waterproof enclosures, branding, payment terms and cancellation policy for SwingSmart golf simulator hire.",
    },
    sections: [
      {
        _type: "hero",
        _key: "faq-hero",
        eyebrow: "FAQs",
        heading: "FAQ’s",
        subheading: "Anything else? Get in touch and we will answer your questions!",
        image: photos.packagesIndex,
        primaryCta: { label: "Contact us", href: "/contact", style: "primary" },
      },
      {
        _type: "faq",
        _key: "faq-list",
        heading: "FAQ’s",
        items: publicFaqs,
      },
    ],
  },
  ...Object.fromEntries(packages.map((pkg) => [`packages/${pkg.slug}`, packagePage(pkg)])),
};

export const fallbackContent: SiteContent = {
  settings,
  navigation,
  pages,
  packages,
  galleryCategories: [
    { title: "Corporate", slug: "corporate", sortOrder: 1 },
    { title: "Weddings", slug: "weddings", sortOrder: 2 },
    { title: "Hotels & Holiday Parks", slug: "hotels-holiday-parks", sortOrder: 3 },
    { title: "Exhibitions", slug: "exhibitions", sortOrder: 4 },
    { title: "Private Events", slug: "private-events", sortOrder: 5 },
    { title: "Long-Term Installations", slug: "long-term-installations", sortOrder: 6 },
    { title: "Golf Events", slug: "golf-events", sortOrder: 7 },
  ],
  gallery: [
    {
      title: "On the course",
      caption: "SwingSmart on the golf course",
      image: photos.galleryCourse,
      categories: ["golf-events"],
      featured: true,
    },
    {
      title: "Event bay",
      caption: "Guests around the bay",
      image: photos.galleryBay,
      categories: ["private-events", "golf-events"],
    },
    {
      title: "Enclosure",
      caption: "A fully managed enclosure",
      image: photos.galleryEnclosure,
      categories: ["long-term-installations", "golf-events"],
    },
    {
      title: "Tee time",
      caption: "Players on the tee",
      image: photos.galleryTee,
      categories: ["golf-events", "private-events"],
      featured: true,
    },
    {
      title: "Evening hire",
      caption: "Evening corporate hire",
      image: photos.galleryEvening,
      categories: ["corporate", "private-events"],
    },
    {
      title: "Summer event",
      caption: "Summer gathering",
      image: photos.gallerySummer,
      categories: ["private-events", "golf-events"],
    },
    {
      title: "Outdoor crowd",
      caption: "A crowd around an outdoor bay",
      image: photos.galleryCrowd,
      categories: ["corporate", "exhibitions"],
    },
    {
      title: "On-course bay",
      caption: "Simulator on the course",
      image: photos.galleryHero49,
      categories: ["golf-events"],
      featured: true,
    },
    {
      title: "Outdoor gathering",
      caption: "Guests at an outdoor setup",
      image: photos.galleryHero52,
      categories: ["golf-events", "private-events"],
    },
    {
      title: "Course setup",
      caption: "Bay on the fairway",
      image: photos.galleryHero02,
      categories: ["golf-events"],
    },
    {
      title: "Classic hire",
      caption: "A longer-term venue setup",
      image: photos.galleryCountryClub2,
      categories: ["long-term-installations", "hotels-holiday-parks"],
    },
    {
      title: "Wedding bay",
      caption: "Wedding guests on the simulator",
      image: photos.phoenixOpen,
      categories: ["weddings", "private-events"],
    },
  ],
  partners: [
    {
      name: "Wellington School",
      summary: "Official supplier — heritage, excellence and an all-weather game for pupils.",
      url: "https://www.wellington-school.org.uk",
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Newton Abbot Races",
      summary: "Family Day partner — a simulator on site for visitors of every age.",
      url: "https://www.newtonabbotracing.com",
      featured: false,
      sortOrder: 2,
    },
    {
      name: "Graphic Mill",
      summary: "Exhibition partners — high-impact stands with a full-scale SwingSmart bay.",
      url: "https://www.graphicmill.co.uk",
      featured: true,
      sortOrder: 3,
    },
    {
      name: "Sauermann UK",
      summary: "InstallerSHOW at the NEC — an interactive stand that gets the conversation started.",
      featured: true,
      sortOrder: 4,
    },
  ],
  testimonials: [
    {
      quote:
        "Guys, it was our honour and absolute pleasure to have you there as our summer party entertainment!!",
      attribution: "Ildiko Sealey",
      featured: true,
    },
    {
      quote:
        "Thank you again for being part of the night, we loved working with you and hope to do it again very soon. If anyone’s looking to level up their event, these guys are the ones to call!",
      attribution: "Jennifer Jane Law",
      featured: true,
    },
    {
      quote:
        "Was a great evening, it really is quite addictive - I kept thinking \"I'll do better next time!\" Great setup you've built, really impressed",
      attribution: "Dan Sealey",
      featured: true,
    },
    {
      quote:
        "Great idea for The South West Business Show, the 'stand' created a good athmosphere ... Ideal for business or social events",
      attribution: "Rory Woolridge",
      featured: true,
    },
    {
      quote:
        "The guys were really engaging and I thought the whole set up was professional and friendly.",
      attribution: "Emma Smith",
      featured: true,
    },
    {
      quote:
        "We really enjoyed using the golf sim at a recent event. The guys who ran it were really engaging and great with the kids. I highly reccomend them and what they can offer.",
      attribution: "Lauren Phipps",
      featured: true,
    },
    {
      quote:
        "Chris and Ryan were great. Interacted with everyone really well. I hope they return as it's a fun bit of competition with great prizes",
      attribution: "David Wilkey",
      featured: true,
    },
    {
      quote:
        "Super fun simulator that would work for both business and pleasure activities. We had great fun at the TUFC fan zone, enjoying some healthy competition amongst friends and family. Chris and Ryan were very helpful, supportive and just fun to be around. The entire experience was great and would highly recommend to anyone hosting a party or networking event. Great idea to help get conversations flowing.",
      attribution: "Luke Moss",
      featured: true,
    },
    {
      quote:
        "Really enjoyed the Golf Sim experience with Ryan & Chris, If your simply looking for ways to improve your game then the simulator is a great way to do this. Also a fantastic opportunity for parties / offices / corporates to take advantage of a fantastic team building session - Ryan & Chris will be at your side for any guidance & support; Highly recommended and looking forward to our next meet up !",
      attribution: "David Spark",
      featured: true,
    },
    {
      quote: "Great simulator experience for any event, much better than one I trialled elsewhere",
      attribution: "Phil Murphy",
      featured: true,
    },
  ],
};
