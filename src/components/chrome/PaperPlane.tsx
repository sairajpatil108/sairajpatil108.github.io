import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

/**
 * The signature moment. The cold-open splash resolves, a sheet of paper rotates
 * and folds (in 3D) into a paper plane, the screen lifts, and the plane becomes
 * the scroll guide — weaving down through the layout, nose pointing the way you
 * travel. Reduced motion skips it.
 */

// Two facets (64×64 viewBox), nose at the bottom. They morph between an
// OPEN sheet that fills the ENTIRE viewBox (the whole screen as paper, split
// along the diagonal) and the FOLDED dart.
const L_OPEN = [[0, 0], [64, 0], [0, 64]]
const R_OPEN = [[64, 0], [64, 64], [0, 64]]
const L_FOLDED = [[32, 60], [5, 12], [32, 35]]
const R_FOLDED = [[32, 60], [59, 12], [32, 35]]

const lerpPts = (a: number[][], b: number[][], t: number) =>
  a.map(([x, y], i) => `${x + (b[i][0] - x) * t},${y + (b[i][1] - y) * t}`).join(' ')

export function PaperPlane() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineARef = useRef<HTMLDivElement>(null)
  const lineBRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLSpanElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<SVGPolygonElement>(null)
  const rightRef = useRef<SVGPolygonElement>(null)
  const keelRef = useRef<SVGPolygonElement>(null)
  const creaseRef = useRef<SVGPolylineElement>(null)

  useLayoutEffect(() => {
    const plane = planeRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!plane || !left || !right) return

    const bloom = () => document.documentElement.classList.add('aurora-bloomed')
    const done = () => {
      window.__splashDone = true
      window.dispatchEvent(new CustomEvent('splash:done'))
      // Mark seen only once the splash has actually resolved, so a StrictMode
      // double-mount in dev doesn't make the first real visit skip itself.
      try {
        sessionStorage.setItem('sp_seen', '1')
      } catch {
        /* private mode */
      }
    }
    const setPoints = (t: number) => {
      left.setAttribute('points', lerpPts(L_OPEN, L_FOLDED, t))
      right.setAttribute('points', lerpPts(R_OPEN, R_FOLDED, t))
    }

    const metrics = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const mobile = vw < 700
      return {
        vw,
        cx: vw * 0.5,
        amp: vw * 0.3,
        swings: mobile ? 3 : 4,
        top: 110,
        bottom: vh - 120,
        scale: mobile ? 0.62 : 0.8,
      }
    }
    const fly = (p: number) => {
      const m = metrics()
      return { x: m.cx + Math.sin(p * Math.PI * m.swings) * m.amp, y: m.top + p * (m.bottom - m.top), scale: m.scale }
    }

    if (prefersReducedMotion) {
      bloom()
      gsap.set(overlayRef.current, { autoAlpha: 0, display: 'none' })
      gsap.set(plane, { autoAlpha: 0 })
      done()
      return
    }

    const fillScale = (Math.max(window.innerWidth, window.innerHeight) / 64) * 1.3
    // The full fold plays once per session; later loads skip to the flying plane.
    let seen = false
    try {
      seen = sessionStorage.getItem('sp_seen') === '1'
    } catch {
      /* private mode — treat as first visit */
    }

    const ctx = gsap.context(() => {
      gsap.set(plane, {
        xPercent: -50,
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        scale: fillScale, // the sheet fills the whole viewport
        rotationX: 0,
        rotationY: 0,
        rotation: 0,
        transformPerspective: 1600,
        transformOrigin: '50% 50%',
        autoAlpha: 0,
        filter: 'none',
      })
      setPoints(0)
      gsap.set([creaseRef.current, keelRef.current], { autoAlpha: 0 })
      gsap.set(lineBRef.current, { autoAlpha: 0, y: 14 })

      const morph = { t: 0 }
      let flightActive = false
      let removeSkip = () => {}

      if (seen) {
        // Returning this session — skip the fold, show the flying plane at rest.
        bloom()
        gsap.set(overlayRef.current, { autoAlpha: 0, display: 'none' })
        setPoints(1)
        gsap.set([creaseRef.current, keelRef.current], { autoAlpha: 1 })
        gsap.set(plane, {
          ...fly(0),
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          autoAlpha: 1,
          filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))',
        })
        flightActive = true
        done()
      } else {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 })

        tl.from(lineARef.current, { autoAlpha: 0, y: 14, duration: 0.85 })
          .to(lineARef.current, { autoAlpha: 0, y: -16, duration: 0.45, ease: 'power2.in' }, '+=0.85')
          .to(lineBRef.current, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.1')
          .to([lineBRef.current, skipRef.current], { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '+=0.65')
          // The whole screen becomes a sheet of paper
          .to(plane, { autoAlpha: 1, duration: 0.45, ease: 'power2.out' }, '>-0.05')
          // Reveal the site behind the sheet (the black lifts while the paper covers it)
          .add(bloom, '<')
          .to(overlayRef.current, { autoAlpha: 0, duration: 0.5 }, '<')
          .set(overlayRef.current, { display: 'none' }, '>')
          // The full-screen sheet folds down into the plane, revealing the site
          .to(morph, { t: 1, duration: 1.55, ease: 'power3.inOut', onUpdate: () => setPoints(morph.t) }, '<0.05')
          .to(plane, { scale: 1, rotationX: -16, duration: 1.55, ease: 'power3.inOut' }, '<')
          .to([creaseRef.current, keelRef.current], { autoAlpha: 1, duration: 0.5 }, '<1.0')
          // settle level
          .to(plane, { rotationX: 0, duration: 0.5, ease: 'back.out(2)' }, '>-0.3')
          .add(done)
          // launch onto the flight path
          .to(plane, { ...fly(0), rotation: 0, duration: 0.95, ease: 'power2.inOut' }, '>-0.1')
          .add(() => {
            flightActive = true
            lastX = null
            gsap.set(plane, { filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))' })
          })

        const skip = () => {
          removeSkip()
          gsap.to(tl, { totalProgress: 1, duration: 0.6, ease: 'power3.inOut' })
        }
        removeSkip = () => {
          window.removeEventListener('wheel', skip)
          window.removeEventListener('touchstart', skip)
          window.removeEventListener('keydown', skip)
          overlayRef.current?.removeEventListener('click', skip)
        }
        tl.eventCallback('onComplete', removeSkip)
        window.addEventListener('wheel', skip, { passive: true })
        window.addEventListener('touchstart', skip, { passive: true })
        window.addEventListener('keydown', skip)
        overlayRef.current?.addEventListener('click', skip)
      }

      // Flight — rotation follows velocity (nose points the way it travels).
      let lastX: number | null = null
      let lastY = 0
      let curRot = 0
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (!flightActive) return
          const pos = fly(self.progress)
          if (lastX !== null) {
            const vx = pos.x - lastX
            const vy = pos.y - lastY
            if (Math.hypot(vx, vy) > 0.5) {
              const target = -Math.atan2(vx, vy) * (180 / Math.PI)
              const d = ((target - curRot + 540) % 360) - 180
              curRot += d * 0.2
            }
          }
          lastX = pos.x
          lastY = pos.y
          gsap.set(plane, { x: pos.x, y: pos.y, scale: pos.scale, rotation: curRot })
        },
      })

      const onResize = () => {
        if (flightActive) {
          lastX = null // re-seed velocity so the resize delta doesn't swivel the nose
          gsap.set(plane, fly(st.progress))
        }
      }
      window.addEventListener('resize', onResize)

      return () => {
        removeSkip()
        window.removeEventListener('resize', onResize)
        st.kill()
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Cold-open splash overlay — decorative; the hero H1 carries the message */}
      <div
        ref={overlayRef}
        aria-hidden
        className="fixed inset-0 z-[90] grid place-items-center px-6 text-center"
        style={{ background: 'var(--color-ink-void)' }}
      >
        <div className="grid max-w-2xl place-items-center" style={{ gridTemplateAreas: '"stack"' }}>
          <div ref={lineARef} className="serif-beat" style={{ gridArea: 'stack' }}>
            Shipping the feature is the easy part<span className="caret">.</span>
          </div>
          <div ref={lineBRef} className="serif-beat t-primary" style={{ gridArea: 'stack' }}>
            I own the <span className="t-cyan">outcome.</span>
          </div>
        </div>
        <span ref={skipRef} className="eyebrow t-secondary absolute bottom-8 left-1/2 -translate-x-1/2 !text-[10px]">
          Scroll to skip
        </span>
      </div>

      {/* The paper plane — fold target + scroll guide */}
      <div
        ref={planeRef}
        className="pointer-events-none fixed left-0 top-0 z-[95]"
        style={{ width: 64, height: 64, willChange: 'transform' }}
        aria-hidden
      >
        <svg viewBox="0 0 64 64" width="64" height="64">
          <defs>
            <linearGradient id="pwL" x1="0%" y1="15%" x2="95%" y2="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cdcdd4" />
            </linearGradient>
            <linearGradient id="pwR" x1="100%" y1="15%" x2="5%" y2="70%">
              <stop offset="0%" stopColor="#a9a9b1" />
              <stop offset="100%" stopColor="#6f6f78" />
            </linearGradient>
          </defs>
          {/* wings */}
          <polygon ref={leftRef} points="32,60 5,12 32,35" fill="url(#pwL)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" strokeLinejoin="round" />
          <polygon ref={rightRef} points="32,60 59,12 32,35" fill="url(#pwR)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeLinejoin="round" />
          {/* keel ridge (raised centre fold catching light) */}
          <polygon ref={keelRef} points="32,60 28,37 36,37" fill="#f4f4f8" />
          <polyline ref={creaseRef} points="32,60 32,36" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="0.7" strokeLinecap="round" />
        </svg>
      </div>
    </>
  )
}
