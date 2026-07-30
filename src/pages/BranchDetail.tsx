import { Link, Navigate, useParams } from 'react-router-dom'
import { Button, Card, Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { ArticleCard, PersonCard } from '@/components/sections/Cards'
import { CallToAction } from '@/components/sections/CallToAction'
import { branchBySlug, branches } from '@/content/branches'
import { nationalLeadership } from '@/content/leadership'
import { sortedArticles } from '@/content/news'
import { useSeo } from '@/lib/seo'

export default function BranchDetail() {
  const { slug } = useParams<{ slug: string }>()
  const branch = slug ? branchBySlug(slug) : undefined

  useSeo({
    title: branch ? branch.name : 'Branch',
    description: branch
      ? `${branch.name} — ${branch.role}. ${branch.summary}`
      : 'IES national branch.',
    path: `/global-network/${slug ?? ''}`,
  })

  if (!branch) return <Navigate to="/global-network" replace />

  const leaders = nationalLeadership.filter((p) => p.branch === branch.slug)
  const related = sortedArticles.filter((a) => a.branch === branch.name).slice(0, 3)
  const others = branches.filter((b) => b.slug !== branch.slug)

  return (
    <>
      <PageHero
        eyebrow={`National Branch · ${branch.country}`}
        title={branch.name}
        lead={branch.role}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Global Network', href: '/global-network' },
          { label: branch.name },
        ]}
        meta={
          <dl className="grid gap-x-10 gap-y-6 border-t border-mist/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {branch.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[0.625rem] font-medium tracking-[0.2em] text-mist/70 uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-[0.9375rem] font-light text-paper/90">{fact.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* ======================================================= INTRODUCTION */}
      <Section>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.5fr_1.5fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Overview</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lead font-light text-paper/90">{branch.intro}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={`mailto:${branch.contactEmail}`} variant="secondary">
                  Contact {branch.name}
                </Button>
                <Button to="/join" variant="ghost" arrow>
                  Get involved
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* =========================================================== SECTIONS */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <div className="space-y-px">
            {branch.sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 90}>
                <div className="grid gap-8 border-t border-mist/15 py-12 lg:grid-cols-[auto_1fr_1fr] lg:gap-16">
                  <span className="font-serif text-sm text-gold/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h2 className="text-h3">{section.title}</h2>

                  <div>
                    <p className="leading-relaxed font-light text-mist">{section.body}</p>
                    {section.items && (
                      <ul className="mt-6 space-y-2.5">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[0.9375rem] font-light text-paper/80"
                          >
                            <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-gold/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================= LEADERSHIP */}
      {leaders.length > 0 && (
        <Section>
          <Container size="wide">
            <Reveal>
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="text-h2 mt-6">Who leads {branch.name}</h2>
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {leaders.map((person, i) => (
                <Reveal key={person.id} delay={i * 110}>
                  <PersonCard person={person} branchName={branch.name} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ============================================================== NEWS */}
      {related.length > 0 && (
        <Section tone="deep" className="border-y border-mist/12" size="compact">
          <Container size="wide">
            <Reveal>
              <Eyebrow>From {branch.name}</Eyebrow>
              <h2 className="text-h2 mt-6">Recent updates</h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((article, i) => (
                <Reveal key={article.slug} delay={i * 100}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ====================================================== OTHER BRANCHES */}
      <Section size="compact">
        <Container size="wide">
          <Reveal>
            <Eyebrow>Elsewhere in the Network</Eyebrow>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 110}>
                <Card interactive className="h-full">
                  <Link to={`/global-network/${other.slug}`} className="block p-8">
                    <h3 className="text-h3">{other.name}</h3>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed font-light text-mist">
                      {other.summary}
                    </p>
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CallToAction
        title={`Get involved with ${branch.name}`}
        body="Join as a member, take on a chapter role, or bring IES to your school."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Start a Chapter', to: '/start-a-chapter' },
        ]}
      />
    </>
  )
}
