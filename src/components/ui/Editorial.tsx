import { useCallback, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Scrub } from '@/components/ui/Scrub'
import { image, SIZES } from '@/lib/images'
import { cx } from '@/lib/utils'

/* ==========================================================================
   EDITORIAL LAYOUT
   ==========================================================================

   The replacements for the card grid.

   A card is a box that says "these things are the same kind of thing", and a
   grid of them says "and there are this many". Both are true and neither is
   interesting, which is why a page made of card grids reads as an inventory
   however good the type inside the cards is. Everything in this file is an
   attempt at the other thing: layouts that give items different weights, let
   one run wider than the next, and use a hairline where a card would have used
   a border on four sides.

   Three devices, and they cover almost every list on the site:

     `IndexList`  — a numbered register. Rows separated by hairlines, the
                    number in the margin, the text set at heading scale. What a
                    contents page looks like.
     `RevealList` — the same register, with a photograph that follows the
                    cursor. For lists where each item *has* a picture and the
                    picture is the reason to click.
     `Ledger`     — figures at display scale in a hairline row. For numbers,
                    which a card actively harms by boxing.

   Plus two spacers: `Split` for the asymmetric label/content spread that most
   sections open with, and `Statement` for the one oversized line a section is
   allowed.
   ========================================================================== */

/* ------------------------------------------------------------------- Split */

/**
 * The asymmetric two-column spread this site opens most sections with.
 *
 * `aside` is the narrow column — an eyebrow, an index, a short standfirst — and
 * it *sticks*, so it stays beside its content for the whole scroll of a long
 * right-hand column. That stickiness is the whole reason this is a component
 * rather than a grid utility: it is what makes a long list read as belonging
 * to the label rather than as having left it behind.
 *
 * The ratio is deliberately not 1:2 or any other round number. An asymmetry
 * the eye can name reads as a layout decision; 0.72:1.28 reads as a page.
 */
