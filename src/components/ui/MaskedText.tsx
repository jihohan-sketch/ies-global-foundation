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

  return (
    <Frame
      as={Tag}
      offset={offset}
      className={className}
      style={lift ? ({ '--scrub-lift': lift } as React.CSSProperties) : undefined}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={cx('scrub-line', lineClassName)}>
          {typeof line === 'string' ? (
            line.split(' ').map((token, tokenIndex, tokens) => {
              const delay = Math.min(word++ * stagger, maxOffset)
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
              style={{ '--scrub-offset': Math.min(word++ * stagger, maxOffset) } as React.CSSProperties}
            >
              {line}
            </span>
          )}
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
