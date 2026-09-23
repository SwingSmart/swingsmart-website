# SwingSmart UK Studio

This is the content editor for the SwingSmart website. It connects to the **existing** Sanity project — it does not create a new one.

| | |
| --- | --- |
| Project | SwingSmart UK |
| Project ID | `3sbwydux` |
| Dataset | `production` |
| Hosted URL | https://swingsmart.sanity.studio |

The website (Next.js on Vercel) reads the same project. Schemas live in `../src/sanity` so the Studio and the website stay in sync.

## For editors

1. Open the Studio (locally at [http://localhost:3333](http://localhost:3333), or the hosted `*.sanity.studio` URL after deploy).
2. Sign in with the Sanity account that has access to SwingSmart UK.
3. Use **Content** on the left:
   - **Pages** — build pages from blocks (hero, text, gallery, packages, contact form, and so on)
   - **Packages** — The Golfer, corporate days, and other offers
   - **Gallery** — photos and the filter categories
   - **Partners** — venues and brands
   - **Testimonials** — quotes
   - **Navigation** — header and footer menu
   - **Site settings** — business name, phone, email, default search text
   - **Enquiries** — messages sent from the website form (read only)
4. Use **Website preview** to see a draft on the live site (needs the website running, plus a viewer token on Vercel).
5. Click **Publish** when you are happy.

You do not need to touch technical fields. Web addresses are created from the title with **Generate**.

## Local development

```bash
cd studio
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3333](http://localhost:3333).

Run the Next.js site in another terminal (`npm run dev` from the repo root) if you want Website preview.

## Deploy to Sanity hosting

Do this only after the project ID and dataset have been confirmed:

```bash
cd studio
npm run deploy
```

That publishes the Studio to `https://swingsmart.sanity.studio`. The first deploy may ask you to confirm the hostname.

Before deploying, add these CORS origins (Allow credentials) in
[project API settings](https://www.sanity.io/manage/project/3sbwydux/api):

- `http://localhost:3000`
- `http://localhost:3333`
- the Vercel / www.swingsmart.co.uk website origin
- `https://swingsmart.sanity.studio`

Do not put tokens in this folder. Tokens stay in the website `.env.local` or Vercel.
