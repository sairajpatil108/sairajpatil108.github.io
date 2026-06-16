// Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
// Provides the Lenis instance via context so components can stop/start/scrollTo.
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const raf = useRef<((time: number) => void) | null>(null)

  useEffect(() => {
    // Reduced motion: skip Lenis entirely, let native scroll run.
    if (prefersReducedMotion) {
      ScrollTrigger.refresh()
      return
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    instance.on('scroll', ScrollTrigger.update)

    raf.current = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(raf.current)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)
    // Dev/QA hook: drive scroll from the console or headless browser (dev only).
    if (import.meta.env.DEV) window.__lenis = instance
    // Let layout settle, then make ScrollTrigger measure pinned scenes.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200)
    // Fonts swap in after first paint (display=swap) and reflow every section,
    // shifting pin start/end and the thread's milestone fractions. Re-measure.
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())
    const onOrient = () => ScrollTrigger.refresh()
    window.addEventListener('orientationchange', onOrient)

    return () => {
      window.clearTimeout(id)
      window.removeEventListener('orientationchange', onOrient)
      if (raf.current) gsap.ticker.remove(raf.current)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
