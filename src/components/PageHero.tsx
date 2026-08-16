import type { ReactNode } from 'react';
import { Container, Reveal } from '@/components/primitives';

/** Consistent opening block for every inner page. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="border-b border-sand-300 bg-cream-100 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
      <Container width="wide">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-[2.5rem] leading-[1.08] sm:text-6xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-500">{intro}</p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
