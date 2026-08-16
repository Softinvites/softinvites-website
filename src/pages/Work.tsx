import {
  Container,
  Cta,
  Reveal,
  Section,
  SectionHeading,
} from '@/components/primitives';
import { PageHero } from '@/components/PageHero';
import { EventCard, PartnerMark } from '@/components/cards';
import { Video } from '@/components/Media';
import { EVENTS } from '@/content/events';
import { ONSITE_HIGHLIGHTS } from '@/content/videos';
import { PARTNERS } from '@/content/partners';

export default function Work() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={
          <>
            Event highlights, and the{' '}
            <span className="italic text-bronze-600">operations behind them.</span>
          </>
        }
        intro="Each entry lists the services we delivered, the planner or client we delivered them with, and the guest size we carried."
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((event, index) => (
              <Reveal key={event.slug} delay={(index % 3) * 90}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink" id="onsite" className="scroll-mt-20">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Onsite Events"
              title="How it looks on the ground."
              intro="Two highlights from live event operations — gate management, accreditation and concierge in motion."
              inverted
            />
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {ONSITE_HIGHLIGHTS.map((highlight, index) => (
              <Reveal key={highlight.id} delay={index * 120}>
                <Video
                  src={highlight.src}
                  poster={highlight.poster}
                  title={highlight.title}
                />
                <h3 className="mt-6 text-2xl text-cream-50">{highlight.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-200/60">
                  {highlight.caption}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand" className="py-16 sm:py-20">
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

      <Section className="py-20 sm:py-24">
        <Container width="narrow" className="text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl">Your event could be next.</h2>
            <div className="mt-10">
              <Cta to="/contact">Plan Your Event</Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
