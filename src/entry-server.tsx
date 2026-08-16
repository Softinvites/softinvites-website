import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { ROUTE_META, absoluteUrl, getRouteMeta } from './seo/routes';
import { structuredDataFor } from './seo/structured-data';
import { SITE } from './content/site';

export type RenderResult = {
  html: string;
  head: string;
};

function escapeAttr(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Builds the full <head> block for one route: meta, OG, canonical, JSON-LD. */
function renderHead(pathname: string) {
  const meta = getRouteMeta(pathname);
  const canonical = absoluteUrl(meta.path);
  const ogImage = absoluteUrl(meta.ogImage ?? '/media/og-cover.jpg');
  const jsonLd = JSON.stringify(structuredDataFor(meta.path)).replace(/</g, '\\u003c');

  return [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="${meta.noIndex ? 'noindex, follow' : 'index, follow'}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:locale" content="en_NG" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}

export function render(pathname: string): RenderResult {
  const html = renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>,
  );

  return { html, head: renderHead(pathname) };
}

/** Consumed by scripts/prerender.mjs to know which pages to emit. */
export const routes = ROUTE_META.map((route) => route.path);
export const routeMeta = ROUTE_META;
export const siteOrigin = SITE.origin;
