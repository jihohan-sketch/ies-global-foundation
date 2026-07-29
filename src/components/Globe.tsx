import { useCallback, useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/utils'
import type { GeoPoint } from '@/content/types'

export interface GlobeMarker extends GeoPoint {
  id: string
  label: string
}

interface GlobeProps {
  markers: GlobeMarker[]
  /** Enables hover/click on markers. */
  interactive?: boolean
  /** Marker id to rotate into view and highlight. */
  activeId?: string | null
  onSelect?: (id: string) => void
  className?: string
  /** 0–1. Lower values keep the globe as a background element. */
  intensity?: number
}

const DEG = Math.PI / 180

/**
 * Continent outlines in [lon, lat] pairs.
 *
 * Still a generalised coastline rather than survey data — the globe is a brand
 * element, not a cartographic reference. Vertices are spaced closely enough that
 * the major landmasses and the larger islands are recognisable at speed; no
 * borders are drawn and no territorial claim is implied.
 */
const LAND: [number, number][][] = [
  // Africa
  [
    [-5.9, 35.8], [0, 36.5], [8, 37], [11, 33.5], [15, 31.5], [20, 30.5], [25, 31.5],
    [32, 31.3], [34, 28], [37, 22], [39, 15], [43, 12], [47, 11.5], [51, 11.5],
    [51, 5], [45, 2], [41, -2], [40, -8], [40, -15], [35, -19], [35, -24], [32, -26],
    [28, -32], [22, -34], [18, -34], [17, -29], [14, -23], [12, -17], [13, -9],
    [12, -6], [9, -1], [9.5, 4], [5, 4], [0, 5.5], [-4, 5], [-8, 4.5], [-13, 9],
    [-16, 12], [-17, 14.7], [-16, 20], [-14, 25], [-11, 28], [-9, 32],
  ],
  // Europe + Asia
  [
    [-9.5, 43], [-9, 38.7], [-6, 37], [-2, 36.7], [0, 39], [3, 41.8], [7, 43.5],
    [12, 44], [18, 40.5], [16, 43], [19, 42.5], [23, 40], [26, 40.5], [28, 41],
    [35, 42], [41, 43], [38, 45], [31, 46.5], [28, 45], [30, 46], [33, 45.5],
    [38, 44], [40, 43], [48, 42], [50, 44], [52, 41], [54, 37], [56, 27], [57, 25],
    [52, 27], [48, 30], [44, 37], [36, 37], [34, 31], [35, 36], [30, 36], [28, 37],
    [26, 39], [23, 38], [19, 40], [15, 38], [12, 38], [10, 44], [4, 43], [-1, 46],
    [-4, 48], [0, 49], [4, 52], [7, 53], [8, 57], [10, 58], [12, 55], [19, 55],
    [21, 57], [24, 59], [27, 60], [22, 66], [25, 71], [33, 70], [41, 68], [55, 68],
    [68, 73], [75, 73], [80, 73], [90, 76], [105, 78], [113, 74], [130, 72],
    [141, 73], [150, 70], [160, 70], [170, 69], [180, 66], [170, 60], [163, 58],
    [155, 52], [143, 44], [136, 35], [122, 31], [121, 25], [110, 21], [106, 10],
    [100, 2], [99, 8], [95, 16], [90, 22], [85, 20], [80, 15], [77, 8], [73, 20],
    [68, 24], [62, 25], [57, 25], [52, 27], [48, 30], [44, 37], [40, 40], [35, 37],
    [28, 45], [20, 40], [12, 38], [3, 43],
  ],
  // North America
  [
    [-168, 65], [-164, 68], [-160, 71], [-150, 70], [-140, 70], [-128, 70],
    [-120, 70], [-110, 68], [-100, 68], [-92, 70], [-85, 70], [-80, 66], [-75, 63],
    [-68, 60], [-64, 57], [-60, 55], [-56, 51], [-60, 47], [-66, 45], [-70, 42],
    [-74, 40], [-76, 37], [-75, 35], [-81, 31], [-81, 26], [-83, 29], [-88, 30],
    [-90, 29], [-94, 29], [-97, 26], [-97, 22], [-95, 18], [-91, 18], [-88, 16],
    [-92, 15], [-96, 16], [-101, 17], [-105, 21], [-109, 24], [-113, 27], [-115, 30],
    [-118, 34], [-122, 37], [-124, 40], [-124, 46], [-128, 51], [-130, 55],
    [-135, 58], [-142, 60], [-150, 60], [-158, 57], [-162, 60], [-165, 62],
  ],
  // South America
  [
    [-80, 9], [-75, 11], [-70, 11], [-64, 10], [-60, 8], [-55, 6], [-52, 5],
    [-50, 0], [-45, -2], [-40, -3], [-38, -6], [-35, -8], [-37, -12], [-39, -16],
    [-40, -20], [-44, -23], [-48, -25], [-52, -30], [-58, -35], [-62, -40],
    [-64, -43], [-65, -45], [-68, -50], [-70, -52], [-75, -52], [-74, -47],
    [-73, -42], [-73, -37], [-71, -30], [-70, -23], [-71, -18], [-75, -14],
    [-79, -8], [-81, -5], [-80, -2], [-79, 2], [-77, 7],
  ],
  // Australia
  [
    [113, -22], [114, -26], [115, -33], [118, -35], [125, -32], [130, -31],
    [135, -35], [138, -35], [141, -38], [147, -38], [150, -37], [152, -32],
    [153, -28], [153, -25], [149, -21], [146, -19], [143, -14], [142, -11],
    [140, -17], [137, -16], [135, -12], [132, -11], [130, -12], [127, -14],
    [122, -17], [118, -20],
  ],
  // Greenland
  [
    [-45, 60], [-42, 63], [-38, 65], [-30, 68], [-25, 71], [-22, 73], [-20, 76],
    [-22, 80], [-30, 82], [-40, 83], [-50, 82], [-58, 79], [-58, 76], [-55, 72],
    [-53, 68], [-50, 64],
  ],
  // Madagascar
  [[49, -12], [50, -15], [50, -18], [48, -22], [47, -25], [45, -25], [44, -21], [44, -17], [46, -15], [48, -13]],
  // Great Britain
  [[-5, 50], [0, 51], [1, 53], [-1, 54], [-3, 55], [-2, 57], [-4, 58], [-5, 57], [-6, 55], [-3, 54], [-4, 53], [-5, 51]],
  // Ireland
  [[-10, 52], [-8, 52], [-6, 52], [-6, 54], [-7, 55], [-10, 54]],
  // Japan
  [[131, 31], [132, 34], [136, 35], [139, 35], [141, 39], [142, 42], [145, 43], [143, 44], [140, 42], [138, 37], [135, 34], [131, 33], [130, 32]],
  // Borneo
  [[109, 2], [113, 3], [117, 5], [119, 3], [117, 0], [116, -3], [113, -3], [110, -1]],
  // Sumatra
  [[95, 5], [98, 3], [101, 1], [104, -2], [106, -6], [103, -5], [100, -1], [96, 3]],
  // Java
  [[105, -6], [110, -7], [114, -8], [112, -8.5], [107, -7.5]],
  // New Guinea
  [[131, -1], [136, -2], [141, -3], [146, -6], [150, -9], [147, -9], [143, -8], [138, -8], [134, -5], [131, -3]],
  // New Zealand
  [[173, -35], [176, -38], [178, -39], [176, -41], [174, -41], [173, -43], [170, -45], [167, -46], [169, -44], [171, -41], [172, -38]],
  // Iceland
  [[-24, 65], [-20, 66], [-16, 66], [-14, 65], [-18, 64], [-22, 64]],
]

const TILT = 16 * DEG

/**
 * Unit light direction in screen space (x right, y down, z toward the viewer).
 * Up and to the left, tipped slightly forward — the conventional key light, and
 * the axis every shading pass below is built around.
 */
const LIGHT = { x: -0.5, y: -0.55, z: 0.67 }

interface Projected {
  x: number
  y: number
  /** Cosine of angular distance from the viewing centre; > 0 is the near side. */
  depth: number
}

function project(
  lat: number,
  lon: number,
  rotation: number,
  radius: number,
  cx: number,
  cy: number,
): Projected {
  const phi = lat * DEG
  const lambda = (lon + rotation) * DEG
  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)
  const cosL = Math.cos(lambda)
  const sinL = Math.sin(lambda)

  const depth = Math.sin(TILT) * sinPhi + Math.cos(TILT) * cosPhi * cosL

  return {
    x: cx + radius * cosPhi * sinL,
    y: cy - radius * (Math.cos(TILT) * sinPhi - Math.sin(TILT) * cosPhi * cosL),
    depth,
  }
}

