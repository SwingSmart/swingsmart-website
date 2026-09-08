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

const SS =
  "https://images.squarespace-cdn.com/content/v1/67b7166d30a09e47db03f71f";

export function ssPhoto(id: string, file: string, alt: string) {
  return {
    url: `${SS}/${id}/${file}?format=2500w`,
    alt,
  };
}

export const photos = {
  homeHero: {
    url: "/brand/hero.jpg",
    alt: "Guests celebrating around a SwingSmart golf cart on the course",
    width: 5120,
    height: 3413,
    hotspot: { x: 0.5, y: 0.44 },
  },
  hero: ssPhoto(
    "6d4af154-3f33-415c-92fd-d78c16a479bc",
    "SwingSmart-Hero-Photos--49.jpg",
    "SwingSmart golf simulator at an event",
  ),
  indoor: ssPhoto(
    "1780065476959-B9PVAG9ELV4UVBNNCMGX",
    "image-asset.jpeg",
    "Golf simulator bay",
  ),
  event: ssPhoto(
    "1777647225589-NFF7YSF43IG1HULWCNUS",
    "image-asset.jpeg",
    "Guests using a SwingSmart bay",
  ),
  night: ssPhoto(
    "1777294528041-KESQJ93RSHA1VEJO1JFS",
    "image-asset.jpeg",
    "Evening golf event",
  ),
  green: ssPhoto(
    "1776351130415-5PJ46RRHYQY7HCIWMPDO",
    "image-asset.jpeg",
    "SwingSmart setup",
  ),
  range: ssPhoto(
    "1774026888837-CZ5VLMBXK230T0HHHX45",
    "image-asset.jpeg",
    "Simulator enclosure",
  ),
  wedding: ssPhoto(
    "1772794659729-1ZZ1KJS1L5L1BX062XFL",
    "image-asset.jpeg",
    "Wedding golf entertainment",
  ),
  junior: ssPhoto(
    "1772205463014-0UF32Y9YVDLODANF1NZ0",
    "image-asset.jpeg",
    "Junior golfers on the simulator",
  ),
  corporate: ssPhoto(
    "1768908911050-ASSUDXEAT4WGE1HD06S7",
    "image-asset.jpeg",
    "Corporate golf event",
  ),
  club: ssPhoto(
    "1768834344504-XYO295AM0J83DEVJ5A3V",
    "image-asset.jpeg",
    "Club and venue hire",
  ),
};
