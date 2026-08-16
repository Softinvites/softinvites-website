import { Link } from 'react-router-dom';
import { CONTACT, NAV, SITE, whatsappLink } from '@/content/site';
import { SERVICES } from '@/content/services';
import { Container } from '@/components/primitives';
import { Logo } from '@/components/Logo';
import { InstagramIcon, WhatsAppIcon } from '@/components/icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-cream-200">
      <Container width="wide">
        <div className="grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-5">
            <Logo inverted />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-200/65">
              {SITE.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={CONTACT.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`SoftInvites on Instagram (${CONTACT.instagram.label})`}
                className="flex h-11 w-11 items-center justify-center border border-cream-200/20 transition-colors duration-500 hover:border-bronze-400 hover:text-bronze-400"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              {CONTACT.whatsapp.map((number) => (
                <a
                  key={number.e164}
                  href={whatsappLink(number.e164)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp SoftInvites on ${number.label}`}
                  className="flex h-11 items-center gap-2 border border-cream-200/20 px-3 text-xs tracking-wide whitespace-nowrap transition-colors duration-500 hover:border-bronze-400 hover:text-bronze-400 sm:px-4"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {number.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="eyebrow text-bronze-400">Explore</p>
            <ul className="mt-6 space-y-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-cream-200/70 transition-colors duration-300 hover:text-cream-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow text-bronze-400">Services</p>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services#${service.slug}`}
                    className="text-sm text-cream-200/70 transition-colors duration-300 hover:text-cream-50"
                  >
                    {service.title.split('&')[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-bronze-400">Visit</p>
            <address className="mt-6 text-sm leading-relaxed text-cream-200/70 not-italic">
              {CONTACT.address.street}
              <br />
              {CONTACT.address.area}
              <br />
              {CONTACT.address.city}, {CONTACT.address.country}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream-200/12 py-8 text-xs tracking-wide text-cream-200/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p>Lagos, Nigeria — serving events worldwide.</p>
        </div>
      </Container>
    </footer>
  );
}
