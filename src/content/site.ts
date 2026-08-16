/**
 * Brand-level facts and contact details.
 * Single source of truth — pages read from here, never hardcode.
 */

export const SITE = {
  name: 'SoftInvites',
  legalName: 'SoftInvites Company Limited',
  /**
   * Canonical origin — drives canonical tags, sitemap.xml and JSON-LD.
   * Override with VITE_SITE_ORIGIN. No trailing slash.
   */
  origin: (import.meta.env.VITE_SITE_ORIGIN || 'https://www.softinvite.com').replace(
    /\/$/,
    '',
  ),
  /**
   * SoftInvites API. Enquiries from the contact form POST to `${API_BASE}/contact`,
   * land in the ContactMessage collection, and are read by admins in the
   * dashboard under Enquiries. Override with VITE_API_BASE.
   */
  apiBase:
    import.meta.env.VITE_API_BASE ||
    'https://292x833w13.execute-api.us-east-2.amazonaws.com',
  tagline: 'Guest management, quietly perfected.',
  shortDescription:
    'A globally minded guest management and event operations firm orchestrating seamless, tech-driven guest experiences and secure access logistics for world-class events.',
} as const;

export const CONTACT = {
  instagram: {
    label: '@softinvites',
    url: 'https://www.instagram.com/softinvites/',
  },
  whatsapp: [
    { label: '+234 812 877 4556', e164: '+2348128774556' },
    { label: '+44 7344 398807', e164: '+447344398807' },
  ],
  address: {
    street: '56 Moshalashi Street',
    area: 'Shomolu',
    city: 'Lagos',
    country: 'Nigeria',
    full: '56, Moshalashi Street, Shomolu, Lagos, Nigeria.',
  },
} as const;

export const NAV = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Work', to: '/work' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
] as const;

export function whatsappLink(e164: string, message?: string) {
  const digits = e164.replace(/\D/g, '');
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${query}`;
}
