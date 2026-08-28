import type { ElementType, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { GhostTitle, SectionIndex } from '@/components/ui/Cinematic'
import { cx } from '@/lib/utils'

/* -------------------------------------------------------------- Container */

export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}) {
  const width =
    size === 'narrow' ? 'max-w-3xl' : size === 'wide' ? 'max-w-[88rem]' : 'max-w-6xl'
  return <div className={cx('mx-auto w-full px-6 sm:px-8', width, className)}>{children}</div>
}

/* ---------------------------------------------------------------- Section */

export type SectionTone = 'navy' | 'deep' | 'paper' | 'bone'

/**
 * A movement of a page.
 *
 * FOUR GROUNDS, TWO OF THEM LIGHT — and that is the structural change the
 * redesign turns on. The site used to be dark from the first pixel to the
 * last, with `paper` available but used almost nowhere. Uniform darkness has a
 * specific failure: with nothing to measure it against, a dark section does
 * not read as *a section*, it reads as more page. A reader scrolling a long
 * dark document cannot tell movement from length.
 *
 * The rule for choosing one is about reading rather than about variety:
 *
 *   `navy`  — transparent. The ambient ground, and what the globe reads
 *             through. Cinema: pinned scenes, statements, photography.
 *   `deep`  — a raised dark slab. A dark section that needs to separate from
 *             the dark section next to it.
 *   `paper` — off-white. The reading grounds: essays, dossiers, lists,
 *             governance, anything a visitor has to work through rather than
 *             watch.
 *   `bone`  — the second light ground, one step down. For a light section
 *             directly against another light one.
 *
 * Both light tones set `data-ground="light"`, which re-points `--accent` and
 * `--rule` for everything inside them (see index.css). A component written for
 * the dark ground is therefore correct on the light one without being told.
 */
export function Section({
  children,
  className,
  id,
  tone = 'navy',
  size = 'default',
}: {
  children: ReactNode
  className?: string
  id?: string
  tone?: SectionTone
  size?: 'default' | 'compact' | 'tall' | 'flush'
}) {
  const tones: Record<SectionTone, string> = {
    navy: 'text-paper',
    deep: 'bg-navy-700 text-paper',
    paper: 'bg-paper text-navy',
    bone: 'bg-bone text-navy',
  }
  const light = tone === 'paper' || tone === 'bone'
  /*
   * SPACE THAT SEPARATES, NOT SPACE THAT STRANDS.
   *
   * The previous pass took `default` to 160px a side on the argument that
   * oversized headings need room. They did — but the headings have since come
   * down about 30%, and padding tuned to the larger type left several screens
   * on the longer pages where a visitor scrolls past nothing at all. Empty
   * space only reads as composure when something is about to arrive; past
   * roughly a screen-height of it, it reads as a page that has finished.
   *
   * These are back to roughly two-thirds. The separation between sections is
   * now carried by the things that are *meant* to carry it — the ground
   * changing from navy to paper, and the hairline `section-edge` — rather than
   * by distance, which is the weakest and most expensive way to say "new
   * section".
   *
   * `flush` carries no vertical padding at all, for a section whose child
   * brings its own frame.
   */
  const sizes = {
    flush: '',
    compact: 'py-12 sm:py-14',
    default: 'py-16 sm:py-20 lg:py-24',
    tall: 'py-20 sm:py-24 lg:py-32',
  }
  return (
    <section
      id={id}
      data-ground={light ? 'light' : undefined}
      className={cx(
        'relative',
        tones[tone],
        sizes[size],
        /*
         * Every section announces its own top edge rather than relying on the
         * caller to remember a border. A page built from a dozen sections that
         * each looked identical *and* ran into each other without a seam is
         * the layout half of "the content does not pop".
         *
         * Light grounds get the edge too now — the `[data-ground='light']`
         * override in index.css swaps it to a navy hairline with no bleed
         * under it, because on paper a gradient below a rule reads as a
         * printing fault.
         */
        'section-edge',
        className,
      )}
    >
      {children}
    </section>
  )
}

/* ----------------------------------------------------------------- Eyebrow */

