import { Link } from 'react-router-dom';
import type { EventHighlight } from '@/content/events';
import type { Testimonial } from '@/content/testimonials';
import type { Service } from '@/content/services';
import type { Partner } from '@/content/partners';
import { Image } from '@/components/Media';
import { ArrowIcon, QuoteIcon } from '@/components/icons';
import { resolveAsset } from '@/lib/assets';

/* -------------------------------------------------------------------------- */

export function EventCard({ event }: { event: EventHighlight }) {
  // The brief leaves date and location blank for some entries — join what exists.
  const meta = [event.date, event.location].filter(Boolean).join(' · ');

  return (
    <article className="group flex h-full flex-col">
      <Image src={event.image} alt={event.imageAlt} ratio="tall" hoverZoom />

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="text-2xl leading-snug">{event.title}</h3>

        {meta ? (
          <p className="mt-2 font-sans text-xs tracking-[0.14em] text-ink-400 uppercase">
            {meta}
          </p>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-2">
          {event.services.map((service) => (
            <li
              key={service}
              className="border border-sand-300 px-3 py-1.5 font-sans text-[0.6875rem] tracking-[0.08em] text-ink-500 uppercase"
            >
              {service}
            </li>
          ))}
        </ul>

        <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-sand-300 pt-5 text-sm">
          <div>
            <dt className="font-sans text-[0.625rem] tracking-[0.16em] text-ink-400 uppercase">
              Planner / Client
            </dt>
            <dd className="mt-1.5 text-ink-800">{event.client}</dd>
          </div>
          <div>
            <dt className="font-sans text-[0.625rem] tracking-[0.16em] text-ink-400 uppercase">
              Guest Size
            </dt>
            <dd className="mt-1.5 font-display text-xl text-ink-900">{event.guestSize}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/services#${service.slug}`}
      className="group flex flex-col border-t border-sand-300 pt-8 transition-colors duration-500 hover:border-bronze-500"
    >
      <span className="font-display text-3xl text-bronze-500">{service.index}</span>
      <h3 className="mt-4 text-2xl leading-snug transition-colors duration-500 group-hover:text-bronze-600">
        {service.title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-ink-500">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-sans text-[0.6875rem] tracking-[0.16em] text-ink-400 uppercase transition-all duration-500 group-hover:gap-3 group-hover:text-bronze-600">
        Explore <ArrowIcon className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  // Testimonials without a supplied photograph render as a quote-only card —
  // better than an empty placeholder sitting beside real event photography.
  const hasImage = Boolean(testimonial.image);

  return (
    <figure
      className={`flex h-full break-inside-avoid flex-col ring-1 ring-sand-300 ${
        hasImage ? 'bg-cream-50' : 'bg-cream-200'
      }`}
    >
      {hasImage ? (
        <Image src={testimonial.image} alt={testimonial.imageAlt} ratio="landscape" />
      ) : null}

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${hasImage ? '' : 'justify-center'}`}>
        <QuoteIcon className="h-6 w-6 text-sand-400" />
        <blockquote
          className={`mt-4 flex-1 font-display leading-relaxed text-ink-800 italic ${
            hasImage ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {testimonial.quote}
        </blockquote>
        <figcaption className="mt-6 border-t border-sand-300 pt-5">
          <p className="font-sans text-[0.6875rem] tracking-[0.16em] text-bronze-600 uppercase">
            {testimonial.event}
          </p>
          <p className="mt-1.5 text-sm text-ink-500">{testimonial.service}</p>
        </figcaption>
      </div>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */

export function PartnerMark({ partner }: { partner: Partner }) {
  const logo = resolveAsset(partner.logo);

  return (
    <li className="flex h-24 items-center justify-center px-4">
      {logo ? (
        <img
          src={logo}
          alt={partner.name}
          loading="lazy"
          className="max-h-12 w-auto opacity-55 grayscale transition-all duration-700 ease-soft hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span className="text-center font-display text-xl text-ink-400 transition-colors duration-700 hover:text-ink-800">
          {partner.name}
        </span>
      )}
    </li>
  );
}
