import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { Reveal } from '../ui/Reveal'
import { skills, education } from '../../data/portfolio'

// Proficiency is shown by type size + brightness, not a label — so the section
// reads as a typographic composition, not a résumé table.
const rank: Record<string, number> = { Experienced: 0, Intermediate: 1, Applied: 2 }

const tierStyle = (level: string): CSSProperties => {
  if (level === 'Experienced')
    return { fontSize: 'clamp(1.3rem, 2.4vw, 2.1rem)', color: '#fff', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }
  if (level === 'Applied')
    return { fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', color: 'var(--color-text-mono)', fontWeight: 400, lineHeight: 1 }
  return { fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', color: 'var(--color-text-secondary)', fontWeight: 400, lineHeight: 1 }
}

export function Craft() {
  return (
    <section id="craft" className="section relative">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow mb-4">Capabilities</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="chapter-title max-w-4xl">
            Engineer's hands, <span className="gradient-text">product manager's judgment.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="body-copy mt-5">
            I write the PRD and I can read the pull request — and I make the call where the two meet.
          </p>
        </Reveal>

        {/* Typographic skill field — size = depth of experience */}
        <div className="mt-14 border-t border-white/8">
          {skills.map((group, gi) => {
            const items = [...group.items].sort((a, b) => (rank[a.level] ?? 1) - (rank[b.level] ?? 1))
            return (
              <Reveal key={group.label} delay={gi}>
                <div className="grid gap-x-10 gap-y-5 border-b border-white/8 py-9 md:grid-cols-[170px_1fr]">
                  <div>
                    <h3 className="eyebrow">{group.label}</h3>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3 font-display">
                    {items.map((item, i) => (
                      <Fragment key={item.name}>
                        <span className="skill" style={tierStyle(item.level)} title={`${item.name} · ${item.level}`}>
                          {item.name}
                        </span>
                        {i < items.length - 1 && (
                          <span aria-hidden className="t-mono select-none text-base leading-none">
                            ·
                          </span>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
        <p className="eyebrow mt-5 !text-[10px] opacity-70">Larger type · deeper experience</p>

        {/* Education */}
        <Reveal delay={1} className="mt-12">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow mb-2 !text-[10px]">Education</p>
              <h3 className="t-primary font-display text-lg font-semibold">{education.degree}</h3>
              <p className="t-secondary mt-1 text-sm">{education.institute}</p>
            </div>
            <div className="sm:text-right">
              <p className="t-primary font-mono text-sm tracking-[0.1em]">{education.duration}</p>
              <p className="t-mono mt-1 max-w-xs text-xs leading-relaxed sm:ml-auto">{education.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
