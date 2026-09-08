# Design system

Source of truth for visual language. Tokens are implemented in `src/app/globals.css` and mapped into Tailwind.

## Audit of the current Squarespace site

### Brand colours
The logo is a **deep turf green** (`#067011` family), not a neon lime. The site itself is mostly **black and white**, with green used as an accent on headlines and the wordmark. Squarespace also injects template greys that dilute the brand.

### Typography
Headlines use **Roboto Slab**. It reads as a default template font: sturdy, a little dated, not hospitality-grade. Body copy is mixed in weight and size; hierarchy is weak because too many lines are bold and centred.

### Green / black / white
The idea is right: dark ground, light type, green as the signal colour. In practice the green is applied as a text colour on busy photos, so it often fights the image. White sections appear mid-page (`sectionTheme: white`) and break the atmosphere.

### Imagery
This is the site’s real asset. There is strong original photography (hero frames, bays, events). Squarespace crops it into stacked full-width bands with heavy overlays (`imageOverlayOpacity: 0.65`), so pictures feel dimmed rather than featured.

### Logo
Left-aligned transparent PNG wordmark: green on dark. It works. It should stay the identity, not be replaced by a typeset “SwingSmart.”

### Navigation
Home, Beyond Golf, Who Are We?, What We Offer, Charity Days, Packages, FAQ’s, Gallery & Reviews, Contact. Too many items, overlapping meaning, Squarespace slugs (`our-mission-2`). Mobile is a long list.

### Homepage messaging
Strong raw lines (“Set the tee time and we’ll be there”, “We don’t even close for rain. Or Mondays”). Buried under stacked sections, centred slogans and repeated CTAs. Unclear who the site is for in the first screenful.

### Calls to action
“Book today” appears without saying what happens next. No single primary action.

### Packages
Good names (The Golfer, Ryder Cup, Phoenix Open…). Hard to compare. Prices exist but are not scannable from the listing.

### About
Warm, human (Chris and Ryan, Cornwall). Feels like a blog post under a template heading.

### Contact
Email and two phone numbers. Form exists. Page is sparse and does not sell confidence to a venue or wedding planner.

### Mobile
Logo + hamburger. Long accordion of the same nav. Photography is still the hero, but type sizes and centred slabs waste vertical space.

### Strengths
Original photography; memorable package names; genuine founder voice; clear contact details; black/green identity is distinctive when it appears.

### Weaknesses
Template layout; too much nav; weak type; green used as decoration rather than structure; photography over-darkened; generic “Book today”; white mid-page bands; no sense of venues, weddings, hotels or exhibitions as audiences.

### Inconsistencies
White vs black sections; accent green vs the darker logo green; page titles vs nav labels; package pages as disconnected Squarespace URLs.

---

## Direction for the rebuild

A **clubhouse after dark**: black, cream type, turf green, photography at full strength. Suitable for corporate events, weddings, hotels, holiday parks, exhibitions, private hire and long-term simulator placements.

Avoid: Inter/Geist SaaS UI, pill buttons, glass, mesh gradients, lime-on-black “tech golf”.

---

## Tokens

### Colour

| Token | Hex | Use |
| --- | --- | --- |
| `bg` | `#070807` | Page background |
| `bg-raised` | `#0E100E` | Header, footer, sticky bars |
| `surface` | `#141614` | Cards, forms, menus |
| `green` | `#0B6E16` | Logo-aligned brand green (fills) |
| `green-mid` | `#2F8F38` | Hover, icons on dark |
| `green-soft` | `#8FBF8C` | Eyebrows, fine rules, focus |
| `cream` | `#F3F0E6` | Primary text, logo lockup on black |
| `muted` | `#9A9589` | Secondary text |
| `rule` | `#2C302C` | Borders, dividers |
| `on-green` | `#F3F0E6` | Text on primary green buttons |

### Typography
- Display: **Cormorant Garamond** (headings) — editorial, hospitality, not slab-template
- Body / UI: **Source Sans 3** — readable, quiet, not a startup grotesque

Scale (approx.): 12 / 14 / 16 / 18 / 24 / 32 / 40 / 56 / 72. Display line-height ~1.05; body 1.6.

### Spacing
4px base. Section padding 64px mobile / 96px desktop. Gutter 20px / 32px.

### Radius
2px controls, 4px cards. No pills.

### Buttons
Primary: green fill, cream label, 2px radius, 14px, slight tracking. Secondary: 1px cream rule, transparent fill. Height ~44px.

### Cards
`surface` fill, 1px `rule` border, no shadow, no blur. Hover: border `green-soft`.

### Images
Full-bleed or edge-to-edge in grid. Overlay only a flat 40% black when type sits on the photo — no stacked gradients. Object-cover, 3:2 or 4:3.

### Widths
Shell **1280px**. Copy **640px**. Header inner matches shell.
