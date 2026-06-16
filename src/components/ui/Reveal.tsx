import { useLayoutEffect, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

type Props = {
  children: ReactNode
  /** index for stagger; multiplied by 0.05s */
  delay?: number
  y?: number
  blur?: boolean
  className?: string
  as?: 'div' | 'span' | 'li' | 'p' | 'h2' | 'h3'
  once?: boolean
}

/**
 * Scroll-into-view reveal: rises + fades (+ optional blur). GSAP/ScrollTrigger
 * powered (no second animation engine). Reduced motion renders the final state.
 * Transform/opacity (+ optional filter) only.
 */
export function Reveal({ children, delay = 0, y = 24, blur = false, className = '', as = 'div', once = true }: Props) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, filter: 'none' })
      return
    }
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y, ...(blur ? { filter: 'blur(8px)' } : {}) })
      gsap.to(el, {
        opacity: 1,
        y: 0,
        ...(blur ? { filter: 'blur(0px)' } : {}),
        duration: 0.8,
        delay: delay * 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })
    }, el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Tag = as as 'div'
  return (
    <Tag ref={ref as RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  )
}
