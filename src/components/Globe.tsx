import { useCallback, useEffect, useRef } from 'react'
import { LAND } from '@/content/coastlines'
import type { GeoPoint } from '@/content/types'

export interface GlobeMarker extends GeoPoint {
  id: string
  label: string
}

interface GlobeProps {
  markers: GlobeMarker[]
  /** Enables hover/click on markers. Implies `draggable`. */
  interactive?: boolean
  /**
   * Lets the visitor turn the globe by dragging it, without making the markers
   * hoverable targets. For the decorative globes, which stay `aria-hidden`: the
   * drag adds nothing a screen reader could use, and the sphere carries no
   * information that is only reachable by turning it.
   */
  draggable?: boolean
  /** Marker id to rotate into view and highlight. */
  activeId?: string | null
  onSelect?: (id: string) => void
  className?: string
  /** 0–1. Lower values keep the globe as a background element. */
  intensity?: number
  /**
   * Ceiling on the device-pixel ratio the canvas is rendered at.
   *
   * The cost of a frame is almost entirely fill: four full-disc gradients plus
   * every landmass, repainted at dpr² pixels. On a 2× display a full-size
   * ambient globe is close to four million pixels a frame, which is fine on its
   * own and not fine underneath a section that is also panning. Dropping the
   * ceiling is the cheapest way to buy that back on a globe soft enough that
   * nobody can tell — it is not a knob to touch on a foreground one.
   */
  maxDpr?: number
}

const DEG = Math.PI / 180

/** Resting camera tilt, in degrees. Dragging vertically moves away from it. */
const TILT = 16

/** How far the tilt may be dragged from the equator, in degrees. Stopping short
 *  of the poles keeps the graticule readable and the markers from crowding. */
const TILT_LIMIT = 72

/** Seconds of stillness after a drag before the globe picks its drift back up. */
const RESUME_DELAY = 1.6

/** Below this many degrees per second the throw is considered spent. */
const SPIN_FLOOR = 1.5

/** Pointer travel, in CSS pixels, past which a press is a drag and not a click. */
const CLICK_SLOP = 4

/** Margin left between the sphere and the edge of its box, as a fraction of the
 *  box's short side. Both the drawing and the hit test for "over the globe"
 *  derive the radius from this, so they cannot drift apart. */
const SPHERE_INSET = 0.06

/** Sub-pixel spacing below which two consecutive rim points are treated as the
 *  same point. In CSS pixels — the context is pre-scaled by devicePixelRatio. */
