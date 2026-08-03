import { PinnedPan } from '@/components/sections/PinnedPan'
import { threeAs } from '@/content/site'

/*
 * The Three A's as a pinned horizontal pan: the section sticks to the viewport
 * and the three values travel sideways as the page scrolls down, one full
 * screen each.
 *
 * Each panel carries its own accent rather than inheriting the route's — the
 * point of the section is that the three differ from one another.
 */
const PANELS = [
  { accent: 'var(--color-sky)', tint: 'rgba(142, 184, 232, 0.12)' },
  { accent: 'var(--color-sage)', tint: 'rgba(143, 191, 168, 0.12)' },
  { accent: 'var(--color-clay)', tint: 'rgba(217, 152, 120, 0.12)' },
] as const

export function ValuePanels() {
  return (
    <PinnedPan label="The Three A’s" className="border-y border-mist/12">
      {threeAs.map((item, index) => {
        const panel = PANELS[index % PANELS.length]
        return (
          <div
            key={item.title}
            /* Exactly one viewport wide, so the pan lands one value at a time
               rather than leaving two half-visible. */
            className="relative flex h-screen w-screen shrink-0 items-center overflow-hidden"
            style={{ backgroundColor: panel.tint }}
          >
            {/* The initial, set enormous and barely visible. aria-hidden — it is
                the same letter the heading already starts with, and a screen
                reader announcing a lone "A" helps nobody. */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif leading-none select-none"
              style={{ fontSize: 'min(58vw, 34rem)', color: panel.accent, opacity: 0.06 }}
            >
              {item.title.charAt(0)}
            </span>

            <div className="relative mx-auto w-full max-w-3xl px-6 text-center sm:px-8">
              <p
                  className="text-[0.6875rem] font-medium tracking-[0.24em] uppercase"
                  style={{ color: panel.accent }}
                >
                  {item.title.charAt(0)} · Value {String(index + 1).padStart(2, '0')} /{' '}
                  {String(threeAs.length).padStart(2, '0')}
                </p>

              <h3
                  className="mt-8 font-serif leading-[0.95] text-paper"
                  style={{ fontSize: 'clamp(2.75rem, 8vw, 6.5rem)', letterSpacing: '-0.02em' }}
                >
                  {item.title}
                </h3>

              <p
                  className="mt-6 text-[0.75rem] font-medium tracking-[0.2em] uppercase"
                  style={{ color: panel.accent }}
                >
                  {item.subtitle}
                </p>

              <p className="text-lead mx-auto mt-10 max-w-2xl leading-relaxed font-light text-mist">
                  {item.body}
                </p>
            </div>
          </div>
        )
      })}
    </PinnedPan>
  )
}
