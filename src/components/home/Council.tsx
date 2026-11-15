import { council } from '@/content/home'
import {
  councilAlumni,
  councilConfirmed,
  councilMembers,
  executiveTeam,
  foundingLeaders,
  type LeadershipProfile,
} from '@/content/leadership'
import { PersonCard } from './PersonCard'
import { Section, SectionHeading } from './Section'

function Group({ label, people }: { label: string; people: LeadershipProfile[] }) {
  if (people.length === 0) return null
  return (
    <div>
      <h3 className="font-sans text-[0.75rem] font-semibold tracking-[0.12em] text-slate uppercase">{label}</h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {people.map((p) => (
          <PersonCard key={p.id} person={p} />
        ))}
      </div>
    </div>
  )
}

export function Council() {
  return (
    <Section id="council" labelledBy="council-heading">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div>
          <SectionHeading id="council-heading">{council.heading}</SectionHeading>
          <p className="mt-3 font-serif text-[1.375rem] text-ink-soft italic">{council.subtitle}</p>
          {!councilConfirmed && (
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--rule-strong)] px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-soft">
              <span aria-hidden className="h-2 w-2 rounded-full bg-gold-600" />
              {council.status}
            </p>
          )}
        </div>
        <div className="max-w-[40rem] space-y-5 text-ink-soft">
          <p className="text-lead">{council.intro}</p>
          <p>{council.contribution}</p>
        </div>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div className="space-y-14">
          <Group label={council.membersLabel} people={councilMembers} />
          <Group label={council.foundingLabel} people={foundingLeaders} />
          <Group label={council.alumniLabel} people={councilAlumni} />
          <Group label={council.executiveLabel} people={executiveTeam} />
        </div>
        <aside className="lg:pt-12">
          <p className="border-l-2 border-gold-600 pl-6 font-serif text-[1.5rem] leading-snug text-navy lg:sticky lg:top-32">
            {council.closing}
          </p>
        </aside>
      </div>
    </Section>
  )
}
