# SoftInvites — Brand Website

The public marketing site for SoftInvites. A separate Vercel project from the two existing apps, but served on the **same domain** — no domain swap, no second subdomain:

| Project                  | What it is                          | URLs on `softinvite.com`                            |
| ------------------------ | ----------------------------------- | --------------------------------------------------- |
| `softinvites-web`        | **This project** — brand website     | `/`, `/about`, `/services`, `/work`, `/testimonials`, `/contact` |
| `Softinvites-website-QR` | Admin dashboard + public RSVP forms | `/login`, `/home`, `/guest`, `/r/*`, `/rsvp/*`, …    |
| `qr-scanner`             | Gate check-in scanner               | `softinvite-scan.vercel.app`                         |

The app keeps ownership of the domain and proxies the marketing paths here via Vercel rewrites, so guest-facing RSVP links are completely untouched. See **[SINGLE-DOMAIN-SETUP.md](./SINGLE-DOMAIN-SETUP.md)**.

No backend, no API calls, no auth. Everything renders from static content files.

---

## Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite` — no `tailwind.config.js`; tokens live in `src/styles/global.css` under `@theme`)
- **React Router 6** — multi-page
- **Static prerendering** at build time (see [SEO](#seo)) — every route ships as real HTML

## Commands

```bash
npm install
npm run dev          # dev server on http://localhost:3040
npm run build        # client build → SSR build → prerender to dist/
npm run preview      # serve dist/
npm run typecheck
```

`npm run build` runs three stages:

1. `build:client` — `tsc -b && vite build` → `dist/`
2. `build:ssr` — server bundle → `dist-ssr/entry-server.js`
3. `prerender` — renders each route to static HTML, writes `sitemap.xml` + `robots.txt`

> **Note:** `npm run preview` applies an SPA fallback, so `/about` may serve the home page. That is a quirk of Vite's preview server only — the real files are correct (`dist/about/index.html`), and Vercel serves them properly via `cleanUrls`. To check locally, open `/about/index.html`.

---

## Project shape

```
src/
  content/          ← ALL copy and data. Edit here, not in pages.
    site.ts           brand facts, contact details, nav
    services.ts       the 4 services
    events.ts         event highlights
    testimonials.ts   client quotes
    partners.ts       partner logos
    videos.ts         onsite highlight videos
    metrics.ts        the count-up numbers
  seo/
    routes.ts         route + meta manifest (single source of truth)
    structured-data.ts JSON-LD graph
    Seo.tsx           head sync on client-side navigation
  components/       primitives, cards, header, footer, media
  pages/            Home, About, Services, Work, Testimonials, Contact, NotFound
  assets/media/     ← drop real images and video here
scripts/prerender.mjs
```

**To change copy or add an event/testimonial/partner, edit the relevant file in `src/content/`.** Pages read from those arrays and lay out whatever they find.

---

## Media

**How it works:** content files reference a logical path like `/media/events/chivido-2024.jpg`. That maps to a real file at `src/assets/media/events/chivido-2024.jpg`. `src/lib/assets.ts` resolves it at build time via `import.meta.glob`, so Vite fingerprints, cache-busts and deduplicates it. A missing file is known statically, so the component renders a **designed placeholder** — a labelled cream block at the right aspect ratio — instead of a broken image.

**To supply an asset:** save the file to the path shown in the placeholder's small grey caption, keeping the exact filename. No code change needed. Put files in `src/assets/media/`, *not* `public/` — only `public/` files that need a stable absolute URL (the favicon and the social share image) live there.

### Supplied

| File | Source |
| ---- | ------ |
| `brand/softinvites-logo.png` | The web app's `apple-touch-icon.png`, so both products carry the same mark |
| `hero/hero-primary.jpg` | THATSODAN, Rome |
| `events/chivido-2024.jpg` | CHIVIDO2024 |
| `events/thatsodan-rome.jpg` | THATSODAN, Rome |
| `events/iyelu-atuwatse-iii-70th.jpg` | The custom QR invitation card |
| `events/sahara-eoyp-2025.jpg` | SAHARA M.A.D. Carnival |
| `services/qr-access-management.jpg` | The same QR invitation card — it shows the product directly |
| `testimonials/vc-wedding.jpg`, `od-made-to-last.jpg`, `everything-af.jpg`, `chivido-2024.jpg`, `thatsodan-reception.jpg` | Client photography |
| `public/media/og-cover.jpg` | 1200 × 630 social share card, cropped from the Rome photograph |

All were resized and re-encoded to max 1200–1400px mozjpeg q82 — the largest was 848 KB and is now 82 KB. Keep new files under ~150 KB; the whole media set is currently 0.79 MB.

### Stock — replace when real assets exist

No placeholder blocks remain on any page. These slots are filled with [Pexels](https://www.pexels.com/license/) media (free for commercial use, no attribution required) so the site can ship complete:

| Folder | Files | Replace with |
| ------ | ----- | ------------ |
| `about/` | `about-team.jpg`, `about-primary.jpg` | Your team on site |
| `services/` | `automated-communication.jpg`, `rsvp-management.jpg`, `guest-accreditation.jpg` | Your own screens and desks |
| `events/` | `thatsodan-anambra.jpg`, `transcorp-family-fun-day.jpg`, `civic-centre-night-of-praise.jpg`, `sen-akin-odunsi-80th.jpg`, `adedamee-turns-40.jpg` | **Priority.** Real photography from each event |
| `videos/` | `onsite-accreditation.mp4` + poster, `destination-concierge.mp4` + poster | Your highlight reels |

> **Replace the five event photographs first.** Those cards name a real client and guest size, so a stock image sits under a specific factual claim about work you did. The images chosen are deliberately atmospheric — crowds, table settings, venues — rather than portraits, so nothing reads as "this is the client". Video captions were likewise written to describe the service rather than claim a specific event; make them specific again once real footage is in.

**Partner logos are not stock and never will be.** Fabricating another company's mark would be wrong, so `PartnerMark` renders each partner's name as a serif wordmark until you supply their real logo at `partners/<slug>.svg`. The fallback is designed, not broken — shipping without them is fine.

Testimonials with no photograph (`thatsodan-scale`) render as a quote-only card rather than a placeholder.

**Avoid reusing one photograph twice on the same page.** `thatsodan-rome` is deliberately excluded from `featured` because that image is the home hero, and the home testimonial trio is picked explicitly in `HOME_TESTIMONIALS` for the same reason.

---

## Contact form

`/contact` POSTs to `${VITE_API_BASE}/contact` on the SoftInvites API. The endpoint:

1. Validates with Joi and strips all markup from every field
2. Saves a `ContactMessage` document
3. Emails the admin inbox (`CONTACT_INBOX_EMAIL`, default `softinvites@gmail.com`) with `Reply-To` set to the enquirer

Admins read submissions in the web app under **Enquiries** — filter by status, search, add internal notes, export CSV.

Saving happens before sending, so a mail failure never loses an enquiry; the record carries `notified: false` and the dashboard shows the error. A hidden honeypot field and a 5-per-15-minutes IP rate limit handle spam.

Backend files: [`models/contactMessage.ts`](../software-Invite-API/src/models/contactMessage.ts), [`controllers/contactController.ts`](../software-Invite-API/src/controllers/contactController.ts), [`routes/contactRoutes.ts`](../software-Invite-API/src/routes/contactRoutes.ts).

---

## WhatsApp button

A fixed button sits bottom-left on every page, opening a chat with +234 812 877 4556 and a prefilled greeting. Bottom-**left** is deliberate — it leaves the bottom-right free for mobile browser chrome and any future chat widget. The number label expands on hover for pointer devices and stays collapsed on touch, so it never grows over content on a phone. Source: [`components/WhatsAppFab.tsx`](./src/components/WhatsAppFab.tsx). To change the number, edit `CONTACT.whatsapp` in `src/content/site.ts` — the button uses the first entry.

---

## SEO

The site is statically prerendered, so it does not depend on JavaScript for indexing.

- **Per-page HTML** — `dist/about/index.html`, `dist/work/index.html`, etc. Full rendered markup, not an empty `<div id="root">`.
- **Per-page meta** — title, description, canonical, Open Graph, Twitter card. Defined once in `src/seo/routes.ts`, baked into static HTML by the prerenderer, and re-synced by `src/seo/Seo.tsx` on client-side navigation.
- **JSON-LD** — `Organization`, `WebSite`, `ProfessionalService` (with an `OfferCatalog` of the four services) and an `ItemList` of events on `/` and `/work`. Generated from the same content files, so it can't drift from the visible copy.
- **`sitemap.xml`** and **`robots.txt`** — generated at build with the correct origin.
- **Content is in the markup** — scroll-reveal starts *visible* and only hides once the `js` class is set (see `global.css`), and the metric counters render their final numbers server-side. Crawlers and no-JS visitors get the complete page.
- **Semantics** — one `<h1>` per page, `<address>`, `<figure>`/`<figcaption>` for testimonials, `<dl>` for event metadata, skip link, labelled form fields, `alt` on every image.

### After changing the domain

`SITE.origin` in `src/content/site.ts` drives canonicals, JSON-LD and the sitemap. Update it and rebuild if the canonical host changes (e.g. dropping `www`).

### Adding a page

1. Add an entry to `ROUTE_META` in `src/seo/routes.ts`
2. Add the `<Route>` in `src/App.tsx`
3. Add it to `NAV` in `src/content/site.ts` if it belongs in the header
4. **Add a rewrite for it in `Softinvites-website-QR/vercel.json`** — that project owns the domain and routes marketing paths here by an explicit allowlist (see [SINGLE-DOMAIN-SETUP.md](./SINGLE-DOMAIN-SETUP.md)). Miss this and the new page 404s in production while working fine locally.

The prerenderer and sitemap pick it up automatically from step 1.

---

## Deployment (Vercel)

Import the directory as a new Vercel project — no environment variables required, and **no custom domain on this project**. `vercel.json` sets `framework: vite`, `cleanUrls: true`, and long-lived caching on hashed assets.

Assets build to `/site-assets/`, not Vite's default `/assets/`, so they can't shadow the web app's assets when both are served from `softinvite.com`. Don't change that.

Step-by-step, across all three projects: **[DEPLOYMENT.md](./DEPLOYMENT.md)**. For why the domain works the way it does: **[SINGLE-DOMAIN-SETUP.md](./SINGLE-DOMAIN-SETUP.md)**.

---

## Content notes

Two things in the brief needed a judgement call, both easy to change in `src/content/events.ts`:

- **THATSODAN appears twice** — Uli, Anambra (no date given) and Rome, July 2025. Kept as two separate entries with distinct slugs, since they list different services and guest sizes.
- **Missing date/location** — TRANSCORP FAMILY FUN DAY has neither; the Anambra THATSODAN has no date. `EventCard` hides empty fields rather than printing a dangling separator, so filling them in later needs no code change.

The metric strip shows two additional derived figures (flagship events, planner partners) alongside the 15,000+ guests and 100% execution from the brief. Remove them from `src/content/metrics.ts` if you'd rather keep it to the two.
