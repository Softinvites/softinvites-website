import { useEffect, useRef, useState } from 'react';
import { resolveAsset } from '@/lib/assets';

type Ratio = 'square' | 'portrait' | 'landscape' | 'wide' | 'tall';

const RATIO_CLASS: Record<Ratio, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  tall: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-video',
};

/* -------------------------------------------------------------------------- */

function Placeholder({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cream-200 px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-sand-300"
      />
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-7 w-7 text-sand-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <circle cx="8.5" cy="10" r="1.4" />
        <path d="M21 16l-5.5-5.5L7 19" />
      </svg>
      <p className="max-w-[26ch] font-sans text-[0.6875rem] leading-relaxed tracking-[0.14em] text-ink-400 uppercase">
        {label}
      </p>
      {hint ? (
        <p className="max-w-[34ch] font-sans text-[0.625rem] tracking-wide text-ink-300 lowercase">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type ImageProps = {
  src: string;
  alt: string;
  ratio?: Ratio;
  className?: string;
  imgClassName?: string;
  /** First-screen images should not lazy-load. */
  priority?: boolean;
  /** Slow zoom on hover — used on cards that link somewhere. */
  hoverZoom?: boolean;
};

export function Image({
  src,
  alt,
  ratio = 'landscape',
  className = '',
  imgClassName = '',
  priority = false,
  hoverZoom = false,
}: ImageProps) {
  const resolved = resolveAsset(src);

  return (
    <div
      className={`relative overflow-hidden bg-cream-200 ${RATIO_CLASS[ratio]} ${className}`}
    >
      {resolved ? (
        <img
          src={resolved}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // React 18 does not know the camelCase `fetchPriority` prop and warns
          // during SSR, so pass the real lowercase HTML attribute directly.
          {...({ fetchpriority: priority ? 'high' : 'auto' } as Record<string, string>)}
          className={`h-full w-full object-cover ${
            hoverZoom
              ? 'transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]'
              : ''
          } ${imgClassName}`}
        />
      ) : (
        <Placeholder label={alt} hint={src.replace('/media/', '')} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type VideoProps = {
  src: string;
  poster?: string;
  title: string;
  className?: string;
};

/**
 * Click-to-play video. The poster carries the weight until the visitor opts in,
 * so nothing autoplays and no bytes are fetched on load.
 */
export function Video({ src, poster, title, className = '' }: VideoProps) {
  const resolvedSrc = resolveAsset(src);
  const resolvedPoster = poster ? resolveAsset(poster) : null;
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => setPlaying(false));
  }, [playing]);

  if (!resolvedSrc) {
    return (
      <div className={`relative aspect-video overflow-hidden bg-cream-200 ${className}`}>
        <Placeholder label={`${title} — highlight video`} hint={src.replace('/media/', '')} />
      </div>
    );
  }

  return (
    <div className={`relative aspect-video overflow-hidden bg-ink-900 ${className}`}>
      <video
        ref={videoRef}
        src={resolvedSrc}
        poster={resolvedPoster ?? undefined}
        controls={playing}
        playsInline
        preload="none"
        title={title}
        className="h-full w-full object-cover"
      />
      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 flex items-center justify-center bg-ink-900/15 transition-colors duration-500 hover:bg-ink-900/25"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-50/95 shadow-lg transition-transform duration-500 ease-soft group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-ink-900" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
