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

export function photo(id: string, alt: string) {
  return {
    url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`,
    alt,
  };
}

export const photos = {
  hero: photo("photo-1535131749006-b7f58c99034b", "Golfer swinging at dusk"),
  indoor: photo("photo-1587174486073-ae95e7d3421b", "Golf course fairway"),
  event: photo("photo-1535131749006-b7f58c99034b", "Golf event atmosphere"),
  night: photo("photo-1459865264687-595d652de67e", "Stadium lights over sport"),
  green: photo("photo-1587174486073-ae95e7d3421b", "Putting green"),
  range: photo("photo-1593111774240-d529f12a0c1c", "Driving range bays"),
  wedding: photo("photo-1519741497674-611481863552", "Wedding celebration"),
  junior: photo("photo-1593111774240-d529f12a0c1c", "Young golfer practising"),
  corporate: photo("photo-1556761175-5973dc0f32e7", "Corporate gathering"),
  club: photo("photo-1535131749006-b7f58c99034b", "Golf club setting"),
};
