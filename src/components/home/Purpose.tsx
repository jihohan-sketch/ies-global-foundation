import { purpose } from '@/content/home'
import { Section, SectionHeading } from './Section'

export function Purpose() {
  return (
    <Section id="purpose" labelledBy="purpose-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <SectionHeading id="purpose-heading">{purpose.heading}</SectionHeading>
        <div className="max-w-[40rem] space-y-6 text-ink-soft">
          {purpose.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <p className="border-l-2 border-gold-600 pl-6 font-serif text-[1.5rem] leading-snug text-navy md:text-[1.75rem]">
            {purpose.aim}
          </p>
        </div>
      </div>
    </Section>
  )
}
