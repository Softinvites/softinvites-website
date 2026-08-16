import {
  Container,
  CountUp,
  Cta,
  Reveal,
  Section,
  SectionHeading,
} from '@/components/primitives';
import { PageHero } from '@/components/PageHero';
import { Image } from '@/components/Media';
import { PartnerMark } from '@/components/cards';
import { METRICS } from '@/content/metrics';
import { PARTNERS } from '@/content/partners';

const PRINCIPLES = [
  {
    title: 'Creativity',
    body: 'We treat the guest journey as part of the design of the event, not an operational afterthought.',
  },
  {
    title: 'Excellence',
    body: 'Every list, every code, every gate — checked, tested and rehearsed before a single guest arrives.',
  },
  {
    title: 'Discretion',
    body: 'We work under NDA as standard. Our clients’ identities and guest data stay theirs.',
  },
  {
    title: 'Reach',
    body: 'A Lagos hub with the systems and staffing to run events anywhere our clients celebrate.',
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            A guest management firm built for{' '}
            <span className="italic text-bronze-600">world-class events.</span>
          </>
        }
        intro="SoftInvites is a premier, globally minded guest management and event operations firm that orchestrates seamless, tech-driven guest experiences and secure access logistics."
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6">
              <Image
                src="/media/about/about-primary.jpg"
                alt="SoftInvites team managing guest arrivals at an event"
                ratio="portrait"
              />
            </Reveal>

            <Reveal delay={100} className="lg:col-span-6 lg:pt-4">
              <SectionHeading
                eyebrow="Our Story"
                title="We sit at the intersection of modern convenience and elite hospitality."
              />
              <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-500">
                <p>
                  With a passion for creativity and a commitment to excellence, we turn
                  ordinary events into extraordinary experiences, leaving a lasting
                  impression on all who attend.
                </p>
                <p>
                  From our primary hub in Lagos, Nigeria, to major event destinations
                  across the globe, we ensure that every guest’s journey is flawless from
                  the moment they are invited — through the RSVP, the arrival, the gate,
                  and everything in between.
                </p>
                <p>
                  We are a technology-enabled guest experience and event operations
                  innovator. We leverage automation, analytics, QR systems and
                  communication technologies to transform large-scale event coordination
                  across international markets, replacing logistical friction with
                  intelligent digital systems.
                </p>
              </div>
              <div className="mt-10">
                <Cta to="/services" variant="outline">
                  What We Do
                </Cta>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="ink" className="py-16 sm:py-20">
        <Container width="wide">
          <dl className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {METRICS.map((metric, index) => (
              <Reveal
                key={metric.label}
                delay={index * 100}
                className="lg:border-l lg:border-cream-200/12 lg:px-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <dd className="font-display text-5xl text-cream-50">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </dd>
                <dt className="mt-3 font-sans text-[0.6875rem] tracking-[0.18em] text-bronze-400 uppercase">
                  {metric.label}
                </dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="sand">
        <Container width="wide">
          <Reveal>
            <SectionHeading eyebrow="How We Work" title="Four things we never trade away." />
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 80}>
                <div className="border-t border-sand-400 pt-7">
                  <h3 className="text-2xl">{principle.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-500">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <Reveal>
            <ul className="grid grid-cols-2 items-center gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              {PARTNERS.map((partner) => (
                <PartnerMark key={partner.name} partner={partner} />
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
