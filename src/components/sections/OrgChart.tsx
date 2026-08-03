import { Link } from 'react-router-dom'
import { branches } from '@/content/branches'
import { cx } from '@/lib/utils'

const base = [
  'School chapters',
  'Student leaders',
  'Programs',
  'Local partnerships',
]

/**
 * Organizational diagram: Foundation → national branches → chapter-level
 * activity. Built from live branch content so a new branch appears
 * automatically.
 */
export function OrgChart({ className }: { className?: string }) {
  return (
    <div className={cx('relative', className)}>
      {/* -------------------------------------------------- Foundation */}
      <div className="mx-auto max-w-md">
        <div className="border border-[var(--accent)]/45 bg-navy-700/50 px-8 py-7 text-center">
          <p className="text-[0.625rem] font-medium tracking-[0.22em] text-[var(--accent)] uppercase">
            International Coordination
          </p>
          <p className="mt-3 font-serif text-[1.375rem]">IES Global Foundation</p>
        </div>
      </div>

      {/* Connector down from the Foundation */}
      <div aria-hidden className="mx-auto h-10 w-px bg-mist/25" />

      {/* Horizontal spine across the branches (large screens only) */}
      <div
        aria-hidden
        className="mx-auto hidden h-px md:block"
        style={{ width: 'calc(100% - (100% / 3))', background: 'rgba(170,180,194,0.25)' }}
      />

      {/* --------------------------------------------------- Branches */}
      <div className="grid gap-6 md:grid-cols-3 md:gap-6">
        {branches.map((branch) => (
          <div key={branch.slug} className="flex flex-col items-center">
            <div aria-hidden className="hidden h-8 w-px bg-mist/25 md:block" />
            <div aria-hidden className="h-8 w-px bg-mist/25 md:hidden" />

            <Link
              to={`/global-network/${branch.slug}`}
              className="group w-full border border-mist/22 bg-navy-700/35 px-6 py-6 text-center transition-colors duration-300 hover:border-[var(--accent)]/50"
            >
              <p className="font-serif text-lg transition-colors group-hover:text-[var(--accent)]">
                {branch.name}
              </p>
              <p className="mt-2 text-[0.6875rem] font-medium tracking-[0.14em] text-mist uppercase">
                {branch.status === 'Headquarters' ? 'Original branch · HQ' : 'National branch'}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Connector into the shared base layer */}
      <div aria-hidden className="mx-auto h-10 w-px bg-mist/25" />

      {/* ------------------------------------------------- Base layer */}
      <div className="grid gap-3 border-t border-mist/18 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {base.map((item) => (
          <div
            key={item}
            className="border border-mist/15 bg-navy-700/25 px-5 py-4 text-center text-sm font-light text-mist"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
