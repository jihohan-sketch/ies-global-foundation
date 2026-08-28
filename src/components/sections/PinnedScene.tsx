import { useEffect, useRef, type ReactNode } from 'react'
import { PINNED, observeScroll } from '@/lib/scroll'
import { SceneLayer } from '@/components/ui/Scrub'
import { Wordmark } from '@/components/ui/Cinematic'
import { cx } from '@/lib/utils'

/*
 * A section that pins to the viewport while its panels travel sideways, driven
 * by how far the page has scrolled through it. Scroll down, move left.
 *
 * This is NOT scroll-jacking. The wheel keeps its normal speed and direction
 * and the scrollbar keeps its normal meaning — the page scrolls exactly as far
 * as the section is tall. All that changes is what is painted while passing
 * through it. Nothing is captured, and stopping mid-way leaves the panel
 * wherever the scroll position says it should be.
 *
 * ---------------------------------------------------------------------------
 * TWO PROGRESSES, ONE NAME
 *
 * The frame gets `--p` for the scene as a whole, and then *each panel* gets its
 * own `--p`, shadowing it: 0 as the panel is about to enter from the right,
 * 0.5 dead centre, 1 as it clears the left edge.
 *
 * Shadowing rather than a second property name is the whole trick. It means
 * `--p` always says "progress of the scene I am in", so every preset in
 * index.css and every `SceneLayer` works unchanged inside a horizontal panel —
 * `scrub-band` fades a caption in and back out as its panel crosses, and
 * `scrub-parallax-x` gives the layers of one panel different speeds, which is
 * the depth the brief asks for. Nothing needed a horizontal-specific variant.
 *
 * ---------------------------------------------------------------------------
 * This replaces the earlier `PinnedPan`, which ran its own scroll listener and
 * its own rAF loop. Same arithmetic, one fewer scroll system: the geometry is
 * measured only when it can have changed, and a frame does nothing but multiply
 * and write.
 *
 * ---------------------------------------------------------------------------
 * REDUCED MOTION
 *
 * This scene runs for everyone, including visitors with
 * `prefers-reduced-motion: reduce`. That is the site owner's decision, taken
 * deliberately: the horizontal scenes are most of what these pages are, and the
 * previous behaviour — collapsing them into a stack of static sections —
 * quietly served a plainer, different website to anyone with the setting on.
 *
 * It is not the naive version of that decision. The frame publishes
 * `data-motion-always`, which the reduced-motion block in index.css reads to
 * keep this subtree's scrub values live, and the panels lean on `scrub-fade`
 * throughout — so what a visitor gets is predominantly a cross-dissolve, with
 * the sideways travel driven entirely by their own wheel at their own speed.
 * Nothing here plays on a timer, nothing autoplays, and stopping stops it.
 *
 * `StickyScene` takes the same decision for the site's vertical held shots, so
 * every scene on the site behaves the same way. See the note in index.css.
 */
