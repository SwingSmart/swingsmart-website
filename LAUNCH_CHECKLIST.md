# Launch checklist — swingsmart.co.uk

Use this list when you are ready to point **www.swingsmart.co.uk** at the new Vercel site.  
Do **not** switch the domain until every box in sections 1–6 is ticked.

The live Squarespace site stays up until the DNS step. This document does not change it.

---

## What must stay untouched

SwingSmart email (**hello@swingsmart.co.uk** and any other mailboxes) is **not** hosted by the website.

Before anyone edits DNS, export or screenshot **every** DNS record, especially:

- **MX** (mail delivery)
- **TXT** (SPF, and any Google / Microsoft verification)
- **CNAME** records used for email, for example `autodiscover`, `mail`, `email`, or DKIM names like `google._domainkey`
- Nameservers (do not change these unless a DNS expert has a written plan)

If a record is not an **A**, **AAAA**, or **CNAME** for the website (`@` / `www`), leave it alone.

---

## 1. Vercel project

- Create (or open) the SwingSmart project on Vercel, connected to this GitHub repository, production branch agreed with the developer.
- In Vercel → Settings → Environment Variables, set **Production** values:

  | Name | Value |
  | --- | --- |
  | `NEXT_PUBLIC_SITE_URL` | `https://www.swingsmart.co.uk` |
  | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `3sbwydux` |
  | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
  | `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-02-19` |
  | `SANITY_API_READ_TOKEN` | Viewer token from Sanity → API → Tokens |
  | `SANITY_API_WRITE_TOKEN` | Editor token (needed so the contact form can save enquiries) |

- Do **not** paste tokens into GitHub, Slack, or email.
- Trigger a Production deployment and wait until it is green.
- Open the Vercel URL (something like `swingsmart-website.vercel.app`) and walk the site: Home, Packages, a package page, Gallery (filters + lightbox), Partnerships, Charity, FAQs, About, Contact.

## 2. Sanity content (must be done before DNS)

The public Sanity project currently only has a stub Home page. The new site can show fallback copy, but **published Studio content should be in place** so editors are not surprised after launch.

