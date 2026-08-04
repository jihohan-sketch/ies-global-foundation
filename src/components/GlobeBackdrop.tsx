import { Globe } from '@/components/Globe'

/**
 * Ambient rotating globe fixed behind the whole site.
 *
 * Two deliberate constraints keep it a backdrop rather than a feature:
 *
 *   1. **No markers.** The branch pins and their connection arcs are the
 *      foreground globe's job (Home, Global Network). Dropping them here also
 *      removes the brightest thing the canvas draws — a marker core sits around
 *      1.6:1 against body text, which no amount of dimming elsewhere fixes.
 *   2. **Low intensity.** `intensity` scales every alpha the globe paints. At
 *      0.18 the brightest interior pixel — lit ocean plus coastline plus a
 *      graticule line — still leaves mist body text at 5.9:1 and gold at 5.5:1,
 *      above the 4.5:1 floor. The ceiling is about 0.24; by 0.28 gold is already
 *      at 4.5 and at full intensity mist falls to 2.7:1. Re-measure before
 *      raising this, and note that the lit ocean gradient is the dominant term,
 *      not the landmasses.
 *
 * The globe drifts one revolution every 45s, handled inside `Globe`. It keeps
 * turning under `prefers-reduced-motion` — a deliberate exception to the site's
 * usual handling of that setting.
 *
 * It also leans toward the cursor. The wrapper below stays `pointer-events-none`
 * so nothing on any page becomes harder to click; `followPointer` tracks the
 * cursor on the window instead, which is the only way a layer this far back can
 * respond to it at all.
 */
export function GlobeBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <Globe
        markers={[]}
        followPointer
        intensity={0.18}
        className="h-[min(115vmin,62rem)] w-[min(115vmin,62rem)]"
      />
    </div>
  )
}
