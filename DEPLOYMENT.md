# Deployment guide

Three projects change together. Deploy them in this order — each step is safe on its own, and nothing user-facing switches until Step 4.

| # | Project | What changes |
| - | ------- | ------------ |
| 1 | `software-Invite-API` | New `/contact` endpoint + admin email notification |
| 2 | `Softinvites-website-QR` | New **Enquiries** page in the dashboard |
| 3 | `softinvites-web` | The brand website itself (new Vercel project) |
| 4 | Vercel dashboard | Move `softinvite.com` onto the brand site |

Guest-facing RSVP URLs (`/r/*`, `/rsvp/*`) stay byte-for-byte identical — they are proxied, not redirected, so nothing already sent to a guest breaks. Only Step 4 is visible to visitors. See [SINGLE-DOMAIN-SETUP.md](./SINGLE-DOMAIN-SETUP.md) for the architecture.

---

## Step 1 — Deploy the API

### 1.1 Set the environment variables

Add these to `software-Invite-API/.env` (and the same values wherever the deployed env lives — Lambda console / `serverless.yml` dotenv / Vercel project settings):

```bash
CONTACT_INBOX_EMAIL=softinvites@gmail.com
CONTACT_FROM_EMAIL=SoftInvites Website <info@softinvite.com>

# Optional — only while testing the brand site on its Vercel preview URL.
# Remove once the site is live on softinvite.com.
EXTRA_CORS_ORIGINS=
```

All have working defaults in code, so the endpoint functions without them — set them anyway so the inbox address is configuration rather than a code edit. See [`.env.example`](../software-Invite-API/.env.example).

**CORS is already configured.** `src/index.ts` allows `https://softinvite.com`, `https://www.softinvite.com`, the localhost dev ports (3039 dashboard, 3040 brand site) and the scanner, answers preflight on every route before any rate limiter or auth can reject it, and logs blocked origins. Since the brand site is served *from* `softinvite.com`, it needs no entry of its own in production.

> **SES check.** Email goes out through `EMAIL_LAMBDA_FUNCTION_NAME` (`sendEmailLambdaFunction`, SES). Sending to a Gmail address requires the SES account to be **out of the sandbox**. It already is, since guest invitations go to arbitrary addresses — but if notifications silently fail, this is the first thing to check. The enquiry is always saved first, so a mail failure never loses data; it is recorded on the record as `notified: false` and shown in the dashboard.

### 1.2 Deploy

```bash
cd software-Invite-API
npm run build          # tsc → dist/
npx serverless deploy  # or your usual deploy command
```

### 1.3 Verify

```bash
API=https://292x833w13.execute-api.us-east-2.amazonaws.com

# Should return 201 and put a message in softinvites@gmail.com
curl -s -X POST "$API/contact" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Deploy Test","email":"you@example.com","eventType":"Test enquiry","message":"Ignore - deployment check"}'

# Should return 400 with field errors
curl -s -X POST "$API/contact" -H 'Content-Type: application/json' -d '{"name":"x"}'

# Should return 401 without a token
curl -s -o /dev/null -w "%{http_code}\n" "$API/contact"
```

Delete the test enquiry from the dashboard once Step 2 is live.

---

## Step 2 — Deploy the web app (Enquiries page)

```bash
cd Softinvites-website-QR
npm run build     # confirm it builds before pushing
```

Push to the branch Vercel deploys. Its `vercel.json` is just the SPA fallback now — the brand site owns the routing.

Verify: sign in, open **Enquiries** in the sidebar, confirm the test enquiry from Step 1.3 appears. Open it, change its status, save, then delete it.

---

## Step 3 — Deploy the brand site

### 3.1 Create the Vercel project

Import `softinvites-web/` as a **new** Vercel project.

- Framework preset: **Vite**
- Build command: `npm run build` (already in `vercel.json`)
- Output directory: `dist`
- Leave the custom domain off until Step 4 — verify on the `*.vercel.app` URL first.

### 3.2 Environment variables

Add both under Settings → Environment Variables, for **Production and Preview** (values are in [`.env.example`](./.env.example); both have safe defaults in code, so a missed variable degrades rather than breaks):

```bash
VITE_API_BASE=https://292x833w13.execute-api.us-east-2.amazonaws.com
VITE_SITE_ORIGIN=https://www.softinvite.com
```

`VITE_SITE_ORIGIN` must match the host the site is actually served from — it drives canonical tags, `sitemap.xml` and JSON-LD. If you ever serve from the apex instead of `www`, change it here and rebuild, or you publish canonicals pointing at a URL that redirects.

### 3.3 Turn off Deployment Protection

Settings → Deployment Protection → make sure **production** is not password-protected. If it is, the proxied app routes fetch an auth page instead of the app.

### 3.4 Verify on the preview URL

Open `https://<your-project>.vercel.app` and check:

- [ ] All six pages load and each has its own browser-tab title
- [ ] Event photographs appear on **Our Work**
- [ ] The WhatsApp button sits at the bottom-left of every page and opens a chat with +234 812 877 4556
- [ ] The contact form submits and the enquiry lands in the dashboard **and** in `softinvites@gmail.com`
- [ ] `/sitemap.xml` and `/robots.txt` load
- [ ] Resize to a phone width — no horizontal scrolling anywhere

> The contact form will fail here with a CORS error, because `*.vercel.app` is not allowlisted — that is expected and correct. It works from `softinvite.com` after Step 4. To test it before then, either run the site locally (`npm run dev` on port 3040, which **is** allowlisted) or set `EXTRA_CORS_ORIGINS=https://<your-project>.vercel.app` on the API and redeploy. No code change needed either way. Clear that variable once Step 4 is done.