- Add `https://www.swingsmart.co.uk` (and the Vercel preview URL) to Sanity → API → CORS origins, with **Allow credentials**.
- Run the migration with a write token (developer): `node scripts/migrate-from-squarespace.mjs`
- In [sanity.io/manage](https://www.sanity.io/manage), open the SwingSmart project → Vision or Studio and confirm:
  - Pages exist for Home, Packages, Gallery, Partnerships, About, Contact, Charity, FAQs
  - All eight hire packages exist
  - Gallery categories and photos exist
  - Partners exist
  - Site settings show **hello@swingsmart.co.uk** and the two phone numbers
- Open `/studio` on the Vercel URL, use **Website preview**, and check that a draft change appears.
- Click **Publish** on anything that should be live. Unpublished drafts will not show on the public site.

## 3. Contact form

- On the Vercel URL, send a test enquiry from `/contact`.
- In Studio → Enquiries, confirm it arrived.
- Reply from **hello@swingsmart.co.uk** and check that mail still works **before** DNS is changed.

If the form says enquiries are unavailable, the write token is missing — stop and fix that before launch.

## 4. Add the domain on Vercel (DNS not switched yet)

- Vercel → Settings → Domains → add `www.swingsmart.co.uk` and `swingsmart.co.uk`.
- Set **www.swingsmart.co.uk** as the primary domain.
- Ask Vercel to redirect the bare domain (`swingsmart.co.uk`) **to** `www.swingsmart.co.uk`.
- Copy the DNS values Vercel shows (usually a **CNAME** for `www` to `cname.vercel-dns.com`, and **A** records for the root).
- Do **not** change DNS yet. SSL will not fully activate until the next step.

## 5. Switch only the website DNS

Do this in the same place the domain is already managed (often Squarespace Domains, or the registrar). Prefer **editing records** over changing nameservers.

1. Confirm the MX / TXT / email CNAME records from the start of this document are still present.
2. For **www**: set a **CNAME** to the host Vercel gave you (`cname.vercel-dns.com` unless Vercel showed something else). Remove any old Squarespace www CNAME / A record.
3. For the root (`@` / `swingsmart.co.uk`): set the **A** (and **AAAA** if Vercel lists them) records Vercel showed. Remove Squarespace website A records only.
4. Wait 15–60 minutes (sometimes longer).
5. Visit `https://www.swingsmart.co.uk` in a private browser window.
6. Confirm the padlock is valid (certificate issued to the domain).
7. Send yourself another email to **hello@swingsmart.co.uk**. If mail fails, revert the website A / CNAME changes immediately — the MX records were probably overwritten. Restore them from the screenshot.

Squarespace may still show the old site on their own preview URL. That is fine. In Squarespace, disconnect or unpublish the custom domain **after** www is serving the new site, so Google does not see two competing sites.

## 6. Checks on the live domain (after DNS)

Open these on **www.swingsmart.co.uk** (not the old Squarespace preview):

- Home, Packages, Gallery, Partnerships, Contact
- An old Squarespace link, for example `/our-mission-2` — it must land on the Golfer package, **not** a 404 and **not** a generic homepage dump
- `/home` → Home
- `/gallery-reviews` → Gallery
- `/our-mission` → About
- Phone numbers start a call on a phone
- Email links open a message to **hello@swingsmart.co.uk**
- Contact form still saves in Studio
- `https://www.swingsmart.co.uk/robots.txt` allows the site and lists the sitemap
- `https://www.swingsmart.co.uk/sitemap.xml` lists https://www.swingsmart.co.uk addresses (never localhost)
- View page source: canonical and Open Graph URLs start with `https://www.swingsmart.co.uk`

## 7. Google and leftover Squarespace

- Google Search Console → add/confirm `https://www.swingsmart.co.uk` if needed → submit `https://www.swingsmart.co.uk/sitemap.xml`
- Do not delete the Squarespace site for a few weeks. Keep it unpublished or domain-disconnected so it is a rollback if DNS is reversed.
- Old `/our-mission-…` addresses are 301 redirected on purpose. They should not be redirected all-to-home.

## Old address → new address

These are already built into the website. You do not add them in Squarespace.

| People used to visit | They now land on |
| --- | --- |
| `/` | Home |
| `/home` | Home |
| `/about` | About |
| `/contact` | Contact |
| `/our-mission` | About |
| `/our-mission-1` | Home (that page’s offer copy now lives on Home) |
| `/our-mission-1-1` | Packages |
| `/our-mission-2` | The Golfer |
| `/our-mission-2-1` | Country Club |
| `/our-mission-2-2` | The Ryder Cup |
| `/our-mission-2-2-1` | Phoenix Open |
| `/our-mission-2-2-2` | Championship |
| `/our-mission-2-2-3` | St Andrews |
| `/our-mission-2-2-2-1` | Junior Open |
| `/our-mission-2-2-3-1` | Build Your Own |
| `/our-mission-3` | Charity |
| `/our-mission-3-1` | FAQs |
| `/gallery-reviews` | Gallery |

`/config` and `/search` were Squarespace system pages, blocked from Google. They are not redirected.

New pages that did not exist on Squarespace: `/packages`, `/partnerships`, `/gallery`, `/faq`, `/charity`, and the individual `/packages/…` URLs.

---

## Do not launch yet if

- The Vercel production build is red
- `NEXT_PUBLIC_SITE_URL` is missing or still says localhost
- The contact form does not create an Enquiry in Studio
- Sanity still only shows the stub “Golf from the CMS” homepage **and** nobody has checked that fallback copy is acceptable
- MX records were deleted
- `swingsmart.co.uk` (no www) is not set to redirect to www

When every box in sections 1–6 is ticked, the domain cutover is ready. Until then, leave Squarespace as the live site.
