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
  variant?: 'light' | 'dark'
  compact?: boolean
  subtitle?: 'full' | 'responsive'
}) {
  const ink = variant === 'light' ? 'text-paper' : 'text-navy'
  const sub = variant === 'light' ? 'text-mist' : 'text-navy-700/70'

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
              'mt-1 text-[0.5625rem] font-medium tracking-[0.22em] whitespace-nowrap uppercase',
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
