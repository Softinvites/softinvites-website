export type Service = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  body: string;
  capabilities: string[];
  /** Path under /public — see README for the asset-swap workflow. */
  image: string;
  imageAlt: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'automated-communication',
    index: '01',
    title: 'Automated Communication & E-Invitation Dissemination',
    summary:
      'We use advanced communication technologies to set a sophisticated tone for your event right from the start.',
    body: 'We professionally disseminate invitations for events ranging from private parties to professional business meetings. Our services offer a sophisticated, convenient way to invite attendees, delivering a memorable, smooth event experience.',
    capabilities: [
      'Designed e-invitations delivered at scale',
      'WhatsApp, email and SMS in a single sequence',
      'Scheduled reminder cycles with send windows',
      'Delivery tracking on every message',
    ],
    image: '/media/services/automated-communication.jpg',
    imageAlt: 'A guest reading a SoftInvites e-invitation on their phone',
  },
  {
    slug: 'rsvp-management',
    index: '02',
    title: 'High-Velocity RSVP Management & Analytics',
    summary:
      'Our automated systems eliminate manual tracking, giving you real-time visibility into your guest list numbers.',
    body: 'We specialise in the seamless distribution of digital invitations, ensuring guests receive their invites promptly via WhatsApp, email and SMS. Our goal is to provide a smooth, efficient and stress-free communication experience for both celebrants and their guests from start to finish.',
    capabilities: [
      'Live RSVP dashboards and headcounts',
      'Automated follow-ups to non-responders',
      'Dietary, plus-one and seating data capture',
      'Exportable reports for planners and caterers',
    ],
    image: '/media/services/rsvp-management.jpg',
    imageAlt: 'RSVP analytics dashboard showing live guest response counts',
  },
  {
    slug: 'qr-access-management',
    index: '03',
    title: 'Smart QR Code Systems & Access Management',
    summary:
      'We bring secure, modern access control to your event gates, removing long queues and protecting your venue.',
    body: 'We customise unique QR codes for event guests, enabling convenient access to event details and exclusive offers. Our customised QR code solutions enhance the guest experience and streamline check-in and accreditation processes.',
    capabilities: [
      'One-time, guest-specific QR codes',
      'Codes styled to your event’s palette',
      'Live gate scanning with instant validation',
      'Duplicate and gate-crasher prevention',
    ],
    image: '/media/services/qr-access-management.jpg',
    imageAlt: 'A guest QR code being scanned at an event entrance',
  },
  {
    slug: 'guest-accreditation-concierge',
    index: '04',
    title: 'International Guest Accreditation & Exquisite Concierge',
    summary:
      'We blend our digital automation with elite, real-world customer service for both local and international attendees.',
    body: 'We offer comprehensive digital guest management services that combine remote assistance — pre-event information and RSVP coordination — with on-site support, accreditation services and exquisite concierge services for both local and out-of-town guests, ensuring a seamless and enjoyable event experience.',
    capabilities: [
      'On-site accreditation desks and warm welcome',
      'Pre-event guest information and itineraries',
      'Travel, transfer and stay coordination',
      'Dedicated concierge for out-of-town guests',
    ],
    image: '/media/services/guest-accreditation.jpg',
    imageAlt: 'SoftInvites team welcoming guests at an accreditation desk',
  },
];
