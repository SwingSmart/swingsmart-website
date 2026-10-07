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

Do **not** use sanity.io/manage → Add studio. That form registers an *external* URL. A `*.sanity.studio` host has to be created by the CLI as **internal**. Using the form (or `sanity deploy --external`) causes:

`sanity.studio domains must be created as "internal"`

1. Close any “Add studio” page in the browser.
2. Open [Studios](https://www.sanity.io/manage/project/3sbwydux/studios) and delete any failed/external SwingSmart studio row.
3. In a terminal, from this `studio` folder (the one in the website repo, not a separate `create-sanity` folder):

```bash
cd studio
npx sanity@latest login
npx sanity@latest deploy --url swingsmart --yes
```

Or `npm run deploy` — same flags. Open **https://swingsmart.sanity.studio** when it finishes.

If `swingsmart` is taken, use:

```bash
npx sanity@latest deploy --url swingsmart-uk --yes
```

Never add `--external`. Never type `.internal` or a full `https://…` URL.

Before deploying, add these CORS origins (Allow credentials) in
[project API settings](https://www.sanity.io/manage/project/3sbwydux/api):

- `http://localhost:3000`
- `http://localhost:3333`
- the Vercel / www.swingsmart.co.uk website origin
- `https://swingsmart.sanity.studio`

Do not put tokens in this folder. Tokens stay in the website `.env.local` or Vercel.
