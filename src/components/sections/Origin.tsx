import { gsap } from '../../lib/gsap'
import { useGsapContext } from '../../lib/useGsapContext'
import { SplitText } from '../ui/SplitText'

/**
 * The prologue beat — one serif sentence that assembles word-by-word as it
 * enters, establishing the thesis before the career chapters begin.
 */
export function Origin() {
  const scope = useGsapContext(({ scope, reduced }) => {
    if (reduced) {
      gsap.set(scope.querySelectorAll('.origin-word'), { yPercent: 0 })
      gsap.set('.origin-fade', { autoAlpha: 1, y: 0 })
      return
    }
    gsap.set(scope.querySelectorAll('.origin-word'), { yPercent: 110 })
    gsap.set('.origin-fade', { autoAlpha: 0, y: 16 })
    gsap.set('.origin-rule', { scaleX: 0 })

    gsap
      .timeline({ scrollTrigger: { trigger: scope, start: 'top 62%', end: 'bottom 60%', toggleActions: 'play none none reverse' } })
      .to('.origin-eyebrow', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .to('.origin-rule', { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, '-=0.2')
      .to(scope.querySelectorAll('.origin-word'), { yPercent: 0, duration: 0.8, stagger: 0.045, ease: 'power4.out' }, '-=0.4')
      .to('.origin-note', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  }, [])

  return (
    <section
      ref={scope}
      id="origin"
      className="relative flex min-h-[78dvh] items-center px-6 py-[clamp(4.5rem,9vw,8rem)] sm:px-10 lg:px-24"
    >
      <div className="container-wide">
        <div className="max-w-4xl">
        <p className="origin-eyebrow origin-fade eyebrow mb-5">Approach</p>
        <div
          className="origin-rule mb-9 h-px w-28 origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.6), transparent)' }}
        />
        <p
          className="serif-beat"
          style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.9rem)', lineHeight: 1.22, color: 'var(--color-text-primary)' }}
        >
          <SplitText text="I came up through engineering, so I write the PRD" wordClass="origin-word" />{' '}
          <SplitText text="and read the pull request." wordClass="origin-word" />{' '}
          <SplitText text="What I measure is whether we" wordClass="origin-word" />{' '}
          <SplitText text="moved the number." wordClass="origin-word grad-word" />
        </p>
        <p className="origin-note origin-fade body-copy mt-9">
          I own products end to end — strategy, delivery, and the result. The features are the easy
          part. I'm accountable for whether they move the business.
        </p>
        </div>
      </div>
    </section>
  )
}
