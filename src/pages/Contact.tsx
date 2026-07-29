import { useSearchParams } from 'react-router-dom'
import { Card, Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { branchContacts, contactChannels, socials } from '@/content/site'
import { useSeo } from '@/lib/seo'

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
              </Reveal>

              <div className="mt-8 space-y-px">
                {contactChannels.map((channel, i) => (
                  <Reveal key={channel.email} delay={i * 70}>
                    <div className="border-t border-mist/15 py-6">
                      <h3 className="font-serif text-lg">{channel.label}</h3>
                      <p className="mt-1.5 text-sm font-light text-mist">
                        {channel.description}
                      </p>
                      <a
                        href={`mailto:${channel.email}`}
                        className="mt-3 inline-block text-[0.9375rem] text-gold underline underline-offset-6 transition-colors hover:text-gold-300"
                      >
                        {channel.email}
                      </a>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <h3 className="mt-12 text-[0.6875rem] font-sans font-medium tracking-[0.24em] text-gold uppercase">
                  National Branches
                </h3>
              </Reveal>

              <div className="mt-6 space-y-px">
                {branchContacts.map((channel, i) => (
                  <Reveal key={channel.email} delay={i * 70}>
                    <div className="border-t border-mist/15 py-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-serif text-base">{channel.label}</h4>
                        <a
                          href={`mailto:${channel.email}`}
                          className="text-sm text-gold underline underline-offset-6 transition-colors hover:text-gold-300"
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
                  <h3 className="text-[0.6875rem] font-sans font-medium tracking-[0.24em] text-gold uppercase">
                    Follow IES
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="border border-mist/25 px-4 py-2 text-[0.6875rem] font-medium tracking-[0.16em] text-paper/80 uppercase transition-colors hover:border-gold/60 hover:text-gold"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
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
