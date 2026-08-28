import type { ReactNode } from 'react'
import { cx } from '@/lib/utils'

/**
 * The cinematic register: the handful of pieces that give a section its sense
 * of being a *scene* rather than a block of content.
 *
 * All four are scenery. None of them carry information that is not also
 * available in the ordinary heading structure beside them, which is why the
 * decorative ones are `aria-hidden` — a visitor using a screen reader should
 * hear a section's name once, not three times in three registers.
 */

/* ------------------------------------------------------------- SectionIndex */

/**
 * `01 ——— OUR IMPACT ··· IES` — the marker that opens a section.
 *
 * The number is real information (this is the first of n sections) but it is
 * information a sighted visitor takes from position on the page, so it is
 * announced to nobody: the `<h2>` under it is what a screen reader reads. The
 * label repeats as visible text there too.
 */
export function SectionIndex({
  index,
  label,
  tone = 'light',
  className,
}: {
  index: string
  label: string
  /** `dark` is for `paper` sections, where the ground is light. */
  tone?: 'light' | 'dark'
  className?: string
}) {
  /*
   * THE NUMBER IS NOW A NUMBER.
   *
   * All three parts of this used to be set identically — 10px, tracked to
   * 0.3em, in the same grey — so `01 ——— IMPACT SNAPSHOT` read as one
   * undifferentiated string of small capitals, and the number carried none of
   * the "you are here" weight it exists to carry.
   *
   * The index is now serif, at 1.5rem, in the section accent, sitting on its
   * own against a short solid mark. The label beside it stays a label but at a
   * legible size in a legible colour. It reads as a chapter number and a
   * chapter name, which is what it always was.
   */
  return (
    <div
      aria-hidden
      className={cx('flex items-baseline gap-3.5', className)}
    >
      <span
        className={cx(
                    /* `lining-nums` alongside `tabular-nums`, and it is load-bearing:
             Tailwind's numeric utilities compose into one `font-variant-numeric`
             declaration, and a utility class beats the zero-specificity
             `:where()` base rule that gives the rest of the serif its lining
             figures. Without it Cormorant falls back to its old-style default
             and `01` renders as `OI` — which is exactly what it did. */
          'font-serif text-[1.5rem] leading-none font-medium tabular-nums lining-nums',
          tone === 'dark' ? 'text-navy' : 'text-[var(--accent)]',
        )}
      >
        {index}
      </span>
      {/* `shrink-0` on the mark, `min-w-0` nowhere: the label is short by
          construction, and a mark that collapses reads as a rendering fault. */}
      <span
        className={cx(
          'h-0.5 w-6 shrink-0 translate-y-[-0.35em] rounded-full',
          tone === 'dark' ? 'bg-navy/45' : 'bg-[var(--accent)]/70',
        )}
      />
      <span
        className={cx(
          'text-label truncate font-semibold uppercase',
          tone === 'dark' ? 'text-navy-600' : 'text-mist',
        )}
      >
        {label}
      </span>
    </div>
  )
}

/* --------------------------------------------------------------- GhostTitle */

/**
 * The section's name at display scale, behind its content.
 *
 * Positioned absolutely against the nearest positioned ancestor, so the caller
 * owns where it sits. It is `nowrap` by design — a ghost title that wraps stops
 * reading as a single sweep of type and starts reading as a paragraph nobody
 * can read. Keep the word count at one or two.
 *
 * Sits at `z-0` rather than a negative index. A negative one would drop it
 * behind the *section's* background rather than behind its content, because a
 * `position: relative` ancestor with `z-index: auto` opens no stacking context
 * for it to be trapped in — on every `deep` section the ghost vanished
 * entirely. The caller lifts its own content above this instead.
 */
export function GhostTitle({
  children,
  className,
  align = 'left',
}: {
  children: ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}) {
  const placement = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0',
  }[align]

  return (
    <span
      aria-hidden
      className={cx(
        /*
         * The vertical placement lives here, not at the call site.
         *
         * Every section used to position its own ghost by hand — `-top-24` on
         * three of them, `-top-[0.5em] -translate-y-1/2` on two others — and
         * the ones using a fixed pixel offset dropped half a 190px word
         * squarely behind their own heading. A decorative element that each
         * caller can place badly will be placed badly.
         *
         * `-0.45em` is measured in the ghost's own font-size, so it scales
         * with the clamp instead of drifting apart from it, and it puts the
         * masked-solid top third of the word above the heading at every
         * viewport width. Callers may still override the horizontal side.
         */
        'ghost-title text-ghost absolute -top-[0.45em] z-0 block',
        placement,
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ----------------------------------------------------------------- Wordmark */

/**
 * One word, justified edge to edge across its container — the section's name
 * used as architecture rather than as texture.
 *
 * Where `GhostTitle` hides behind a heading at 3%, this sits *below* a scene as
 * a horizon line the eye reads before it reads anything else. Give it the
 * section's subject in one word; two will fit but the letters thin out and it
 * stops reading as a single sweep.
 *
 * The letters are split into spans because `justify-content: space-between` has
 * nothing to distribute otherwise. Splitting text is normally a thing to avoid
 * — it hands a screen reader a stream of single characters — so the whole
 * element is `aria-hidden` and the section keeps its real heading elsewhere in
 * the flow. That is the trade this component is: decorative, and honest about it.
 */
export function Wordmark({
  children,
  className,
}: {
  /** A single word. Spaces are rendered, but the effect is built for one. */
  children: string
  className?: string
}) {
  return (
    <span aria-hidden className={cx('wordmark text-horizon', className)}>
      {[...children].map((letter, i) => (
        /* Index keys are correct here and nowhere else: the list *is* the
           string, so a letter's position is its identity. */
        <span key={i}>{letter === ' ' ? ' ' : letter}</span>
      ))}
    </span>
  )
}

/* --------------------------------------------------------------- CinemaLine */

/**
 * Wide-tracked serif capitals — the register used for a section's *name*, and
 * for the site's few genuinely ceremonial lines.
 *
 * Never use this for a sentence. Tracking at 0.2em destroys word-shape, which
 * is what makes two words look engraved and eight words look broken.
 */
export function CinemaLine({
  children,
  className,
  as: Tag = 'span',
}: {
  children: ReactNode
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'p'
}) {
  return (
    <Tag
      className={cx(
        'text-cinema block font-serif font-light uppercase',
        /* The tracking is applied to the right of every glyph including the
           last, which leaves a visible gap at the end of a centred line. The
           negative margin takes exactly that one step back. */
        '-mr-[0.2em]',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/* --------------------------------------------------------------------- Seam */

/**
 * The dissolve between a cinematic section and the ground beneath it.
 *
 * Sits at the section edge and fades the ground colour in over ~9rem. Absolute,
 * so the section it belongs to must be `relative`. It paints above a ghost
 * title and below anything the caller has lifted to `z-10`, which is what lets
 * a ghost run off the edge of a section and dissolve rather than stop.
 */
export function Seam({
  edge,
  className,
}: {
  edge: 'top' | 'bottom'
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cx(
        'pointer-events-none absolute inset-x-0 h-36',
        edge === 'top' ? 'seam-top top-0' : 'seam-bottom bottom-0',
        className,
      )}
    />
  )
}

/* ----------------------------------------------------------------- Vignette */

/** Lens-style corner darkening for a full-bleed section. */
export function Vignette({ className }: { className?: string }) {
  return <div aria-hidden className={cx('vignette pointer-events-none absolute inset-0', className)} />
}
