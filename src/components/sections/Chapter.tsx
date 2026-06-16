import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useGsapContext } from '../../lib/useGsapContext'
import { SplitText } from '../ui/SplitText'
import type { Role } from '../../data/portfolio'

type Tone = 'violet' | 'cyan' | 'gold'

// Monochrome — every chapter uses white; the peak is set apart by treatment
// (its halo + heavier panel), not by hue.
const TONE: Record<Tone, { color: string; glow: string }> = {
  violet: { color: '#ffffff', glow: 'rgba(255,255,255,0.10)' },
  cyan: { color: '#ffffff', glow: 'rgba(255,255,255,0.10)' },
  gold: { color: '#ffffff', glow: 'rgba(255,255,255,0.16)' },
}

export type ChapterProps = {
  index: number
  role: Role
  metric: { to: number; prefix?: string; suffix?: string; decimals?: number; label: string }
  extraStats?: { value: string; label: string }[]
  tone: Tone
  portrait: string
  serifBeat?: string
  peak?: boolean
}

/**
 * One pinned, scroll-scrubbed career chapter. The scene holds on screen while
 * its slate, title, copy, wins and outcome counter assemble, then releases. The
 * docked portrait + tone ring marks the era. Reduced motion renders it static.
 */
export function Chapter({ index, role, metric, extraStats, tone, portrait, serifBeat, peak }: ChapterProps) {
  const metricRef = useRef<HTMLSpanElement>(null)
  const t = TONE[tone]
  const num = String(index).padStart(2, '0')

  const scope = useGsapContext(({ scope, reduced }) => {
    // Only show the qualifier (e.g. "<") at the terminal value, so a held
    // mid-count frame never reads as a nonsensical "<1 mo".
    const fmt = (v: number) =>
      (Math.abs(v - metric.to) < 0.5 && metric.prefix ? metric.prefix : '') +
      v.toFixed(metric.decimals || 0) +
      (metric.suffix || '')

    if (reduced) {
      if (metricRef.current) metricRef.current.textContent = fmt(metric.to)
      return
    }

    if (metricRef.current) metricRef.current.textContent = fmt(0)
    gsap.set(scope.querySelectorAll('.ch-word'), { yPercent: 110 })
    gsap.set('.ch-copy', { autoAlpha: 0, y: 24 })
    gsap.set('.ch-slate', { autoAlpha: 0, y: 16 })
    gsap.set('.ch-win', { autoAlpha: 0, x: -14 })
    gsap.set('.ch-panel', { autoAlpha: 0, y: 40, scale: 0.96 })
    gsap.set('.ch-outcome', { autoAlpha: 0, scale: 0.9 })

    // Reveal plays once as the chapter enters (no blank gap while it scrolls in).
    const proxy = { v: 0 }
    gsap
      .timeline({ scrollTrigger: { trigger: scope, start: 'top 72%', toggleActions: 'play none none reverse' } })
      .to('.ch-slate', { autoAlpha: 1, y: 0, duration: 0.5 })
      .to('.ch-panel', { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.25')
      .to(scope.querySelectorAll('.ch-word'), { yPercent: 0, duration: 0.7, stagger: 0.05 }, '-=0.45')
      .to('.ch-copy', { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.35')
      .to('.ch-win', { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.08 }, '-=0.2')
      .to(
        proxy,
        {
          v: metric.to,
          duration: 1.1,
          ease: 'power2.out',
          onUpdate: () => {
            if (metricRef.current) metricRef.current.textContent = fmt(proxy.v)
          },
        },
        '-=0.35',
      )
      .to('.ch-outcome', { autoAlpha: 1, scale: 1, duration: 0.5 }, '-=0.5')

    // Peak chapter's ambient halo — own class so the badge timeline above
    // doesn't override its intended 0.6 opacity.
    if (peak) {
      gsap.fromTo('.ch-peak-glow', { autoAlpha: 0 }, { opacity: 0.55, duration: 0.8, ease: 'power2.out' })
    }

    // Brief pin holds the scene like a film frame, then releases — desktop
    // only, where the two-column layout fits the viewport. On mobile the
    // stacked content is taller than the screen, so pinning would hide the
    // outcome panel; there it just scrolls naturally.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      ScrollTrigger.create({ trigger: scope, start: 'top top', end: '+=55%', pin: true, anticipatePin: 1 })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={scope}
      className="chapter relative flex min-h-dvh items-center overflow-hidden px-6 py-20 sm:px-10 lg:px-24"
    >
      {peak && (
        <div
          className="ch-peak-glow pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, ${t.glow}, transparent 65%)`, opacity: 0.55 }}
        />
      )}
      <div className="container-wide relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Text column */}
        <div>
          <p className="ch-slate eyebrow mb-7">
            {num} — {role.company} · {role.period}
          </p>

          {serifBeat && (
            <p className="ch-copy serif-beat mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
              {serifBeat}
            </p>
          )}

          <h2 className="chapter-title">
            <SplitText text={role.oneLiner} wordClass="ch-word" />
          </h2>

          <p className="ch-copy body-copy mt-6">{role.description}</p>

          <ul className="mt-7 space-y-2.5">
            {role.wins.map((w) => (
              <li key={w} className="ch-win flex items-start gap-3">
                <span className="mt-[10px] block h-px w-5 shrink-0" style={{ background: t.color }} />
                <span className="t-secondary text-[0.95rem] leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome panel */}
        <div className="ch-panel glass glass-refract relative rounded-[26px] p-7 sm:p-9">
          <div className="mb-7 flex items-center gap-4">
            <div
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full"
              style={{ boxShadow: `0 0 0 2px ${t.color}, 0 0 22px ${t.glow}` }}
            >
              <img src={portrait} alt="" className="h-full w-full object-cover" style={{ objectPosition: '50% 35%' }} />
            </div>
            <div>
              <p className="t-primary font-display text-sm font-semibold leading-tight">{role.title}</p>
              <p className="eyebrow !text-[10px] mt-1">{role.company}</p>
            </div>
          </div>

          <div className="border-t border-white/8 pt-7">
            <div className="flex items-end gap-3">
              <span
                ref={metricRef}
                className="tabular font-display font-bold leading-none"
                style={{ fontSize: 'clamp(3.2rem, 8vw, 5.5rem)', color: t.color, textShadow: `0 0 40px ${t.glow}` }}
              >
                {(metric.prefix || '') + metric.to + (metric.suffix || '')}
              </span>
            </div>
            <p className="t-secondary mt-2 text-sm">{metric.label}</p>

            <div
              className="ch-outcome mt-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.18)' }}
            >
              <span className="block h-1.5 w-1.5 rounded-full" style={{ background: '#fff', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }} />
              <span className="t-mono font-mono text-[10px] uppercase tracking-[0.16em]">Key result</span>
            </div>

            {extraStats && (
              <div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/8 pt-6">
                {extraStats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl font-bold t-primary tabular">{s.value}</p>
                    <p className="t-mono mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em]">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-2">
              {role.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] t-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
