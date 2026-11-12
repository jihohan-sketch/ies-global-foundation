import { cx } from '@/lib/utils'
import { LogoMark } from './LogoMark'

/** The IES mark set beside the Foundation's name. */
export function Logo({
  className,
  variant = 'dark',
}: {
  className?: string
  /** `dark` = navy ink for paper; `light` = paper ink for the navy footer. */
  variant?: 'light' | 'dark'
}) {
  const ink = variant === 'light' ? 'text-paper' : 'text-navy'
  return (
    <span className={cx('flex items-center gap-3', className)}>
      <LogoMark className={cx('h-9 w-9', ink)} />
      <span className={cx('font-serif text-[1.1875rem] leading-none whitespace-nowrap', ink)}>
        IES Global Foundation
      </span>
    </span>
  )
}