export function Split({
  aside,
  children,
  className,
  gap = 'default',
  align = 'start',
  sticky = true,
}: {
  aside: ReactNode
  children: ReactNode
  className?: string
  gap?: 'default' | 'wide'
  align?: 'start' | 'end' | 'center'
  sticky?: boolean
}) {
  return (
    <div
      className={cx(
        'grid gap-12 lg:grid-cols-[0.72fr_1.28fr]',
        gap === 'wide' ? 'lg:gap-28 xl:gap-36' : 'lg:gap-20 xl:gap-24',
        align === 'end' ? 'items-end' : align === 'center' ? 'items-center' : 'items-start',
        className,
      )}
    >
      {/* `top-32` clears the header at its scrolled height plus a margin. The
          `self-start` is load-bearing: a grid item stretches to the row height
          by default, and a stretched box has no room to move within, so
          `position: sticky` on it silently does nothing. */}
      <div className={cx(sticky && 'lg:sticky lg:top-32 lg:self-start')}>{aside}</div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

/* --------------------------------------------------------------- Statement */

/**
 * The one oversized line a section is allowed.
 *
 * Set at display scale in the serif, held to a short measure so it breaks
 * every three or four words. `tone` picks the ground rather than the colour —
 * see the text ladder in index.css.
 */
export function Statement({
  children,
  className,
  tone = 'light',
  as: Tag = 'p',
}: {
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark'
  as?: 'p' | 'h2' | 'h3' | 'blockquote'
}) {
  return (
    <Tag
      className={cx(
        'font-serif text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.14] font-medium tracking-[-0.02em]',
        'max-w-[19ch] text-balance',
        tone === 'dark' ? 'text-navy' : 'text-paper',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/* --------------------------------------------------------------- IndexList */

export interface IndexItem {
  /** Stable key, and the slug a row links to when `hrefBase` is given. */
  id: string
  title: ReactNode
  /** The line under the title. Kept to one sentence — this is a register. */
  body?: ReactNode
  /** Short right-hand column: a status, a place, a count. */
  meta?: ReactNode
  to?: string
  href?: string
}

/**
 * A numbered register.
 *
 * The row is a grid of three tracks — number, text, meta — and the number
 * lives in its own margin column rather than inline with the title, which is
 * what makes a column of them read as an index. Rows are separated by a single
 * hairline drawn on the *top* edge, so the list has a rule above the first row
 * and none trailing after the last.
 *
 * Interactive rows carry the whole row as the link target rather than just the
 * title: a 900px-wide row with a 200px click target is the most common
 * usability fault in this pattern.
 */
export function IndexList({
  items,
  tone = 'light',
  start = 1,
  className,
  titleClassName,
}: {
  items: readonly IndexItem[]
  tone?: 'light' | 'dark'
  /** First index number. Lets a list continue a numbering from an earlier one. */
  start?: number
  className?: string
  titleClassName?: string
}) {
  return (
    <ul className={cx('w-full', className)}>
      {items.map((item, i) => {
        const inner = (
          <>
            <span
              aria-hidden
              className={cx(
                'font-serif text-[0.9375rem] leading-none tabular-nums lining-nums transition-colors duration-500',
                tone === 'dark' ? 'text-navy/45' : 'text-slate',
                'group-hover:text-[var(--accent)]',
              )}
            >
              {String(start + i).padStart(2, '0')}
            </span>

            <span className="min-w-0">
              <span
                className={cx(
                  'block font-serif text-[clamp(1.375rem,2.6vw,2.125rem)] leading-[1.16] tracking-[-0.015em] transition-colors duration-500',
                  tone === 'dark' ? 'text-navy' : 'text-paper',
                  'group-hover:text-[var(--accent)]',
                  titleClassName,
                )}
              >
                {item.title}
              </span>
              {item.body && (
                <span
                  className={cx(
                    'mt-3 block max-w-[62ch] text-[0.9375rem] leading-relaxed',
                    tone === 'dark' ? 'text-navy-600' : 'text-mist',
                  )}
                >
                  {item.body}
                </span>
              )}
            </span>

            {item.meta && (
              <span
                className={cx(
                  'text-label-sm font-semibold uppercase lg:text-right',
                  tone === 'dark' ? 'text-navy/55' : 'text-slate',
                )}
              >
                {item.meta}
              </span>
            )}
          </>
        )

        /* `items-baseline` on the row, not `items-start`: the number is meant
           to sit on the title's first baseline, which is what makes it read as
           a margin note rather than as a bullet. */
        const rowClass = cx(
          'group grid w-full grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-5 gap-y-3 py-8 text-left sm:py-10',
          Boolean(item.meta) && 'lg:grid-cols-[3rem_minmax(0,1fr)_12rem]',
          (item.to || item.href) && 'transition-colors duration-500',
        )

        return (
          <li key={item.id} className="border-t" style={{ borderColor: 'var(--rule)' }}>
            {item.to ? (
              <Link to={item.to} className={rowClass}>
                {inner}
              </Link>
            ) : item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                className={rowClass}
              >
                {inner}
              </a>
            ) : (
              <div className={rowClass}>{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

/* -------------------------------------------------------------- RevealList */

export interface RevealItem extends IndexItem {
  photo?: string
  photoAlt?: string
}

/**
 * A register whose rows carry a photograph that follows the cursor.
 *
 * ONE FLOATING FRAME, NOT ONE PER ROW. The frame is a single absolutely
 * positioned element owned by the list; hovering a row only changes which
 * `src` it shows and where it is. Mounting a hidden image inside every row
 * instead — the obvious implementation — costs a decode per row on a list of
 * fifteen and puts fifteen composited layers on screen at once.
 *
 * The position is written straight to `style` from the pointer handler rather
 * than held in React state. A `setState` per `pointermove` is a reconciliation
 * per frame of cursor travel, which is exactly the kind of thing that makes a
 * "premium" site feel cheap on a laptop. The *active row* is state, because it
 * changes a few times a second rather than sixty.
 *
 * Desktop only, and gated on a real hover-capable pointer: on touch there is
 * no cursor to follow, the frame would sit wherever the last tap landed, and
 * the rows work perfectly well as a plain register.
 */
export function RevealList({
  items,
  tone = 'light',
  start = 1,
  className,
}: {
  items: readonly RevealItem[]
  tone?: 'light' | 'dark'
  start?: number
  className?: string
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string | null>(null)

  const move = useCallback((event: React.PointerEvent) => {
    const frame = frameRef.current
    const root = rootRef.current
    /*
     * `!== 'touch'`, not `=== 'mouse'`.
     *
     * The frame is meant to follow a cursor, so the check exists to keep it
     * away from touch — where there is no cursor and it would park wherever
     * the last tap landed. Testing *for* `mouse` looks equivalent and is not:
     * a synthesised pointer event carries an empty `pointerType`, and so do
     * some assistive and remote-input paths, all of which were then dropped
     * silently and left the frame stranded at its initial position instead of
     * under the pointer.
     */
    if (!frame || !root || event.pointerType === 'touch' || event.pointerType === 'pen') return
    const box = root.getBoundingClientRect()
    frame.style.setProperty('--x', `${event.clientX - box.left}px`)
    frame.style.setProperty('--y', `${event.clientY - box.top}px`)
  }, [])

  const activeItem = items.find((item) => item.id === active)

  return (
    <div ref={rootRef} className={cx('relative', className)} onPointerMove={move}>
      {/*
       * The frame. `-translate-x-1/2 -translate-y-1/2` centres it on the
       * cursor; the scale and opacity are what make it *arrive* rather than
       * appear. Both are on the compositor, and the whole thing is
       * `pointer-events-none` so it can never come between the cursor and the
       * row underneath it — which would make the list flicker as the frame
       * chased a hover it was itself stealing.
       */}
      <div
        aria-hidden
        ref={frameRef}
        className={cx(
          'pointer-events-none absolute top-0 left-0 z-20 hidden w-[26rem] overflow-hidden',
          'transition-[opacity,transform] duration-[600ms] ease-[var(--ease-cinema)]',
          '[--x:50%] [--y:50%] lg:[@media(hover:hover)]:block',
        )}
        style={{
          transform: `translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0) scale(${
            activeItem?.photo ? 1 : 0.92
          })`,
          opacity: activeItem?.photo ? 1 : 0,
        }}
      >
        {activeItem?.photo && (
          <img
            {...image(activeItem.photo)}
            sizes="416px"
            alt=""
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        )}
      </div>

      <ul className="relative z-10 w-full">
        {items.map((item, i) => {
          const dimmed = active !== null && active !== item.id
          const inner = (
            <>
              <span
                aria-hidden
                className={cx(
                  'font-serif text-[0.9375rem] leading-none tabular-nums lining-nums transition-colors duration-500',
                  tone === 'dark' ? 'text-navy/45' : 'text-slate',
                  'group-hover:text-[var(--accent)]',
                )}
              >
                {String(start + i).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span
                  className={cx(
                    'block font-serif text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.02em] transition-colors duration-500',
                    tone === 'dark' ? 'text-navy' : 'text-paper',
                    'group-hover:text-[var(--accent)]',
                  )}
                >
                  {item.title}
                </span>
                {item.body && (
                  <span
                    className={cx(
                      'mt-3 block max-w-[54ch] text-[0.9375rem] leading-relaxed',
                      tone === 'dark' ? 'text-navy-600' : 'text-mist',
                    )}
                  >
                    {item.body}
                  </span>
                )}
              </span>
              {item.meta && (
                <span
                  className={cx(
                    'text-label-sm font-semibold uppercase lg:text-right',
                    tone === 'dark' ? 'text-navy/55' : 'text-slate',
                  )}
                >
                  {item.meta}
                </span>
              )}
            </>
          )

          /*
           * The dim is what turns a hover into a *selection*. Without it the
           * hovered row brightens against rows that are equally bright, which
           * the eye reads as a colour change rather than as focus. 0.45 is far
           * enough to be unmistakable and short of the point where the rest of
           * the list stops being readable — someone reading row four while the
           * cursor rests on row two should not lose their place.
           */
          const rowClass = cx(
            'group grid w-full grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-5 gap-y-3 py-9 text-left sm:py-11',
            Boolean(item.meta) && 'lg:grid-cols-[3rem_minmax(0,1fr)_12rem]',
            'transition-opacity duration-500 ease-[var(--ease-cinema)]',
            dimmed && 'lg:opacity-45',
          )

          const handlers = {
            onPointerEnter: () => setActive(item.id),
            onPointerLeave: () => setActive((current) => (current === item.id ? null : current)),
            onFocus: () => setActive(item.id),
            onBlur: () => setActive((current) => (current === item.id ? null : current)),
          }

          return (
            <li key={item.id} className="border-t" style={{ borderColor: 'var(--rule)' }}>
              {item.to ? (
                <Link to={item.to} className={rowClass} {...handlers}>
                  {inner}
                </Link>
              ) : (
                <div className={rowClass} {...handlers}>
                  {inner}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ Ledger */

export interface LedgerEntry {
  value: ReactNode
  label: ReactNode
  note?: ReactNode
}

/**
 * Figures at display scale, separated by hairlines.
 *
 * A number in a card is a number in a box; the box is the first thing read and
 * the number is the second. Here the figure *is* the row — set in the serif at
 * a size nothing else on the page reaches — and the label is a tracked capital
 * underneath it. The rule between entries is vertical on desktop and
 * horizontal once the row stacks, which keeps the "these are one set" reading
 * at every width.
 */
export function Ledger({
  entries,
  tone = 'light',
  className,
  columns = 4,
}: {
  entries: readonly LedgerEntry[]
  tone?: 'light' | 'dark'
  className?: string
  columns?: 2 | 3 | 4
}) {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <dl className={cx('grid grid-cols-1 gap-px', cols, className)}>
      {entries.map((entry, i) => (
        <Scrub
          key={i}
          effect="scrub-rise"
          offset={Math.min(i, 5) * 0.05}
          travel="34px"
          /* The hairline is a top border on every cell and a left border from
             the second column on, which draws the grid without any cell
             carrying a box. */
          className={cx(
            'border-t pt-8',
            i > 0 && 'sm:border-l sm:pl-8',
            columns === 4 && 'lg:[&:nth-child(4n+1)]:border-l-0 lg:[&:nth-child(4n+1)]:pl-0',
            columns === 3 && 'lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0',
            'sm:[&:nth-child(2n+1)]:border-l-0 sm:[&:nth-child(2n+1)]:pl-0',
          )}
          style={{ borderColor: 'var(--rule)' }}
        >
          <dd
            className={cx(
              'font-serif text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[0.95] font-medium tabular-nums lining-nums',
              tone === 'dark' ? 'text-navy' : 'text-paper',
            )}
          >
            {entry.value}
          </dd>
          <dt
            className={cx(
              'text-label mt-5 font-semibold uppercase',
              tone === 'dark' ? 'text-navy-600' : 'text-mist',
            )}
          >
            {entry.label}
          </dt>
          {entry.note && (
            <p
              className={cx(
                'mt-2.5 max-w-[30ch] text-[0.8125rem] leading-relaxed',
                tone === 'dark' ? 'text-navy/55' : 'text-slate',
              )}
            >
              {entry.note}
            </p>
          )}
        </Scrub>
      ))}
    </dl>
  )
}

/* ----------------------------------------------------------------- Dossier */

export interface DossierField {
  label: ReactNode
  value: ReactNode
}

/**
 * Label-over-value pairs in a hairline grid — the fact block that used to be a
 * card with a border on four sides.
 *
 * The label is a tracked capital in the metadata tone and the value is set in
 * the serif, which is the inversion that matters: in a card the label is
 * usually the loud part because it is what makes the card look organised. Here
 * the *answer* is the loud part, which is what a reader came for.
 */
export function Dossier({
  fields,
  tone = 'light',
  className,
  columns = 3,
}: {
  fields: readonly DossierField[]
  tone?: 'light' | 'dark'
  className?: string
  columns?: 2 | 3 | 4
}) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[
    columns
  ]
  return (
    <dl className={cx('grid grid-cols-1 gap-x-10 gap-y-9', cols, className)}>
      {fields.map((field, i) => (
        <div key={i} className="border-t pt-4" style={{ borderColor: 'var(--rule)' }}>
          <dt
            className={cx(
              'text-label-sm font-semibold uppercase',
              tone === 'dark' ? 'text-navy/55' : 'text-slate',
            )}
          >
            {field.label}
          </dt>
          <dd
            className={cx(
              'mt-3 font-serif text-[1.0625rem] leading-snug',
              tone === 'dark' ? 'text-navy' : 'text-paper',
            )}
          >
            {field.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/* ------------------------------------------------------------- FullBleed */

/**
 * A photograph run to both edges of the viewport, revealed as it arrives.
 *
 * The frame opens upward while the picture settles out of a slight oversize —
 * `scrub-mask` on the frame, `scrub-zoom` on the image — which is the one
 * combination that reads as a reveal rather than as a wipe. The caption, when
 * there is one, sits under the left edge in the metadata register.
 */
export function FullBleed({
  photo,
  alt,
  caption,
  height = 'default',
  className,
  priority = false,
}: {
  photo: string
  alt: string
  caption?: ReactNode
  height?: 'default' | 'tall' | 'short'
  className?: string
  priority?: boolean
}) {
  const heights = {
    short: 'h-[45vh] min-h-[18rem] sm:h-[55vh]',
    default: 'h-[62vh] min-h-[22rem] sm:h-[78vh]',
    tall: 'h-[80vh] min-h-[26rem] sm:h-dvh',
  }[height]

  return (
    <figure className={cx('relative', className)}>
      <Scrub effect="scrub-mask" window="enter" className={cx('relative overflow-hidden', heights)}>
        <Scrub
          effect="scrub-zoom"
          window="through"
          reduced={1}
          className="h-full w-full will-change-transform"
        >
          <img
            {...image(photo)}
            sizes={SIZES.full}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            className="h-full w-full object-cover"
          />
        </Scrub>
      </Scrub>
      {caption && (
        <figcaption className="mx-auto w-full max-w-[88rem] px-6 pt-5 text-[0.8125rem] text-slate sm:px-8">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
