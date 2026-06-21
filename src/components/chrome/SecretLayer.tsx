import { useEffect, useState } from 'react'
import { useKonami } from '../../lib/useKonami'
import { fireFx, onFx } from '../../lib/effects'

/**
 * The secret layer. Listening for the Konami code (or the word "outcomes") fires
 * a `supernova` on the effect bus — which detonates the aurora (LivingAurora) and
 * surfaces this hidden line. Triggering the palette's "Supernova" command lands
 * here too, so both paths share one reveal. Purely decorative + non-blocking
 * (pointer-events: none), auto-dismisses, and degrades gracefully under reduced
 * motion (it simply appears, then clears).
 */
export function SecretLayer() {
  const [shown, setShown] = useState(false)

  useKonami(() => fireFx('supernova'))

  useEffect(() => {
    let timer = 0
    const off = onFx('supernova', () => {
      window.clearTimeout(timer)
      setShown(true)
      timer = window.setTimeout(() => setShown(false), 3400)
    })
    return () => {
      off()
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] grid place-items-center px-6 text-center"
      style={{
        opacity: shown ? 1 : 0,
        transition: 'opacity 0.6s var(--ease-out-expo)',
      }}
    >
      <div
        style={{
          transform: shown ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
          transition: 'transform 0.9s var(--ease-out-expo)',
        }}
      >
        <p className="eyebrow mb-4 !text-[10px]">You found it</p>
        <p
          className="serif-beat t-primary"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.18, textShadow: '0 0 40px rgba(255,255,255,0.25)' }}
        >
          The features were never the point.
          <br />
          The <span className="grad-word">outcome</span> always was.
        </p>
      </div>
    </div>
  )
}
