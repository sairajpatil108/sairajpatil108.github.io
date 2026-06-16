type Props = {
  text: string
  className?: string
  /** class applied to each animatable inner word span (GSAP targets this) */
  wordClass?: string
}

/**
 * Splits text into per-word spans inside overflow-hidden masks, so a parent
 * GSAP timeline can translate each `.word` up from below for a clean
 * line-by-line mask reveal. Spaces render as real inline whitespace.
 */
export function SplitText({ text, className = '', wordClass = 'word' }: Props) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden style={{ display: 'inline-flex' }}>
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
  )
}
