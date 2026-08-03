import { Container } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { threeAs } from '@/content/site'

/*
 * The Three A's as a sequence of full-height panels rather than three cards in
 * a row: one idea on screen at a time, each in its own colour, so scrolling the
 * homepage moves through them instead of past them.
 *
 * Deliberately NOT scroll-jacked. The panels are ordinary sections in normal
 * document flow — the wheel does exactly what the visitor expects, and the
 * effect comes from colour and scale rather than from taking the scrollbar
 * away. Pinned/hijacked sequences are the pattern that makes people motion
 * sick, and the reveal underneath already honours prefers-reduced-motion.
 *
 * Each panel carries its own accent rather than inheriting the route's, since
 * the point here is that the three differ from each other.
 */
/*
 * Tint alpha is capped at 0.12. The panel sits over navy and the body copy is
 * mist, so every point of tint lightens the ground and eats into that contrast;
 * 0.12 keeps mist above 7:1 with room to spare, while still reading as three
 * distinctly coloured rooms rather than one.
 */
const PANELS = [
  { accent: 'var(--color-sky)', tint: 'rgba(142, 184, 232, 0.12)' },
  { accent: 'var(--color-sage)', tint: 'rgba(143, 191, 168, 0.12)' },
  { accent: 'var(--color-clay)', tint: 'rgba(217, 152, 120, 0.12)' },
] as const

export function ValuePanels() {
  return (
    <section aria-label="The Three A’s">
      {threeAs.map((item, index) => {
        const panel = PANELS[index % PANELS.length]
        const side = index % 2 === 0 ? 'left' : 'right'
        return (
          <div
            key={item.title}
            /* min-h rather than h: the panel grows if the copy wraps on a
               narrow screen instead of clipping it. */
            className="relative flex min-h-[82vh] items-center overflow-hidden border-t border-mist/12 py-24"
            style={{ backgroundColor: panel.tint }}
          >
            {/* The initial, set enormous and barely visible. aria-hidden — it is
                the same letter the heading already starts with, and a screen
                reader announcing a lone "A" helps nobody. */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif leading-none select-none"
              style={{
                fontSize: 'min(58vw, 34rem)',
                color: panel.accent,
                opacity: 0.06,
              }}
            >
              {item.title.charAt(0)}
            </span>

            <Container size="wide" className="relative">
              {/* Each line enters from the side, alternating panel to panel so
                  scrolling the three does not feel like the same move repeated.
                  The stagger is wide (0 → 420ms) because the point is to watch
                  the lines arrive one after another, not all at once. */}
              <div className="mx-auto max-w-3xl text-center">
                <Reveal from={side}>
                  <p
                    className="text-[0.6875rem] font-medium tracking-[0.24em] uppercase"
                    style={{ color: panel.accent }}
                  >
                    {item.title.charAt(0)} · Value {String(index + 1).padStart(2, '0')} /{' '}
                    {String(threeAs.length).padStart(2, '0')}
                  </p>
                </Reveal>

                <Reveal from={side} delay={140}>
                  <h3
                    className="mt-8 font-serif leading-[0.95] text-paper"
                    style={{ fontSize: 'clamp(2.75rem, 8vw, 6.5rem)', letterSpacing: '-0.02em' }}
                  >
                    {item.title}
                  </h3>
                </Reveal>

                <Reveal from={side} delay={280}>
                  <p
                    className="mt-6 text-[0.75rem] font-medium tracking-[0.2em] uppercase"
                    style={{ color: panel.accent }}
                  >
                    {item.subtitle}
                  </p>
                </Reveal>

                <Reveal from={side} delay={420}>
                  <p className="text-lead mx-auto mt-10 max-w-2xl leading-relaxed font-light text-mist">
                    {item.body}
                  </p>
                </Reveal>
              </div>
            </Container>
          </div>
        )
      })}
    </section>
  )
}
