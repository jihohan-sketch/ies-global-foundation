import { useEffect, useRef, type ReactNode } from 'react'
import { PINNED, observeScroll } from '@/lib/scroll'
import { cx, prefersReducedMotion } from '@/lib/utils'

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
 */
export function PinnedScene({
  children,
  label,
  className,
  panelClassName,
  id,
  vhPerPanel = 120,
  runOut = 30,
  panelWidth = 'screen',
  trackClassName,
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
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    const track = trackRef.current
    if (!section || !frame || !track || reduced) return

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
    })

    return () => {
      resizer.disconnect()
      unobserve()
    }
  }, [reduced, children.length, panelWidth])

  /*
   * Under reduced motion the pin, the extra height and the sideways travel all
   * go, and the panels stack. There is no reduced *version* of a horizontal
   * pan — the travel is the thing being reduced — so this becomes an ordinary
   * run of full-width sections, which is what the content was anyway.
   */
  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={label}
      className={cx('relative', className)}
      style={reduced ? undefined : { height: `${children.length * vhPerPanel + runOut}vh` }}
    >
      <div
        ref={frameRef}
        className={cx(
          'flex w-full items-center overflow-hidden',
          reduced ? 'flex-col' : 'sticky top-0 h-dvh',
        )}
      >
        <div
          ref={trackRef}
          className={cx(
            'flex',
            reduced ? 'w-full flex-col' : 'will-change-transform',
            !reduced && trackClassName,
          )}
          style={reduced ? undefined : { transform: 'translate3d(0px, 0, 0)' }}
        >
          {children.map((panel, i) => (
            <div
              key={i}
              className={cx(
                'relative flex shrink-0 items-center overflow-hidden',
                reduced
                  ? /* A screen-wide panel was a scene and becomes a section;
                       an auto-width one was a card in a ribbon and becomes a
                       row, which should take the height its content needs
                       rather than a screen of it. */
                    panelWidth === 'screen'
                      ? 'min-h-[80vh] w-full'
                      : 'w-full py-10'
                  : panelWidth === 'screen'
                    ? 'h-dvh w-screen'
                    : 'h-dvh',
                /* Sizing for the horizontal case only. `panelClassName` is how a
                   caller sets a ribbon panel's width, and a fixed width is
                   exactly wrong once the panels are stacked. */
                !reduced && panelClassName,
              )}
              /* Stacked panels get no scene to read, so they are pinned at
                 their arrived value — the same resting state the CSS gives
                 everything else under reduced motion. */
              style={reduced ? ({ '--p': 0.5 } as React.CSSProperties) : undefined}
            >
              {panel}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