const RIM_EPSILON = 0.75

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
  tilt: number,
): Projected {
  const phi = lat * DEG
  const lambda = (lon + rotation) * DEG
  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)
  const cosL = Math.cos(lambda)
  const sinL = Math.sin(lambda)
  const cosT = Math.cos(tilt * DEG)
  const sinT = Math.sin(tilt * DEG)

  const depth = sinT * sinPhi + cosT * cosPhi * cosL

  return {
    x: cx + radius * cosPhi * sinL,
    y: cy - radius * (cosT * sinPhi - sinT * cosPhi * cosL),
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
  draggable = false,
  activeId = null,
  onSelect,
  className,
  intensity = 1,
  maxDpr = 2,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Picking markers implies being able to turn the globe to reach them.
  const canDrag = draggable || interactive

  // Mutable animation state kept out of React to avoid re-rendering per frame.
  const state = useRef({
    rotation: -120,
    targetRotation: null as number | null,
    tilt: TILT,
    hovered: null as string | null,
    pointer: null as { x: number; y: number } | null,
    /** Screen positions of near-side markers, refreshed each frame. */
    hits: [] as { id: string; x: number; y: number }[],
    /** Live drag, or null when the pointer is not held down. */
    drag: null as { x: number; y: number; travel: number } | null,
    /** Distance the last press travelled — read by the click handler, which
     *  fires after the drag has already been torn down. */
    dragTravel: 0,
    /** Degrees per second carried over from a flick, decaying to nothing. */
    spin: 0,
    /** Timestamp of the last drag movement, for judging whether a release was
     *  a throw or a stop. */
    lastMove: 0,
    /** Tilt to ease back to when a marker is flown into view. */
    targetTilt: null as number | null,
    /** Seconds of stillness since the last drag ended. Starts past the delay
     *  and its ramp so the globe is already drifting on the first frame. */
    idle: RESUME_DELAY + 1,
    /** Radius of the last frame — drag distance is measured against it. */
    radius: 1,
  })

  const activeRef = useRef(activeId)
  activeRef.current = activeId

  const markersRef = useRef(markers)
  markersRef.current = markers

  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

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
    // A marker that was picked from the list should arrive at the framing the
    // globe was designed around, however far the visitor had tipped it.
    state.current.targetTilt = TILT
    state.current.spin = 0
  }, [activeId])

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canDrag) return
      event.currentTarget.setPointerCapture(event.pointerId)
      const s = state.current
      s.drag = { x: event.clientX, y: event.clientY, travel: 0 }
      s.dragTravel = 0
      // A hand on the globe overrides both the drift and any pending flyto.
      s.spin = 0
      s.targetRotation = null
      s.targetTilt = null
      event.currentTarget.style.cursor = 'grabbing'
    },
    [canDrag],
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canDrag) return
      const rect = event.currentTarget.getBoundingClientRect()
      const s = state.current
      s.pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }

      if (!s.drag) return

      const dx = event.clientX - s.drag.x
      const dy = event.clientY - s.drag.y
      s.drag.x = event.clientX
      s.drag.y = event.clientY
      s.drag.travel += Math.hypot(dx, dy)
      s.dragTravel = s.drag.travel

      /*
       * A drag across one radius turns the globe a quarter turn, so the surface
       * roughly keeps pace with the pointer near the centre of the disc.
       */
      const perPixel = 90 / s.radius
      s.rotation += dx * perPixel
      s.tilt = Math.max(-TILT_LIMIT, Math.min(TILT_LIMIT, s.tilt + dy * perPixel))
      // Feed the frame loop a throw to carry on with once the pointer lifts.
      s.spin = dx * perPixel * 12
      s.lastMove = event.timeStamp
      s.idle = 0
    },
    [canDrag],
  )

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const s = state.current
      if (!s.drag) return
      s.drag = null
      s.idle = 0
      // Letting go after holding still is a placement, not a throw — only a
      // release that follows fresh movement carries momentum.
      if (event.timeStamp - s.lastMove > 90) s.spin = 0
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
      event.currentTarget.style.cursor = s.hovered && onSelect ? 'pointer' : 'grab'
    },
    [onSelect],
  )

  const handlePointerLeave = useCallback(() => {
    // Pointer capture keeps a drag alive past the edge of the canvas, and
    // reports the crossing as a leave. The hand is still down, so ignore it.
    if (state.current.drag) return
    state.current.pointer = null
    state.current.hovered = null
    if (canvasRef.current) {
      canvasRef.current.style.cursor = canDrag ? 'grab' : 'default'
    }
  }, [canDrag])

  const handleClick = useCallback(() => {
    // Keyed to `onSelect` rather than `interactive`: the hero globe is not a
    // marker-picking control, but its pins still lead somewhere.
    if (!canDrag || !onSelect) return
    const s = state.current
    // A press that travelled is a spin, not a pick.
    if (s.dragTravel > CLICK_SLOP) return
    const hovered = s.hovered
    if (hovered) onSelect(hovered)
  }, [canDrag, onSelect])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()
    let pulse = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
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

      if (s.drag) {
        // The pointer owns the rotation outright while it is held down.
        s.idle = 0
      } else if (s.targetRotation !== null) {
        const diff = s.targetRotation - s.rotation
        if (Math.abs(diff) < 0.15) {
          s.rotation = s.targetRotation
          s.targetRotation = null
        } else {
          s.rotation += diff * Math.min(1, dt * 2.6)
        }
      } else {
        s.idle += dt

        /*
         * A flick keeps going and bleeds off, so letting go mid-drag feels like
         * releasing something with mass rather than dropping it.
         */
        if (Math.abs(s.spin) > SPIN_FLOOR) {
          s.rotation += s.spin * dt
          s.spin *= Math.exp(-dt * 2.4)
          s.idle = 0
        } else {
          s.spin = 0
        }

        /*
         * Degrees per second. 13°/s is one revolution every 28s: at the
         * backdrop's 0.18 intensity a slower drift was there but not legible —
         * the sphere is faint enough that a few degrees of movement reads as
         * nothing at all. The interactive globe stays much slower, since there
         * the markers are targets the visitor has to click.
         *
         * Deliberately not gated on `prefers-reduced-motion`: the rotation is
         * the point of the element, and the site owner asked for it to run for
         * everyone. Every other motion on the site still honours the setting.
         *
         * After a drag the drift fades back in over the following second rather
         * than snapping on, so the globe the visitor just placed stays put for a
         * beat before it starts turning again. Where they left it is kept — the
         * drift resumes from that longitude and tilt, it does not spring home.
         */
        const resumed = Math.max(0, s.idle - RESUME_DELAY)
        const blend = Math.min(1, resumed)
        /*
         * The drift all but stops while the cursor is on the globe. At 13°/s a
         * marker crosses about 90px a second, which makes a pin something you
         * chase rather than something you point at; slowing down the moment
         * the visitor's cursor arrives makes the labels reachable, and reads
         * as the globe noticing the attention.
         */
        const attention = s.pointer ? 0.15 : 1
        s.rotation += dt * (interactive ? 4 : 13) * blend * attention
      }
      if (s.rotation > 360) s.rotation -= 360
      if (s.rotation < -360) s.rotation += 360

      if (s.targetTilt !== null && !s.drag) {
        const diff = s.targetTilt - s.tilt
        if (Math.abs(diff) < 0.05) {
          s.tilt = s.targetTilt
          s.targetTilt = null
        } else {
          s.tilt += diff * Math.min(1, dt * 2.6)
        }
      }

      const cx = width / 2
      const cy = height / 2
      const radius = Math.min(width, height) * (0.5 - SPHERE_INSET)
      // Drag distance is scaled by the radius, so the handlers need this too.
      s.radius = Math.max(1, radius)
      const rotation = s.rotation
      const tilt = s.tilt

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
          const proj = project(p.lat, p.lon, rotation, radius, cx, cy, tilt)
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

      /* ---- Coastlines ---- */
      for (const polygon of LAND) {
        /*
         * Points on the far side are pushed out to the rim so the silhouette
         * stays closed as a shape rotates across the horizon.
         *
         * Consecutive hidden vertices routinely collapse onto the same rim
         * coordinate — Antarctica spans every meridian, so most of its ring is
         * behind the globe at any rotation. Dropping the coincident ones costs
         * nothing visually and keeps the path short.
         */
        const projected: Projected[] = []
        for (const [lon, lat] of polygon) {
          const p = project(lat, lon, rotation, radius, cx, cy, tilt)
          if (p.depth > 0) {
            projected.push(p)
            continue
          }
          const dx = p.x - cx
          const dy = p.y - cy
          const len = Math.hypot(dx, dy) || 1
          const rim = {
            x: cx + (dx / len) * radius,
            y: cy + (dy / len) * radius,
            depth: p.depth,
          }
          const prev = projected[projected.length - 1]
          if (prev && prev.depth <= 0 && Math.hypot(rim.x - prev.x, rim.y - prev.y) < RIM_EPSILON) {
            continue
          }
          projected.push(rim)
        }

        if (projected.length < 3 || projected.every((p) => p.depth <= 0)) continue

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

        // Filled silhouette, closed through the rim. The hidden run collapses
        // onto the rim circle, so it encloses no area and costs nothing here.
        ctx.beginPath()
        projected.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
        ctx.closePath()
        // Coastlines are the ceiling on how bright this globe can get: at the
        // backdrop's 0.18 intensity these values leave gold text at 4.9:1.
        ctx.fillStyle = `rgba(150, 190, 235, ${alpha(0.26 * lit)})`
        ctx.fill()

        /*
         * Stroke the near-side coastline only. A segment running along the rim
         * is the horizon rather than a shore, and because every partially
         * hidden landmass closes across the same few pixels of limb, stroking
         * those segments stacks a dozen translucent arcs on one spot. Measured
         * on the 0.18 backdrop, that drove the brightest pixel from 3.95:1
         * against mist text to 1.76:1; skipping them puts it at 4.08:1, just
         * above where the hand-drawn outlines sat. It costs nothing visually —
         * the fill already carries the silhouette out to the edge.
         */
        ctx.beginPath()
        let pen = false
        for (let i = 0; i <= projected.length; i++) {
          const p = projected[i % projected.length]
          if (p.depth <= 0) {
            pen = false
            continue
          }
          if (pen) ctx.lineTo(p.x, p.y)
          else {
            ctx.moveTo(p.x, p.y)
            pen = true
          }
        }
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
            const a = project(points[k].lat, points[k].lon, rotation, radius, cx, cy, tilt)
            const b = project(points[k + 1].lat, points[k + 1].lon, rotation, radius, cx, cy, tilt)
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
        const p = project(marker.lat, marker.lon, rotation, radius, cx, cy, tilt)
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

        // Named on hover wherever the canvas can see the pointer at all, not
        // just where the markers are selectable — a pin the visitor is pointing
        // at should say which branch it is even on the hero, where there is
        // nothing to click.
        if (canDrag && (isActive || s.hovered === marker.id)) {
          ctx.font =
            '500 12px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
          ctx.textAlign = 'center'
          ctx.fillStyle = `rgba(247, 249, 252, ${fade})`
          ctx.fillText(marker.label, p.x, p.y - 18)
        }
      }

      s.hits = hits

      /* ---- Hover detection ---- */
      if (canDrag) {
        const pointer = s.pointer
        let hovered: string | null = null
        // While the globe is being turned, the pointer is a handle rather than
        // a cursor: nothing under it should light up or claim the click.
        if (pointer && !s.drag) {
          for (const hit of hits) {
            if (Math.hypot(hit.x - pointer.x, hit.y - pointer.y) < 22) {
              hovered = hit.id
              break
            }
          }
        }
        if (hovered !== s.hovered) {
          s.hovered = hovered
          // Only a marker that actually goes somewhere gets the pointer cursor.
          if (!s.drag) canvas.style.cursor = hovered && onSelectRef.current ? 'pointer' : 'grab'
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
  }, [interactive, canDrag, intensity, maxDpr])

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        // `touch-none` hands vertical drags to the globe instead of the page;
        // without it a touch spin scrolls the article behind it.
        /*
         * `pointer-events-auto` because the decorative globes sit inside
         * `pointer-events-none` wrappers — the canvas opts itself back in so it
         * can be grabbed, while the rest of the wrapper stays transparent to
         * clicks aimed at the copy over it.
         *
         * `touch-pan-y` rather than `touch-none`: a horizontal swipe turns the
         * globe, a vertical one still scrolls the page. Tilting is a
         * pointer-only gesture as a result, which is the right trade for a
         * canvas this large on a phone.
         */
        className={`block h-full w-full${
          canDrag ? ' pointer-events-auto cursor-grab touch-pan-y' : ''
        }`}
        aria-hidden={!interactive}
        role={interactive ? 'img' : undefined}
        aria-label={
          interactive
            ? `Rotating globe showing the IES national branches, draggable to turn: ${markers
                .map((m) => m.label)
                .join(', ')}`
            : undefined
        }
      />
    </div>
  )
}

