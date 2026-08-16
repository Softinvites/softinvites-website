import { useState, type FormEvent } from 'react';
import { Container, Reveal, Section } from '@/components/primitives';
import { PageHero } from '@/components/PageHero';
import { InstagramIcon, WhatsAppIcon } from '@/components/icons';
import { CONTACT, SITE, whatsappLink } from '@/content/site';
import { SERVICES } from '@/content/services';

const FIELD_CLASS =
  'w-full border-b border-sand-400 bg-transparent py-3 font-sans text-base text-ink-900 transition-colors duration-300 placeholder:text-ink-300 focus:border-bronze-500 focus:outline-none';

const LABEL_CLASS =
  'font-sans text-[0.6875rem] tracking-[0.16em] text-ink-400 uppercase';

/**
 * Enquiries POST to the SoftInvites API, which stores them and emails the admin
 * inbox. Admins read them in the dashboard under Enquiries.
 */
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setSending(true);
    setError(null);

    try {
      const response = await fetch(`${SITE.apiBase}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || ''),
          email: String(data.get('email') || ''),
          phone: String(data.get('phone') || ''),
          eventType: String(data.get('eventType') || ''),
          eventDate: String(data.get('eventDate') || ''),
          location: String(data.get('location') || ''),
          guestCount: String(data.get('guests') || ''),
          services: data.getAll('services').map(String),
          message: String(data.get('message') || ''),
          // Honeypot — hidden from people, irresistible to bots.
          company: String(data.get('company') || ''),
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          payload?.errors?.[0]?.message ||
            payload?.message ||
            'We could not send your enquiry.',
        );
      }

      form.reset();
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'We could not send your enquiry. Please try WhatsApp instead.',
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Tell us about your{' '}
            <span className="italic text-bronze-600">event.</span>
          </>
        }
        intro="Share the date, the venue and a rough guest count, and we’ll come back with the shape of the operation."
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* ------------------------------------------------------- Details */}
            <Reveal className="lg:col-span-4">
              <div className="space-y-10">
                <div>
                  <p className="eyebrow">WhatsApp</p>
                  <ul className="mt-4 space-y-2.5">
                    {CONTACT.whatsapp.map((number) => (
                      <li key={number.e164}>
                        <a
                          href={whatsappLink(number.e164)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 font-display text-xl text-ink-900 transition-colors duration-300 hover:text-bronze-600"
                        >
                          <WhatsAppIcon className="h-4 w-4 text-bronze-500" />
                          {number.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="eyebrow">Instagram</p>
                  <a
                    href={CONTACT.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-3 font-display text-xl text-ink-900 transition-colors duration-300 hover:text-bronze-600"
                  >
                    <InstagramIcon className="h-4 w-4 text-bronze-500" />
                    {CONTACT.instagram.label}
                  </a>
                </div>

                <div>
                  <p className="eyebrow">Address</p>
                  <address className="mt-4 font-display text-xl leading-relaxed text-ink-900 not-italic">
                    {CONTACT.address.street}
                    <br />
                    {CONTACT.address.area}
                    <br />
                    {CONTACT.address.city}, {CONTACT.address.country}
                  </address>
                </div>

                <div className="hairline" />

                <p className="text-sm leading-relaxed text-ink-500">
                  Our hub is in Lagos, Nigeria — we operate at event destinations
                  worldwide.
                </p>
              </div>
            </Reveal>

            {/* ---------------------------------------------------------- Form */}
            <Reveal delay={100} className="lg:col-span-8">
              {submitted ? (
                <div className="border border-sand-300 bg-cream-50 p-10 text-center sm:p-14">
                  <p className="eyebrow">Thank You</p>
                  <h2 className="mt-5 text-3xl">Your enquiry is on its way.</h2>
                  <p className="mt-5 text-base leading-relaxed text-ink-500">
                    We have your details and will reply within one business day. If it’s
                    urgent, message us on{' '}
                    <a
                      href={whatsappLink(CONTACT.whatsapp[0].e164)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bronze-600 underline underline-offset-4"
                    >
                      {CONTACT.whatsapp[0].label}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 font-sans text-[0.75rem] tracking-[0.16em] text-ink-500 uppercase underline underline-offset-8 hover:text-ink-900"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-9 sm:space-y-10">
                  {/* Honeypot — off-screen, not display:none, so bots still fill it. */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="company">Company (leave blank)</label>
                    <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
                    <div>
                      <label htmlFor="name" className={LABEL_CLASS}>
                        Your name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={LABEL_CLASS}>
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={LABEL_CLASS}>
                        Phone / WhatsApp
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="+234…"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor="eventType" className={LABEL_CLASS}>
                        Event type *
                      </label>
                      <input
                        id="eventType"
                        name="eventType"
                        required
                        placeholder="Wedding, corporate, private celebration…"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor="eventDate" className={LABEL_CLASS}>
                        Event date
                      </label>
                      <input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className={LABEL_CLASS}>
                        Location
                      </label>
                      <input
                        id="location"
                        name="location"
                        placeholder="City, country"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor="guests" className={LABEL_CLASS}>
                        Approximate guests
                      </label>
                      <input
                        id="guests"
                        name="guests"
                        inputMode="numeric"
                        placeholder="e.g. 500"
                        className={FIELD_CLASS}
                      />
                    </div>
                  </div>

                  <fieldset>
                    <legend className={LABEL_CLASS}>Services of interest</legend>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {SERVICES.map((service) => (
                        <label
                          key={service.slug}
                          className="flex cursor-pointer items-start gap-3 text-sm text-ink-700"
                        >
                          <input
                            type="checkbox"
                            name="services"
                            value={service.title}
                            className="mt-1 h-4 w-4 shrink-0 accent-[#b08d57]"
                          />
                          {service.title}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="message" className={LABEL_CLASS}>
                      Anything else we should know?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`${FIELD_CLASS} resize-none`}
                    />
                  </div>

                  {error ? (
                    <div
                      role="alert"
                      className="border-l-2 border-red-700/60 bg-red-50 px-5 py-4 text-sm leading-relaxed text-red-900"
                    >
                      {error} You can also reach us on{' '}
                      <a
                        href={whatsappLink(CONTACT.whatsapp[0].e164)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4"
                      >
                        WhatsApp
                      </a>
                      .
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex w-full items-center justify-center gap-3 bg-ink-900 px-9 py-4 font-sans text-[0.8125rem] font-medium tracking-[0.12em] text-cream-50 uppercase transition-colors duration-500 ease-soft hover:bg-bronze-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {sending ? (
                      <>
                        <span
                          aria-hidden
                          className="h-3.5 w-3.5 animate-spin rounded-full border border-cream-50/40 border-t-cream-50"
                        />
                        Sending…
                      </>
                    ) : (
                      'Send Enquiry'
                    )}
                  </button>

                  <p className="text-xs leading-relaxed text-ink-400">
                    We reply to enquiries within one business day. Your details are used
                    only to respond to this enquiry.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
