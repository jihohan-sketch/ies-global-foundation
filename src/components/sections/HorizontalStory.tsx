import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PinnedScene } from '@/components/sections/PinnedScene'
import { SceneLayer } from '@/components/ui/Scrub'
import { image, SIZES } from '@/lib/images'
import { cx } from '@/lib/utils'

/* ==========================================================================
   HORIZONTAL STORY
   ==========================================================================

   The site's main storytelling device, and the thing the redesign is built
   around: vertical scrolling that spends itself sideways.

   `PinnedScene` already provides the mechanism — pin a tall section, translate
   a track inside it, publish each panel's own crossing as `--p`. What was
   missing was an *editorial* skin for it. The three existing scenes (network,
   work, values) each hand-built their panels, which is why there were only
   three: adding a fourth meant writing a fourth layout.

   This is that layout, generalised, and it makes five deliberate choices:

   1. THE HEADING IS THE FIRST PANEL. Every one of the old scenes announced
      itself in an ordinary vertical section and *then* pinned, so the reader
      hit a hard cut between reading and panning. Here the section's title is
      panel zero: it arrives normally, and then slides away to the left as the
      first item arrives from the right. The transition from vertical to
      horizontal happens *inside* one continuous gesture, which is the whole
      point of the technique.

   2. PANELS ARE DIFFERENT WIDTHS. `panelWidth="auto"` lets each panel size
      itself, so a picture panel is wider than a text panel and the pan has a
      rhythm rather than a metronome. A run of identical full-screen slides is
      a carousel; a run of unequal ones is a spread.

   3. NOTHING IS A CARD. A panel is a number, a rule, a heading and a column of
      text, with the photograph bled to the panel's own edges. There is no box
      anywhere in this file.

   4. EVERY LAYER FADES ON ITS OWN WINDOW. The number, the heading, the body
      and the picture each take a different slice of the panel's crossing, so a
      panel *assembles* as it reaches centre and disperses as it leaves. Giving
      them all the same window is what makes a horizontal scene read as a set
      of slides sliding.

   5. IT COLLAPSES TO A COLUMN ON A PHONE. Handled entirely by the
      `max-width: 639px` block in index.css — the panels stack, the pin
      releases, and the same markup reads as an ordinary vertical list. No
      content is hidden at any width.
   ========================================================================== */

export interface StoryPanel {
  id: string
  /** Small heading above the title — the item's category or place. */
  eyebrow?: string
  title: ReactNode
  body?: ReactNode
  /** A short list under the body. Rendered as hairline-marked lines. */
  points?: readonly string[]
  /** Label/value pairs, set as a two-column dossier at the foot of the panel. */
  facts?: readonly { label: string; value: ReactNode }[]
  photo?: string
  photoAlt?: string
  to?: string
  linkLabel?: string
  /** Overrides the panel's width. Accepts any Tailwind width utility. */
  width?: string
}

/* ------------------------------------------------------------------ panels */

/** The opening panel: the section announcing itself before the pan begins. */
function TitlePanel({
  eyebrow,
  index,
  title,
  lead,
}: {
  eyebrow?: string
  index?: string
  title: ReactNode
  lead?: ReactNode
}) {
  return (
    /* `max-sm:w-full`, and the same on every width below. The stacked layout
       the phone gets is produced by the media query in index.css, which sets
       the *panel cell* to `width: 100%` — it cannot reach inside the panel,
       and a `min(88vw, …)` on the content within it is still 88vw when the
       cell is 100%. Two of those side by side is 176vw, which is exactly the
       304px of horizontal document scroll this used to add on a 390px screen. */
    <div className="flex h-full w-[min(88vw,46rem)] shrink-0 flex-col justify-center px-6 max-sm:w-full sm:w-[min(80vw,52rem)] sm:px-[6vw]">
      {/*
       * `scrub-fade` on entry only for this one. The title panel starts on
       * screen — it is what the reader was already looking at when the pin
       * took hold — so a symmetric band would fade it *up* from nothing as the
       * scene begins, which reads as the page having failed to paint. Opening
       * the in-window to almost zero means it is fully lit from the first
       * frame and only fades on the way out.
       */}
      <SceneLayer effect="scrub-fade" fadeIn={0.02} fadeOut={0.34}>
        {(eyebrow || index) && (
          <p className="text-label flex items-center gap-3.5 font-semibold text-[var(--accent)] uppercase">
            {index && (
              <span className="font-serif text-[1.5rem] leading-none tabular-nums lining-nums">
                {index}
              </span>
            )}
            <span aria-hidden className="h-0.5 w-6 shrink-0 rounded-full bg-current" />
            {eyebrow}
          </p>
        )}
      </SceneLayer>

      <SceneLayer as="h2" effect="scrub-fade" fadeIn={0.02} fadeOut={0.3} className="mt-8">
        <span className="text-h2 block max-w-[13ch] text-paper">{title}</span>
      </SceneLayer>

      {lead && (
        <SceneLayer effect="scrub-fade" fadeIn={0.02} fadeOut={0.26} className="mt-8">
          <p className="text-lead measure-lead text-mist">{lead}</p>
        </SceneLayer>
      )}

      {/* The instruction, and the only piece of UI furniture in the scene. A
          pinned section that has started panning looks, for the first half
          second, exactly like a page that has stopped scrolling. */}
      <SceneLayer
        hidden
        effect="scrub-fade"
        fadeIn={0.02}
        fadeOut={0.18}
        className="mt-14 flex items-center gap-4"
      >
        <span className="text-label-sm font-semibold text-slate uppercase">Keep scrolling</span>
        <span className="block h-px w-16 bg-[linear-gradient(to_right,var(--accent),transparent)]" />
      </SceneLayer>
    </div>
  )
}

