import { cx } from '@/lib/utils'

/*
 * Official IES mark: a broken navy ring with a gold arc sweeping across it.
 *
 * Geometry notes, so the shape can be edited without guesswork — all angles are
 * measured from 3 o'clock, increasing clockwise (SVG's y-down convention), on a
 * ring of radius 38 centred at (50, 50):
 *
 *   ring arc 1   150° → 313°   (lower-left, up over the top)
 *   ring arc 2     2° → 130°   (right, round the bottom)
 *   gold arc     153° → 338°   on a radius-51.5 circle, so it bows low through
 *                              the sphere rather than following the rim
 *
 * The two ring gaps are centred on the gold arc's endpoints, which is what makes
 * the arc read as passing behind and in front of the sphere.
 *
 * The ring is drawn in `currentColor` so it can invert for dark and light
 * surfaces; the gold never changes.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={cx('shrink-0', className)}
    >
      <path
        d="M17.09 69A38 38 0 0 1 75.92 22.21"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M87.98 51.33A38 38 0 0 1 25.57 79.11"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M14.35 68.16A51.5 51.5 0 0 0 86.16 35.39"
        stroke="var(--color-gold)"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}
