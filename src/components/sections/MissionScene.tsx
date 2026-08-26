import { Link } from 'react-router-dom'
import { StickyScene } from '@/components/sections/StickyScene'
import { SceneLayer, Scrub } from '@/components/ui/Scrub'
import { MaskedText } from '@/components/ui/MaskedText'
import { Eyebrow } from '@/components/ui/Primitives'
import { Seam, Wordmark } from '@/components/ui/Cinematic'
import { pillars } from '@/content/work'

/*
 * THE MISSION, AS A HELD SHOT.
 *
 * What was here was a centred headline, a supporting line, and three bordered
 * cards. All of it true, none of it doing the thing the sentence is for. The
 * mission is the one claim the whole organisation rests on, and it was being
 * set the same way as a list of programme areas.
 *
 * So it is a scene now, and it is built out of the sentence's own argument.
 * The claim is that reflection and action are incomplete without each other —
 * so the two words arrive from opposite edges, cross, and clear; the statement
 * they were pulled out of then assembles in the space they leave; and the line
 * underneath lights word by word as it is read. Three beats, one pin, one
 * registration with the scroll engine.
 *
 * ---------------------------------------------------------------------------
 * THE BEAT SHEET
 *
 *   0.00 → 0.28   Reflection and Action cross the frame and dissolve
 *   0.30 → 0.62   the mission statement assembles, word by word
 *   0.58 → 0.80   the supporting line assembles under it
 *   0.76 → 0.88   the way out arrives
 *   0.86 → 1.00   the whole column clears as the pin releases
 *
 * Every one of those numbers is an `offset` / `length` pair on a `SceneLayer`
 * below. `--p` is written once on the frame and inherits; each layer takes its
 * own slice out of it. Nothing here computes anything.
 *
 * The `length` half matters as much as the offset. Without it a layer told to
 * begin at 0.3 runs until the scene ends, so the statement was still arriving
 * as the pin released and the two beats either side of it were empty screen.
 * See `--scrub-length` in index.css.
 *
 * ---------------------------------------------------------------------------
 * WHY THE WORDS CROSS RATHER THAN FADE
 *
 * Two words fading in and out in sequence is a slideshow of two words. Two
 * words *passing each other* is a relationship — the eye reads the crossing as
 * the point being made, which is the whole reason to spend a screen of scroll
 * on a sentence anyone could have read in place. It is also the reason they
 * travel in opposite directions rather than both leftward: parallel motion
 * reads as a rail, opposed motion reads as an argument.
 */
