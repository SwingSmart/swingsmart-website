# SwingSmart UK website

Premium headless website for [SwingSmart UK](https://www.swingsmart.co.uk): Next.js, Tailwind CSS and Sanity, hosted on Vercel.

Non-technical editors manage pages, packages, gallery, partners, testimonials, navigation and contact details in Sanity Studio at `/studio`.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site renders SwingSmart copy from a built-in fallback until Sanity is connected.

## Connect Sanity (when you are ready)

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Put the project ID and dataset in `.env.local` (see `.env.example`).
3. Create a viewer token (`SANITY_API_READ_TOKEN`) for live preview.
4. Create an editor token (`SANITY_API_WRITE_TOKEN`) so the contact form can save enquiries.
5. In Sanity → API → CORS origins, add `http://localhost:3000` with **Allow credentials**.
6. Restart `npm run dev` and open `/studio`.
7. Optional: `npm run seed` copies starter pages, packages and settings into the Studio.

Until those values are set, `/studio` shows a short setup message and the public site still works.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run seed` | Copy starter content into a connected Sanity project |

## Deploy

Connect this GitHub repository to Vercel. Add the same environment variables in the Vercel project settings. Point `swingsmart.co.uk` at Vercel when you are ready to go live.

See `PROJECT_BRIEF.md` and `IMPLEMENTATION_ROADMAP.md` for the full requirements.
