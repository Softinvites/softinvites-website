/**
 * Asset resolution.
 *
 * Content files reference media by a stable logical path, e.g.
 * `/media/events/chivido-2024.jpg`. That maps to a real file at
 * `src/assets/media/events/chivido-2024.jpg`.
 *
 * Files are resolved at BUILD time via import.meta.glob, which means:
 *   - dropping a correctly-named file in makes it appear, no code change
 *   - a missing file is known statically, so components render a designed
 *     placeholder instead of a broken image
 *   - Vite fingerprints and cache-busts everything it finds
 *
 * See README.md — "Swapping in real media".
 */
const MEDIA = import.meta.glob(
  '/src/assets/media/**/*.{jpg,jpeg,png,webp,avif,svg,gif,mp4,webm,mov}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;

const PREFIX = '/src/assets/media';

/** Returns the hashed URL for a logical media path, or null when absent. */
export function resolveAsset(logicalPath: string): string | null {
  if (!logicalPath) return null;
  if (/^https?:\/\//.test(logicalPath)) return logicalPath;

  const withoutMedia = logicalPath.replace(/^\/media/, '');
  return MEDIA[`${PREFIX}${withoutMedia}`] ?? null;
}

export function hasAsset(logicalPath: string): boolean {
  return resolveAsset(logicalPath) !== null;
}
