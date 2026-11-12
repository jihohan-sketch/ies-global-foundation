import { useId, useState } from 'react'
import { formatService, type LeadershipProfile } from '@/content/leadership'
import { SIZES, image } from '@/lib/images'

function Portrait({ person, className }: { person: LeadershipProfile; className: string }) {
  if (!person.photo) return null
  const img = image(person.photo)
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={SIZES.portrait}
      alt={`Portrait of ${person.name}`}
      loading="lazy"
      decoding="async"
      className={className}
    />
  )
}

/**
 * A Council or founding profile, in the brief's order: name, current role,
 * former IES leadership, current contribution. Anything not confirmed is
 * simply absent. Further service records sit behind a disclosure button.
 */
export function PersonCard({ person }: { person: LeadershipProfile }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const [primary, ...more] = person.formerRoles

  return (
    <article className="flex flex-col border bg-paper">
      <Portrait person={person} className="aspect-square w-full bg-bone object-cover object-top" />
      <div className="flex flex-1 flex-col p-6">
        <h4 className="text-h3 text-navy">{person.name}</h4>
        {person.currentRole && (
          <p className="mt-1.5 text-[0.9375rem] font-medium text-ink-soft">{person.currentRole}</p>
        )}
        {primary && (
          <div className="mt-5 border-t pt-4">
            <p className="font-sans text-[0.75rem] font-semibold tracking-[0.12em] text-slate uppercase">
              Former IES leadership
            </p>
            <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{formatService(primary)}</p>
          </div>
        )}
        {person.contribution && (
          <p className="mt-4 text-[0.9375rem] text-ink-soft">{person.contribution}</p>
        )}
        {more.length > 0 && (
          <div className="mt-auto pt-5">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-sm text-[0.875rem] font-medium text-gold-800"
            >
              <span
                aria-hidden
                className={`inline-block transition-transform ${open ? 'rotate-45' : ''}`}
              >
                +
              </span>
              More service history
            </button>
            <ul id={panelId} hidden={!open} className="profile-more mt-3 space-y-1.5 text-[0.9375rem] text-ink-soft">
              {more.map((s) => (
                <li key={s.role}>{formatService(s)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}

/** Compact row entry for a current branch president. */
export function RepresentativeItem({ person }: { person: LeadershipProfile }) {
  return (
    <li className="flex items-center gap-4">
      <Portrait person={person} className="h-16 w-16 shrink-0 rounded-full bg-paper object-cover" />
      <div>
        <p className="font-medium text-navy">{person.name}</p>
        {person.currentRole && <p className="text-[0.875rem] leading-snug text-slate">{person.currentRole}</p>}
      </div>
    </li>
  )
}