---

## Step 4 — Move the domain to the brand site

The brand site takes `softinvite.com`; the app keeps serving its routes through
proxy rewrites already configured in
[`softinvites-web/vercel.json`](./vercel.json), pointed at
`https://softinvites-website-qr.vercel.app`.

> **Why this direction:** Vercel gives the filesystem precedence over rewrites,
> so a `"source": "/"` rewrite in the app project can never fire — it ships an
> `index.html`. See [SINGLE-DOMAIN-SETUP.md](./SINGLE-DOMAIN-SETUP.md).

Steps 4.1–4.3 leave the domain unassigned for a few minutes. Do them
back-to-back, at a quiet hour. RSVP links are down during that window.

### 4.1 Confirm the app answers on its own URL

```bash
for p in /sign-in /home /r/testtoken /rsvp/form/testtoken /favicon.ico; do
  printf "%-24s " "$p"
  curl -s -o /dev/null -w "%{http_code}\n" "https://softinvites-website-qr.vercel.app$p"
done
```

All must be `200`. If any 404s, fix that before touching the domain.

### 4.2 Release the domain from the app

Vercel → **Softinvites-website-QR** → Settings → Domains → remove
`softinvite.com` **and** `www.softinvite.com`. A domain can only belong to one
project at a time.

### 4.3 Assign it to the brand site

Vercel → **softinvites-web** → Settings → Domains → add `www.softinvite.com`,
then `softinvite.com` set to **redirect to** `www.softinvite.com`.

The `www` form must stay canonical: it is what `VITE_SITE_ORIGIN` and every
canonical tag, `sitemap.xml` entry and JSON-LD URL already use. Wait for
**Valid Configuration** and a fresh certificate on both.

DNS does not change — both projects are on Vercel, so only the project
assignment moves.

### 4.4 Verify end to end

```bash
# Brand pages — 200 with distinct titles
for p in "" about services work testimonials contact; do
  curl -s "https://www.softinvite.com/$p" | grep -o "<title>[^<]*</title>"
done

# SEO files
curl -s https://www.softinvite.com/sitemap.xml | head -3
curl -s https://www.softinvite.com/robots.txt

# App routes — proxied, must be 200
curl -sI https://www.softinvite.com/sign-in | grep -i "^HTTP"
curl -sI https://www.softinvite.com/login   | grep -Ei "^(HTTP|location)"   # 307 → /sign-in

# The links that matter — use REAL tokens from a live event
curl -sI https://www.softinvite.com/r/REALTOKEN         | grep -i "^HTTP"
curl -sI https://www.softinvite.com/rsvp/form/REALTOKEN | grep -i "^HTTP"
```

Then, by hand:

- [ ] Submit the contact form at `softinvite.com/contact` — success message appears
- [ ] The enquiry arrives at `softinvites@gmail.com` within a minute
- [ ] It appears in the dashboard under **Enquiries**, marked *new*
- [ ] Replying to the notification email addresses the enquirer, not yourself
- [ ] Open a genuinely old WhatsApp invitation on a phone and walk the RSVP through end to end
- [ ] `softinvite.com` on a phone: header, menu, WhatsApp button, all pages

### 4.4 Search Console

1. Submit `https://www.softinvite.com/sitemap.xml`.
2. Request indexing for the six brand pages.
3. Add `X-Robots-Tag: noindex, nofollow` for the dashboard paths if you want the app kept out of results — the marketing pages are the ones that should rank.

---

## Rollback

Each step reverses independently:

| Step | Rollback |
| ---- | -------- |
| 4 | Reassign `softinvite.com` + `www` back to `Softinvites-website-QR` in Vercel. Its config is already the plain SPA fallback, so it serves exactly as before. DNS never changes. |
| 3 | Delete the Vercel project once Step 4 is rolled back. |
| 2 | Revert the commit. The Enquiries page is additive — no existing route changes. |
| 1 | Revert the commit. `/contact` is a new mount; nothing else touches it. |

Step 4 is the only one visitors notice, and it is a domain reassignment in the dashboard — no code change, no DNS edit.

---

## Troubleshooting

**Contact form returns a CORS error from `softinvite.com`**
`https://www.softinvite.com` and `https://softinvite.com` are both in `allowedOrigins` in `software-Invite-API/src/index.ts`. Confirm the API deploy from Step 1 actually shipped — a stale deploy is the usual cause.

**Form returns 429**
The endpoint allows 5 submissions per IP per 15 minutes. Note that the limiter is in-memory, so on Lambda it is per-container — the real-world limit is looser than 5. That is fine for spam control; for hard limits you would need a shared store.

**Enquiry saved but no email**
Open it in the dashboard — a failed notification shows the SES error on the record. Check `EMAIL_LAMBDA_FUNCTION_NAME` and SES sending limits. The enquiry itself is never lost.

**A brand page 404s in production but works locally**
Its path is missing from the rewrites in the app's `vercel.json`. Marketing routes are an explicit allowlist — see "New brand pages need a rewrite entry" in [SINGLE-DOMAIN-SETUP.md](./SINGLE-DOMAIN-SETUP.md).

**Brand pages return the app's shell instead of the site**
The SPA catch-all `{"source": "/(.*)", "destination": "/"}` is matching first. It must be the **last** entry in the rewrites array.

**Marketing CSS or images 404**
Assets ship under `/site-assets/` and that path needs its rewrite entry. Confirm `build.assetsDir: 'site-assets'` is still set in `softinvites-web/vite.config.ts` — the Vite default would collide with the app's `/assets/`.

**Deploy preview of the brand site shows a Vercel login page**
Deployment Protection is on. Step 3.3.
