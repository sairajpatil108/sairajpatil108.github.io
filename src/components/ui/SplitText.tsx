import type { CSSProperties } from 'react'

type Props = {
  text: string
  className?: string
  /** class applied to each animatable inner word span (GSAP targets this) */
  wordClass?: string
}

// Visually-hidden but readable by assistive tech (inline so it never depends on
// a utility class being present in the build).
const srOnly: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
}

/**
 * Splits text into per-word spans inside overflow-hidden masks, so a parent
 * GSAP timeline can translate each `.word` up from below for a clean
 * line-by-line mask reveal. Spaces render as real inline whitespace.
 *
 * Accessibility: the animated split is decorative and hidden from assistive
 * tech (`aria-hidden`); the heading's accessible name comes from a single
 * visually-hidden copy of the full text. (Putting `aria-label` on a roleless
 * span is prohibited ARIA and can make the heading announce as empty.)
 */
export function SplitText({ text, className = '', wordClass = 'word' }: Props) {
  const words = text.split(' ')
  return (
    <span className={className}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} style={{ display: 'inline-flex' }}>
            <span
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'top',
                paddingBottom: '0.12em',
                marginBottom: '-0.12em',
              }}
            >
              <span className={wordClass} style={{ display: 'inline-block', willChange: 'transform' }}>
                {w}
              </span>
            </span>
            {i < words.length - 1 ? <span style={{ whiteSpace: 'pre' }}> </span> : null}
          </span>
        ))}
      </span>
      <span style={srOnly}>{text}</span>
    </span>
  )
}
