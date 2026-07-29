/**
 * Resolves the absolute origin the built site advertises in its metadata —
 * canonical link, og:url, og:image, JSON-LD, sitemap and robots.
 *
 * Resolution order:
 *
 *   1. `SITE_ORIGIN`                    explicit override. Set this to
 *                                       https://iesglobalfoundation.org once the
 *                                       domain is registered and pointed here.
 *   2. `VERCEL_PROJECT_PRODUCTION_URL`  Vercel's stable production hostname, so a
 *                                       production build advertises itself rather
 *                                       than a domain that does not resolve yet.
 *   3. `VERCEL_URL`                     per-deployment hostname (preview builds).
 *   4. `INTENDED_ORIGIN`                local builds, which are never crawled.
 *
 * Why this matters: a canonical pointing at a dead host tells search engines the
 * real page lives somewhere else, and an unreachable og:image means no preview
 * card when the link is shared. Both are invisible when you just look at the site.
 *
 * The result is always an absolute origin. It cannot be empty — Vite resolves
 * URLs in index.html as build assets, so a bare "/" makes it try to read the
 * project root and the build fails with EISDIR.
 */

/** The domain the organization intends to use. Not registered yet. */
export const INTENDED_ORIGIN = 'https://iesglobalfoundation.org'

function normalise(value) {
  const trimmed = value.trim().replace(/\/+$/, '')
  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`
}

/** Absolute origin for this build. Never empty. */
export function resolveOrigin() {
  const explicit = process.env.SITE_ORIGIN
  if (explicit && explicit.trim()) return normalise(explicit)

  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  if (host && host.trim()) return normalise(host)

  return INTENDED_ORIGIN
}
