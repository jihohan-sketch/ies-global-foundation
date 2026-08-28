import { Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { VideoGrid } from '@/components/sections/Media'
import { cx } from '@/lib/utils'
import type { Activity } from '@/content/types'
import { image, SIZES } from '@/lib/images'

/**
 * Documented activity, with its photography.
 *
 * The photo grid gives the first image the full width and the rest an even
 * split. Every photograph is a record of the event named above it, so nothing
 * here crops to a decorative aspect ratio — images keep their own proportions
 * and the grid absorbs the difference.
 */
function PhotoGrid({ activity }: { activity: Activity }) {
  const [lead, ...rest] = activity.photos

  return (
    <div className="space-y-3">
      <figure className="overflow-hidden border border-mist/15 bg-navy-700/40">
        <img
          {...image(lead.src)}
          sizes={SIZES.half}
          alt={lead.alt}
          loading="lazy"
          decoding="async"
          className="w-full object-cover"
          style={{ maxHeight: '32rem' }}
        />
      </figure>

      {rest.length > 0 && (
        <div
          /* Column count is chosen to avoid a single orphan on the last row:
             four photos read better as 2×2 than as 3+1. */
          className={cx(
            'grid gap-3',
            rest.length === 1
              ? 'grid-cols-1'
              : rest.length === 2 || rest.length === 4
                ? 'grid-cols-2'
                : 'grid-cols-3',
          )}
        >
          {rest.map((photo) => (
            <figure key={photo.src} className="overflow-hidden border border-mist/15 bg-navy-700/40">
              <img
                {...image(photo.src)}
                sizes={SIZES.half}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ aspectRatio: '4 / 3' }}
              />
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}

function ActivityMeta({ activity }: { activity: Activity }) {
  const rows = [
    activity.date && { label: 'When', value: activity.date },
    activity.location && { label: 'Where', value: activity.location },
    activity.participants && { label: 'With', value: activity.participants },
  ].filter(Boolean) as { label: string; value: string }[]

  if (rows.length === 0) return null

  return (
    <dl className="mt-8 space-y-px">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 border-t border-mist/12 py-3 sm:grid-cols-[5rem_1fr] sm:gap-4">
          <dt className="text-[0.75rem] font-semibold tracking-[0.13em] text-mist uppercase sm:pt-0.5">
            {row.label}
          </dt>
          <dd className="text-[0.9375rem] text-paper/85">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function ActivityEntry({ activity, index }: { activity: Activity; index: number }) {
  return (
    <article id={activity.id} className="scroll-mt-28 border-t border-mist/15 pt-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-serif text-sm text-[var(--accent)]/70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[0.75rem] font-semibold tracking-[0.13em] text-mist uppercase">
              {activity.kind}
            </span>
          </div>

          <h3 className="text-h3 mt-5">{activity.title}</h3>
          <p className="mt-6 leading-relaxed text-mist">{activity.summary}</p>
          <ActivityMeta activity={activity} />

          {/* The guest's own portrait sits with the details, not in the grid —
              it is a supplied studio portrait, not a record of the event. */}
          {activity.portrait && (
            <figure className="mt-8 flex items-center gap-5">
              <img
                {...image(activity.portrait.src)}
                sizes={SIZES.portrait}
                alt={activity.portrait.alt}
                loading="lazy"
                decoding="async"
                className="h-20 w-20 shrink-0 rounded-[3px] border border-mist/15 object-cover"
              />
              <figcaption className="text-[0.8125rem] leading-relaxed text-mist">
                {activity.participants ?? 'Guest speaker'}
              </figcaption>
            </figure>
          )}
        </Reveal>

        <Reveal delay={120}>
          <PhotoGrid activity={activity} />
          <div className="mt-8 space-y-5">
            {activity.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-paper/80">
                {paragraph}
              </p>
            ))}
          </div>

          {activity.videos && activity.videos.length > 0 && (
            <div className="mt-10">
              <p className="text-[0.75rem] font-semibold tracking-[0.13em] text-mist uppercase">
                Footage
              </p>
              <VideoGrid videos={activity.videos} className="mt-5" />
            </div>
          )}
        </Reveal>
      </div>
    </article>
  )
}

/**
 * A titled run of documented activity. Used on Our Work for the whole network
 * and on each branch page for that branch's own record.
 */
export function ActivityFeed({
  activities,
  eyebrow,
  title,
  lead,
  tone = 'navy',
}: {
  activities: Activity[]
  eyebrow: string
  title: string
  lead?: string
  tone?: 'navy' | 'deep'
}) {
  if (activities.length === 0) return null

  return (
    <Section id="activities" tone={tone} className="border-t border-mist/12">
      <Container size="wide">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-h2 mt-6 max-w-3xl">{title}</h2>
          {lead && <p className="text-lead mt-7 max-w-3xl text-mist">{lead}</p>}
        </Reveal>

        <div className="mt-16 space-y-20">
          {activities.map((activity, i) => (
            <ActivityEntry key={activity.id} activity={activity} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
