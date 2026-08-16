import { CONTACT, SITE } from '@/content/site';
import { EVENTS } from '@/content/events';
import { SERVICES } from '@/content/services';
import { resolveAsset } from '@/lib/assets';
import { absoluteUrl } from './routes';

/**
 * Logical media paths (/media/…) are build-time handles, not URLs — the real
 * files ship fingerprinted under /site-assets/. Structured data must advertise
 * the URL that actually resolves, and omit the field entirely when no file has
 * been supplied yet rather than pointing crawlers at a 404.
 */
function assetUrl(logicalPath: string): string | null {
  const resolved = resolveAsset(logicalPath);
  return resolved ? absoluteUrl(resolved) : null;
}

function withImage(logicalPath: string) {
  const url = assetUrl(logicalPath);
  return url ? { image: url } : {};
}

/**
 * JSON-LD blocks. Injected into every prerendered page by scripts/prerender.mjs
 * so search engines see them without executing JavaScript.
 */

const organization = {
  '@type': 'Organization',
  '@id': `${SITE.origin}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.origin,
  description: SITE.shortDescription,
  logo: assetUrl('/media/brand/softinvites-logo.png') ?? absoluteUrl('/apple-touch-icon.png'),
  sameAs: [CONTACT.instagram.url],
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.area,
    addressRegion: CONTACT.address.city,
    addressCountry: 'NG',
  },
  contactPoint: CONTACT.whatsapp.map((number) => ({
    '@type': 'ContactPoint',
    telephone: number.e164,
    contactType: 'customer service',
    areaServed: ['NG', 'GB', 'Worldwide'],
    availableLanguage: ['English'],
  })),
  areaServed: 'Worldwide',
};

const professionalService = {
  '@type': 'ProfessionalService',
  '@id': `${SITE.origin}/#service`,
  name: SITE.name,
  url: SITE.origin,
  parentOrganization: { '@id': `${SITE.origin}/#organization` },
  priceRange: '$$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Guest management and event operations',
    itemListElement: SERVICES.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.summary,
        url: `${SITE.origin}/services#${service.slug}`,
      },
    })),
  },
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE.origin}/#website`,
  url: SITE.origin,
  name: SITE.name,
  publisher: { '@id': `${SITE.origin}/#organization` },
};

/** Portfolio list — helps the /work page surface as a rich result. */
const portfolio = {
  '@type': 'ItemList',
  '@id': `${SITE.origin}/work#portfolio`,
  name: 'SoftInvites event highlights',
  itemListElement: EVENTS.map((event, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Event',
      name: event.title,
      ...(event.location
        ? { location: { '@type': 'Place', name: event.location } }
        : {}),
      description: `${event.services.join(', ')} for ${event.client}. ${event.guestSize} guests.`,
      ...withImage(event.image),
    },
  })),
};

export function structuredDataFor(pathname: string) {
  const graph: Record<string, unknown>[] = [organization, website];

  if (pathname === '/' || pathname === '/services' || pathname === '/contact') {
    graph.push(professionalService);
  }
  if (pathname === '/' || pathname === '/work') {
    graph.push(portfolio);
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