export function MissionScene() {
  return (
    <>
      <StickyScene
        id="mission"
        vh={300}
        label="Our mission"
        className="bg-navy"
        frameClassName="bg-navy"
        /*
         * The scene counts as past only once the column has actually gone.
         *
         * `pastAt` defaults to 0.5, which is right for the hero — its type
         * clears in the first third. Here the statement is the *last* thing on
         * screen and does not start dissolving until 0.86, so the default hid
         * the whole column, `visibility: hidden`, from the midpoint of the
         * scene onward: the beats after it played to an empty frame. 0.94 is
         * just past the end of the dissolve, which is the earliest point at
         * which taking the link out of hit-testing is telling the truth.
         */
        pastAt={0.94}
      >
        {/*
         * The scene's name across the foot of the frame, drifting against
         * everything on top of it — the same horizon `PinnedScene` puts under
         * its pans, and here for the same reason.
         *
         * It started dead centre, which is where a ghost title normally goes,
         * and that was wrong in a way worth recording: the two crossing words
         * pass through the middle of this frame at display scale, and a third
         * piece of display type in the same band turned all three into texture.
         * At the foot it is ground the words travel over, which is what it was
         * always meant to be.
         *
         * Hidden under reduced motion for the same reason `PinnedScene` hides
         * its own horizon there: it hangs below the frame by design, and with
         * no pin the opaque section underneath simply crops it mid-letter.
         */}
        <SceneLayer
          hidden
          effect="scrub-parallax-x"
          depth="150px"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 translate-y-[24%] px-[3vw] motion-reduce:hidden"
        >
          <Wordmark>Mission</Wordmark>
        </SceneLayer>

        {/* ------------------------------------------------------- BEAT ONE */}
        {/*
         * The two words, at the largest type on the site.
         *
         * Two nested layers per word, because one element has one transform:
         * the outer carries the dissolve, the inner the travel. Opposite
         * `--scrub-span` signs send them past each other.
         *
         * `aria-hidden` on the pair. They are two words lifted out of the
         * sentence directly below them — read aloud they are an interruption
         * of that sentence, not an addition to it. The statement itself is a
         * real heading in the flow and carries the meaning.
         */}
        {/*
         * `motion-reduce:hidden`, and this is the one part of the scene that
         * cannot survive the reduction.
         *
         * Under `prefers-reduced-motion` the pin goes, the travel goes, and
         * every scrub preset is pinned to its arrived state — so these two
         * words would sit at full opacity in an absolutely-positioned layer
         * directly on top of the statement, unmoving, forever. They are not a
         * decorated version of anything: they *are* the crossing. With the
         * crossing gone there is nothing left for them to be, and the scene
         * becomes what it always was underneath — a mission statement, a line
         * of support, and a way onward.
         */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex flex-col justify-center overflow-hidden motion-reduce:hidden"
        >
          <SceneLayer effect="scrub-dissolve" fade={0.28} travel="0px">
            <SceneLayer effect="scrub-cross" span="46vw">
              <span className="block pl-[6vw] font-serif leading-[0.92] font-light tracking-[-0.03em] text-paper/88 [font-size:clamp(3rem,13.5vw,12rem)]">
                Reflection
              </span>
            </SceneLayer>
          </SceneLayer>

          {/* A beat later and travelling the other way, so they are furthest
              apart at the start and closest as they leave. */}
          <SceneLayer effect="scrub-dissolve" offset={0.05} fade={0.28} travel="0px">
            <SceneLayer effect="scrub-cross" span="-46vw">
              <span className="metal block pr-[6vw] text-right font-serif leading-[0.92] font-light tracking-[-0.03em] [font-size:clamp(3rem,13.5vw,12rem)]">
                Action
              </span>
            </SceneLayer>
          </SceneLayer>
        </div>

        {/* ------------------------------------------------------ BEAT TWO */}
        {/* The statement, assembling into the space the two words have left.
            `driven="scene"` — it reads the frame's progress rather than
            registering a window of its own, which is what lets it start at
            0.30 instead of when it happens to enter the viewport. */}
        {/*
         * The whole statement column leaves as the pin releases.
         *
         * Without this the frame simply stops being sticky with everything in
         * it still fully lit, and the section under it slides up over a live
         * headline — which reads as one thing being covered by another rather
         * than as one thing becoming another. Fading it out over the last sixth
         * of the scene means the ledger arrives into space that has already
         * been cleared for it. `scene-exit` takes the link out of hit-testing
         * and out of the tab order once it is gone; see index.css.
         */}
        <SceneLayer
          effect="scrub-dissolve"
          offset={0.86}
          fade={1}
          travel="-56px"
          className="scene-exit relative z-10 mx-auto w-full max-w-[80rem] px-6 text-center sm:px-8"
        >
          <SceneLayer effect="scrub-rise" offset={0.26} length={0.1} travel="24px">
            <Eyebrow className="justify-center">Our Mission</Eyebrow>
          </SceneLayer>

          {/* The length goes on the wrapper, not on the block: it inherits, so
              every word inside gets the same duration off its own staggered
              offset and the line finishes assembling at 0.62 instead of at the
              end of the pin. */}
          <SceneLayer length={0.2}>
            <MaskedText
              driven="scene"
              offset={0.3}
              stagger={0.016}
              maxOffset={0.12}
              className="mx-auto mt-10 max-w-5xl font-serif leading-[1.06] font-light tracking-[-0.02em] text-paper [font-size:clamp(1.75rem,5.4vw,4.25rem)]"
              text={[
                'We help young people turn ethical',
                <>
                  reflection into{' '}
                  <span className="text-[var(--accent)] italic">meaningful action.</span>
                </>,
              ]}
            />
          </SceneLayer>

          {/* ---------------------------------------------------- BEAT THREE */}
          <SceneLayer length={0.16}>
            <MaskedText
              driven="scene"
              offset={0.58}
              stagger={0.008}
              maxOffset={0.06}
              as="p"
              className="text-lead mx-auto mt-12 max-w-2xl leading-relaxed font-light text-mist"
              text={[
                'Reflection that never leaves the seminar room is incomplete,',
                'and service without reflection is thin.',
              ]}
            />
          </SceneLayer>

          <SceneLayer effect="scrub-rise" offset={0.76} length={0.12} travel="28px">
            <p className="mt-12">
              <Link
                to="/our-work"
                className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.26em] text-paper/80 uppercase transition-colors duration-500 hover:text-[var(--accent)]"
              >
                <span className="relative">
                  How the mission is carried out
                  {/* Underline drawn from the left on hover — a transform, not
                      a width, so it stays off the layout path. */}
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-0 block h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-[var(--ease-cinema)] group-hover:scale-x-100"
                  />
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-[var(--ease-cinema)] group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </p>
          </SceneLayer>
        </SceneLayer>

        <Seam edge="bottom" />
      </StickyScene>

      <PillarLedger />
    </>
  )
}

