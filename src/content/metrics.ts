export type Metric = {
  /** Numeric target — drives the count-up animation. */
  value: number;
  /** Rendered after the number, e.g. '+' or '%'. */
  suffix?: string;
  prefix?: string;
  label: string;
  detail: string;
};

export const METRICS: Metric[] = [
  {
    value: 15000,
    suffix: '+',
    label: 'Guests managed',
    detail: 'Accredited, invited and checked in across our events to date.',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Execution rate',
    detail: 'Every event we have taken on has been delivered, start to finish.',
  },
  {
    value: 9,
    suffix: '+',
    label: 'Flagship events',
    detail: 'From private celebrations in Lagos to destination weddings in Rome.',
  },
  {
    value: 6,
    suffix: '',
    label: 'Planner partners',
    detail: 'Trusted by the planners and brands behind the region’s largest events.',
  },
];
