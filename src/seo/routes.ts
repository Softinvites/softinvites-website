import { SITE } from '@/content/site';

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  /** Relative to /public. Absolute URL is derived at render time. */
  ogImage?: string;
  /** Excluded from sitemap.xml (e.g. the 404 page). */
  noIndex?: boolean;
  /** Sitemap priority, 0–1. */
  priority?: number;
};

/**
 * The single source of truth for routing + head tags.
 *
 * Read by three consumers:
 *   1. App.tsx      — to build the router
 *   2. Seo.tsx      — to sync the head on client-side navigation
 *   3. prerender.mjs — to bake static HTML + sitemap.xml at build time
 *
 * Adding a page means adding one entry here and one component mapping in App.tsx.
 */
export const ROUTE_META: RouteMeta[] = [
  {
    path: '/',
    title: 'SoftInvites — Tech-Driven Guest Management for World-Class Events',
    description:
      'SoftInvites orchestrates seamless guest experiences and secure access logistics for world-class events — automated e-invitations, RSVP analytics, smart QR access control and international guest accreditation.',
    priority: 1.0,
  },
  {
    path: '/about',
    title: 'About SoftInvites — Guest Management & Event Operations',
    description:
      'A premier, globally minded guest management and event operations firm. From our hub in Lagos, Nigeria to major event destinations worldwide, we make every guest’s journey flawless.',
    priority: 0.8,
  },
  {
    path: '/services',
    title: 'Our Services — E-Invitations, RSVP, QR Access & Concierge | SoftInvites',
    description:
      'Automated communication and e-invitation dissemination, high-velocity RSVP management and analytics, smart QR code access systems, and international guest accreditation with concierge service.',
    priority: 0.9,
  },
  {
    path: '/work',
    title: 'Our Work — Event Highlights | SoftInvites',
    description:
      'Event highlights from CHIVIDO2024, THATSODAN in Rome and Anambra, SAHARA EOYP, The Civic Centre Night of Praise and more — with the services delivered, client and guest size for each.',
    priority: 0.9,
  },
  {
    path: '/testimonials',
    title: 'Testimonials — What Our Clients Say | SoftInvites',
    description:
      'Clients on the QR codes, RSVP coordination, accreditation and concierge service SoftInvites delivered across weddings, corporate events and private celebrations.',
    priority: 0.7,
  },
  {
    path: '/contact',
    title: 'Contact SoftInvites — Lagos, Nigeria & Worldwide',
    description:
      'Talk to SoftInvites about your event. WhatsApp +234 812 877 4556 or +44 7344 398807, or visit us at 56 Moshalashi Street, Shomolu, Lagos.',
    priority: 0.8,
  },
  {
    path: '/404',
    title: 'Page Not Found — SoftInvites',
    description: 'The page you are looking for could not be found.',
    noIndex: true,
  },
];

export const DEFAULT_META = ROUTE_META[0];

export function getRouteMeta(pathname: string): RouteMeta {
  const normalised =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') || '/' : pathname;
  return ROUTE_META.find((route) => route.path === normalised) ?? DEFAULT_META;
}

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE.origin}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}
