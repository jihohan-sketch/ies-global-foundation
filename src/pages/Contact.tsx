import { useSearchParams } from 'react-router-dom'
import { Card, Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { branchContacts, branchSites, contactChannels, socials } from '@/content/site'
import { useSeo } from '@/lib/seo'

/**
 * Every channel currently resolves to the same mailbox (see the note on
 * `PRIMARY_EMAIL` in content/site.ts), so the subject line is what actually
 * routes a message. Pre-filling it turns seven identical links into seven
 * useful ones without inventing addresses that do not exist yet.
 */
function mailtoFor(label: string, email: string) {
  return `mailto:${email}?subject=${encodeURIComponent(`IES — ${label}`)}`
}

export default function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'General, partnership, media, and chapter inquiries for the IES Global Foundation, plus direct contacts for IES Korea, IES United States, and IES UK Society.',
    path: '/contact',
  })

  const [params] = useSearchParams()
  const topic = params.get('topic') ?? 'general'

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the right team."
        lead="Inquiries are routed to the Foundation or the relevant branch. If you know which branch you need, contact them directly."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <Section>
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            {/* -------------------------------------------------------- Form */}
            <Reveal>
              <Eyebrow>Send a Message</Eyebrow>
              <h2 className="text-h3 mt-6">Tell us what you need</h2>
              <div className="mt-10">
                <ContactForm defaultTopic={topic} />
              </div>
            </Reveal>

            {/* ---------------------------------------------------- Channels */}
            <div>
              <Reveal>
                <Eyebrow>Direct Contacts</Eyebrow>
                {/* Stated once, up front. Without it, seeing the same address
                    under four headings reads as an oversight rather than a
                    small team being straight about how it operates. */}
                <p className="mt-5 max-w-md text-sm leading-relaxed font-light text-mist/80">
                  IES is student-run and every inquiry reaches the same team. Choosing a
                  category below fills in the subject line so your message gets to the
                  right person faster.
                </p>
              </Reveal>

              <div className="mt-8 space-y-px">
                {contactChannels.map((channel, i) => (
                  <Reveal key={channel.label} delay={i * 70}>
                    <div className="border-t border-mist/15 py-6">
                      <h3 className="font-serif text-lg">{channel.label}</h3>
                      <p className="mt-1.5 text-sm font-light text-mist">
                        {channel.description}
                      </p>
                      <a
                        href={mailtoFor(channel.label, channel.email)}
                        className="mt-3 inline-block text-[0.9375rem] text-[var(--accent)] underline underline-offset-6 transition-colors hover:text-[var(--accent)]"
                      >
                        {channel.email}
                      </a>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <h3 className="mt-12 text-[0.6875rem] font-sans font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
                  National Branches
                </h3>
              </Reveal>

              <div className="mt-6 space-y-px">
                {branchContacts.map((channel, i) => (
                  <Reveal key={channel.label} delay={i * 70}>
                    <div className="border-t border-mist/15 py-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-serif text-base">{channel.label}</h4>
                        <a
                          href={mailtoFor(channel.label, channel.email)}
                          className="text-sm text-[var(--accent)] underline underline-offset-6 transition-colors hover:text-[var(--accent)]"
                        >
                          {channel.email}
                        </a>
                      </div>
                      <p className="mt-1.5 text-xs font-light text-mist">
                        {channel.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={260}>
                <Card className="mt-10 p-7">
                  <h3 className="text-[0.6875rem] font-sans font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
                    Follow IES
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="border border-mist/55 px-4 py-2 text-[0.6875rem] font-medium tracking-[0.16em] text-paper/80 uppercase transition-colors hover:border-[var(--accent)]/60 hover:text-[var(--accent)]"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>

                  {/* IES Korea's own site used to sit among the chips above.
                      It belongs with the other branch sites instead. */}
                  <h3 className="mt-8 text-[0.6875rem] font-sans font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
                    Branch Websites
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {branchSites.map((branchSite) => (
                      <li key={branchSite.href}>
                        <a
                          href={branchSite.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group inline-flex items-baseline gap-2 text-sm font-light text-paper/80 transition-colors hover:text-paper"
                        >
                          {branchSite.label}
                          <span className="text-xs text-mist/80 transition-colors group-hover:text-[var(--accent)]">
                            {branchSite.domain}
                            <span aria-hidden> ↗</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================================================== SAFETY NOTICE */}
      <Section tone="deep" size="compact" className="border-t border-mist/12">
        <Container size="wide">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <Eyebrow>A Note on Participant Safety</Eyebrow>
              <p className="leading-relaxed font-light text-mist">
                IES works with students, including minors. We do not request personal details
                beyond what is needed to answer an inquiry, and we do not pass contact details to
                third parties. Concerns about the conduct of any IES participant, chapter, or
                event should be raised directly with the Global Foundation.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
