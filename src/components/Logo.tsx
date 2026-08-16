import { Link } from 'react-router-dom';
import { resolveAsset } from '@/lib/assets';
import { SITE } from '@/content/site';

/**
 * The SoftInvites envelope mark paired with the wordmark.
 *
 * The mark is the same artwork the web app uses (its apple-touch-icon), copied
 * to src/assets/media/brand/softinvites-logo.png so both products read as one
 * brand. If the file is ever removed, the wordmark alone still stands.
 */
export function Logo({
  inverted = false,
  className = '',
  markOnly = false,
}: {
  inverted?: boolean;
  className?: string;
  markOnly?: boolean;
}) {
  const mark =
    resolveAsset('/media/brand/softinvites-logo.svg') ??
    resolveAsset('/media/brand/softinvites-logo.png');

  return (
    <Link
      to="/"
      aria-label={`${SITE.name} — home`}
      className={`inline-flex shrink-0 items-center gap-2.5 ${className}`}
    >
      {mark ? (
        <img
          src={mark}
          alt=""
          width={40}
          height={40}
          className={`h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 ${
            // The mark is dark brown line art — on the ink footer it needs a
            // light ground to stay legible.
            inverted ? 'rounded-full bg-cream-50 p-1' : ''
          }`}
        />
      ) : null}

      {!markOnly && (
        <span
          className={`font-display text-xl leading-none tracking-tight sm:text-2xl ${
            inverted ? 'text-cream-50' : 'text-ink-900'
          }`}
        >
          Soft<span className="italic">Invites</span>
        </span>
      )}
    </Link>
  );
}
