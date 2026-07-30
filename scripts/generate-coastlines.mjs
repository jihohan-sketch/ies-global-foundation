/**
 * Regenerates `src/content/coastlines.ts` from Natural Earth's 110m land layer.
 *
 *   node scripts/generate-coastlines.mjs
 *
 * Natural Earth is public domain (https://www.naturalearthdata.com/about/terms-of-use/),
 * so the coordinates can be committed directly rather than fetched at runtime —
 * the globe draws on first paint and should not wait on a network round trip.
 *
 * The source file is cached in `.cache/` and is not committed; only the
 * generated module is. Re-run this after changing any tuning constant below.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CACHE = resolve(ROOT, '.cache/ne_110m_land.geojson')
const OUT = resolve(ROOT, 'src/content/coastlines.ts')

const SOURCE =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson'

/*
 * Tuning. The globe reprojects every vertex on every frame, and the ambient
 * backdrop instance runs on all pages, so vertex count is a frame-cost decision
 * as much as a fidelity one.
 *
 *   TOLERANCE  Douglas-Peucker threshold in degrees. At 0.35 the coastline keeps
 *              the features a viewer actually identifies a continent by — the
 *              Horn of Africa, the Gulf of Mexico, the Indian peninsula, the
 *              Scandinavian and Iberian shapes — while shedding the sub-pixel
 *              crenellation that never survives the projection anyway.
 *   MIN_AREA   Drops specks in square degrees weighted by latitude. Below this
 *              a landmass renders as one or two pixels of noise.
 *   PRECISION  1dp is ~11km at the equator, comfortably under one pixel at the
 *              sizes this globe is drawn at, and it roughly halves the file.
 */
const TOLERANCE = 0.35
const MIN_AREA = 3
const PRECISION = 1

/** Perpendicular distance from p to the segment ab, in degrees. */
function segmentDistance(p, a, b) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1])
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))
}

/** Iterative Douglas-Peucker — recursion blows the stack on the longer rings. */
function simplify(points, tolerance) {
  if (points.length < 3) return points
  const keep = new Uint8Array(points.length)
  keep[0] = 1
  keep[points.length - 1] = 1

  const stack = [[0, points.length - 1]]
  while (stack.length > 0) {
    const [first, last] = stack.pop()
    let worst = 0
    let index = -1
    for (let i = first + 1; i < last; i++) {
      const d = segmentDistance(points[i], points[first], points[last])
      if (d > worst) {
        worst = d
        index = i
      }
    }
    if (index !== -1 && worst > tolerance) {
      keep[index] = 1
      stack.push([first, index], [index, last])
    }
  }

  return points.filter((_, i) => keep[i] === 1)
}

/** Shoelace area in square degrees, scaled by cos(lat) so polar rings are not
 *  over-weighted by longitude convergence. */
function area(ring) {
  let sum = 0
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    sum += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1]
  }
  const meanLat = ring.reduce((acc, p) => acc + p[1], 0) / ring.length
  return Math.abs(sum / 2) * Math.cos((meanLat * Math.PI) / 180)
}

const round = (n) => Number(n.toFixed(PRECISION))

async function loadSource() {
  if (existsSync(CACHE)) return JSON.parse(await readFile(CACHE, 'utf8'))

  process.stdout.write(`Fetching ${SOURCE}\n`)
  const response = await fetch(SOURCE)
  if (!response.ok) {
    throw new Error(`Natural Earth fetch failed: ${response.status} ${response.statusText}`)
  }
  const text = await response.text()
  await mkdir(dirname(CACHE), { recursive: true })
  await writeFile(CACHE, text)
  return JSON.parse(text)
}

const geojson = await loadSource()

const rings = []
for (const feature of geojson.features) {
  const { type, coordinates } = feature.geometry
  // Outer rings only. Holes in this layer are inland seas, which read as
  // coastline noise at globe scale rather than as recognisable features.
  const polygons = type === 'Polygon' ? [coordinates] : coordinates
  for (const polygon of polygons) {
    const outer = polygon[0]
    if (area(outer) < MIN_AREA) continue
    const reduced = simplify(outer, TOLERANCE).map(([lon, lat]) => [round(lon), round(lat)])
    if (reduced.length < 4) continue
    rings.push({ ring: reduced, size: area(outer) })
  }
}

// Largest first: the draw loop bails out of fully-hidden polygons, and the
// masses most likely to be on screen are the ones worth testing first.
rings.sort((a, b) => b.size - a.size)

const sourceVertices = geojson.features.reduce(
  (total, f) =>
    total +
    (f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates).reduce(
      (sub, polygon) => sub + polygon[0].length,
      0,
    ),
  0,
)
const keptVertices = rings.reduce((total, r) => total + r.ring.length, 0)

const body = rings
  .map(({ ring }) => `  [${ring.map(([lon, lat]) => `[${lon},${lat}]`).join(',')}],`)
  .join('\n')

const module = `/**
 * Coastlines for the globe, in [lon, lat] pairs.
 *
 * GENERATED FILE — do not edit by hand.
 * Run \`node scripts/generate-coastlines.mjs\` to rebuild it.
 *
 * Source: Natural Earth 1:110m land (public domain), simplified with
 * Douglas-Peucker at ${TOLERANCE}° and rounded to ${PRECISION}dp.
 * ${rings.length} rings, ${keptVertices} vertices, reduced from ${sourceVertices}.
 *
 * These are coastlines only. No borders are drawn and no territorial claim is
 * implied — a deliberate choice for an organisation that operates across them.
 */
export const LAND: readonly (readonly [number, number][])[] = [
${body}
]
`

await writeFile(OUT, module)
process.stdout.write(
  `Wrote ${OUT}\n  ${rings.length} rings, ${keptVertices} vertices (from ${sourceVertices})\n`,
)
