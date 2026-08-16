/**
 * Static prerender.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * For every route in src/seo/routes.ts it renders the React tree to HTML and
 * writes a real .html file, so every page is fully crawlable without
 * JavaScript. It also emits sitemap.xml and robots.txt.
 *
 * Output shape (dist/):
 *   index.html            → /
 *   about/index.html      → /about
 *   services/index.html   → /services
 *   ...
 *   404.html              → Vercel's not-found page
 *   sitemap.xml
 *   robots.txt
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js');

const { render, routeMeta, siteOrigin } = await import(pathToFileURL(ssrEntry).href);

/**
 * Prerendering overwrites dist/index.html, which would destroy the template on
 * a second run. Stash the pristine copy beside the SSR bundle the first time so
 * `npm run prerender` stays re-runnable without a full rebuild.
 */
const templateCache = join(root, 'dist-ssr', 'template.html');

let template = await readFile(join(distDir, 'index.html'), 'utf8');

if (template.includes('<!--seo-->')) {
  await writeFile(templateCache, template, 'utf8');
} else {
  template = await readFile(templateCache, 'utf8').catch(() => {
    throw new Error(
      'dist/index.html has already been prerendered and no template cache exists. Run `npm run build:client` first.',
    );
  });
}

if (!template.includes('<!--seo-->')) {
  throw new Error('index.html is missing the <!--seo--> placeholder');
}
if (!template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing <div id="root"></div>');
}

/* ------------------------------------------------------------------ pages */

const written = [];

for (const route of routeMeta) {
  const { html, head } = render(route.path);

  const page = template
    .replace('<!--seo-->', head)
    // The static <title> in the template is a dev-mode fallback; the injected
    // head above carries the real one, so drop the duplicate.
    .replace(
      /\n\s*<title>SoftInvites — Tech-Driven Guest Management for World-Class Events<\/title>/,
      '',
    )
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outPath =
    route.path === '/'
      ? join(distDir, 'index.html')
      : route.path === '/404'
        ? join(distDir, '404.html')
        : join(distDir, route.path.slice(1), 'index.html');

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, page, 'utf8');
  written.push(route.path);
}

/* --------------------------------------------------------------- sitemap */

const lastmod = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routeMeta
  .filter((route) => !route.noIndex)
  .map(
    (route) =>
      `  <url>\n    <loc>${siteOrigin}${route.path === '/' ? '/' : route.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${(route.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');

/* ---------------------------------------------------------------- robots */

const robots = `User-agent: *
Allow: /

Sitemap: ${siteOrigin}/sitemap.xml
`;

await writeFile(join(distDir, 'robots.txt'), robots, 'utf8');

console.log(
  `\n✓ Prerendered ${written.length} pages: ${written.join(', ')}\n✓ sitemap.xml + robots.txt written for ${siteOrigin}\n`,
);
