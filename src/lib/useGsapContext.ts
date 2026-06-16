import { useLayoutEffect, useRef } from 'react'
import type { DependencyList, RefObject } from 'react'
import { gsap } from './gsap'
import { prefersReducedMotion } from './gsap'

/**
 * Scopes all GSAP animations created in `setup` to a container ref and cleans
 * them up (reverting tweens + killing ScrollTriggers) on unmount/dep change.
 *
 * When the user prefers reduced motion, `reduced` is passed as `true` so the
 * caller can render the final state without scrubbed/scroll-driven motion.
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: { scope: T; reduced: boolean }) => void | (() => void),
  deps: DependencyList = [],
): RefObject<T> {
  const scope = useRef<T>(null)

  useLayoutEffect(() => {
    if (!scope.current) return
    const el = scope.current
    // Forward any cleanup returned by setup so gsap.context runs it on revert.
    const ctx = gsap.context(() => setup({ scope: el, reduced: prefersReducedMotion }), el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}