/** One item in the pan. */
function ItemPanel({ panel, number }: { panel: StoryPanel; number: string }) {
  const hasPhoto = Boolean(panel.photo)

  const body = (
    <div
      className={cx(
        'flex h-full flex-col justify-center px-6 max-sm:w-full sm:px-[5vw]',
        hasPhoto ? 'w-[min(88vw,34rem)] sm:w-[min(46vw,32rem)]' : 'w-[min(88vw,42rem)]',
      )}
    >
      {/* The index and its rule, drawn first and fastest — the panel's own
          number is what tells a reader where they are in the pan. */}
      <SceneLayer effect="scrub-fade" fadeIn={0.24} fadeOut={0.24} className="flex items-center gap-5">
        <span className="font-serif text-[1.5rem] leading-none text-[var(--accent)] tabular-nums lining-nums">
          {number}
        </span>
        <span className="h-px w-12 bg-[var(--accent)]/50" />
        {panel.eyebrow && (
          <span className="text-label-sm font-semibold text-mist uppercase">{panel.eyebrow}</span>
        )}
      </SceneLayer>

      <SceneLayer
        as="h3"
        effect="scrub-fade"
        fadeIn={0.3}
        fadeOut={0.22}
        className="mt-7 font-serif text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.025em] text-paper"
      >
        {panel.title}
      </SceneLayer>

      {panel.body && (
        <SceneLayer effect="scrub-fade" fadeIn={0.36} fadeOut={0.2} className="mt-7">
          <p className="max-w-[46ch] leading-relaxed text-mist">{panel.body}</p>
        </SceneLayer>
      )}

      {panel.points && panel.points.length > 0 && (
        <SceneLayer effect="scrub-fade" fadeIn={0.42} fadeOut={0.18} className="mt-9">
          <ul className="space-y-3">
            {panel.points.map((point) => (
              <li key={point} className="flex gap-4 text-[0.9375rem] text-paper">
                <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-[var(--accent)]/60" />
                {point}
              </li>
            ))}
          </ul>
        </SceneLayer>
      )}

      {panel.facts && panel.facts.length > 0 && (
        <SceneLayer effect="scrub-fade" fadeIn={0.44} fadeOut={0.18} className="mt-10">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
            {panel.facts.map((fact) => (
              <div key={fact.label} className="border-t pt-3.5" style={{ borderColor: 'var(--rule)' }}>
                <dt className="text-label-sm font-semibold text-slate uppercase">{fact.label}</dt>
                <dd className="mt-2 font-serif text-[1.0625rem] text-paper">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </SceneLayer>
      )}

      {panel.to && (
        <SceneLayer effect="scrub-fade" fadeIn={0.48} fadeOut={0.16} className="mt-11">
          {/* `scene-exit` is not needed here — a pinned panel is clipped by the
              frame's `overflow-hidden` once it leaves, so a faded link is
              genuinely off-screen rather than invisible on top of something. */}
          <Link
            to={panel.to}
            className="group inline-flex items-center gap-4 text-[0.75rem] font-semibold tracking-[0.13em] text-paper uppercase transition-colors duration-300 hover:text-[var(--accent)]"
          >
            {panel.linkLabel ?? 'Read more'}
            <span
              aria-hidden
              className="block h-px w-10 bg-[var(--accent)] transition-all duration-500 ease-[var(--ease-cinema)] group-hover:w-16"
            />
          </Link>
        </SceneLayer>
      )}
    </div>
  )

  if (!hasPhoto) return body

  /*
   * The picture and the words as two blocks of a spread rather than a caption
   * under an image. The frame opens along the direction of travel
   * (`scrub-curtain`), and the photograph inside it is drawn wider than the
   * frame so it has somewhere to drift — the overscan is what makes the
   * parallax read as depth rather than as the picture sliding out of its box.
   */
  return (
    /* A row on desktop, a column on a phone. The photograph goes *under* the
       words there rather than beside them: at 390px a side-by-side spread
       gives each half under 200px, which is too narrow for either. */
    <div className="flex h-full items-stretch max-sm:flex-col">
      {body}
      <SceneLayer
        hidden
        effect="scrub-curtain"
        fadeIn={0.2}
        className="relative h-full w-[min(88vw,40rem)] shrink-0 self-stretch overflow-hidden max-sm:mt-10 max-sm:h-[62vw] max-sm:w-full sm:w-[min(50vw,44rem)]"
      >
        <SceneLayer
          effect="scrub-parallax-x"
          depth="70px"
          className="absolute inset-y-0 -left-[6%] h-full w-[112%]"
        >
          <img
            {...image(panel.photo)}
            sizes={SIZES.half}
            alt={panel.photoAlt ?? ''}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </SceneLayer>
        {/* Holds the photograph off the panel beside it. Without the left-hand
            fall-off the two blocks meet at a hard vertical seam, which is the
            one edge in this layout that reads as a card. */}
        <span
          aria-hidden
          /* The left-hand fall-off only makes sense while the picture sits
             beside the words. Stacked, it would darken the top of the image
             for no reason, so the phone gets no scrim at all. */
          className="absolute inset-0 max-sm:hidden bg-[linear-gradient(to_right,var(--color-navy),transparent_28%,transparent_88%,rgba(5,11,22,0.55))]"
        />
      </SceneLayer>
    </div>
  )
}

/* ------------------------------------------------------------------ scene */

export function HorizontalStory({
  id,
  label,
  eyebrow,
  index,
  title,
  lead,
  panels,
  wordmark,
  className,
  pace = 1.05,
  start = 1,
}: {
  id?: string
  /** Accessible name for the section. Never rendered. */
  label: string
  eyebrow?: string
  index?: string
  title: ReactNode
  lead?: ReactNode
  panels: readonly StoryPanel[]
  wordmark?: string
  className?: string
  /** See `PinnedScene`'s `pace`. Slightly over 1 so the pan reads as weighted. */
  pace?: number
  start?: number
}) {
  return (
    <PinnedScene
      id={id}
      label={label}
      /*
       * NO `overflow-hidden` HERE, EVER.
       *
       * The obvious place to clip a horizontal track is the section that
       * contains it, and it is the one place that cannot have it: `overflow:
       * hidden` establishes a scroll container, and a `position: sticky`
       * element anchors to its nearest scrolling ancestor rather than to the
       * viewport. Put it on the section and the frame silently stops pinning —
       * the track still pans, but it pans past a frame that has already
       * scrolled off the top of the screen, so the reader sees an empty
       * section for the whole length of the pin.
       *
       * The frame inside `PinnedScene` already carries the clip, and it is
       * sticky rather than an ancestor of the sticky element, so it is safe
       * there. This is the same trap the `overflow-x: clip` note in index.css
       * records for the document root.
       */
      className={className}
      /* `auto`, which is what allows the unequal panel widths above. With
         `screen` every panel is exactly one viewport and the pan is a
         carousel. */
      panelWidth="auto"
      pace={pace}
      wordmark={wordmark}
      trackClassName="items-stretch"
      panelClassName="max-sm:h-auto max-sm:w-full"
    >
      {[
        <TitlePanel key="__title" eyebrow={eyebrow} index={index} title={title} lead={lead} />,
        ...panels.map((panel, i) => (
          <ItemPanel key={panel.id} panel={panel} number={String(start + i).padStart(2, '0')} />
        )),
      ]}
    </PinnedScene>
  )
}
