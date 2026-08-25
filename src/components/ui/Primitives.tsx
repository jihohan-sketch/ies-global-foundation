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
    <section id={id} className={cx('relative', tones[tone], sizes[size], className)}>
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
  return (
    <p
      className={cx(
        'flex items-center gap-4 text-[0.625rem] font-medium tracking-[0.3em] uppercase',
        tones[tone],
        className,
      )}
    >
      {/* `shrink-0` keeps the rule at its intended 40px; as a decorative element
          it should not be the thing that gives way when space is tight. */}
      <span aria-hidden className="h-px w-10 shrink-0 bg-current opacity-45" />
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
  return (
    <div
      className={cx(
        'relative max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {ghost && tone === 'light' && (
        <GhostTitle
          align={align === 'center' ? 'center' : 'left'}
          /*
           * Raised until roughly its top two-thirds sit above the heading, so
           * the section's own `overflow-hidden` crops it against the top edge.
           * That is the difference between type used as texture and type used
           * as a second headline: sat squarely behind the words it competed
           * with them and made both harder to read.
           */
          className="-top-[0.5em] -translate-y-1/2"
        >
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
            'text-h2 mt-6',
            tone === 'dark' ? 'text-navy' : 'text-paper',
          )}
        >
          {title}
        </Tag>
        {lead && (
          <div
            className={cx(
              'text-lead mt-6 font-light',
              tone === 'dark' ? 'text-navy-700/80' : 'text-mist',
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

/* `min-h-11` keeps every variant at the 44px minimum touch target, including
   `ghost`, whose padding alone would leave it around 27px tall. */
const buttonBase =
  'group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[3px] px-7 py-3.5 text-[0.8125rem] font-medium tracking-[0.1em] uppercase transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-3'

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
