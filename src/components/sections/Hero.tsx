import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useGsapContext } from '../../lib/useGsapContext'
import { SplitText } from '../ui/SplitText'
import { personal, socials } from '../../data/portfolio'

/**
 * Hero + cold open. Opens on near-void black with a withheld aurora and a serif
 * thesis line; the line flips, the aurora blooms into the page, and the real
 * hero (eyebrow, headline, portrait, CTAs) masks in. Scroll then parallaxes the
 * hero up and shrinks the portrait toward the thread. Reduced motion renders the
 * bloomed final state instantly.
 */
export function Hero() {
  const portraitRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const scope = useGsapContext(({ scope, reduced }) => {
    if (reduced) {
      gsap.set('.hero-anim', { autoAlpha: 1, y: 0 })
      gsap.set('.hero-word', { yPercent: 0 })
      gsap.set(portraitRef.current, { autoAlpha: 1, y: 0, scale: 1 })
      return
    }

    // Initial hidden states — revealed once the splash plane lifts.
    gsap.set('.hero-anim', { autoAlpha: 0, y: 28 })
    gsap.set('.hero-word', { yPercent: 110 })
    gsap.set(portraitRef.current, { autoAlpha: 0, y: 60, scale: 0.92 })

    const reveal = () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to('.hero-eyebrow', { autoAlpha: 1, y: 0, duration: 0.6 })
        .to('.hero-word', { yPercent: 0, duration: 0.9, stagger: 0.04, ease: 'power4.out' }, '-=0.3')
        .to(portraitRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1 }, '-=0.8')
        .to('.hero-sub', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.7')
        .to('.hero-cta', { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.5')
        .to('.hero-cue', { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.3')
    }
    // Play when the splash finishes (or immediately if it already has).
    if (window.__splashDone) reveal()
    else window.addEventListener('splash:done', reveal, { once: true })

    // Pointer parallax on the portrait (desktop).
    const card = portraitRef.current
    let onMove: ((e: PointerEvent) => void) | undefined
    let onLeave: (() => void) | undefined
    if (card && window.matchMedia('(pointer:fine)').matches) {
      onMove = (e: PointerEvent) => {
        const rx = (e.clientX / window.innerWidth - 0.5) * 2
        const ry = (e.clientY / window.innerHeight - 0.5) * 2
        gsap.to(card, { rotateY: rx * 5, rotateX: -ry * 5, x: rx * 10, duration: 0.6, ease: 'power2.out' })
      }
      onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, x: 0, duration: 0.8 })
      window.addEventListener('pointermove', onMove, { passive: true })
      scope.addEventListener('mouseleave', onLeave)
    }

    // Scroll handoff — parallax up + shrink portrait
    gsap.to(contentRef.current, {
      yPercent: -18,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to(portraitRef.current, {
      yPercent: -10,
      scale: 0.86,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
    })
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('splash:done', reveal)
      if (onMove) window.removeEventListener('pointermove', onMove)
      if (onLeave) scope.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      ref={scope}
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:px-24"
    >
      {/* Hero content */}
      <div className="container-wide relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div ref={contentRef}>
          <p className="hero-eyebrow hero-anim eyebrow mb-7">
            Product Manager · Tech Advisor · {personal.location}
          </p>

          <h1 className="display t-primary" style={{ fontSize: 'clamp(2.5rem, 6.6vw, 5.6rem)' }}>
            <span className="block">
              <SplitText text="I own the outcome," wordClass="hero-word" />
            </span>
            <span className="mt-1.5 block">
              <SplitText text="not just the output." wordClass="hero-word grad-word" />
            </span>
          </h1>

          <p className="hero-sub hero-anim body-copy mt-8 max-w-[52ch]">
            Product Manager and Tech Advisor with two years taking products from concept to launch —
            across mobile, AI, and government-scale systems. I led a services-to-product pivot that
            helped my company raise its first round.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={personal.cv} target="_blank" rel="noopener noreferrer" className="hero-cta hero-anim btn-primary">
              Download CV
            </a>
            <a href="#closing" className="hero-cta hero-anim btn-ghost">
              Get in touch
            </a>
          </div>

          <div className="hero-cta hero-anim mt-7 flex items-center gap-1">
            {socials.slice(0, 4).map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="t-mono inline-flex min-h-[40px] items-center px-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:text-white"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div className="relative flex justify-center lg:justify-end" style={{ perspective: '1200px' }}>
          <div ref={portraitRef} className="relative w-[74%] max-w-[360px] sm:w-[58%] lg:w-full" style={{ transformStyle: 'preserve-3d' }}>
            <div
              className="absolute -inset-8 -z-10 rounded-[40px] opacity-50 blur-3xl"
              style={{ background: 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.10), transparent 68%)' }}
            />
            <div className="glass glass-refract overflow-hidden rounded-2xl p-2">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={personal.portrait}
                  alt={`${personal.name}, Product Manager`}
                  className="w-full scale-[1.2]"
                  style={{ transformOrigin: '50% 38%' }}
                  width={760}
                  height={760}
                  decoding="async"
                />
              </div>
            </div>
            <div className="glass absolute -bottom-5 -left-5 rounded-xl px-4 py-2.5">
              <p className="eyebrow !text-[9px] mb-0.5">Currently</p>
              <p className="t-primary font-display text-sm font-semibold tracking-tight">PM &amp; Advisor · TellMe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-cue hero-anim absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="eyebrow !text-[10px]">Scroll to begin the build</span>
        <span className="scroll-chevron" />
      </div>
    </section>
  )
}
