import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className = '',
  width = 'default',
}: {
  children: ReactNode;
  className?: string;
  width?: 'default' | 'narrow' | 'wide';
}) {
  const max =
    width === 'narrow' ? 'max-w-3xl' : width === 'wide' ? 'max-w-[86rem]' : 'max-w-6xl';
  return <div className={`mx-auto w-full px-6 sm:px-8 ${max} ${className}`}>{children}</div>;
}

/* -------------------------------------------------------------------------- */

/**
 * Fades content up as it scrolls into view. Renders visible by default so the
 * prerendered HTML is complete for crawlers — see global.css.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      data-revealed={revealed ? 'true' : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */

export function Section({
  children,
  className = '',
  id,
  tone = 'cream',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: 'cream' | 'sand' | 'ink' | 'none';
}) {
  const toneClass =
    tone === 'sand'
      ? 'bg-cream-200'
      : tone === 'ink'
        ? 'bg-ink-900 text-cream-100'
        : tone === 'none'
          ? ''
          : 'bg-cream-100';

  return (
    <section id={id} className={`py-20 sm:py-28 lg:py-32 ${toneClass} ${className}`}>
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  inverted = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  inverted?: boolean;
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow ? (
        <p className={`eyebrow ${inverted ? 'text-bronze-400' : ''}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`mt-4 text-4xl sm:text-5xl ${inverted ? 'text-cream-100' : ''}`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            inverted ? 'text-cream-200/75' : 'text-ink-500'
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type CtaProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: 'solid' | 'outline' | 'quiet';
  className?: string;
};

export function Cta({ children, to, href, variant = 'solid', className = '' }: CtaProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sans text-[0.8125rem] font-medium tracking-[0.12em] uppercase transition-all duration-500 ease-soft';

  const variants = {
    solid: 'bg-ink-900 text-cream-50 hover:bg-bronze-600',
    outline:
      'border border-ink-900/25 text-ink-900 hover:border-bronze-500 hover:text-bronze-600',
    quiet: 'text-ink-900 underline-offset-8 hover:text-bronze-600 hover:underline px-0 py-0',
  } as const;

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to ?? '/'} className={classes}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Counts up to `value` when scrolled into view. The final value is present in
 * the markup from the first render, so prerendered HTML and no-JS visitors show
 * the real number rather than a zero.
 */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    setDisplay(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo — fast start, gentle settle
          const eased = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
