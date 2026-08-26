import type { ElementType, ReactNode } from 'react'
import { Scrub, SceneLayer } from '@/components/ui/Scrub'
import { cx } from '@/lib/utils'

/*
 * A headline that assembles itself as the page scrolls to it: each line sits
 * behind an aperture one line tall, and its words rise up into view a beat
 * apart, tracking the wheel the whole way.
 *
 * Reserved for the biggest statements on the site. The brief asks for this
 * "sparingly", and it is right to: the effect works because it says *this
 * sentence is the point of this screen*, and a page that says that four times
 * has said it none. One per page, two at the outside.
 *
 * ---------------------------------------------------------------------------
 * ON READING IT ALOUD
 *
 * The words are real text in normal flow — split into spans, but never
 * duplicated, never `aria-hidden`, and never reordered. The element's text
 * content is exactly the string that was passed in, so an assistive
 * technology reads the sentence and not a list of fragments. Every space is
 * kept inside its word's span rather than between spans, because a space that
 * lives between two `inline-block`s is a space the line-breaker is free to
 * collapse.
 *
 * That last detail is why this splits by word and not by character. Per-letter
 * reveals look impressive in a demo and destroy the accessible text, the line
 * breaking and the ability to select the sentence — three real costs for a
 * difference nobody can see at reading distance.
 */
export function MaskedText({
  text,
  as: Tag = 'h2',
  className,
  lineClassName,
  /**
   * How far apart, in scene progress, consecutive words begin.
   *
   * 0.05 is a close chase — the line reads as one gesture. Past about 0.09 the
   * words stop belonging to each other and the line unravels into a queue,
   * which is the failure mode of every text reveal that has ever felt cheap.
   */
  stagger = 0.055,
  /**
   * Cap on the accumulated stagger. Without it a long line's last word starts
   * after its own window has closed and simply never arrives.
   */
  maxOffset = 0.45,
  /** Vertical travel, in `em` of the line's own size. */
  lift,
  /** See `ScrubImage` — `scene` reads a pinned scene's progress instead. */
  driven = 'self',
  offset = 0,
}: {
  /**
   * One string, or one entry per line — line breaks are yours to choose.
   *
   * A string line is split into words and they chase each other up. A line that
   * is a node instead (a clause carrying emphasis, a link) rises as one piece:
   * splitting arbitrary children would mean walking a React tree and rebuilding
   * it, and a display line with an italic clause in it reads perfectly well
   * arriving whole.
   */
  text: string | readonly ReactNode[]
  as?: ElementType
  className?: string
  lineClassName?: string
  stagger?: number
  maxOffset?: number
  lift?: string
  driven?: 'self' | 'scene'
  offset?: number
}) {
  const lines = typeof text === 'string' ? [text] : text
  const Frame = driven === 'self' ? Scrub : SceneLayer

  /* Numbered across the whole block rather than restarting per line, so a
     three-line statement reads top-left to bottom-right as one sweep instead of
     three separate ones firing together. */
  let word = 0

  /*
   * The block's offset is folded into each *word's* offset rather than set on
   * the frame.
   *
   * It has to be. `--scrub-offset` is a custom property, and every word sets
   * its own to carry the stagger — which shadows whatever the frame declared,
   * so an offset on the frame was inherited by nothing and did nothing. That
   * mattered nowhere while every caller left it at 0 and matters a great deal
   * now: a scene-driven headline is placed on the scene's beat sheet entirely
   * by this number.
   */
  const beat = (index: number) => offset + Math.min(index * stagger, maxOffset)

  return (
    <Frame
      as={Tag}
      className={className}
      style={lift ? ({ '--scrub-lift': lift } as React.CSSProperties) : undefined}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={cx('scrub-line', lineClassName)}>
          {typeof line === 'string' ? (
            line.split(' ').map((token, tokenIndex, tokens) => {
              const delay = beat(word++)
              return (
                <span
                  key={tokenIndex}
                  className="scrub scrub-word"
                  style={{ '--scrub-offset': delay } as React.CSSProperties}
                >
                  {/* The space rides inside the span. Between two inline-blocks
                      it would be a collapsible white-space node; inside one it
                      is part of the word and the line breaks normally. */}
                  {tokenIndex < tokens.length - 1 ? `${token} ` : token}
                </span>
              )
            })
          ) : (
            <span
              className="scrub scrub-word"
              style={{ '--scrub-offset': beat(word++) } as React.CSSProperties}
            >
              {line}
            </span>
          )}
        </span>
      ))}
    </Frame>
  )
}

/*
 * A paragraph that lights up as it is read past.
 *
 * The counterpart to `MaskedText`, and the treatment for the copy *underneath*
 * a statement rather than the statement itself. Nothing moves, nothing is
 * clipped: every word is present and legible from the first frame and simply
 * comes up to full strength in reading order, which is why this can be used on
 * a paragraph where the aperture reveal above cannot.
 *
 * Still not free, and still not for every paragraph. One per section at most —
 * a page where all the copy lights up has just made lighting up the normal
 * state of text, which is a slower way of having no effect at all.
 *
 * The accessible text is intact for the same reasons set out above: real words
 * in normal flow, never duplicated, never reordered, with each trailing space
 * inside its own word's span so the line-breaker cannot collapse it.
 */
export function LitText({
  text,
  as: Tag = 'p',
  className,
  /**
   * Words per beat. Looser than `MaskedText`'s, and on purpose: a paragraph
   * holds far more words than a headline, and at the headline's spacing the
   * `maxOffset` cap below would be reached a third of the way in and the rest
   * of the paragraph would light as one block.
   */
  stagger = 0.02,
  maxOffset = 0.6,
  driven = 'self',
  offset = 0,
}: {
  /** One string, or one entry per paragraph. */
  text: string | readonly string[]
  as?: ElementType
  className?: string
  stagger?: number
  maxOffset?: number
  driven?: 'self' | 'scene'
  offset?: number
}) {
  const paragraphs = typeof text === 'string' ? [text] : text
  const Frame = driven === 'self' ? Scrub : SceneLayer

  let word = 0

  /* Folded into the words for the reason set out in `MaskedText` above: a
     word's own `--scrub-offset` shadows the frame's, so the frame's was inert. */
  const beat = (index: number) => offset + Math.min(index * stagger, maxOffset)

  return (
    <Frame as={Tag} className={className}>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <span key={paragraphIndex} className={paragraphs.length > 1 ? 'mt-5 block first:mt-0' : undefined}>
          {paragraph.split(' ').map((token, tokenIndex, tokens) => (
            <span
              key={tokenIndex}
              className="scrub scrub-lit"
              style={{ '--scrub-offset': beat(word++) } as React.CSSProperties}
            >
              {tokenIndex < tokens.length - 1 ? `${token} ` : token}
            </span>
          ))}
        </span>
      ))}
    </Frame>
  )
}

/**
 * The same masking, for something that is not a string — a headline with an
 * emphasised clause, a line carrying a link. One aperture, one rise, no
 * splitting.
 */
export function MaskedLine({
  children,
  className,
  offset = 0,
  driven = 'self',
}: {
  children: ReactNode
  className?: string
  offset?: number
  driven?: 'self' | 'scene'
}) {
  const Frame = driven === 'self' ? Scrub : SceneLayer
  return (
    <Frame as="span" offset={offset} className={cx('scrub-line', className)}>
      <span className="scrub scrub-word">{children}</span>
    </Frame>
  )
}
