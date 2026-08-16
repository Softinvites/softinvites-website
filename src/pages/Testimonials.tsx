import { Container, Cta, Reveal, Section } from '@/components/primitives';
import { PageHero } from '@/components/PageHero';
import { TestimonialCard } from '@/components/cards';
import { TESTIMONIALS, TESTIMONIAL_NOTE } from '@/content/testimonials';

export default function Testimonials() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title={
          <>
            In our clients’ <span className="italic text-bronze-600">words.</span>
          </>
        }
        intro={TESTIMONIAL_NOTE}
      />

      <Section>
        <Container width="wide">
          {/* Masonry keeps the long quotes from stretching every card in a row. */}
          <div className="columns-1 gap-8 md:columns-2 lg:columns-3 [&>*]:mb-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={(index % 3) * 90}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand" className="py-20 sm:py-24">
        <Container width="narrow" className="text-center">
          <Reveal>
            <p className="eyebrow">Let’s Begin</p>
            <h2 className="mt-6 text-4xl sm:text-5xl">
              We’d like to write the next one with you.
            </h2>
            <div className="mt-10">
              <Cta to="/contact">Get in Touch</Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
