import { Link } from 'react-router-dom'
import { Button, Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { FullBleed, Statement } from '@/components/ui/Editorial'
import { Reveal } from '@/components/ui/Reveal'
import { Counter } from '@/components/ui/Counter'
import { HomeHero } from '@/components/sections/HomeHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { branches } from '@/content/branches'
import { headlineStats } from '@/content/impact'
import { site } from '@/content/site'
import { workCategories } from '@/content/work'
import { image, SIZES } from '@/lib/images'
import { useSeo } from '@/lib/seo'

/* ==========================================================================
   HOME
   ==========================================================================

   FIVE MOVEMENTS, DOWN FROM ELEVEN.

   The page this replaces was an inventory of the organisation set to music:
   hero, who we are, why we exist, a pinned horizontal pan of the three
   branches, a photo mosaic, thirty named organisations, a second pinned pan of
   the five work areas, a pinned mission scene, the Three A's, a five-row
   impact ledger, a leadership grid, and a three-column closing choice. Every
   one of those was well made and none of them was wrong on its own; together
   they asked a first-time visitor to read roughly 900 words and scroll some
   23,000px before reaching a call to action.

   A home page is not the site. It is the answer to three questions — who are
   you, what do you do, why does it matter — and the shortest honest route to
   the page that answers the fourth. So:

     HERO         who we are, in one sentence, with one photograph.
     MISSION      why it exists, as one statement on the reading ground.
     WHAT WE DO   three areas of work, shown rather than described.
     THE PICTURE  one full-bleed photograph. No copy competing with it.
     IMPACT       four figures, and nothing else in the section.
     NETWORK      the three countries, as three lines.
     GET INVOLVED one ask, two buttons.

   NOTHING WAS DELETED, EVERYTHING WAS MOVED. The pinned branch pan and the
   branch dossiers live on /global-network; the five work areas and their
   photographs on /our-work; the thirty named organisations and the terms of
   collaboration on /partners; the full figure set with its notes, the stories
   and the timeline on /impact; the Three A's, the values, the pillars and the
   org chart on /about; the leadership grid on /leadership; the mosaic on
   /gallery. Each of those pages was already the canonical home for the
   material — the home page was carrying a second copy of all of it.

   WHAT IS DELIBERATELY ABSENT: the left-margin section rail (a navigation
   device for a page with nine movements, which this no longer is), the ghost
   background words, every pinned horizontal scene, and the scroll-linked
   `Scrub` treatments. Entrances here are `Reveal` — one fade and rise, once —
   because a page that reacts to every pixel of the wheel cannot also feel
   composed.
   ========================================================================== */

/**
 * The three areas of work the home page shows, by id in `workCategories`.
 *
 * Three rather than five, and named explicitly rather than sliced off the
 * front of the array: these are the three that are visibly different from each
 * other in a photograph — a forum, a service partnership, a civic campaign —
 * which is the whole job of this section. Leadership development and global
 * collaboration are both *how* IES does the other three, and they read as
 * repetition beside them at this size. All five are on /our-work.
 */
const FEATURED_WORK = ['education-and-ethics', 'community-service', 'civic-responsibility']

const featured = FEATURED_WORK.map((id) =>
  workCategories.find((category) => category.id === id),
).filter((category) => category !== undefined)

/**
 * The four figures. Order is the order shown, and it is the order in
 * `impact.ts` rather than largest-first — re-ranking an organisation's own
 * figures by size is an editorial claim nobody asked for.
 */
const HOME_STATS = ['Members', 'Chapters', 'Schools represented', 'People reached']

const stats = HOME_STATS.map((label) =>
  headlineStats.find((stat) => stat.label === label),
).filter((stat) => stat !== undefined)

/** The closing photograph — see the note at the call site. */
const closingPhoto = {
  src: '/activities/jiguchon-childrens-center/children.jpg',
  alt: 'IES volunteers and children from the Jiguchon Children’s Center gathered together in a corridor lined with the children’s artwork.',
  caption: 'Jiguchon Children’s Center, Seoul',
} as const

export default function Home() {
  useSeo({
    title: 'IES Global Foundation — Building Ethical Leaders Across Borders',
    description:
      'A student-run ethics society in Korea, the United States, and the United Kingdom. Students argue hard questions in public, then act on what they decide.',
    path: '/',
  })

  return (
    <>
      <HomeHero />

      {/* ========================================================= MISSION */}
      {/*
       * ONE STATEMENT, ON PAPER, WITH NOTHING BESIDE IT.
       *
       * This section replaces two — "Who We Are" and "Why We Exist" — which
       * between them ran a masked headline, a lit paragraph, a second headline,
       * a second lead and two links across two full screens to make a single
       * point. The point is the motto the organisation has had since 2023, and
       * it is four words long.
       *
       * The light ground is doing structural work rather than decorative: it is
       * the one place on the page a visitor is asked to *read* rather than
       * look, and the change of ground says so before a word of it is read.
       */}
      <Section tone="paper" size="tall">
        <Container size="wide">
          <div className="grid gap-y-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-24">
            <Reveal>
              <Eyebrow tone="navy">Our Mission</Eyebrow>
              <Statement as="h2" tone="dark" className="mt-8">
                {site.missionMotto}
              </Statement>
            </Reveal>

            <Reveal delay={120} className="lg:pt-2">
              <p className="text-lead max-w-[46ch] text-navy">{site.mission}</p>
              <p className="mt-7 max-w-[46ch] leading-relaxed text-navy-600">
                Founded in Seoul in 2023 by two students, IES is now Korea’s largest
                student-led ethics organization and runs in three countries. Every role is
                held by a student — adults advise, students decide and answer for it.
              </p>
              <div className="mt-10">
                <Button to="/about" variant="onLight">
                  Our Story
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ====================================================== WHAT WE DO */}
      {/*
       * Three photographs, three titles, one line each — and no third level of
       * detail anywhere in the section.
       *
       * The temptation in a block like this is to give each column its four
       * example activities, which is what /our-work is for and what turned the
       * old version of this material into a pinned scene three screens long.
       * A visitor on the home page needs to know that these three kinds of
       * thing happen and that there is somewhere to read about them.
       */}
      <Section>
        <Container size="wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
              <div>
                <Eyebrow>What We Do</Eyebrow>
                <h2 className="text-h2 mt-6 max-w-[16ch]">Ethics, taken out of the seminar room.</h2>
              </div>
              <p className="text-lead max-w-[38ch] text-mist">
                Students argue a question properly, then commit to something because of it.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {featured.map((category, i) => (
              <Reveal key={category.id} delay={i * 90}>
                {/* The whole column is the link. A photograph, a title and a
                    sentence with a small "read more" underneath gives a reader
                    one large thing to look at and one small thing to press. */}
                <Link
                  to={`/our-work#${category.id}`}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  <div className="overflow-hidden rounded-[3px] border border-mist/12">
                    <img
                      {...image(category.image)}
                      sizes={SIZES.card}
                      alt={category.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-cinema)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-7 font-serif text-[1.375rem] leading-snug text-paper transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {category.title}
                  </h3>
                  <p className="mt-3 max-w-[36ch] leading-relaxed text-mist">
                    {category.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220}>
            <div className="mt-16">
              <Button to="/our-work" variant="secondary" arrow>
                All Five Areas of Work
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ===================================================== THE PICTURE */}
      {/*
       * One photograph, full width, with no argument printed over it.
       *
       * It is the only element on the page that exists purely to be looked at,
       * and it earns the place by being the answer to "why does this matter"
       * that no sentence on the page can give: volunteers and the children they
       * return to, in a corridor hung with the children's own drawings. A
       * caption naming the place, because an uncaptioned photograph on a
       * foundation site is indistinguishable from stock.
       */}
      <FullBleed
        photo={closingPhoto.src}
        alt={closingPhoto.alt}
        caption={closingPhoto.caption}
      />

      {/* ========================================================== IMPACT */}
      {/*
       * Four figures on the reading ground, and nothing else in the section.
       *
       * The ledger this replaces gave each of five figures a full-width row, a
       * label and an explanatory note — roughly 150px of page each, on top of
       * the same figures already sitting in the hero. The notes are the useful
       * part and they are on /impact, where the reader who wants them is
       * going. Here the numbers are the whole content: four of them, in a row,
       * at a size that makes the point in one glance.
       */}
      <Section tone="paper">
        <Container size="wide">
          <Reveal>
            <Eyebrow tone="navy">Impact</Eyebrow>
          </Reveal>

          <dl className="mt-14 grid grid-cols-2 gap-x-10 gap-y-12 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="border-t pt-6" style={{ borderColor: 'var(--rule)' }}>
                  <dd className="font-serif leading-[0.9] font-medium tracking-[-0.03em] text-navy [font-size:clamp(2.25rem,4.4vw,3.75rem)]">
                    <Counter stat={stat} suffixClassName="text-[var(--accent)]" />
                  </dd>
                  <dt className="text-label mt-4 font-semibold text-navy-600 uppercase">
                    {stat.label}
                  </dt>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={200}>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
              <Button to="/impact" variant="onLight">
                The Full Record
              </Button>
              <p className="max-w-[42ch] text-xs leading-relaxed text-navy-600">
                {site.statisticsNote}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================= NETWORK */}
      {/*
       * Where we are, as three lines.
       *
       * This was a pinned horizontal pan of three viewport-sized branch panels
       * with coordinates, dossiers and a rotating globe. Every branch has its
       * own page carrying all of that; what the home page owes a visitor is the
       * fact that there are three countries and a way into each.
       */}
      <Section size="compact" className="border-t border-mist/12">
        <Container size="wide">
          <Reveal>
            <Eyebrow>Global Network</Eyebrow>
          </Reveal>

          <ul className="mt-10">
            {branches.map((branch, i) => (
              <Reveal key={branch.slug} as="li" delay={i * 80}>
                <Link
                  to={`/global-network/${branch.slug}`}
                  className="group grid grid-cols-1 items-baseline gap-x-10 gap-y-2 border-t border-mist/15 py-7 transition-colors duration-500 hover:border-[var(--accent)]/60 sm:grid-cols-[minmax(0,14rem)_1fr_auto] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <span className="font-serif text-[1.375rem] text-paper transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {branch.name}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-mist">
                    {branch.role}
                  </span>
                  {/* Present at rest rather than arriving on hover: a row
                      that only looks like a link once the cursor is on it is
                      not discoverable on a touch screen, and there is nothing
                      else in the row that says it leads anywhere. */}
                  <span
                    aria-hidden
                    className="text-[var(--accent)] opacity-45 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 max-sm:hidden"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ==================================================== GET INVOLVED */}
      {/*
       * One ask.
       *
       * The three described routes — join, found a chapter, partner — are the
       * right shape for a visitor who has decided to act and is choosing how,
       * which is what /join and /start-a-chapter are for. At the foot of a home
       * page it is three paragraphs of reading in the position where a page
       * should be at its most decisive.
       */}
      <CallToAction
        title="Every role here is held by a student."
        body="Join a chapter, start one at your school, or bring your organization in."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Contact Us', to: '/contact' },
        ]}
      />
    </>
  )
}
