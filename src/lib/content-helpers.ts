import type { PortableBlock } from "./types";

export function block(
  text: string,
  style: string = "normal",
  key?: string,
): PortableBlock {
  const k = key || text.slice(0, 24).replace(/\s+/g, "-").toLowerCase();
  return {
    _type: "block",
    _key: k,
    style,
    children: [{ _type: "span", _key: `${k}-s`, text, marks: [] }],
    markDefs: [],
  };
}

export function photo(
  url: string,
  alt: string,
  width: number,
  height: number,
) {
  return { url, alt, width, height };
}

export const photos = {
  homeHero: {
    url: "/brand/hero.jpg",
    alt: "Guests celebrating around a SwingSmart golf cart on the course",
    width: 5120,
    height: 3413,
    hotspot: { x: 0.5, y: 0.44 },
  },
  about: photo(
    "/migrated/about.webp",
    "Chris and Ryan, SwingSmart’s founding duo, at a golf simulator bay",
    2500,
    2629,
  ),
  offer: photo(
    "/migrated/what-we-offer.webp",
    "Guests using a SwingSmart golf simulator at an outdoor event",
    2500,
    3127,
  ),
  mission: photo(
    "/migrated/beyond-golf.webp",
    "SwingSmart Beyond Golf artwork",
    2500,
    2500,
  ),
  charity: photo(
    "/migrated/charity.webp",
    "SwingSmart charity day artwork",
    1920,
    1221,
  ),
  packagesIndex: photo(
    "/migrated/packages/index.webp",
    "SwingSmart outdoor golf simulator on the course",
    960,
    1280,
  ),
  golfer: photo(
    "/migrated/packages/golfer.webp",
    "Golfer using a SwingSmart simulator",
    2500,
    3333,
  ),
  countryClub: photo(
    "/migrated/packages/country-club.webp",
    "Country Club package golf simulator setup",
    1944,
    1172,
  ),
  ryderCup: photo(
    "/migrated/packages/ryder-cup.jpg",
    "Corporate guests around a SwingSmart bay",
    2500,
    3750,
  ),
  championship: photo(
    "/migrated/packages/championship.webp",
    "Long-term SwingSmart simulator hire in a venue",
    1200,
    675,
  ),
  stAndrews: photo(
    "/migrated/packages/st-andrews.webp",
    "Two-bay SwingSmart competition setup",
    2500,
    1667,
  ),
  phoenixOpen: photo(
    "/migrated/packages/phoenix-open.webp",
    "Wedding guests using a SwingSmart golf simulator",
    1000,
    667,
  ),
  juniorOpen: photo(
    "/migrated/packages/junior-open.webp",
    "Junior golfer on a SwingSmart simulator",
    1179,
    1592,
  ),
  buildYourOwn: photo(
    "/migrated/packages/build-your-own.webp",
    "Custom SwingSmart golf simulator concept",
    1280,
    723,
  ),
  galleryCourse: photo(
    "/migrated/gallery/course-35.webp",
    "SwingSmart event photography on the golf course",
    2500,
    1667,
  ),
  galleryBay: photo(
    "/migrated/gallery/event-bay.webp",
    "Guests at a SwingSmart golf simulator event",
    2048,
    1536,
  ),
  galleryEnclosure: photo(
    "/migrated/gallery/enclosure.webp",
    "SwingSmart simulator enclosure at an event",
    1536,
    2048,
  ),
  galleryTee: photo(
    "/migrated/gallery/tee.webp",
    "Players teeing off on a SwingSmart bay",
    2500,
    2038,
  ),
  galleryEvening: photo(
    "/migrated/gallery/evening.webp",
    "Evening SwingSmart golf event",
    2500,
    1875,
  ),
  gallerySummer: photo(
    "/migrated/gallery/summer.webp",
    "Summer event with a SwingSmart golf simulator",
    1024,
    683,
  ),
  galleryCrowd: photo(
    "/migrated/gallery/crowd.webp",
    "Crowd around a SwingSmart outdoor bay",
    2500,
    3955,
  ),
  galleryHero49: photo(
    "/migrated/gallery/hero-49.webp",
    "SwingSmart golf simulator on a course during an event",
    2500,
    1667,
  ),
  galleryHero52: photo(
    "/migrated/gallery/hero-52.webp",
    "Guests gathered around a SwingSmart outdoor bay",
    2500,
    3750,
  ),
  galleryHero02: photo(
    "/migrated/gallery/hero-02.webp",
    "SwingSmart simulator setup on the golf course",
    2500,
    3750,
  ),
  galleryCountryClub2: photo(
    "/migrated/gallery/country-club-2.webp",
    "Country Club golf simulator at a venue",
    2000,
    1125,
  ),
};

export const publicFaqs = [
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
