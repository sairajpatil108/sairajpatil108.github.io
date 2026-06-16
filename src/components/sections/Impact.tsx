import { Counter } from '../ui/Counter'
import { Reveal } from '../ui/Reveal'
import { stats } from '../../data/portfolio'

/**
 * Impact — the numbers, counted up as they enter view. A product manager is
 * measured on outcomes, so they lead here.
 */
export function Impact() {
  return (
    <section id="impact" className="section relative">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow mb-4">Impact</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="chapter-title max-w-3xl">
            Outcomes, <span className="gradient-text">not activity.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="body-copy mt-5">Two years of work, measured the way a product manager should measure it.</p>
        </Reveal>

        <Reveal delay={3}>
          <div className="stat-grid mt-14">
            {stats.map((s) => (
              <div key={s.label} className="stat-cell p-6 sm:p-8">
                <div
                  className="font-display font-bold leading-none t-outcome tabular"
                  style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)' }}
                >
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="t-primary mt-4 font-display text-[0.95rem] font-semibold">{s.label}</p>
                <p className="t-secondary mt-1.5 text-[0.8rem] leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
