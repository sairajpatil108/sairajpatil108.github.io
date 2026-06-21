import { useState } from 'react'
import { Reveal } from '../ui/Reveal'
import { fireFx } from '../../lib/effects'

/**
 * "Own the Outcome" — a playable restatement of the thesis. The visitor is handed
 * a real fork from Sairaj's TellMe story (services revenue vs. betting on an owned
 * product) and makes the call. Either choice resolves to what actually happened,
 * and revealing the outcome pulses the aurora through the effect bus. Plain
 * <button>s, an aria-live result region, and reduced-motion-safe (the reveal just
 * appears). Non-blocking: it never traps scroll.
 */

const chips = [
  { value: '10K+', label: 'Installs in 30 days' },
  { value: '3→25', label: 'Gov centres scaled' },
  { value: '5×', label: 'Cheaper to acquire' },
]

function Outcome() {
  return (
    <div className="mt-7 border-t border-white/8 pt-7">
      <p className="eyebrow mb-3">What I actually did</p>
      <p className="serif-beat t-primary" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)', lineHeight: 1.25 }}>
        Same call I made.
      </p>
      <p className="body-copy mt-4">
        I proposed and led the pivot — services to product. It shipped DivyaDarshan360, which hit 10K+
        installs in 30 days at a fifth of the category’s acquisition cost. I now lead national
        government products from the same bet.
      </p>
      <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
        {chips.map((c) => (
          <span key={c.label} className="font-mono text-[11px] uppercase tracking-[0.14em] t-mono">
            <span className="t-primary">{c.value}</span> {c.label}
          </span>
        ))}
      </div>
      <p className="mt-7 font-display text-[15px] tracking-tight t-secondary">
        Features are the output. <span className="grad-word">The outcome is the point.</span>
      </p>
    </div>
  )
}

export function Decision() {
  const [choice, setChoice] = useState<null | 'safe' | 'own'>(null)
  const [revealReal, setRevealReal] = useState(false)

  const pick = (c: 'safe' | 'own') => {
    setChoice(c)
    if (c === 'own') fireFx('pulse')
  }
  const showReal = () => {
    setRevealReal(true)
    fireFx('pulse')
  }

  return (
    <section id="decision" className="section relative">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow mb-4">Your call</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="chapter-title max-w-3xl">
            You’re in the room. <span className="gradient-text">What’s the call?</span>
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <div className="glass glass-refract mt-10 rounded-2xl p-7 sm:p-10">
            <p className="body-copy">
              Early 2025. TellMe was a services shop — steady revenue, one client build at a time. I
              had a different idea: stop taking the next contract and bet the team on a product of our
              own.
            </p>

            {!choice && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => pick('safe')} className="btn-ghost justify-center sm:flex-1">
                  Keep the services revenue
                </button>
                <button type="button" onClick={() => pick('own')} className="btn-primary justify-center sm:flex-1">
                  Bet on the product
                </button>
              </div>
            )}

            {/* Result — announced to assistive tech when it changes. */}
            <div aria-live="polite">
              {choice === 'own' && <Outcome />}

              {choice === 'safe' && (
                <div className="mt-7 border-t border-white/8 pt-7">
                  <p className="body-copy">
                    Safe — and it’s the call most teams make. It keeps the lights on. It also keeps the
                    trajectory flat.
                  </p>
                  {!revealReal ? (
                    <button type="button" onClick={showReal} className="btn-ghost mt-6">
                      See what actually happened →
                    </button>
                  ) : (
                    <Outcome />
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
