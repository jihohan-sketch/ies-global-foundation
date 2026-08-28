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
  tone?: 'navy' | 'deep' | 'paper'
  size?: 'default' | 'compact' | 'tall'
}) {
  /*
   * `navy` paints no background of its own — the Layout wrapper already is navy,
   * and staying transparent lets the fixed globe backdrop read through. `deep`
   * and `paper` stay opaque, so they land as solid interludes between the
   * sections the globe shows through.
   */
  const tones = {
    navy: 'text-paper',
    deep: 'bg-navy-700 text-paper',
    paper: 'bg-paper text-navy',
  }
  /* Trimmed roughly a quarter off each step. The old scale left several
     screens of near-empty navy between sections on the longer pages; the
     rhythm survives the cut, the dead space does not. */
  const sizes = {
    compact: 'py-12 sm:py-16',
    default: 'py-16 sm:py-20 lg:py-24',
    tall: 'py-20 sm:py-24 lg:py-28',
  }
  return (
    <section
      id={id}
      className={cx(
        'relative',
        tones[tone],
        sizes[size],
        /*
         * Every section announces its own top edge, rather than relying on the
         * caller to remember a border. A page built from a dozen sections that
         * each looked identical *and* ran into each other without a seam is
         * the layout half of "the content does not pop" — a reader could not
         * tell whether they had moved into something new or were still in the
         * middle of the last thing.
         *
         * `paper` is exempt: a light slab against near-black already is the
         * strongest edge on the site, and a lit hairline on top of it would
         * only muddy the cut.
         */
        tone !== 'paper' && 'section-edge',
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
  /**
   * One or two words set at display scale behind the heading as texture. Purely
   * decorative — see `GhostTitle`. Omit it on `paper` sections, where a 4%
   * white ghost has nothing to sit on.
   */
  ghost?: string
  /**
   * `01`, `02`, … Numbers the section within its page and swaps the eyebrow for
   * the indexed marker. Purely a presentational choice about the eyebrow: the
   * label still comes from `eyebrow`, which stays required for it.
   */
  index?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
  as?: ElementType
}) {
  /*
   * PRIMARY / SECONDARY / TERTIARY, AND YOU CAN TELL WHICH IS WHICH.
   *
   * The three lines here are the section's whole hierarchy, and they used to
   * be separated by about as much as a stylesheet can separate three things
   * without actually distinguishing them: a 10px label, a 2.875rem serif, and
   * a 1.25rem light grey lead. Two of the three were grey, two of the three
   * were light-weight, and the eye had to *read* all three to find out which
   * one mattered.
   *
   * Now:
   *   TERTIARY  the index/eyebrow — 12px, 600, accent, with a solid mark
   *   PRIMARY   the title — up to 3.25rem serif at weight 500, paper white
   *   SECONDARY the lead — up to 1.375rem sans at 400, `mist`, capped to 52ch
   *
   * Three sizes, three weights, three colours, three measures. Nothing has to
   * be compared with anything to be ranked.
   *
   * `max-w-3xl` is gone from the wrapper. It was capping the *title* at 48rem
   * on every section of the site, which is why every heading broke to two or
   * three lines at exactly the same width and every section looked like the
   * one before it. The title now runs to the width its container gives it and
   * only the lead is measured, which is what lets a long title be one strong
   * line and a short one be genuinely short.
   */
  return (
    <div className={cx('relative', align === 'center' && 'mx-auto text-center', className)}>
      {ghost && tone === 'light' && (
        <GhostTitle align={align === 'center' ? 'center' : 'left'}>
          {ghost}
        </GhostTitle>
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
        <Tag
          className={cx(
            'text-h2 mt-5 max-w-[22ch]',
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
              tone === 'dark' ? 'text-navy-700' : 'text-mist',
            )}
          >
            {lead}
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ Button */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'onLight'

/*
 * `min-h-11` keeps every variant at the 44px minimum touch target, including
 * `ghost`, whose padding alone would leave it around 27px tall.
 *
 * Fully rounded, not the 3px this used to carry. The site's other corners stay
 * sharp — cards, images, inputs — and that contrast is the point: on a page
 * built from hairlines and right angles, a capsule is unmistakably the thing
 * you press. A 3px radius reads as a softened rectangle and competes with every
 * other softened rectangle on the screen.
 */
const buttonBase =
  'group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-[0.8125rem] font-medium tracking-[0.1em] uppercase transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-3'

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-navy hover:bg-gold-300',
  secondary:
    'border border-mist/55 text-paper hover:border-gold/70 hover:bg-gold/8 hover:text-gold-300',
  ghost: 'text-paper/85 hover:text-gold px-0 py-1 tracking-[0.14em]',
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
    'group inline-flex items-center gap-5 text-[0.8125rem] tracking-[0.08em] text-paper/85 transition-colors duration-300 hover:text-paper',
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

export function Card({
  children,
  className,
  interactive = false,
  tone = 'dark',
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
  tone?: 'dark' | 'light'
}) {
  return (
    <div
      /* Hover shifts the border only — no lift, no shadow. The card stays put,
         so a grid of them reads as a calm table rather than a set of tiles that
         jump under the cursor. */
      className={cx(
        'relative rounded-[3px] border transition-colors duration-300',
        tone === 'dark' ? 'border-mist/18 bg-navy-700/45' : 'border-navy/12 bg-white',
        interactive && (tone === 'dark' ? 'hover:border-gold/45' : 'hover:border-navy/35'),
        className,
      )}
    >
      {children}
    </div>
  )
}

/* --------------------------------------------------------------- Hairlines */

export function Rule({ className }: { className?: string }) {
  return <div aria-hidden className={cx('rule-fade w-full', className)} />
}
