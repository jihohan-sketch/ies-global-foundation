import { continuity } from '@/content/home'
import { Section, SectionHeading } from './Section'

/**
 * The four-step sequence. It is an ordered list first: the numbers, labels and
 * descriptions carry the meaning, and the rails and return connection are
 * drawn on top. Nothing depends on animation.
 */
function Sequence() {
  const last = continuity.steps.length - 1
  return (
    <div className="mt-12">
      <ol className="grid md:grid-cols-4">
        {continuity.steps.map((step, i) => (
          <li
            key={step.title}
            className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-10 md:block md:pr-8 md:pb-0"
          >
            {/* Rail to the next step: down on mobile, across on desktop. */}
            {i < last && (
              <>
                <span aria-hidden className="absolute top-10 bottom-0 left-5 w-px bg-[var(--rule-strong)] md:hidden" />
                <span
                  aria-hidden
                  className="absolute top-5 right-0 left-10 hidden h-px bg-[var(--rule-strong)] md:block"
                />
              </>
            )}
            {i === last && (
              <span
                aria-hidden
                className="absolute top-10 bottom-0 left-5 border-l-2 border-dotted border-gold-600 md:hidden"
              />
            )}
            <span
              aria-hidden
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-navy bg-bone font-serif text-[1.125rem] text-navy [font-variant-numeric:lining-nums]"
            >
              {i + 1}
            </span>
            <div className="md:mt-6">
              <h3 className="text-h3 text-navy">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* The return connection: from continuing contribution back to Lead. */}
      <div className="relative mt-2 md:mt-8">
        <div
          aria-hidden
          className="absolute top-0 right-[calc(25%-1.25rem-2px)] left-5 hidden h-10 rounded-b-2xl border-x-2 border-b-2 border-dotted border-gold-600 md:block"
        />
        <span
          aria-hidden
          className="absolute -top-2 left-[13px] hidden text-[0.875rem] leading-none text-gold-800 md:block"
        >
          ▲
        </span>
        <p className="relative flex items-center gap-3 text-[0.875rem] font-medium text-gold-800 md:justify-center md:pt-7">
          <span aria-hidden className="md:hidden">↺</span>
          <span className="md:bg-bone md:px-4">{continuity.returnLabel}</span>
        </p>
      </div>
    </div>
  )
}

export function Continuity() {
  return (
    <Section id="continuity" labelledBy="continuity-heading" tone="bone">
      <SectionHeading id="continuity-heading">{continuity.heading}</SectionHeading>
      <Sequence />

      <div className="mt-20 grid gap-10 md:grid-cols-2 md:gap-12">
        {continuity.questions.map((item) => (
          <div key={item.q} className="border-t border-[var(--rule-strong)] pt-6">
            <h3 className="text-h3 text-navy">{item.q}</h3>
            <p className="mt-3 text-ink-soft">{item.a}</p>
          </div>
        ))}
      </div>

      <p className="mt-20 max-w-[34ch] font-serif text-[1.75rem] leading-snug text-navy md:text-[2.25rem]">
        {continuity.closing}
      </p>
    </Section>
  )
}