/** Great-circle interpolation between two lat/lon points. */
function interpolateArc(a: GeoPoint, b: GeoPoint, steps: number): GeoPoint[] {
  const toVec = (p: GeoPoint) => {
    const phi = p.lat * DEG
    const lam = p.lon * DEG
    return [Math.cos(phi) * Math.cos(lam), Math.cos(phi) * Math.sin(lam), Math.sin(phi)]
  }
  const v1 = toVec(a)
  const v2 = toVec(b)
  const dot = Math.min(1, Math.max(-1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]))
  const omega = Math.acos(dot)
  const sinOmega = Math.sin(omega)

  const out: GeoPoint[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    let k1: number
    let k2: number
    if (sinOmega < 1e-6) {
      k1 = 1 - t
      k2 = t
    } else {
      k1 = Math.sin((1 - t) * omega) / sinOmega
      k2 = Math.sin(t * omega) / sinOmega
    }
    const x = k1 * v1[0] + k2 * v2[0]
    const y = k1 * v1[1] + k2 * v2[1]
    const z = k1 * v1[2] + k2 * v2[2]
    const len = Math.hypot(x, y, z) || 1
    out.push({
      lat: Math.asin(z / len) / DEG,
      lon: Math.atan2(y / len, x / len) / DEG,
    })
  }
  return out
}