export function Eyebrow({
  children,
  className,
  tone = 'gold',
}: {
  children: ReactNode
  className?: string
  tone?: 'gold' | 'mist' | 'navy'
}) {
  /* `gold` is the section accent rather than a literal gold: on most routes it
     resolves to gold anyway, and Layout re-points it per section. */
  const tones = {
    gold: 'text-[var(--accent)]',
    mist: 'text-mist',
    navy: 'text-navy-600',
  }
  /*
   * 12px / 600 / 0.14em, up from 10px / 500 / 0.3em.
   *
   * This is the mark that answers "what section am I in", which the brief puts
   * first among the three things a reader should get in one second. It was
   * previously the *smallest and faintest* text in the section it was naming —
   * set below the legibility floor and tracked so wide the word had to be
   * spelled rather than recognised.
   *
   * The rule beside it went from a 1px hairline at 45% to a 2px bar at full
   * strength, and short. A hairline reads as decoration; a short solid bar in
   * the accent reads as a marker, and it is the thing that makes the label
   * findable at a glance down the page.
   */
  return (
    <p
      className={cx(
        'text-label flex items-center gap-3.5 font-semibold uppercase',
        tones[tone],
        className,
      )}
    >
      {/* `shrink-0` keeps the mark at its intended width; as a decorative
          element it should not be the thing that gives way when space is tight. */}
      <span aria-hidden className="h-0.5 w-6 shrink-0 rounded-full bg-current" />
      {children}
    </p>
  )
}

/* ---------------------------------------------------------- SectionHeading */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  ghost,
  index,
  align = 'left',
  tone = 'light',
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  ghost?: string
  index?: string
  align?: 'left' | 'center'
  /** `light` = light type on a dark ground. `dark` = navy type on paper. */
  tone?: 'light' | 'dark'
  className?: string
  as?: ElementType
}) {
  return (
    <div className={cx('relative', align === 'center' && 'mx-auto text-center', className)}>
      {ghost && (
        <GhostTitle align={align === 'center' ? 'center' : 'left'}>{ghost}</GhostTitle>
      )}
      {/* Lifted over the ghost explicitly. Source order alone is not enough:
          the ghost is positioned, so it would otherwise paint above static
          siblings that come after it. */}
      <div className="relative z-10">
        {eyebrow &&
          (index ? (
            <SectionIndex
              index={index}
              label={eyebrow}
              tone={tone}
              className={align === 'center' ? 'justify-center' : undefined}
            />
          ) : (
            <Eyebrow
              tone={tone === 'dark' ? 'navy' : 'gold'}
              className={align === 'center' ? 'justify-center' : undefined}
            >
              {eyebrow}
            </Eyebrow>
          ))}
        {/*
         * 20ch. Headings still break early — three or four words a line, which
         * is what gives the left edge of a section its shape — but the measure
         * moved back out with the type size. At 16ch and the smaller h2, a
         * heading of any length was breaking into four or five stubby lines,
         * which reads as a column of fragments rather than as a statement.
         */}
        <Tag
          className={cx(
            'text-h2 mt-5 max-w-[20ch]',
            align === 'center' && 'mx-auto',
            tone === 'dark' ? 'text-navy' : 'text-paper',
          )}
        >
          {title}
        </Tag>
        {lead && (
          <div
            className={cx(
              'text-lead measure-lead mt-5',
              align === 'center' && 'mx-auto',
              tone === 'dark' ? 'text-navy-600' : 'text-mist',
            )}
          >
            {lead}
          </div>
        )}
      </div>
    </div>
  )
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'onLight'

/*
 * SQUARER, AND THAT IS THE EDITORIAL TELL.
 *
 * The buttons were fully rounded pills, which is the house style of the
 * product website — friendly, soft, and completely at odds with a page built
 * out of hairlines and hard-set display type. A 2px radius reads as a printed
 * rule box; it belongs to the same drawing as the dividers.
 *
 * The primary fill is the IES blue with navy type on it, which at 11.4:1 is
 * the highest-contrast pair on the site — right for the one control a section
 * actually wants pressed.
 */
/*
 * THE TRANSITION LIST IS EXPLICIT, AND THAT IS THE POINT OF IT.
 *
 * This was `transition-all duration-500`, which is two mistakes in one
 * utility. `all` means the browser watches every animatable property on the
 * element, including `transform` — and the press state below moves the button
 * a pixel, which under `all` took half a second to happen and another half to
 * come back. A press has to be acknowledged inside about 100ms or it does not
 * read as an acknowledgement at all; at 500ms the button appears to sag some
 * time after the click it was responding to.
 *
 * So colour, border and the glow keep the slow cinematic ease — they are the
 * hover, and the hover is meant to be a warming rather than a switch — and
 * `transform` is left out of the list entirely, so the press lands on the
 * frame it happens.
 */
const buttonBase =
  'group inline-flex min-h-11 items-center justify-center gap-3 rounded-[2px] px-9 py-4 text-[0.75rem] font-semibold tracking-[0.13em] uppercase transition-[color,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-cinema)] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3'

const buttonVariants: Record<ButtonVariant, string> = {
  /* The glow, and it is the one place on the site a shadow is allowed.
     Everything else here is drawn with hairlines, but this is the single
     control a section actually wants pressed, and a warm bloom off a gold fill
     on a near-black ground is the same light the seams and the globe cast — it
     reads as the button lighting up rather than as a card floating. */
  primary:
    'bg-gold text-navy hover:bg-gold-300 hover:shadow-[0_0_32px_-8px_rgba(200,169,107,0.6)]',
  secondary:
    'border border-mist/45 text-paper hover:border-gold/70 hover:bg-gold/10 hover:text-gold',
  ghost: 'text-paper hover:text-gold px-0 py-1 tracking-[0.14em]',
  onLight:
    'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-paper',
}

interface ButtonProps {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: ButtonVariant
  className?: string
  arrow?: boolean
  disabled?: boolean
}

export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  arrow = false,
  disabled,
}: ButtonProps) {
  /* `opacity-50` sits inside the 0.38–0.5 disabled range. The native <button>
     below carries the real `disabled` attribute, so it keeps pointer events and
     can show `cursor: not-allowed`; link variants have no such attribute and
     have to be inerted explicitly. */
  const classes = cx(
    buttonBase,
    buttonVariants[variant],
    disabled && 'opacity-50',
    disabled && (to || href) && 'pointer-events-none',
    className,
  )

  const inner = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} aria-disabled={disabled || undefined}>
        {inner}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {inner}
    </button>
  )
}

