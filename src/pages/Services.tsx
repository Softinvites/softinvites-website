import { Container, Cta, Reveal, Section } from '@/components/primitives';
import { PageHero } from '@/components/PageHero';
import { Image } from '@/components/Media';
import { SERVICES } from '@/content/services';

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Tech-enabled event operations,{' '}
            <span className="italic text-bronze-600">end to end.</span>
          </>
        }
        intro="By replacing logistical friction with intelligent digital systems, we ensure a seamless journey for your guests and flawless execution for your event."
      />

      {SERVICES.map((service, index) => {
        const reversed = index % 2 === 1;

        return (
          <Section
            key={service.slug}
            id={service.slug}
            tone={reversed ? 'sand' : 'cream'}
            className="scroll-mt-20"
          >
            <Container width="wide">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
                <Reveal
                  className={`lg:col-span-6 ${reversed ? 'lg:order-2' : ''}`}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    ratio={reversed ? 'landscape' : 'portrait'}
                  />
                </Reveal>

                <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : ''}`}>
                  <Reveal delay={80}>
                    <span className="font-display text-4xl text-bronze-500">
                      {service.index}
                    </span>
                    <h2 className="mt-5 text-3xl leading-snug sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-7 text-lg leading-relaxed text-ink-700">
                      {service.summary}
                    </p>
                    <p className="mt-5 text-base leading-relaxed text-ink-500">
                      {service.body}
                    </p>

                    <ul className="mt-9 space-y-3.5">
                      {service.capabilities.map((capability) => (
                        <li key={capability} className="flex gap-4 text-sm text-ink-700">
                          <span
                            aria-hidden
                            className="mt-2.5 h-px w-6 shrink-0 bg-bronze-500"
                          />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <Section tone="ink" className="py-20 sm:py-24">
        <Container width="narrow" className="text-center">
          <Reveal>
            <p className="eyebrow text-bronze-400">Next Step</p>
            <h2 className="mt-6 text-4xl text-cream-50 sm:text-5xl">
              Not sure which of these your event needs?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream-200/65">
              Send us the date, the venue and the rough guest count. We’ll come back with
              the shape of the operation.
            </p>
            <div className="mt-10">
              <Cta to="/contact" className="bg-cream-50 text-ink-900 hover:bg-bronze-400">
                Start a Conversation
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
