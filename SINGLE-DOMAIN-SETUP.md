# One domain, two projects

`softinvite.com` serves both the brand website and the web app from a single
origin. Guests never see a second domain, and every existing RSVP URL keeps
working unchanged.

| URL | Served by |
| --- | --------- |
| `softinvite.com/` | **softinvites-web** — brand site home |
| `/about` `/services` `/work` `/testimonials` `/contact` | softinvites-web |
| `/sitemap.xml` `/robots.txt` | softinvites-web |
| `/login` → `/sign-in` | redirect, then the app |
| `/sign-in` `/home` `/event` `/guest` `/rsvp-admin` `/enquiries` `/profile` … | **Softinvites-website-QR** |
| `/r/*` `/rsvp/*` | Softinvites-website-QR |

## How it works

**`softinvites-web` owns the domain.** Its `vercel.json` proxies the app's
routes to `https://softinvites-website-qr.vercel.app` with Vercel rewrites.
A rewrite is a server-side proxy, not a redirect: the visitor's URL bar still
reads `softinvite.com/r/abc123`, and the browser origin stays `softinvite.com`,
so sessions and CORS are unaffected.

```
                softinvite.com  (owned by softinvites-web)
                        │
      ┌─────────────────┴──────────────────┐
      │                                    │
  /  /about  /work  /contact          /sign-in  /home  /r/*  /rsvp/*
  /services /testimonials             /assets/*
      │                                    │
      ▼                                    ▼
 served directly                  proxied to
 (this project)                   softinvites-website-qr.vercel.app
```

## Why this direction

The obvious alternative — leave the domain on the app and proxy the *marketing*
paths in — cannot work, because Vercel gives the filesystem precedence over
rewrites:

> The `source` property should **NOT** be a file because precedence is given to
> the filesystem prior to rewrites being applied.
> — [Vercel docs](https://vercel.com/docs/project-configuration/vercel-json)

The app ships an `index.html`, so a `"source": "/"` rewrite in that project can
never fire — `softinvite.com/` would always resolve to the app no matter what
the config said. This was confirmed live: with those rewrites deployed,
`/about` correctly proxied while `/` still served the app.

Turning it around fixes it. `/` is the brand site's own `index.html`, and none
of the app's routes exist as files in the brand build, so all fourteen rewrites
fire.

## Two invariants

**Proxied paths must not exist as files here.** Same rule that broke the other
direction. None of the app routes collide with the brand build today; verify
after adding pages:

```bash
node -e "
const fs=require('fs'),c=require('./vercel.json');
for(const r of c.rewrites){const p=r.source.replace('/:path*','').replace(/^\//,'');
['dist/'+p,'dist/'+p+'.html','dist/'+p+'/index.html'].forEach(f=>
fs.existsSync(f)&&console.log('COLLISION',r.source,'->',f));}
console.log('checked');"
```

**Asset paths must not collide.** Both are Vite apps. The brand site emits to
`/site-assets/` (`build.assetsDir` in `vite.config.ts`) so it never shadows the
app's `/assets/`, which is proxied. Don't change it back to the default.

## Adding routes

- **New brand page** — nothing to do. It is served directly from this project.
- **New app page** — add a rewrite here, or it won't be reachable on the domain.
  The proxied list is an explicit allowlist so a new brand route can never
  accidentally shadow an app route.

## Trade-offs

- App routes take one extra hop (Vercel edge → Vercel). Tens of milliseconds.
- Two projects to deploy. Brand content ships independently of the app, which is
  the point; only a new *app route* touches both configs.
- Security headers are set here, since this project owns the domain.
- Unknown URLs land on the brand site's 404, which is the right default.

## Rollback

Reassign `softinvite.com` and `www.softinvite.com` back to
`Softinvites-website-QR` in Vercel. Its `vercel.json` is already just the SPA
fallback, so it serves exactly as it did before. DNS never changes — both
projects are on Vercel, so only the project assignment moves.
