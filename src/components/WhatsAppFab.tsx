import { CONTACT, whatsappLink } from '@/content/site';
import { WhatsAppIcon } from '@/components/icons';

const PRIMARY = CONTACT.whatsapp[0];

const GREETING =
  'Hello SoftInvites, I found you through your website and I would like to talk about my event.';

/**
 * Fixed WhatsApp button, bottom-left, present on every page.
 *
 * Bottom-LEFT is deliberate: it keeps the corner where mobile browsers put
 * their own controls, and where a cookie or chat widget would later go, free.
 * The label expands on pointer devices and stays hidden on touch, so the
 * button never grows over page content on a phone.
 */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(PRIMARY.e164, GREETING)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with SoftInvites on WhatsApp at ${PRIMARY.label}`}
      className="group fixed bottom-5 left-5 z-40 flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] py-3.5 pr-3.5 pl-3.5 text-white shadow-[0_6px_24px_rgba(31,27,22,0.28)] transition-all duration-500 ease-soft hover:gap-2.5 hover:pr-5 focus-visible:gap-2.5 focus-visible:pr-5 sm:bottom-7 sm:left-7"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />

      <span className="max-w-0 overflow-hidden text-[0.8125rem] font-medium whitespace-nowrap opacity-0 transition-all duration-500 ease-soft group-hover:max-w-[13rem] group-hover:opacity-100 group-focus-visible:max-w-[13rem] group-focus-visible:opacity-100">
        {PRIMARY.label}
      </span>

      {/* Soft pulse to draw the eye once, without animating forever. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-[ping_2.5s_ease-out_3]"
      />
    </a>
  );
}
