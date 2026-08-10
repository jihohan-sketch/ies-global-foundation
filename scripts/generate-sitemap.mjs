/**
 * Regenerates public/sitemap.xml and public/robots.txt from the site's routes
 * and content.
 *
 * Run with `npm run sitemap` (it also runs automatically before `npm run build`).
 *
 * Branch and article URLs are derived by reading the `slug:` fields out of the
 * content files, which keeps the sitemap correct when content is added without
 * needing a TypeScript runtime in the build step.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { resolveOrigin } from './site-origin.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = resolveOrigin()

/** Static routes, with their relative crawl priority. */
const staticRoutes = [
  ['/', '1.0', 'weekly'],
  ['/about', '0.9', 'monthly'],
  ['/global-network', '0.9', 'monthly'],
  ['/our-work', '0.8', 'monthly'],
  ['/gallery', '0.7', 'monthly'],
  ['/leadership', '0.8', 'monthly'],
  ['/impact', '0.8', 'monthly'],
  ['/partners', '0.7', 'monthly'],
  ['/news', '0.8', 'weekly'],
  ['/contact', '0.6', 'yearly'],
  ['/join', '0.8', 'monthly'],
  ['/start-a-chapter', '0.7', 'monthly'],
  ['/governance', '0.5', 'yearly'],
  ['/privacy', '0.3', 'yearly'],
  ['/terms', '0.3', 'yearly'],
  ['/participant-safety', '0.4', 'yearly'],
]

function slugsFrom(relativePath) {
  const source = readFileSync(join(root, relativePath), 'utf8')
  return [...source.matchAll(/^\s*slug:\s*'([a-z0-9-]+)'/gm)].map((match) => match[1])
}

const branchSlugs = slugsFrom('src/content/branches.ts')
const articleSlugs = slugsFrom('src/content/news.ts')

const urls = [
  ...staticRoutes.map(([path, priority, frequency]) => ({ path, priority, frequency })),
  ...branchSlugs.map((slug) => ({
    path: `/global-network/${slug}`,
    priority: '0.8',
    frequency: 'monthly',
  })),
  ...articleSlugs.map((slug) => ({
    path: `/news/${slug}`,
    priority: '0.6',
    frequency: 'yearly',
  })),
]

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
