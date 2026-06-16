import { Reveal } from '../ui/Reveal'
import { contact, personal, socials, stats } from '../../data/portfolio'

/**
 * Contact — a clean recap of the numbers, a plain statement of what I'm looking
 * for, and the ways to reach me.
 */
export function Closing() {
  return (
    <section id="closing" className="section relative overflow-hidden">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow mb-4">Contact</p>
        </Reveal>

        <Reveal delay={1}>
          <h2 className="chapter-title max-w-3xl">
            Open to product roles where <span className="gradient-text">I own the outcome.</span>
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <p className="body-copy mt-5">
            I'm finishing my B.E. in Computer Science (PCCOE Pune, 2026) and looking for product
            roles, advisory, and ambitious builds where the result is the metric that counts.
          </p>
        </Reveal>

        {/* Outcomes recap — a quiet summary line */}
        <Reveal delay={3}>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-y border-white/8 py-6">
            {stats.map((s) => (
              <span key={s.label} className="font-mono text-[11px] uppercase tracking-[0.14em] t-mono">
                <span className="t-primary">{(s.prefix || '') + s.value + s.suffix}</span> {s.label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal delay={2}>
          <div className="glass glass-refract mt-12 flex flex-col gap-8 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full" style={{ boxShadow: '0 0 0 1px var(--hair-strong)' }}>
                <img src={personal.avatar} alt={personal.name} className="h-full w-full object-cover" style={{ objectPosition: '50% 35%' }} />
              </div>
              <div>
                <a
                  href={`mailto:${contact.email}`}
                  className="t-primary font-display text-lg font-semibold tracking-tight transition-colors hover:text-white sm:text-xl"
                >
                  {contact.email}
                </a>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <a href={contact.phoneHref} className="font-mono text-[12px] tracking-[0.08em] t-mono transition-colors hover:text-white">
                    {contact.phone}
                  </a>
                  {socials.slice(0, 4).map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[12px] uppercase tracking-[0.08em] t-mono transition-colors hover:text-white"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a href={personal.cv} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
              Download CV
            </a>
          </div>
        </Reveal>

        <footer className="mt-14">
          <p className="t-mono font-mono text-[11px] uppercase tracking-[0.18em]">© 2026 {personal.name} · Pune, India</p>
        </footer>
      </div>
    </section>
  )
}