/*
 * THE THREE PILLARS, AS A LEDGER RATHER THAN AS CARDS.
 *
 * Three bordered boxes in a row is the default answer, and it costs the
 * content twice over: it caps each pillar's title at whatever the narrowest
 * column allows, and it says the three are interchangeable tiles when they are
 * in fact the organisation's three standing commitments.
 *
 * Full-width rows say the second thing instead. The title gets display size
 * because there is a whole viewport of width for it; the number and the copy
 * sit either side; and the rule above each row draws itself in as the row
 * arrives, so the ledger builds downward rather than appearing.
 *
 * The rows alternate their indent, which is the one piece of asymmetry doing
 * real work here: an unindented stack of three full-width rows reads as a
 * table, and a table is what a card grid was trying not to be.
 */
function PillarLedger() {
  return (
    /*
     * Pulled up into the tail of the mission scene's scroll, so the first rule
     * draws itself across the frame while the statement above is still
     * clearing. That overlap is the transition: without it the pin releases
     * into an empty half-screen and the ledger begins after a gap.
     *
     * Opaque `bg-navy` and a stacking context of its own, because it is
     * genuinely passing over a still-pinned frame rather than following it.
     *
     * `motion-safe` only. Under reduced motion there is no pin to overlap —
     * the scene above collapses to an ordinary one-screen section — and half a
     * viewport of negative margin would drag this straight over the statement.
     */
    <section
      aria-label="The three pillars"
      className="relative z-10 overflow-hidden bg-navy pb-24 motion-safe:-mt-[50vh]"
    >
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-8">
        {pillars.map((pillar, i) => (
          <article key={pillar.id} className="relative">
            {/* Its own registration, so the rule and the row arrive together
                without the row needing to know where it sits on the page. */}
            <Scrub effect="scrub-rule" className="block h-px w-full bg-mist/20" />

            <div
              className="grid gap-x-10 gap-y-6 py-12 lg:grid-cols-[auto_1fr_22rem] lg:items-baseline lg:py-16"
              style={{ paddingLeft: `${i * 2.5}%` }}
            >
              <Scrub effect="scrub-rise" travel="32px">
                <span className="font-serif text-sm text-[var(--accent)] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Scrub>

              {/* Converging from alternating sides — the same gesture the two
                  words upstairs made, at a tenth the amplitude. Close enough
                  to rhyme, far enough not to repeat. */}
              <Scrub effect="scrub-converge" offset={0.04} span={i % 2 === 0 ? '-7vw' : '7vw'}>
                <h3 className="font-serif leading-[1.02] font-light tracking-[-0.02em] text-paper [font-size:clamp(1.875rem,4.6vw,3.5rem)]">
                  {pillar.title}
                </h3>
              </Scrub>

              <Scrub effect="scrub-rise" offset={0.1} travel="40px" className="lg:self-start lg:pt-2">
                <p className="text-[0.9375rem] leading-relaxed font-light text-mist">
                  {pillar.summary}
                </p>
              </Scrub>
            </div>
          </article>
        ))}

        <Scrub effect="scrub-rule" className="block h-px w-full bg-mist/20" />
      </div>
    </section>
  )
}
