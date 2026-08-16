export type Highlight = {
  id: string;
  title: string;
  caption: string;
  /** MP4 under /public/media/videos. Empty string renders the placeholder. */
  src: string;
  /** Still frame shown before playback and used as the poster attribute. */
  poster: string;
};

/**
 * Two onsite highlights, per the brief.
 *
 * NOTE: these are currently licensed stock clips standing in for real footage,
 * so the captions describe what we do rather than claiming a specific event.
 * Replace the .mp4 and .jpg files with your own highlight reels and you can
 * make the captions specific again.
 */
export const ONSITE_HIGHLIGHTS: Highlight[] = [
  {
    id: 'onsite-accreditation',
    title: 'Accreditation at scale',
    caption:
      'Thousands of guests through the gate — scanned, tagged and welcomed, without a queue forming behind them.',
    src: '/media/videos/onsite-accreditation.mp4',
    poster: '/media/videos/onsite-accreditation.jpg',
  },
  {
    id: 'destination-concierge',
    title: 'Concierge, end to end',
    caption:
      'Arrivals, transfers, itineraries and multi-day programming, coordinated for guests travelling in from abroad.',
    src: '/media/videos/destination-concierge.mp4',
    poster: '/media/videos/destination-concierge.jpg',
  },
];
