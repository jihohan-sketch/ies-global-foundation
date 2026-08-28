import { Link } from 'react-router-dom'
import { Button, Container } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'

interface Action {
  label: string
  to: string
  variant?: 'primary' | 'secondary'
}

/**
 * One way in, described rather than labelled — see `routes` below.
 */
export interface CtaRoute {
  /** Who this one is for, in a few words. The line that lets a reader self-select. */
  audience: string
  title: string
  body: string
  linkLabel: string
  to: string
}

export function CallToAction({
  eyebrow = 'Get Involved',
  title,
  body,
  actions,
  routes,
}: {
  eyebrow?: string
  title: string
  body: string
  actions: Action[]
  /*
   * THE ROUTES VARIANT, AND WHY IT IS A PROP RATHER THAN A REWRITE.
   *
   * The default shape — a centred sentence over a row of buttons — is right
   * for the nine other pages that end with this component, where the closing
   * ask is one thing with a couple of alternatives beside it.
   *
   * It is wrong for the home page, which ends by asking the visitor to choose
   * between three genuinely different commitments: join a chapter that exists,
   * found one that does not, or bring an organisation. Three buttons of equal
   * weight put that choice to someone who has been given no basis for making
   * it — the labels say where each goes and nothing says which is *theirs*, so
   * the honest response is to press none of them. That is the whole of the
   * brief's "make the join path clearer and more compelling": the path is not
   * unclear because it is hidden, it is unclear because the reader cannot tell
   * which one they are.
   *
   * Supplying `routes` swaps the button row for the same three destinations set
   * as described columns — each one led by who it is for. `actions` still
   * renders underneath as the single unambiguous next step for a reader who
   * does not want to choose, so nothing is removed by opting in.
   */
  routes?: readonly CtaRoute[]
}) {
  const described = routes && routes.length > 0

  return (
    <section className="relative border-t border-mist/12 py-24 sm:py-32">
      {/* Centred for the button shape, left-aligned for the described one. A
          three-column block of running text under a centred heading reads as a
          heading that has lost its columns; the columns have a left edge, so
          the heading takes the same one. */}
      <Container
        size={described ? 'wide' : 'default'}
        className={described ? 'relative' : 'relative text-center'}
      >
        <Reveal>
          <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-[var(--accent)] uppercase">
            {eyebrow}
          </p>
          <h2 className={described ? 'text-h2 mt-6 max-w-[20ch]' : 'text-h2 mx-auto mt-7 max-w-3xl'}>
            {title}
          </h2>
          <p
            className={
              described
                ? 'text-lead mt-6 max-w-[58ch] text-mist'
                : 'text-lead mx-auto mt-7 max-w-2xl text-mist'
            }
          >
            {body}
          </p>
        </Reveal>

        {described && (
          <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {routes.map((route, i) => (
              <Reveal key={route.to} delay={i * 90}>
                {/*
                 * The whole column is the link, not a small label at the foot
                 * of it. Three destinations described in a paragraph each and
                 * then reached through a five-word link is three large targets
                 * that do nothing and three small ones that do — the block a
                 * reader has just decided on should be the thing they can
                 * press.
                 *
                 * `h-full` so a short column still fills its row and the rules
                 * along the top stay on one line.
                 */}
                <Link
                  to={route.to}
                  className="group flex h-full flex-col rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  {/* The rule is the hover, as it is everywhere else on the
                      site — a hairline warming to the accent rather than a
                      panel lighting up. */}
                  <span
                    aria-hidden
                    className="block h-px w-full bg-mist/25 transition-colors duration-500 ease-[var(--ease-cinema)] group-hover:bg-[var(--accent)]"
                  />

                  <span className="text-label-sm mt-6 block font-semibold text-[var(--accent)] uppercase">
                    {route.audience}
                  </span>

                  <span className="mt-3 block font-serif text-[1.375rem] leading-snug text-paper">
                    {route.title}
                  </span>

                  <span className="mt-4 block flex-1 text-[0.9375rem] leading-relaxed text-mist">
                    {route.body}
                  </span>

                  <span className="mt-6 inline-flex items-center gap-2.5 text-[0.75rem] font-semibold tracking-[0.13em] text-paper uppercase transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {route.linkLabel}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={described ? 270 : 0}>
          <div
            className={
              described
                ? 'mt-14 flex flex-wrap gap-4 border-t border-mist/12 pt-10'
                : 'mt-12 flex flex-wrap justify-center gap-4'
            }
          >
            {actions.map((action) => (
              <Button
                key={action.to + action.label}
                to={action.to}
                variant={action.variant ?? 'secondary'}
                arrow={action.variant === 'primary'}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
