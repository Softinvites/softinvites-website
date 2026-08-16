import { Container, Cta } from '@/components/primitives';

export default function NotFound() {
  return (
    <Container width="narrow" className="py-32 text-center sm:py-44">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 text-5xl sm:text-6xl">
        This page has <span className="italic text-bronze-600">left the venue.</span>
      </h1>
      <p className="mt-7 text-lg text-ink-500">
        The page you are looking for could not be found. Let’s get you back on the list.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Cta to="/">Return Home</Cta>
        <Cta to="/contact" variant="outline">
          Contact Us
        </Cta>
      </div>
    </Container>
  );
}
