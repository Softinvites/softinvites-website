import { Link } from 'react-router-dom';
import {
  Container,
  CountUp,
  Cta,
  Reveal,
  Section,
  SectionHeading,
} from '@/components/primitives';
import { Image, Video } from '@/components/Media';
import { EventCard, PartnerMark, ServiceCard, TestimonialCard } from '@/components/cards';
import { ArrowIcon } from '@/components/icons';
import { SERVICES } from '@/content/services';
import { FEATURED_EVENTS } from '@/content/events';
import { METRICS } from '@/content/metrics';
import { PARTNERS } from '@/content/partners';
import { HOME_TESTIMONIALS } from '@/content/testimonials';
import { ONSITE_HIGHLIGHTS } from '@/content/videos';

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      {/* <section className="relative overflow-hidden bg-cream-100 pt-10 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
        <Container width="wide">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">Guest Management · Event Operations</p>
              <h1 className="mt-7 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl">
                Every guest arrives
                <br />
                <span className="italic text-bronze-600">expected.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-500">
                SoftInvites orchestrates seamless, tech-driven guest experiences and
                secure access logistics for world-class events — from our hub in Lagos to
                event destinations across the globe.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Cta to="/contact">Plan Your Event</Cta>
                <Cta to="/work" variant="outline">
                  See Our Work
                </Cta>
              </div>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-5">
              <Image
                src="/media/hero/hero-primary.jpg"
                alt="Guests being welcomed and accredited at a SoftInvites-managed event"
                ratio="tall"
                priority
              />
            </Reveal>
          </div>
        </Container>
      </section> */}
      <section className="relative overflow-hidden bg-cream-100 py-14 sm:py-16 lg:py-20">
  <Container width="wide">
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">

      {/* LEFT — Hero Content */}
      <Reveal className="lg:col-span-7">
        <div className="max-w-2xl">

          <p className="eyebrow">
            Guest Management · Event Operations
          </p>

          <h1 className="mt-5 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
            Every guest arrives
            <br />
            <span className="italic text-bronze-600">
              expected.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-ink-500 sm:text-lg sm:leading-8">
            SoftInvites orchestrates seamless, tech-driven guest experiences
            and secure access logistics for world-class events — from our hub
            in Lagos to event destinations across the globe.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Cta to="/contact">
              Plan Your Event
            </Cta>

            <Cta to="/work" variant="outline">
              See Our Work
            </Cta>
          </div>

          {/* Small credibility / service indicators */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-ink-200/70 pt-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-bronze-600">
                Guest Experience
              </p>
              <p className="mt-1 text-sm text-ink-500">
                Seamless & personal
              </p>
            </div>

            <div className="h-8 w-px bg-ink-200 hidden sm:block" />

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-bronze-600">
                Event Access
              </p>
              <p className="mt-1 text-sm text-ink-500">
                Secure & effortless
              </p>
            </div>

            <div className="h-8 w-px bg-ink-200 hidden sm:block" />

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-bronze-600">
                Built in Lagos
              </p>
              <p className="mt-1 text-sm text-ink-500">
                Global event ready
              </p>
            </div>
          </div>

        </div>
      </Reveal>

      {/* RIGHT — Hero Image */}
      <Reveal delay={150} className="lg:col-span-5">
        <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">

          {/* Decorative frame */}
          <div className="absolute -right-3 -top-3 h-full w-full border border-bronze-300/50 sm:-right-4 sm:-top-4" />

          <div className="relative overflow-hidden">
            <Image
              src="/media/hero/hero-primary.jpg"
              alt="Guests being welcomed and accredited at a SoftInvites-managed event"
              ratio="tall"
              priority
            />

            {/* Image caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent px-6 pb-5 pt-16">
              <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                SoftInvites
              </p>
              <p className="mt-1 text-sm text-white">
                Every detail, thoughtfully managed.
              </p>
            </div>
          </div>

        </div>
      </Reveal>

    </div>
  </Container>
</section>

      {/* ------------------------------------------------------------- Metrics */}
      <Section tone="ink" className="py-16 sm:py-20 lg:py-24">
        <Container width="wide">
          <dl className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {METRICS.map((metric, index) => (
              <Reveal
                key={metric.label}
                delay={index * 100}
                className="lg:border-l lg:border-cream-200/12 lg:px-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <dd className="font-display text-5xl text-cream-50 sm:text-6xl">
                  <CountUp
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </dd>
                <dt className="mt-3 font-sans text-[0.6875rem] tracking-[0.18em] text-bronze-400 uppercase">
                  {metric.label}
                </dt>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-200/55">
                  {metric.detail}
                </p>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* --------------------------------------------------------------- About */}
      <Section>
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <Image
                src="/media/about/about-team.jpg"
                alt="The SoftInvites team coordinating guest operations on site"
                ratio="portrait"
              />
            </Reveal>

            <Reveal delay={100} className="lg:col-span-7 lg:pt-6">
              <SectionHeading
                eyebrow="About Us"
                title="At the intersection of modern convenience and elite hospitality."
              />
              <p className="mt-7 text-base leading-relaxed text-ink-500">
                SoftInvites is a premier, globally minded guest management and event
                operations firm. With a passion for creativity and a commitment to
                excellence, we turn ordinary events into extraordinary experiences,
                leaving a lasting impression on all who attend.
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-500">
                From our primary hub in Lagos, Nigeria, to major event destinations across
                the globe, we ensure that every guest’s journey is flawless from the
                moment they are invited.
              </p>
              <Link
                to="/about"
                className="group mt-9 inline-flex items-center gap-3 font-sans text-[0.75rem] tracking-[0.16em] text-ink-900 uppercase transition-colors duration-500 hover:text-bronze-600"
              >
                Read our story
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ Services */}
      <Section tone="sand">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="Tech-enabled event operations."
              intro="We leverage automation, analytics, QR systems and communication technologies to transform large-scale event coordination across international markets — replacing logistical friction with intelligent digital systems."
            />
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, index) => (
              <Reveal key={service.slug} delay={index * 80}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ Highlights */}
      <Section>
        <Container width="wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Event Highlights"
                title="Events we have carried."
              />
              <Link
                to="/work"
                className="group inline-flex items-center gap-3 font-sans text-[0.75rem] tracking-[0.16em] text-ink-500 uppercase transition-colors duration-500 hover:text-bronze-600"
              >
                View all events
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_EVENTS.slice(0, 6).map((event, index) => (
              <Reveal key={event.slug} delay={(index % 3) * 90}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------------- Onsite */}
      <Section tone="ink">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Onsite"
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

      {/* ------------------------------------------------------------ Partners */}
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

      {/* -------------------------------------------------------- Testimonials */}
      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Testimonials"
              title="In our clients’ words."
              align="center"
            />
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {HOME_TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 90}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <Cta to="/testimonials" variant="outline">
              Read All Testimonials
            </Cta>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ Closing */}
      <Section tone="sand" className="py-20 sm:py-24">
        <Container width="narrow" className="text-center">
          <Reveal>
            <p className="eyebrow">Let’s Begin</p>
            <h2 className="mt-6 text-4xl sm:text-5xl">
              Tell us about your event, and we’ll take the guest list from here.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Cta to="/contact">Get in Touch</Cta>
              <Cta to="/services" variant="outline">
                Explore Services
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
