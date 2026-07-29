/**
 * Types for site-origin.mjs, which stays plain JavaScript because
 * generate-sitemap.mjs runs it under bare Node during the build, with no
 * TypeScript runtime available.
 */

/** The domain the organization intends to use. Not registered yet. */
export const INTENDED_ORIGIN: string

/** Absolute origin for this build. Never empty. */
export function resolveOrigin(): string
