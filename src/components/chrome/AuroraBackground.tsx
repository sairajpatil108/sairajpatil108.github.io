import { useGsapContext } from '../../lib/useGsapContext'
import { gsap } from '../../lib/gsap'

/**
 * Ambient aurora field — three heavily-blurred drifting blobs + a grid texture.
 * Starts dim (the cold open withholds the aurora); Hero adds `aurora-bloomed`
 * to <html> after the thesis flip, fading the field to full via CSS.
 * Blobs drift on slow GSAP loops; reduced motion leaves them still.
 */
export function AuroraBackground() {
  const scope = useGsapContext(({ scope, reduced }) => {
    if (reduced) return
    const blobs = scope.querySelectorAll<HTMLElement>('.aurora-blob')
    // Translate only — animating scale would re-rasterize the 120px blur every
    // frame. Pure translate stays on the compositor.
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: `+=${i % 2 === 0 ? 140 : -160}`,
        y: `+=${i === 1 ? 120 : -110}`,
        duration: 16 + i * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  return (
    <div ref={scope} className="aurora-field" aria-hidden>
      {/* A single soft top light + a low floor glow. Monochrome, barely there —
          depth without colour. */}
      <div
        className="aurora-blob"
        style={{
          top: '-22%',
          left: '50%',
          marginLeft: '-30vw',
          width: '60vw',
          height: '48vw',
          background: 'radial-gradient(circle, rgba(255,255,255,0.10), transparent 62%)',
        }}
      />
      <div
        className="aurora-blob"
        style={{
          bottom: '-26%',
          right: '-12%',
          width: '46vw',
          height: '46vw',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 64%)',
        }}
      />
      <div className="grid-texture" style={{ position: 'absolute', inset: 0 }} />
    </div>
  )
}