export function Globe({
  markers,
  interactive = false,
  activeId = null,
  onSelect,
  className,
  intensity = 1,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Mutable animation state kept out of React to avoid re-rendering per frame.
  const state = useRef({
    rotation: -120,
    targetRotation: null as number | null,
    hovered: null as string | null,
    pointer: null as { x: number; y: number } | null,
    /** Screen positions of near-side markers, refreshed each frame. */
    hits: [] as { id: string; x: number; y: number }[],
  })

  const activeRef = useRef(activeId)
  activeRef.current = activeId

  const markersRef = useRef(markers)
  markersRef.current = markers

  /* Rotate a selected marker to face the viewer. */
  useEffect(() => {
    if (!activeId) return
    const marker = markersRef.current.find((m) => m.id === activeId)
    if (!marker) return

    const current = state.current.rotation
    // Bring the marker's longitude to the centre of the visible hemisphere.
    let target = -marker.lon
    // Choose the equivalent angle nearest the current rotation so it takes the
    // short way round rather than unwinding a full turn.
    while (target - current > 180) target -= 360
    while (target - current < -180) target += 360
    state.current.targetRotation = target
  }, [activeId])

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!interactive) return
      const rect = event.currentTarget.getBoundingClientRect()
      state.current.pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    },
    [interactive],
  )

  const handlePointerLeave = useCallback(() => {
    state.current.pointer = null
    state.current.hovered = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'default'
  }, [])

  const handleClick = useCallback(() => {
    if (!interactive || !onSelect) return
    const hovered = state.current.hovered
    if (hovered) onSelect(hovered)
  }, [interactive, onSelect])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = prefersReducedMotion()
    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()
    let pulse = 0
    let lastDrawnRotation = Number.NaN
    let needsRedraw = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Resizing clears the canvas, so the next tick has to repaint.
      needsRedraw = true
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)
    resize()

    /*
     * The globe only animates while it is actually on screen. Without this the
     * render loop keeps burning frames after the visitor has scrolled past it.
     */
    let onScreen = true
    let running = false

    const draw = (now: number) => {
      if (!running) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      pulse += dt

      const s = state.current

      if (s.targetRotation !== null) {
        const diff = s.targetRotation - s.rotation
        if (Math.abs(diff) < 0.15) {
          s.rotation = s.targetRotation
          s.targetRotation = null
        } else {
          s.rotation += diff * Math.min(1, dt * 2.6)
        }
      } else if (!reduced) {
        /*
         * Degrees per second. 8°/s is one revolution every 45s — slow enough to
         * read as a planet turning, fast enough that a few seconds of looking
         * makes the movement obvious. The interactive globe stays slower, since
         * there the markers are targets the visitor has to click.
         */
        s.rotation += dt * (interactive ? 3 : 8)
      }
      if (s.rotation > 360) s.rotation -= 360
      if (s.rotation < -360) s.rotation += 360

      /*
       * Under reduced motion the drift is off, so once the globe has settled
       * every frame would be identical. Interactive globes are excluded: their
       * hover state is resolved inside the draw pass and would stop updating.
       */
      if (
        reduced &&
        !interactive &&
        !needsRedraw &&
        s.targetRotation === null &&
        s.rotation === lastDrawnRotation
      ) {
        frame = requestAnimationFrame(draw)
        return
      }
      needsRedraw = false
      lastDrawnRotation = s.rotation

      const cx = width / 2
      const cy = height / 2
      const radius = Math.min(width, height) / 2 - Math.min(width, height) * 0.06

      ctx.clearRect(0, 0, width, height)
      if (radius <= 0) {
        frame = requestAnimationFrame(draw)
        return
      }

      const alpha = (value: number) => Math.max(0, Math.min(1, value * intensity))

      /* ---- Atmosphere: a thin halo of scattered light outside the limb ---- */
      const air = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.13)
      air.addColorStop(0, `rgba(142, 184, 232, ${alpha(0.18)})`)
      air.addColorStop(0.4, `rgba(142, 184, 232, ${alpha(0.07)})`)
      air.addColorStop(1, 'rgba(142, 184, 232, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.13, 0, Math.PI * 2)
      ctx.fillStyle = air
      ctx.fill()

      /* ---- Ocean: gradient centred on the key light, not on the disc ---- */
      const body = ctx.createRadialGradient(
        cx + LIGHT.x * radius * 0.7,
        cy + LIGHT.y * radius * 0.7,
        radius * 0.05,
        cx,
        cy,
        radius * 1.05,
      )
      body.addColorStop(0, `rgba(32, 72, 118, ${alpha(0.62)})`)
      body.addColorStop(0.5, `rgba(16, 46, 84, ${alpha(0.44)})`)
      body.addColorStop(1, `rgba(6, 20, 40, ${alpha(0.32)})`)
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = body
      ctx.fill()

      /* ---- Graticule: meridians and parallels every 15° ---- */
      ctx.lineWidth = 1

      const drawPath = (points: GeoPoint[], close = false) => {
        let drawing = false
        ctx.beginPath()
        for (const p of points) {
          const proj = project(p.lat, p.lon, s.rotation, radius, cx, cy)
          if (proj.depth <= 0.005) {
            drawing = false
            continue
          }
          if (!drawing) {
            ctx.moveTo(proj.x, proj.y)
            drawing = true
          } else {
            ctx.lineTo(proj.x, proj.y)
          }
        }
        if (close) ctx.closePath()
        ctx.stroke()
      }

      ctx.strokeStyle = `rgba(170, 180, 194, ${alpha(0.16)})`
      for (let lon = -180; lon < 180; lon += 15) {
        const pts: GeoPoint[] = []
        for (let lat = -90; lat <= 90; lat += 3) pts.push({ lat, lon })
        drawPath(pts)
      }
      for (let lat = -75; lat <= 75; lat += 15) {
        const pts: GeoPoint[] = []
        for (let lon = -180; lon <= 180; lon += 3) pts.push({ lat, lon })
        drawPath(pts)
      }

      /* ---- Schematic landmasses ---- */
      for (const polygon of LAND) {
        // Points on the far side are pushed out to the rim so the silhouette
        // stays closed as a shape rotates across the horizon.
        const projected = polygon.map(([lon, lat]) => {
          const p = project(lat, lon, s.rotation, radius, cx, cy)
          if (p.depth > 0) return p
          const dx = p.x - cx
          const dy = p.y - cy
          const len = Math.hypot(dx, dy) || 1
          return { x: cx + (dx / len) * radius, y: cy + (dy / len) * radius, depth: p.depth }
        })

        if (projected.every((p) => p.depth <= 0)) continue

        /*
         * Shade each mass by how squarely it faces the light. The surface normal
         * at any point of an orthographic sphere is just its offset from the
         * centre plus the depth term, so the centroid gives a good enough normal
         * for a landmass without shading per pixel.
         */
        let sx = 0
        let sy = 0
        let sz = 0
        for (const p of projected) {
          sx += p.x
          sy += p.y
          sz += p.depth
        }
        const count = projected.length
        const nx = (sx / count - cx) / radius
        const ny = (sy / count - cy) / radius
        const nz = Math.max(0, sz / count)
        const lambert = Math.max(0, nx * LIGHT.x + ny * LIGHT.y + nz * LIGHT.z)
        // Never fully black: the unlit side stays legible as silhouette.
        const lit = 0.4 + 0.6 * lambert

        ctx.beginPath()
        projected.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
        ctx.closePath()
        // Coastlines are the ceiling on how bright this globe can get: at the
        // backdrop's 0.18 intensity these values leave gold text at 4.9:1.
        ctx.fillStyle = `rgba(150, 190, 235, ${alpha(0.26 * lit)})`
        ctx.fill()
        ctx.strokeStyle = `rgba(168, 202, 240, ${alpha(0.65 * lit)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      /* ---- Connection arcs between branches ---- */
      const activeMarkers = markersRef.current
      ctx.lineWidth = 1.2
      for (let i = 0; i < activeMarkers.length; i++) {
        for (let j = i + 1; j < activeMarkers.length; j++) {
          const points = interpolateArc(activeMarkers[i], activeMarkers[j], 64)
          // A travelling highlight runs along each arc.
          const head = (pulse * 0.16 + (i + j) * 0.27) % 1

          for (let k = 0; k < points.length - 1; k++) {
            const a = project(points[k].lat, points[k].lon, s.rotation, radius, cx, cy)
            const b = project(points[k + 1].lat, points[k + 1].lon, s.rotation, radius, cx, cy)
            if (a.depth <= 0.01 || b.depth <= 0.01) continue

            const t = k / (points.length - 1)
            let glow = 1 - Math.min(Math.abs(t - head), Math.abs(t - head + 1), Math.abs(t - head - 1)) / 0.14
            glow = Math.max(0, glow)

            const base = 0.2 * Math.min(a.depth + 0.25, 1)
            ctx.strokeStyle = `rgba(200, 169, 107, ${alpha(base + glow * 0.55)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      /* ---- Markers ---- */
      const hits: { id: string; x: number; y: number }[] = []
      const active = activeRef.current

      for (const marker of activeMarkers) {
        const p = project(marker.lat, marker.lon, s.rotation, radius, cx, cy)
        if (p.depth <= 0.02) continue

        hits.push({ id: marker.id, x: p.x, y: p.y })

        const isActive = active === marker.id || s.hovered === marker.id
        const fade = alpha(Math.min(1, p.depth * 1.5 + 0.15))

        // Expanding ring
        const ringPhase = (pulse * 0.55 + marker.lon / 360) % 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4 + ringPhase * 20, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(200, 169, 107, ${fade * (1 - ringPhase) * 0.5})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Halo
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, isActive ? 22 : 14)
        halo.addColorStop(0, `rgba(200, 169, 107, ${fade * (isActive ? 0.55 : 0.34)})`)
        halo.addColorStop(1, 'rgba(200, 169, 107, 0)')
        ctx.beginPath()
        ctx.arc(p.x, p.y, isActive ? 22 : 14, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, isActive ? 4.5 : 3.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 197, 154, ${fade})`
        ctx.fill()

        if (interactive && (isActive || s.hovered === marker.id)) {
          ctx.font =
            '500 12px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
          ctx.textAlign = 'center'
          ctx.fillStyle = `rgba(247, 249, 252, ${fade})`
          ctx.fillText(marker.label, p.x, p.y - 18)
        }
      }

      s.hits = hits

      /* ---- Hover detection ---- */
      if (interactive) {
        const pointer = s.pointer
        let hovered: string | null = null
        if (pointer) {
          for (const hit of hits) {
            if (Math.hypot(hit.x - pointer.x, hit.y - pointer.y) < 22) {
              hovered = hit.id
              break
            }
          }
        }
        if (hovered !== s.hovered) {
          s.hovered = hovered
          canvas.style.cursor = hovered ? 'pointer' : 'default'
        }
      }

      /*
       * Shading passes run last so they fall across the graticule, coastlines
       * and markers alike — the whole sphere sits under one light, rather than
       * each layer being lit on its own.
       */
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()

      /* ---- Terminator: the far side falls away from the key light ---- */
      const nightX = cx - LIGHT.x * radius * 1.05
      const nightY = cy - LIGHT.y * radius * 1.05
      const night = ctx.createRadialGradient(
        nightX,
        nightY,
        radius * 0.12,
        nightX,
        nightY,
        radius * 1.85,
      )
      night.addColorStop(0, `rgba(3, 11, 24, ${alpha(0.6)})`)
      night.addColorStop(0.5, `rgba(3, 11, 24, ${alpha(0.24)})`)
      night.addColorStop(1, 'rgba(3, 11, 24, 0)')
      ctx.fillStyle = night
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2)

      /* ---- Limb darkening: the sphere turns away fastest at its edge ---- */
      const limb = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius)
      limb.addColorStop(0, 'rgba(3, 11, 24, 0)')
      limb.addColorStop(1, `rgba(3, 11, 24, ${alpha(0.42)})`)
      ctx.fillStyle = limb
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2)
      ctx.restore()

      /* ---- Rim: bright where it catches the light, fading into the dark side ---- */
      const rim = ctx.createLinearGradient(
        cx + LIGHT.x * radius,
        cy + LIGHT.y * radius,
        cx - LIGHT.x * radius,
        cy - LIGHT.y * radius,
      )
      rim.addColorStop(0, `rgba(198, 218, 244, ${alpha(0.6)})`)
      rim.addColorStop(0.5, `rgba(170, 180, 194, ${alpha(0.26)})`)
      rim.addColorStop(1, `rgba(110, 132, 165, ${alpha(0.12)})`)
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = rim
      ctx.lineWidth = 1.2
      ctx.stroke()

      frame = requestAnimationFrame(draw)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    const start = () => {
      if (running || !onScreen) return
      running = true
      last = performance.now()
      frame = requestAnimationFrame(draw)
    }

    /*
     * Deliberately not gated on `document.hidden`: browsers already throttle
     * rAF in a hidden tab, and some embedding contexts report the document as
     * hidden permanently — which would leave the globe blank forever.
     */
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen) start()
        else stop()
      },
      { rootMargin: '120px' },
    )
    visibilityObserver.observe(wrap)

    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [interactive, intensity])

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        className="block h-full w-full"
        aria-hidden={!interactive}
        role={interactive ? 'img' : undefined}
        aria-label={
          interactive
            ? `Rotating globe showing the IES national branches: ${markers
                .map((m) => m.label)
                .join(', ')}`
            : undefined
        }
      />
    </div>
  )
}
