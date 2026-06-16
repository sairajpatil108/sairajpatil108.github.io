import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useGsapContext } from '../../lib/useGsapContext'
import { projects } from '../../data/portfolio'
import type { Project } from '../../data/portfolio'

const isGov = (p: Project) => /B2G|Gov/i.test(p.domain)

function Card({ p, i }: { p: Project; i: number }) {
  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="work-img h-full w-full object-cover grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(8,8,12,0.85) 100%)' }} />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] t-mono backdrop-blur">
            {p.role}
          </span>
          {isGov(p) && (
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.28)', color: '#fff' }}
            >
              Government
            </span>
          )}
        </div>
        <span className="absolute right-4 top-4 font-mono text-[11px] tracking-[0.14em] t-mono">
          {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-5 px-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="t-primary font-display text-xl font-bold tracking-tight">{p.name}</h3>
          <span className="eyebrow shrink-0 !text-[10px]">{p.period}</span>
        </div>
        <p className="t-mono mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em]">{p.domain}</p>
        <p className="t-secondary mt-3 text-sm leading-relaxed">{p.description}</p>
        {p.url && (
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] t-primary">
            Open <span aria-hidden>→</span>
          </span>
        )}
      </div>
    </>
  )

  const cls =
    'work-card glass group relative w-[86vw] shrink-0 rounded-[24px] p-3.5 sm:w-[58vw] lg:w-[40vw] xl:w-[33vw] lg:max-w-[520px] transition-transform duration-500'

  return p.url ? (
    <a href={p.url} target="_blank" rel="noopener noreferrer" className={cls + ' hover:-translate-y-1.5'}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

/**
 * Selected work. Desktop: a pinned horizontal reel the camera pans sideways as
 * you scroll. Mobile/reduced-motion: a clean vertical stack. Cover art is
 * unified under a midnight scrim; B2G/national work carries a gold seal.
 */
export function Work() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scope = useGsapContext(({ scope }) => {
    const track = trackRef.current
    if (!track) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.scrollWidth - window.innerWidth + 120
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })
    ScrollTrigger.refresh()
    return () => mm.revert()
  }, [])

  return (
    <section ref={scope} id="work" className="relative overflow-hidden py-[clamp(4.5rem,9vw,8rem)]">
      <div className="mb-12 px-6 sm:px-10 lg:px-24">
        <p className="eyebrow mb-4">Selected work · 2023–2026</p>
        <h2 className="chapter-title max-w-3xl">
          Products I've owned <span className="gradient-text">end to end.</span>
        </h2>
        <p className="body-copy mt-5">
          Across product ownership, advisory, and hands-on build — from VR and AI health to government
          ticketing at state scale.
        </p>
      </div>

      <div
        ref={trackRef}
        className="work-track flex flex-col gap-6 px-6 sm:px-10 lg:w-max lg:flex-row lg:items-stretch lg:gap-8 lg:px-24"
      >
        {projects.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  )
}