/* --------------------------------------------------------------- ArrowLink */

/**
 * A label with a circular arrow beside it — the site's quietest call to action,
 * and the one that carries a section rather than a page.
 *
 * The ring is the whole idea. A `Button` is a solid object you press; this is a
 * line of type that happens to lead somewhere, with the target drawn as a
 * separate mark next to it. It sits between `Button variant="ghost"` (a link
 * with an arrow glyph) and a full capsule, and it is the right register at the
 * foot of a section that has already said everything it needed to.
 *
 * The whole thing is one anchor, so the ring is never a second tab stop for the
 * same destination, and the hover moves both halves together — the ring fills
 * and the arrow steps forward inside it.
 */
export function ArrowLink({
  children,
  to,
  href,
  className,
  align = 'left',
}: {
  children: ReactNode
  to?: string
  href?: string
  className?: string
  /** `center` is for a rail or a scene the link closes rather than opens. */
  align?: 'left' | 'center'
}) {
  const classes = cx(
    'group inline-flex items-center gap-5 text-[0.8125rem] tracking-[0.08em] text-paper transition-colors duration-300 hover:text-paper',
    align === 'center' && 'justify-center',
    className,
  )

  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mist/45 transition-colors duration-300 group-hover:border-[var(--accent)]/70 group-hover:bg-[var(--accent)]/10"
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
          <path
            d="M2 8h11m0 0-4-4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            /* Translates rather than growing: the ring is a fixed frame and the
               arrow moves inside it, which is what makes the pair read as one
               mechanism instead of two things reacting separately. */
            className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px]"
          />
        </svg>
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {inner}
    </a>
  )
}

/* -------------------------------------------------------------------- Card */

/**
 * A block of related content, marked by a rule rather than boxed by a border.
 *
 * THIS USED TO BE A CARD, AND THE REDESIGN IS MOSTLY ABOUT IT NO LONGER BEING
 * ONE.
 *
 * A bordered, tinted rectangle does three things, and only the first is
 * wanted: it groups its contents, it separates them from the page, and it
 * announces itself as a *component*. The second and third are what make a page
 * of them read as an inventory — the eye counts boxes before it reads any of
 * them, and eight boxes at one weight say that eight things matter equally,
 * which is almost never true.
 *
 * What is left is the grouping, carried by a hairline across the top and the
 * whitespace under it. That is enough: a rule with content beneath it is one
 * of the oldest grouping devices in print, it costs no visual weight, and it
 * lets adjacent blocks sit at different heights without looking broken —
 * which is what makes an asymmetric layout possible at all.
 *
 * `interactive` brightens the rule to the accent on hover. The rule is the
 * only thing that changes, so a grid of these stays still under the cursor
 * instead of lighting up like a set of tiles.
 *
 * `tone` is now only needed where the block sits on a ground the surrounding
 * `Section` has not declared; inside a `paper` or `bone` section the rule
 * follows `--rule` and flips on its own.
 */
export function Card({
  children,
  className,
  interactive = false,
  tone,
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
  /** Forces the rule's ground. Omit and it follows the section it is in. */
  tone?: 'dark' | 'light'
}) {
  return (
    <div
      className={cx(
        'relative border-t pt-7 transition-colors duration-500 ease-[var(--ease-cinema)]',
        interactive && 'hover:border-[var(--accent)]/70',
        className,
      )}
      style={
        tone
          ? {
              borderColor:
                tone === 'light'
                  ? 'color-mix(in srgb, #050b16 14%, transparent)'
                  : 'color-mix(in srgb, #bcc7d4 20%, transparent)',
            }
          : { borderColor: 'var(--rule)' }
      }
    >
      {children}
    </div>
  )
}

export function Rule({ className }: { className?: string }) {
  return <div aria-hidden className={cx('rule-fade w-full', className)} />
}