export function PinnedScene({
  children,
  label,
  className,
  panelClassName,
  id,
  /*
   * SCROLL COST PER PANEL, AND WHY IT CAME DOWN.
   *
   * This is how far the page has to be scrolled to move the scene one panel
   * sideways. It was 120vh, which meant a five-panel scene like Our Work spent
   * six screens of wheel to show five things — and on the home page the three
   * pinned scenes plus the pinned hero came to roughly fourteen screens of
   * scrolling between the top of the page and the leadership section.
   *
   * 96vh is not a cosmetic trim. Below about 85 the panels change too fast to
   * read and the scene starts to feel like a flick; above about 110 the reader
   * is turning the wheel through a held frame and cannot tell whether the page
   * has stopped responding. Just under one screen per panel is the point where
   * the gesture reads as "one turn, one panel", which is the thing that makes a
   * horizontal scene legible at all.
   */
  vhPerPanel = 96,
  runOut = 30,
  panelWidth = 'screen',
  trackClassName,
  wordmark,
  depth,
  pace,
}: {
  /** One node per panel. Each is given a full-viewport cell to sit in. */
  children: ReactNode[]
  /** Names the section for assistive tech. */
  label: string
  className?: string
  /** Extra classes for every panel cell. */
  panelClassName?: string
  id?: string
  /**
   * Viewport heights of scrolling spent crossing each panel — the pan's speed
   * dial. Higher is slower: the horizontal travel is fixed by the track width,
   * so stretching the scroll distance stretches the time it takes to cross.
   *
   * This is the one knob that trades directly against page length. At 120 a
   * three-panel scene costs under four screens of scroll and the panel keeps
   * pace with the wheel; at 260 it costs eight and reads as stuck, since two
   * turns of the wheel buy one screen of movement.
   */
  vhPerPanel?: number
  /** Extra viewport heights after the last panel lands, so it can be read
      before the section releases rather than sliding away as it arrives. */
  runOut?: number
  /**
   * `screen` gives every panel the full viewport, so the pan lands one panel at
   * a time — right when each panel is a scene in its own right.
   *
   * `auto` lets the panels size themselves from `panelClassName`, and several
   * are on screen at once. That is what a *sequence* wants: a timeline reads as
   * a ribbon you travel along, and forcing one entry per screen turns a
   * continuous history into a slideshow of unrelated dates.
   *
   * The per-panel progress works out either way — it is computed from each
   * panel's own measured width, not from an assumption that it fills the
   * viewport.
   */
  panelWidth?: 'screen' | 'auto'
  /** Extra classes for the track — padding to inset the first and last panel. */
  trackClassName?: string
  /**
   * One word, set across the foot of the pinned frame as a horizon line that
   * the panels travel in front of. See `Wordmark`.
   *
   * Only for scenes whose panels are *not* opaque — the typographic ones and
   * the ones lit by a radial glow. Behind a run of full-bleed photographs there
   * is nothing to see and it is simply a layer being composited for no one.
   */
  wordmark?: string
  /**
   * Viewing distance, in pixels, for the `scrub-tilt` preset — the cylinder.
   * Omit and the scene stays flat.
   *
   * The perspective is put on the *frame*, not on the track, and the track is
   * given `preserve-3d` so it passes through. The frame is sticky and exactly
   * one viewport, so its centre is the screen's centre and the vanishing point
   * holds still while the track slides past it. Put it on the track instead —
   * the obvious place — and the vanishing point travels with the pan, so the
   * panels at the far end of a long track fold in on themselves instead of
   * turning away.
   *
   * 1600 over a viewport-width panel is roughly a 45° field: a room rather than
   * a lens. Below about 900 it reads as a fisheye.
   */
  depth?: number
  /**
   * Derive the section's height from how far the track actually has to travel,
   * rather than from a fixed `vhPerPanel` guess.
   *
   * WHY THIS EXISTS. `vhPerPanel` assumes every panel is one viewport wide,
   * which is true for `panelWidth="screen"` and false the moment panels size
   * themselves. A scene of five 0.7-viewport panels asks for 5 x 96vh of pin
   * and needs about 3.5 viewports of pan, so the last third of the pin is a
   * held frame with an empty track in it — the reader keeps scrolling and
   * nothing moves, which reads as the page having broken.
   *
   * The value is the ratio of vertical scroll to horizontal travel. 1 means a
   * pixel of wheel moves the track a pixel, which is the setting that feels
   * like direct manipulation; above 1 the pan is slower and more cinematic,
   * below 1 it outruns the reader's hand.
   *
   * Only meaningful with `panelWidth="auto"` — with fixed-width panels the
   * arithmetic `vhPerPanel` does is already exact.
   */
  pace?: number
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    const track = trackRef.current
    if (!section || !frame || !track) return

    const panels = Array.from(track.children) as HTMLElement[]

    /*
     * Panel geometry in track coordinates, plus the track's own travel. Read
     * here and in the ResizeObserver below — never inside a scroll frame.
     */
    let distance = 0
    let viewport = 0
    const lefts: number[] = []
    const widths: number[] = []

    const measure = () => {
      viewport = window.innerWidth
      distance = Math.max(0, track.scrollWidth - viewport)
      /*
       * Written as an inline height on the section, which the `max-width:639px`
       * block in index.css overrides with `height: auto !important` — so a
       * phone still gets the vertical stack. The scroll engine observes this
       * node with its own ResizeObserver, so changing the height here
       * re-measures the pin window rather than leaving it stale.
       */
      if (pace && distance > 0) {
        const vh = window.innerHeight
        section.style.height = `${100 + (distance * pace * 100) / vh + runOut}vh`
      }
      lefts.length = 0
      widths.length = 0
      for (const panel of panels) {
        lefts.push(panel.offsetLeft)
        widths.push(panel.offsetWidth)
      }
    }

    /* Last horizontal offset written, so an unchanged frame skips the write
       rather than dirtying a composited layer for nothing. */
    let applied = -1

    const apply = (progress: number) => {
      if (distance <= 0) return
      const offset = Math.round(progress * distance)
      if (offset === applied) return
      applied = offset
      track.style.transform = `translate3d(${-offset}px, 0, 0)`

      /*
       * Each panel's own crossing, from just off the right edge to just clear
       * of the left. Pure arithmetic on the cached geometry — the panel's
       * position is fully determined by the offset just written, so there is
       * nothing to read back.
       */
      for (let i = 0; i < panels.length; i++) {
        const span = viewport + widths[i]
        const raw = (viewport - (lefts[i] - offset)) / span
        const panelProgress = Math.round(Math.min(1, Math.max(0, raw)) * 1000) / 1000
        panels[i].style.setProperty('--p', String(panelProgress))
      }
    }

    measure()

    /*
     * A window resize is not the only thing that changes this geometry: images
     * and web fonts landing inside a panel change its width, and anything
     * arriving above the section moves it. Watch the track itself rather than
     * trusting the numbers taken at mount.
     */
    const resizer = new ResizeObserver(() => {
      measure()
      applied = -1
      apply(Number(frame.style.getPropertyValue('--p')) || 0)
    })
    resizer.observe(track)

    const unobserve = observeScroll(section, {
      ...PINNED,
      target: frame,
      onProgress: apply,
      /*
       * `always`, and this is the line that actually implements the decision
       * described at the top of this file.
       *
       * Without it the engine declines to register under
       * `prefers-reduced-motion`, writes the frame a resting `--p` of 1 and
       * never calls `onProgress` again — so the `ResizeObserver` above applies
       * that 1 once and the track parks at the far end of its travel. The scene
       * pins, and shows nothing but its last panel for the whole of its scroll.
       * That is a worse failure than either honouring the preference or
       * ignoring it, because it looks like a bug rather than a choice.
       */
      always: true,
    })

    return () => {
      resizer.disconnect()
      unobserve()
    }
  }, [children.length, panelWidth, pace, runOut])

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={label}
      /* `pinned-scene` is the hook for the mobile stack in index.css — see the
         "HORIZONTAL SCENES ON A PHONE" block there. It carries no styles of its
         own at desktop width. */
      className={cx('pinned-scene relative', className)}
      style={{ height: `${children.length * vhPerPanel + runOut}vh` }}
      /* The inline height above is the pre-measurement value; with `pace` set,
         the effect replaces it on the first frame. Keeping a sensible starting
         value matters because it is what the document is laid out with until
         then, and a section that jumps from 30vh to 400vh after paint takes
         the reader's scroll position with it. */
    >
      <div
        ref={frameRef}
        /* `data-motion-always` — see the note at the top of this file and the
           reduced-motion block in index.css. It is what keeps every `.scrub`
           below this point reading live progress rather than being pinned to
           its arrived state. */
        data-motion-always
        className="pinned-scene-frame relative flex w-full items-center overflow-hidden sticky top-0 h-dvh"
        style={depth ? { perspective: `${depth}px` } : undefined}
      >
        {/*
         * The scene's name across the foot of the frame, drifting sideways
         * against the pan.
         *
         * It reads the frame's own `--p`, so it moves with the scene as a whole
         * rather than with any one panel — which is what makes it read as
         * ground the panels travel over rather than as part of any of them.
         * Cropped by the frame's bottom edge on purpose: a word that sits fully
         * inside the frame is a caption, and a word running off the edge is a
         * horizon.
         */}
        {wordmark && (
          <SceneLayer
            hidden
            effect="scrub-parallax-x"
            depth="120px"
            className="pinned-scene-wordmark pointer-events-none absolute inset-x-0 bottom-0 z-0 translate-y-[22%] px-[3vw]"
          >
            <Wordmark>{wordmark}</Wordmark>
          </SceneLayer>
        )}

        <div
          ref={trackRef}
          className={cx(
            /* Lifted over the horizon word explicitly. Source order is not
               enough — the word is positioned and the track is not, so without
               this the word would paint on top of the panels it is meant to sit
               behind. */
            'pinned-scene-track relative z-10 flex will-change-transform',
            trackClassName,
          )}
          style={{
            transform: 'translate3d(0px, 0, 0)',
            /* The track is the thing being translated, so it would otherwise
               flatten its children into its own plane and eat the frame's
               perspective before any panel saw it. */
            transformStyle: depth ? 'preserve-3d' : undefined,
          }}
        >
          {children.map((panel, i) => (
            <div
              key={i}
              /*
               * The panel is itself a `.scrub`, reading the `--p` the pan writes
               * on it a few lines above, and it carries the outermost fade of
               * the scene: the whole cell dissolves up as it enters and back
               * down as it leaves.
               *
               * That one class is what makes neighbouring panels *cross*-fade
               * rather than butt: a panel is at full strength only around the
               * centre, which is also the only time it is the panel being read.
               *
               * It deliberately sets no `--scrub-in` / `--scrub-out` of its
               * own. Those two inherit, and a value set here would silently
               * become the default for every layer inside the panel — which is
               * precisely the set of elements that need to disagree with each
               * other for the dissolve to read as a sequence rather than as one
               * rectangle changing brightness.
               */
              className={cx(
                /* `overflow-hidden` stays on in the mobile stack, and it has
                   to. It reads like a height clip — the thing that makes a
                   pinned panel exactly one screen tall — but it is also what
                   contains the horizontal overscan the parallax layers are
                   drawn with: `WorkScene`'s photograph is deliberately wider
                   than its panel so it has somewhere to drift. Turning it off
                   in the stack let that overscan out and gave the document a
                   70px horizontal scroll on a phone. Vertically there is
                   nothing left to clip anyway, because the media query gives
                   the panel `height: auto`. */
                'scrub scrub-fade relative flex shrink-0 items-center overflow-hidden max-sm:py-16',
                panelWidth === 'screen' ? 'h-dvh w-screen' : 'h-dvh',
                panelClassName,
              )}
            >
              {panel}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
