# One domain, two projects

`softinvite.com` serves both the brand site and the web app, with **no domain swap, no DNS change, and no change whatsoever to guest-facing RSVP links.**

| URL                              | Served by                              |
| -------------------------------- | -------------------------------------- |
| `softinvite.com/`                | `softinvites-web` (brand site)          |
| `softinvite.com/about`, `/services`, `/work`, `/testimonials`, `/contact` | `softinvites-web` |
| `softinvite.com/login` → `/sign-in` | `Softinvites-website-QR` (web app)   |
| `softinvite.com/home`, `/event`, `/guest`, `/rsvp-admin`, … | `Softinvites-website-QR` |
| `softinvite.com/r/*`, `/rsvp/*`  | `Softinvites-website-QR` — **unchanged** |

## How it works

The two projects stay separate. **`Softinvites-website-QR` keeps the domain** — it is never removed from that Vercel project — and proxies the marketing paths to the brand site using Vercel rewrites.

```
                    softinvite.com  (owned by Softinvites-website-QR)
                            │
        ┌───────────────────┼────────────────────┐
        │                   │                    │
   /  /about  /work    /login /home         /r/*  /rsvp/*
   /services /contact  /guest /event
   /testimonials
        │                   │                    │
        ▼                   ▼                    ▼
  proxied to the      served directly      served directly
   brand site          by the app           by the app
                                          ← untouched, zero risk
```

A rewrite is a server-side proxy, not a redirect. The visitor's URL bar shows `softinvite.com/about`; Google sees `softinvite.com/about` returning 200 with full HTML. There is no second domain anywhere.

**Why this direction and not the reverse.** The brand site is new and replaceable; the RSVP paths carry links already sitting in thousands of delivered WhatsApp threads, plus URLs hardcoded into Meta-approved Twilio Content templates ([`whatsappTemplateController.ts:97-121`](../software-Invite-API/src/controllers/whatsappTemplateController.ts#L97-L121)). Putting the *new* thing behind the proxy and leaving the *proven* thing on its direct path means a marketing misconfiguration can never take down an invitation.

## Setup

### 1. Deploy the brand site as its own Vercel project

Import `softinvites-web/`. **Do not add a custom domain to it.** Let it live at its `*.vercel.app` URL. Note the production URL — something like `softinvites-web.vercel.app`.

Check that Deployment Protection is off for its production deployment (Settings → Deployment Protection). If production is password-protected, the proxy gets an auth page instead of the page.

### 2. Point the rewrites at it

In [`Softinvites-website-QR/vercel.json`](../Softinvites-website-QR/vercel.json), replace every `https://softinvites-web.vercel.app` with the real production URL from step 1.

### 3. Deploy the web app

Redeploy `Softinvites-website-QR`. That's the whole cutover — one deploy of a project that already owns the domain.

### 4. Verify

```bash
# Brand pages — 200, each with its own title
for p in "" about services work testimonials contact; do
  curl -s "https://www.softinvite.com/$p" | grep -o "<title>[^<]*</title>"
done

# SEO files
curl -s https://www.softinvite.com/sitemap.xml | head -3
curl -s https://www.softinvite.com/robots.txt

# App still served directly — these must NOT be proxied
curl -sI https://www.softinvite.com/sign-in | grep -i "^HTTP"
curl -sI https://www.softinvite.com/login   | grep -Ei "^(HTTP|location)"   # 307 → /sign-in

# The links that matter. Use REAL tokens from a live event.
curl -sI https://www.softinvite.com/r/REALTOKEN         | grep -i "^HTTP"
curl -sI https://www.softinvite.com/rsvp/form/REALTOKEN | grep -i "^HTTP"
```

Then open an old WhatsApp invitation on a phone and walk the RSVP through end to end. A `curl` is not the same as a guest's in-app browser.

## Things that must stay true

**Asset paths must not collide.** Both projects are Vite apps. The brand site is configured to emit to `/site-assets/` (`build.assetsDir` in [`vite.config.ts`](./vite.config.ts)) precisely so it never shadows the app's `/assets/`. Do not change it back to the default.

**The SPA catch-all stays last.** In the app's `vercel.json`, `{"source": "/(.*)", "destination": "/"}` matches everything. Vercel takes the first matching rewrite, so every marketing path must be listed above it.

**New brand pages need a rewrite entry.** Adding, say, `/faq` to the brand site means adding one line to the app's `vercel.json` too. This is deliberate — an allowlist means a new marketing route can never accidentally shadow an app route.

**Unknown URLs land on the app's 404**, not the brand site's, because the catch-all owns everything unlisted. Cosmetic; fix it by giving the app's 404 page a link home if it bothers you.

## What this avoids

Compared with splitting onto `app.softinvite.com`:

- No DNS edits, no TTL lowering, no certificate wait, no window where the domain is unassigned
- No CORS allowlist change in `software-Invite-API` — the browser origin is still `softinvite.com`
- No redirect layer for legacy `/r/*` and `/rsvp/*` links; they are served directly, as now
- No Twilio Content template concern at all
- No `FRONTEND_URL` change, so nothing in the scheduler or RSVP link generation moves
- Sessions stay on one origin — no cross-subdomain cookie or JWT questions
- Rollback is deleting the rewrites block and redeploying

## Trade-offs, honestly

- **One extra network hop** for marketing pages (Vercel edge → Vercel). Tens of milliseconds, and the HTML is static and cacheable.
- **Two deploys to think about.** Marketing content changes deploy independently — which is the upside — but a new *route* touches both configs.
- **Security headers should be set once, by the domain owner.** HSTS and `X-Frame-Options` belong in the app's `vercel.json`, not the brand site's, since the app owns the domain.
- **Analytics** will see one origin for both, which is usually what you want. Segment by path.

## If you would rather truly merge them

Folding the marketing pages into `Softinvites-website-QR` as extra React Router routes is possible but costs more than it saves:

- The app is a client-rendered SPA with an auth context. **Prerendering it for SEO is a real refactor**, and SEO is the entire reason this site exists.
- Tailwind v4's preflight and MUI v5's `CssBaseline` fight over the same base styles.
- Marketing visitors would sit behind the app's bundle and auth bootstrap.
- Every copy tweak would redeploy the production guest-management app.

The proxy gets the same single-domain result with none of that.
