import { Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { Split } from '@/components/ui/Editorial'
import { Reveal } from '@/components/ui/Reveal'
import { leadershipMessages, personById } from '@/content/leadership'
import type { LeadershipMessage } from '@/content/types'
import { SIZES, image } from '@/lib/images'

/* ==========================================================================
   SIGNED MESSAGES
   ==========================================================================

   The two blocks the About page needs — a founder's message and a president's
   message — and the whole design problem is that they are *not* another pair
   of cards.

   Everything else on this site is written in the organisation's voice. These
   two are the only places it speaks as a person, and that is the thing the
   layout has to carry: a name, a face, and four paragraphs somebody will be
   held to. Two bordered boxes side by side would flatten them back into
   institutional furniture and, worse, invite the reader to compare them — they
   are not a comparison. They are two people saying different things about
   different periods.

   So they stack, each on the site's asymmetric spread, portrait in the narrow
   column and the message in the wide one, separated by a hairline. The
   portrait is *not* sticky: a face that follows the reader down a four
   paragraph message is a scroll effect, and this is the one section on the
   page where nothing should be performing.

   Everything except the words comes from the `Person` record — portrait, name,
   Korean name. A headshot replaced in `leadership.ts` follows here with no
   edit, and nobody's title exists in two places at once.
   ========================================================================== */

function Message({ message }: { message: LeadershipMessage }) {
  const person = personById(message.personId)
  if (!person) return null

  return (
    <Split
      sticky={false}
      gap="wide"
      aside={
        <Reveal>
          {/* Square, bled to the frame, no rounding — the same treatment the
              leadership cards give a portrait, at the size a signature block
              can carry without becoming the subject of the section. */}
          {person.photo && (
            <img
              {...image(person.photo)}
              sizes={SIZES.portrait}
              alt=""
              loading="lazy"
              className="aspect-square w-full max-w-[15rem] border border-mist/15 object-cover object-top"
            />
          )}
          <p className="mt-6 font-serif text-[1.375rem] leading-tight text-paper">
            {person.name}
            {person.koreanName && (
              <span className="ml-2 text-base text-mist">{person.koreanName}</span>
            )}
          </p>
          <p className="text-label-sm mt-2 max-w-[24ch] font-semibold text-[var(--accent)] uppercase">
            {message.label}
          </p>
        </Reveal>
      }
    >
      <Reveal delay={120}>
        {/*
         * The opening paragraph is set at lead size and the rest at body size.
         *
         * Not decoration — it is what tells a reader scanning the page that
         * this is one continuous piece of writing with a beginning, rather
         * than four equal-weight paragraphs they can enter at any point. A
         * message is read from the top or not at all.
         */}
        {/* Held to a measure. The wide column of the spread runs to roughly 90
            characters at body size, which is fine for a two-line standfirst and
            too long for four paragraphs somebody is meant to read start to
            finish — the eye loses the line on the return sweep. */}
        <div className="max-w-[66ch] space-y-6">
          {message.body.map((paragraph, i) => (
            <p
              key={paragraph}
              className={i === 0 ? 'text-lead text-paper' : 'leading-relaxed text-mist'}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* The signature. A hairline above it and the name in the serif, so it
            closes the message rather than trailing off it. */}
        <div className="mt-9 max-w-[66ch] border-t border-mist/15 pt-6">
          <p className="font-serif text-[1.0625rem] text-paper">{person.name}</p>
          <p className="mt-1 text-[0.875rem] text-slate">{message.signature}</p>
        </div>
      </Reveal>
    </Split>
  )
}

export function LeadershipMessages() {
  return (
    <Section tone="deep">
      <Container size="wide">
        <Reveal>
          <Eyebrow>In Their Own Words</Eyebrow>
        </Reveal>

        <div className="mt-14 space-y-16 lg:mt-16 lg:space-y-20">
          {leadershipMessages.map((message, i) => (
            <div
              key={message.personId}
              className={i > 0 ? 'border-t border-mist/15 pt-16 lg:pt-20' : undefined}
            >
              <Message message={message} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
