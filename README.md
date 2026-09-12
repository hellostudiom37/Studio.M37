# Studio M.37

Graphic & brand design studio website. Next.js (App Router) + Tailwind CSS v4 + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run dev` and `npm run build` both automatically run `npm run sync`
first, which regenerates the portfolio data and re-processes anything in `source-assets/` — see
below. Run it manually any time with:

```bash
npm run sync
```

## Adding / editing portfolio projects

Each project lives in its own folder under `content/projects/`:

```
content/projects/
  project1/
    project1_name.txt            <- the name shown on the card
    project1_link.txt            <- the Behance URL it links to
    project1_preview_image/      <- drop one or more images here
  project2/
    ...
```

To add a fourth project, duplicate the pattern as `project4/` with `project4_name.txt`,
`project4_link.txt` and `project4_preview_image/`. Re-run `npm run sync` (or just restart
`npm run dev` / redeploy) and it appears on the Home and Portfolio pages automatically, linking
out to Behance with the image as the hover preview.

## Adding the logo / founder photo

Drop files into `source-assets/`:

- Anything with **"logo"** in the filename → copied to `public/logo.svg` (or `.png`), recolorable
  via CSS (used black in the nav, off-white in the footer).
- Any other image file → treated as the founder portrait, smart-cropped to a 3:4 vertical and
  written to `public/images/founder.jpg` for the Studio page.

Both are picked up next time `npm run sync` runs.

## Fonts

- **Delight** (SemiBold / Light) — brand typeface, loaded from `public/fonts/`.
- **Instrument Serif** — italic display accent, loaded from Google Fonts via `next/font`.

## Enquiry page

`/enquiry` is a fully custom-styled form (see `src/components/EnquiryForm.tsx`) that submits
straight to your existing Google Form's backend — so responses still land in the same Google
Sheet / response tab as before, no separate inbox to check.

**One-time setup in Google Forms:** open the form → Responses tab → the three-dot menu → "Get
email notifications for new responses". That's what makes responses land in your Gmail; it's a
setting on the form itself, not something the website controls.

If you ever add, remove or reorder questions in the Google Form, the `entry.XXXXXXX` field IDs
hardcoded in `EnquiryForm.tsx` will no longer match — re-extract them by opening the form's
"Get pre-filled link" option (or viewing the page source) for each field and updating the
`FIELDS` array.

## Deployment

**Vercel (recommended):**

```bash
npx vercel
```

Follow the prompts (log in, link/create a project). Vercel builds with `npm run build`, which
runs the sync step automatically, so `content/projects/` and `source-assets/` just need to be
committed to the repo.

**GitHub:** push this repo to GitHub, then import it at vercel.com/new — same build behavior.

## Project structure

```
src/app/            pages (Home, /studio, /portfolio, /enquiry) + layout + fonts
src/components/      Nav, Footer, Logo, ProjectCard, Reveal (scroll animation), etc.
src/lib/assets.ts     server-side helpers checking which optional assets exist
scripts/              sync-projects.mjs + prepare-assets.mjs (see above)
content/projects/     source of truth for portfolio entries (not shown directly on the web)
source-assets/        drop-zone for the logo + founder photo
```
