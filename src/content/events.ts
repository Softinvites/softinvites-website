export type EventHighlight = {
  slug: string;
  title: string;
  /** Left blank where the brief did not specify — the card hides empty fields. */
  date: string;
  location: string;
  services: string[];
  client: string;
  guestSize: string;
  image: string;
  imageAlt: string;
  /** Featured entries appear in the Home page preview grid. */
  featured?: boolean;
};

export const EVENTS: EventHighlight[] = [
  {
    slug: 'chivido-2024',
    title: 'CHIVIDO2024',
    date: 'June 2024',
    location: 'Lagos, Nigeria',
    services: ['Custom QR Code', 'Guest Accreditation'],
    client: 'Zapphaire',
    guestSize: '1,000+',
    image: '/media/events/chivido-2024.jpg',
    imageAlt: 'Guests arriving at CHIVIDO2024 in Lagos',
    featured: true,
  },
  {
    slug: 'thatsodan-anambra',
    title: 'THATSODAN',
    date: '',
    location: 'Uli, Anambra, Nigeria',
    services: ['Guest Access Management', 'Guest Accreditation'],
    client: 'Dr. Bryant (ABC) Orjiakor',
    guestSize: '3,000+',
    image: '/media/events/thatsodan-anambra.jpg',
    imageAlt: 'Accreditation at THATSODAN in Uli, Anambra',
    featured: true,
  },
  {
    slug: 'thatsodan-rome',
    title: 'THATSODAN',
    date: 'July 2025',
    location: 'Rome, Italy',
    services: [
      'RSVP Management',
      'Custom QR Code',
      'Itinerary Design & Management',
      'Virtual Concierge',
    ],
    client: 'Dr. Bryant (ABC) Orjiakor',
    guestSize: '800+',
    image: '/media/events/thatsodan-rome.jpg',
    imageAlt: 'THATSODAN destination celebration in Rome, Italy',
    // Deliberately not featured: this photograph is the home page hero, and
    // showing it again in the grid below would read as a duplicate.
  },
  {
    slug: 'sahara-eoyp-2025',
    title: 'SAHARA EOYP 2025',
    date: 'December 2025',
    location: 'Lagos, Nigeria',
    services: ['Custom QR Code', 'Guest Accreditation'],
    client: 'Cruise Event',
    guestSize: '1,200+',
    image: '/media/events/sahara-eoyp-2025.jpg',
    imageAlt: 'SAHARA end-of-year party guests checking in',
    featured: true,
  },
  {
    slug: 'transcorp-family-fun-day',
    title: 'TRANSCORP FAMILY FUN DAY',
    date: '',
    location: '',
    services: ['Custom QR Code', 'Guest Accreditation'],
    client: 'Cruise Event',
    guestSize: '100+',
    image: '/media/events/transcorp-family-fun-day.jpg',
    imageAlt: 'Transcorp Family Fun Day attendees',
  },
  {
    slug: 'iyelu-atuwatse-iii-70th',
    title: 'IYE-OLU ATUWATSE III 70TH BIRTHDAY',
    date: 'March 2024',
    location: 'Lagos, Nigeria',
    services: ['Guest Access Management', 'Guest Accreditation'],
    client: 'VEE Experience',
    guestSize: '300+',
    image: '/media/events/iyelu-atuwatse-iii-70th.jpg',
    imageAlt: 'Custom QR invitation card for the Iye-Olu Atuwatse III 70th birthday',
    featured: true,
  },
  {
    slug: 'civic-centre-night-of-praise',
    title: 'THE CIVIC CENTRE NIGHT OF PRAISE',
    date: 'December 2025',
    location: 'Lagos, Nigeria',
    services: ['Custom QR Code', 'Guest Accreditation'],
    client: 'Mrs Kay Ovia',
    guestSize: '700+',
    image: '/media/events/civic-centre-night-of-praise.jpg',
    imageAlt: 'The Civic Centre Night of Praise in Lagos',
    featured: true,
  },
  {
    slug: 'sen-akin-odunsi-80th',
    title: 'SEN. AKIN ODUNSI’S 80TH BIRTHDAY',
    date: 'July 2024',
    location: 'Lagos, Nigeria',
    services: ['Custom QR Code', 'Guest Accreditation'],
    client: 'Mrs Tara Olowu',
    guestSize: '150+',
    image: '/media/events/sen-akin-odunsi-80th.jpg',
    imageAlt: 'Senator Akin Odunsi 80th birthday celebration',
    featured: true,
  },
  {
    slug: 'adedamee-turns-40',
    title: 'ADEDAMEE TURNS 40',
    date: 'May 2025',
    location: 'Lagos, Nigeria',
    services: [
      'RSVP Management',
      'Custom QR Code',
      'Itinerary Design & Management',
      'Virtual Concierge',
    ],
    client: 'Koachella Parties',
    guestSize: '200+',
    image: '/media/events/adedamee-turns-40.jpg',
    imageAlt: 'Adedamee Turns 40 celebration in Lagos',
  },
];

export const FEATURED_EVENTS = EVENTS.filter((event) => event.featured);
