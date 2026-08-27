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
 *   3. **A scrim over the middle.** See below — the ratio above was necessary
 *      and not sufficient.
 *
 * The globe drifts one revolution every 45s, handled inside `Globe`. It keeps
 * turning under `prefers-reduced-motion` — a deliberate exception to the site's
 * usual handling of that setting.
 *
 * It does not respond to the cursor. The wrapper stays `pointer-events-none` so
 * nothing on any page becomes harder to click, which also means this globe
 * cannot be dragged — the hero's globe is the one the visitor turns by hand.
 */
export function GlobeBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <Globe
        markers={[]}
        maxDpr={1.25}
        intensity={0.15}
        className="h-[min(115vmin,62rem)] w-[min(115vmin,62rem)]"
      />

      {/*
       * THE READABILITY SCRIM.
       *
       * The contrast ratios in the note above are real, and they were not
       * enough. A ratio is measured against the brightest pixel behind the
       * text and answers "is the ground light enough"; what actually makes a
       * paragraph here hard to read is that the ground is *patterned* — a
       * coastline or a graticule line crosses under a line of type and the
       * background changes mid-word. Type wants a quiet ground, not merely a
       * dark one, and no amount of dimming produces one on its own.
       *
       * So the middle is washed rather than the whole thing dimmed further,
       * which happens to remove exactly the right part. The doc note above
       * records that the lit ocean gradient — not the landmasses — is the
       * dominant term in the brightest pixel, and the lit ocean is the disc's
       * centre. That is also where every page puts its text column, and it is
       * the least interesting thing the canvas draws.
       *
       * What survives is the limb: the curve of the edge, the terminator, the
       * silhouette that makes it read as a world. Those sit outside the text
       * column at every breakpoint, so the backdrop keeps its presence in the
       * margins and gives it up under the words.
       *
       * Stops are on the globe's own box rather than the viewport, so the wash
       * tracks the disc when `min(115vmin, 62rem)` changes size, instead of
       * sliding off it on a short wide window.
       */}
      <div
        className="absolute h-[min(115vmin,62rem)] w-[min(115vmin,62rem)]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%,' +
            ' color-mix(in srgb, var(--color-navy) 82%, transparent) 0%,' +
            ' color-mix(in srgb, var(--color-navy) 72%, transparent) 34%,' +
            ' color-mix(in srgb, var(--color-navy) 34%, transparent) 56%,' +
            ' transparent 72%)',
        }}
      />
    </div>
  )
}
