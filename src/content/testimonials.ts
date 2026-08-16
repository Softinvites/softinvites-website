export type Testimonial = {
  id: string;
  quote: string;
  service: string;
  event: string;
  image: string;
  imageAlt: string;
  /** Long quotes get a wider card in the masonry layout. */
  feature?: boolean;
};

/**
 * Client identities are withheld under NDA — attribute to the event only.
 */
export const TESTIMONIAL_NOTE =
  'We keep our clients’ identity anonymous based on the NDA agreement.';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'vc-wedding',
    quote: 'Well done, you did a great job with logistics.',
    service: 'RSVP & Guest Management',
    event: '#V&CWEDDING',
    image: '/media/testimonials/vc-wedding.jpg',
    imageAlt: 'Guests at #V&CWEDDING',
  },
  {
    id: 'od-made-to-last',
    quote: 'Thanks, Judith. The QR Code worked beautifully.',
    service: 'Guest Seating Chart Website',
    event: '#ODMADETOLAST',
    image: '/media/testimonials/od-made-to-last.jpg',
    imageAlt: 'Seating chart display at #ODMADETOLAST',
  },
  {
    id: 'chivido-2024',
    quote:
      'It will take a month to unpack everything that happened at #chivido2024 but one of the most impressive things for me was that everyone who would be invited was asked to submit their name, phone number and email and then you would get a mail and a WhatsApp message with your name and a QR code that would be scanned at the event and then a grey wrist tag would be given to you without which you can’t access the event. This is the most organized invitation process I have seen in a long time and it’s by @softinvitesbyshoria — well done 👏🏾👏🏾',
    service: 'Custom QR Code & Guest Management',
    event: '#CHIVIDO2024',
    image: '/media/testimonials/chivido-2024.jpg',
    imageAlt: 'QR code accreditation at #CHIVIDO2024',
    feature: true,
  },
  {
    id: 'everything-af',
    quote:
      'Hi! Thank you for everything this week! It truly was a once in a lifetime experience for me. It was amazing to experience another culture and get the chance to explore all of Lagos. I am so grateful for your team, patience, and all the work you put in this week to make it amazing for the couple and their guests! I wish you the best in all that is ahead for you ♥',
    service: 'Concierge Services & Guest Management',
    event: '#EVERYTHINGAF',
    image: '/media/testimonials/everything-af.jpg',
    imageAlt: 'Concierge team at #EVERYTHINGAF in Lagos',
    feature: true,
  },
  {
    id: 'thatsodan-reception',
    quote:
      'Thanks for all your wonderful coordination. The post-wedding reception was awesome.',
    service: 'RSVP & Custom QR Code',
    event: '#THATSODAN',
    image: '/media/testimonials/thatsodan-reception.jpg',
    imageAlt: 'Post-wedding reception at #THATSODAN',
  },
  {
    id: 'thatsodan-scale',
    quote:
      'Thank you for a great event. Excellent effort and results given the size of the guests.',
    service: 'RSVP & Custom QR Code',
    event: '#THATSODAN',
    // No photograph supplied for this one — TestimonialCard falls back to a
    // quote-only card rather than showing an empty placeholder.
    image: '',
    imageAlt: 'Large guest turnout at #THATSODAN',
  },
];

/**
 * The three shown on the home page. Chosen explicitly rather than by slice so
 * none of them reuses a photograph already on that page (the hero or the
 * featured-events grid).
 */
export const HOME_TESTIMONIALS = ['vc-wedding', 'everything-af', 'od-made-to-last']
  .map((id) => TESTIMONIALS.find((testimonial) => testimonial.id === id))
  .filter((testimonial): testimonial is Testimonial => Boolean(testimonial));
