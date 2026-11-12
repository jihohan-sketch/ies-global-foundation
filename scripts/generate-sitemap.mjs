/**
 * Regenerates public/sitemap.xml and public/robots.txt from the site's routes.
 *
 * Run with `npm run sitemap` (it also runs automatically before `npm run build`).
 */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { resolveOrigin } from './site-origin.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = resolveOrigin()

/** Static routes, with their relative crawl priority. */
const staticRoutes = [
  ['/', '1.0', 'monthly'],
  ['/contact', '0.5', 'yearly'],
  ['/privacy', '0.3', 'yearly'],
  ['/terms', '0.3', 'yearly'],
  ['/participant-safety', '0.3', 'yearly'],
]

const urls = staticRoutes.map(([path, priority, frequency]) => ({ path, priority, frequency }))

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, priority, frequency }) => `  <url>
    <loc>${ORIGIN}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)

/* Generated alongside the sitemap so the two can never disagree about the origin. */
writeFileSync(
  join(root, 'public/robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
)

console.log(`sitemap.xml + robots.txt written — ${urls.length} URLs (${ORIGIN})`)
