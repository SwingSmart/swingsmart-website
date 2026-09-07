# SwingSmart UK — Project Brief

Modern headless CMS website for SwingSmart UK, replacing the current Squarespace site at [swingsmart.co.uk](https://www.swingsmart.co.uk).

This document is the source of requirements for the rebuild. It is written so a non-technical owner can understand what is being built, and so developers can implement it without guessing.

## Goal

Launch a fast, premium, easy-to-edit website that:

- Looks recognisably SwingSmart (dark, green accents, event photography, clean type)
- Improves navigation, hierarchy and mobile experience versus the current site
- Lets a non-technical person update pages, packages, gallery, partners, testimonials and contact details without touching code
- Is ready to host on Vercel with content managed in Sanity

Do **not** copy the Squarespace layout. Use the existing site for brand direction, wording, business facts, services, contact details and imagery.

## Business snapshot

SwingSmart UK brings a professional golf simulator to homes, venues, weddings, corporates, clubs and events. Founded by Chris and Ryan, based in Cornwall. Tagline: **Beyond Golf.** Mission: **bring golf to everyone.**

| Item | Value |
| --- | --- |
| Email | hello@swingsmart.co.uk |
| Phones | +44 (0) 7453 312 916 / +44 (0) 7805 019 849 |
| Location | Cornwall, United Kingdom (headquartered Truro) |
| LinkedIn | https://www.linkedin.com/company/swingsmart-uk |

## Technology (fixed)

| Layer | Choice |
| --- | --- |
| Frontend | Next.js (current stable App Router), TypeScript |
| Styling | Tailwind CSS |
| CMS | Sanity |
| Hosting | Vercel |
| Source control | GitHub |

These choices keep editing simple (Sanity Studio in the browser), keep hosting simple (Vercel), and avoid extra platforms.

**Material decision:** Sanity Studio is embedded in this same Next.js app at `/studio`. One deployment, one login URL for the owner (`yoursite.com/studio`), no separate CMS project to host.

**Material decision:** Until a Sanity project ID is connected, the site still renders from a local content fallback so development and production builds work. After Sanity is connected, all public copy comes from the CMS.

## Visual identity

- Premium, modern, golf/event focused
- Predominantly dark/black backgrounds
- SwingSmart green accents
- White/light typography
- Strong event photography
- Clean type — premium, not gimmicky
- Mobile-first, generous spacing, clear calls to action

Typography: Fraunces for display headings, Manrope for body and UI.

## What the owner can edit in Sanity

- Pages (built from reusable sections)
- Packages
- Gallery images and gallery categories
- Partners
- Testimonials
- Navigation
- Site settings (logo, tagline, default SEO, footer)
- Contact details
- Social links
- SEO per page/package
- Calls to action
- Contact form enquiries (received as Sanity documents)

### Page sections (add, remove, reorder)

Hero, rich text, text and image, image, gallery, partner/logo grid, package grid, feature grid, testimonials, statistics, FAQ, call to action, contact block.

Sanity **Visual Editing** and **live preview** are required so changes can be seen on the real site while editing.

## Site structure

| Path | Page |
| --- | --- |
| `/` | Home |
| `/packages` | Packages |
| `/packages/golfer` | The Golfer |
| `/packages/country-club` | Country Club |
| `/packages/ryder-cup` | The Ryder Cup |
| `/packages/championship` | The Championship |
| `/packages/st-andrews` | St Andrews |
| `/packages/phoenix-open` | Phoenix Open / Weddings |
| `/packages/junior-open` | Junior Open |
| `/packages/build-your-own` | Build Your Own |
| `/gallery` | Gallery |
| `/partnerships` | Partnerships |
| `/about` | About |
| `/contact` | Contact |

Studio: `/studio` (not listed in public navigation).

## Technical requirements

- Responsive, mobile-first
- Strong Core Web Vitals (Next.js Image, font subsetting, minimal JS)
- Accessible HTML, semantic headings, visible focus, form labels
- SEO metadata from Sanity, canonical URLs, Open Graph
- XML sitemap, robots.txt
- Structured data (LocalBusiness / Service / FAQ where appropriate)
- Custom 404
- No hard-coded business content where it belongs in Sanity
- No secrets in Git; `.env.example` documents all variables
- Avoid unnecessary dependencies
- Reusable components for layout and sections

## Out of scope for this first version

- Online payments / booking calendar
- Customer accounts
- Blog (can be added later as another Sanity document type)

Booking is handled by enquiry form + phone/email, matching how the business currently works.
