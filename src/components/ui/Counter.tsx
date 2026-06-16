import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsapContext } from '../../lib/useGsapContext'

type Props = {
  to: number
  prefix?: string
  suffix?: string
  /** decimals to display while counting */
  decimals?: number
  /** trigger start position for ScrollTrigger */
  className?: string
  duration?: number
}

/**
 * Counts from 0 → `to` when scrolled into view. Numerals are tabular so width
 * never jitters. Honours reduced motion by rendering the final value at once.
 */
export function Counter({ to, prefix = '', suffix = '', decimals = 0, className = '', duration = 1.8 }: Props) {
  const numRef = useRef<HTMLSpanElement>(null)

  const scope = useGsapContext<HTMLSpanElement>(({ reduced }) => {
    const el = numRef.current
    if (!el) return
    const format = (v: number) => prefix + v.toFixed(decimals) + suffix

    if (reduced) {
      el.textContent = format(to)
      return
    }

    const obj = { v: 0 }
    el.textContent = format(0)
    gsap.to(obj, {
      v: to,
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = format(obj.v)
      },
    })
  }, [to, prefix, suffix, decimals, duration])

  return (
    <span ref={scope} className={className}>
      <span ref={numRef} className="tabular">
        {prefix}
        {to.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  )
}
