import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '@/content/site';
import { absoluteUrl, getRouteMeta } from './routes';

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

/**
 * Keeps the document head in sync on client-side navigation.
 *
 * Crawlers get the correct tags without running this — prerender.mjs bakes the
 * same values into each page's static HTML at build time. This exists so that
 * in-app navigation, sharing, and the browser tab stay accurate afterwards.
 */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const canonical = absoluteUrl(meta.path === '/404' ? pathname : meta.path);
    const ogImage = absoluteUrl(meta.ogImage ?? '/media/og-cover.jpg');

    document.title = meta.title;

    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMeta(
      'meta[property="og:description"]',
      'property',
      'og:description',
      meta.description,
    );
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE.name);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMeta(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      meta.description,
    );
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      meta.noIndex ? 'noindex, follow' : 'index, follow',
    );

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [pathname]);

  return null;
}
