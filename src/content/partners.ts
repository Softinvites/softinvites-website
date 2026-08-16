export type Partner = {
  name: string;
  /** Logo file under /public. Falls back to a wordmark until supplied. */
  logo: string;
};

/** Logos only — the brief specifies no introductory text for this section. */
export const PARTNERS: Partner[] = [
  { name: 'Zapphaire', logo: '/media/partners/zapphaire.svg' },
  { name: 'VEE Experience', logo: '/media/partners/vee-experience.svg' },
  { name: 'Cruise Event', logo: '/media/partners/cruise-event.svg' },
  { name: 'Koachella Parties', logo: '/media/partners/koachella-parties.svg' },
  { name: 'Coker Creative', logo: '/media/partners/coker-creative.svg' },
  { name: 'Bellissima', logo: '/media/partners/bellissima.svg' },
];
