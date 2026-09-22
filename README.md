# Gabriel Ceslov Gallery

Next.js 16 (App Router, plain JS) + Sanity Studio embedded at `/studio`, deployed on Vercel.

## What's in it

| Route | What it shows |
| --- | --- |
| `/artwork/[slug]` | One painting: image(s), size, medium, text, price, Buy. Old `/page/[slug]` URLs redirect here. |
| `/portfolios/[slug]` | A curated, drag-to-reorder set of paintings |
| `/gallery` | All portfolios, then all paintings |
| `/` | The portfolio picked in Site settings (or every painting) |
| `/studio` | Sanity Studio |

**Content model** (`src/sanity/schemaTypes`)
- `artwork`: title, slug, main image (hotspot + alt), more views, year, structured dimensions (in/cm), medium, rich-text description, availability (available / on hold / sold / not for sale), price, optional Buy link (Stripe payment link etc. — falls back to a pre-filled email).
- `portfolio`: title, slug, intro, ordered references to artworks. One painting can live in many portfolios.
- `siteSettings` (singleton): artist name, footer bio, email, menu, home-page portfolio.

**Live updates:** `defineLive` streams published changes to open pages. Publish in the Studio and the site updates in place, no redeploy or refresh.

## Setup (≈15 min)

1. **Create the Sanity project** at sanity.io/manage → New project → dataset `production` (public).
2. `cp .env.example .env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`. For seeding, create an **Editor** token under API → Tokens and put it in `SANITY_API_WRITE_TOKEN`.
3. In sanity.io/manage → API → **CORS origins**, add `http://localhost:3000` with **Allow credentials** checked.
4. ```bash
   npm install
   npm run seed     # uploads "Everything You Are", a starter portfolio, site settings
   npm run dev      # http://localhost:3000/artwork/everything-you-are and /studio
   ```
5. **Vercel:** push to GitHub → Import in Vercel → add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` → Deploy. (Don't add the write token.)
6. Add the Vercel URL (e.g. `https://gabriel-ceslov.vercel.app`) to Sanity **CORS origins** with **Allow credentials**, or `/studio` won't log in.
7. **Invite Gabriel:** sanity.io/manage → Members → Invite → role **Editor**.

The seed image is cropped from a screenshot; replace it in the Studio with the full-resolution file.

## Demo script for the meeting

1. Artwork page open in one window, `/studio` → All paintings → *Everything You Are* in another.
2. Change the price, publish → the page updates on its own.
3. Sales tab → mark **Sold** → the Buy button becomes "Sold / Ask about prints", and it appears in the Studio's *Sold* list.
4. Portfolios → create one, add paintings, drag to reorder → it appears on `/gallery`.
5. Site settings → edit the menu or bio → header/footer update.

## Where it extends next

About / Blog / Contact as a `page` document with modular sections; Presentation tool for click-to-edit previews of drafts; Stripe Checkout with automatic "Sold" via webhook; bulk migration of the existing ~30 paintings with a script like `scripts/seed.js`.
