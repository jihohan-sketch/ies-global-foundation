import { branchesCopy } from '@/content/home'
import { branchRepresentatives } from '@/content/leadership'
import { branches } from '@/content/site'
import { RepresentativeItem } from './PersonCard'
import { Section, SectionHeading } from './Section'

export function Branches() {
  return (
    <Section id="branches" labelledBy="branches-heading" tone="bone">
      <div className="max-w-[44rem]">
        <SectionHeading id="branches-heading">{branchesCopy.heading}</SectionHeading>
        <p className="text-lead mt-6 text-ink-soft">{branchesCopy.intro}</p>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {branches.map((b) => (
          <li key={b.id} className="flex flex-col border bg-paper p-8 md:p-10">
            <h3 className="text-h3 text-navy">{b.name}</h3>
            <p className="mt-3 text-ink-soft">{b.summary}</p>
            <a
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex flex-wrap items-baseline gap-x-3 self-start rounded-sm"
            >
              <span className="link font-medium text-navy">
                {b.linkLabel}
                <span aria-hidden> ↗</span>
              </span>
              <span className="text-[0.8125rem] text-slate">{b.domain}</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-[44rem] text-ink-soft">{branchesCopy.closing}</p>

      {branchRepresentatives.length > 0 && (
        <div className="mt-14 border-t pt-8">
          <h3 className="font-sans text-[0.75rem] font-semibold tracking-[0.12em] text-slate uppercase">
            {branchesCopy.presidentsLabel}
          </h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branchRepresentatives.map((p) => (
              <RepresentativeItem key={p.id} person={p} />
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}
