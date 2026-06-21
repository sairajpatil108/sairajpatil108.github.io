import { useEffect } from 'react'
import { SmoothScroll } from './lib/SmoothScroll'
import { ErrorBoundary } from './components/ErrorBoundary'
import { AuroraBackground } from './components/chrome/AuroraBackground'
import { Nav } from './components/chrome/Nav'
import { PaperPlane } from './components/chrome/PaperPlane'
import { CommandPalette } from './components/chrome/CommandPalette'
import { SecretLayer } from './components/chrome/SecretLayer'
import { Hero } from './components/sections/Hero'
import { Origin } from './components/sections/Origin'
import { Journey } from './components/sections/Journey'
import { Impact } from './components/sections/Impact'
import { Work } from './components/sections/Work'
import { Craft } from './components/sections/Craft'
import { Decision } from './components/sections/Decision'
import { Closing } from './components/sections/Closing'

export function App() {
  // Liquid-glass: a soft light follows the pointer across each glass panel.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const el = (e.target as Element)?.closest?.('.glass') as HTMLElement | null
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`)
        el.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`)
      })
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="grain">
      {/* Liquid-glass refraction filter — displaces the backdrop so the glass
          actually bends the content behind it (Chromium). Falls back to frost
          where backdrop SVG filters aren't supported. */}
      <svg aria-hidden width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <filter id="liquid-glass" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.009 0.012" numOctaves="2" seed="17" result="turb" />
          <feGaussianBlur in="turb" stdDeviation="2.2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <AuroraBackground />

      <SmoothScroll>
        <Nav />
        <PaperPlane />
        <CommandPalette />
        <SecretLayer />

        <main id="main" tabIndex={-1} className="relative z-10 outline-none">
          <ErrorBoundary>
            <Hero />
            <Origin />
            <Journey />
            <Impact />
            <Work />
            <Craft />
            <Decision />
            <Closing />
          </ErrorBoundary>
        </main>
      </SmoothScroll>
    </div>
  )
}
