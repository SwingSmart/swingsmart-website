# Implementation roadmap

Ordered so the site can be built, previewed and handed over without backtracking.

## Phase 0 — Foundation (this repo)

1. Inspect the empty repository and current live site.
2. Capture requirements in `PROJECT_BRIEF.md`.
3. Initialise Next.js (App Router, TypeScript, Tailwind, ESLint).
4. Add only required packages: Sanity, next-sanity, Portable Text, image URL helper.
5. Configure linting and TypeScript.
6. Design tokens, fonts, base layout, reusable UI primitives.
7. Confirm a production build succeeds.

## Phase 1 — CMS model

1. Sanity config, embedded Studio at `/studio`.
2. Document types: page, package, gallery item, gallery category, partner, testimonial, navigation, site settings, enquiry.
3. Modular page section objects listed in the brief.
4. GROQ queries and typed fetch helpers.
5. Visual Editing, Presentation tool, draft mode, live preview.
6. Seed/fallback content matching live SwingSmart copy.

## Phase 2 — Website UI

1. Header, mobile nav, footer driven by Sanity navigation + settings.
2. Section renderer that maps CMS sections to React components.
3. All public routes in the brief.
4. Package listing and package detail.
5. Filterable gallery.
6. Partnerships, about, contact (form posts enquiries to Sanity when a write token is set).
7. 404 page.

## Phase 3 — SEO and quality

1. Metadata, canonical, Open Graph from Sanity.
2. `sitemap.ts`, `robots.txt`.
3. JSON-LD structured data.
4. Accessibility pass (landmarks, labels, contrast, skip link).
5. Lint, typecheck, production build.

## Phase 4 — Launch (owner / hosting)

1. Create a Sanity project and paste IDs into Vercel env vars (see `.env.example`).
2. Run the seed script once (or paste content in Studio).
3. Connect the GitHub repo to Vercel.
4. Point `swingsmart.co.uk` DNS at Vercel when ready to go live.
5. Train the owner on `/studio` (pages, packages, gallery, settings).

## After launch

- Replace placeholder photography with SwingSmart event photos in the Gallery document type.
- Add real partner logos.
- Optional: Resend (or similar) so enquiry emails also land in the inbox, in addition to Sanity.
