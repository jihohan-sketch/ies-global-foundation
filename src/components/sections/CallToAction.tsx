import { Button, Container } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'

interface Action {
  label: string
  to: string
  variant?: 'primary' | 'secondary'
}

export function CallToAction({
  eyebrow = 'Get Involved',
  title,
  body,
  actions,
}: {
  eyebrow?: string
  title: string
  body: string
  actions: Action[]
}) {
  return (
    <section className="relative border-t border-mist/12 py-24 sm:py-32">
      <Container className="relative text-center">
        <Reveal>
          <p className="text-[0.6875rem] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            {eyebrow}
          </p>
          <h2 className="text-h2 mt-7 mx-auto max-w-3xl">{title}</h2>
          <p className="text-lead mx-auto mt-7 max-w-2xl font-light text-mist">{body}</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
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
