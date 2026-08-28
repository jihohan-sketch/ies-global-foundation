import { cx } from '@/lib/utils'
import { LogoMark } from './LogoMark'

const FULL_SUBTITLE = 'Est. 2023 · Korea · United States · United Kingdom'

/**
 * Wordmark: the official IES mark set against the serif name.
 * Uses no raster asset so it stays crisp at any size.
 */
export function Logo({
  className,
  variant = 'light',
  compact = false,
  /** `responsive` shortens the sub-line on narrower viewports (header use). */
  subtitle = 'responsive',
}: {
  className?: string
  /**
   * `light` = light ink, for a dark ground. `dark` = navy ink, for paper.
   * `auto` follows `--bar-ink`, which the header re-points as the bar crosses
   * a light section — see `useGroundUnderHeader`. Anything drawing the logo
   * inside the fixed header wants `auto`; everything else states its ground.
   */
  variant?: 'light' | 'dark' | 'auto'
  compact?: boolean
  subtitle?: 'full' | 'responsive'
}) {
  const ink =
    variant === 'auto'
      ? 'text-[var(--bar-ink)] transition-colors duration-500'
      : variant === 'light'
        ? 'text-paper'
        : 'text-navy'
  const sub =
    variant === 'auto'
      ? 'text-[var(--bar-ink-dim)] transition-colors duration-500'
      : variant === 'light'
        ? 'text-mist'
        : 'text-navy-700/70'

  return (
    <span className={cx('flex items-center gap-3', className)}>
      {/* The mark's ring takes `currentColor`, so it inverts with the variant
          while the gold arc stays constant. */}
      <LogoMark className={cx('h-10 w-10', ink)} />
      {!compact && (
        <span
          className={cx(
            'flex-col leading-none',
            // On narrow screens the monogram stands alone so the wordmark can
            // never collide with the header actions.
            subtitle === 'full' ? 'flex' : 'hidden sm:flex',
          )}
        >
          <span
            className={cx('font-serif text-[1.0625rem] tracking-[0.02em] whitespace-nowrap', ink)}
          >
            IES Global Foundation
          </span>
          <span
            className={cx(
              'mt-1 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase',
              /*
               * The `full` sub-line is 49 characters of wide-tracked type, which
               * cannot fit beside the mark on a phone. Left un-wrapped it pushed
               * the document 32px past the viewport on every page — the footer
               * renders this variant, so the overflow was site-wide. The header's
               * variant is short enough to stay on one line.
               */
              subtitle === 'full' ? 'whitespace-normal' : 'whitespace-nowrap',
              sub,
            )}
          >
            {subtitle === 'full' ? (
              FULL_SUBTITLE
            ) : (
              <>
                <span className="hidden 2xl:inline">{FULL_SUBTITLE}</span>
                <span className="2xl:hidden">Est. 2023</span>
              </>
            )}
          </span>
        </span>
      )}
    </span>
  )
}
