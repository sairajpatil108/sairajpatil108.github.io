import { useEffect, useState } from 'react'
import { useLenis } from '../../lib/SmoothScroll'
import { personal } from '../../data/portfolio'

const LINKS = [
  { label: 'Story', id: 'origin' },
  { label: 'Journey', id: 'journey' },
  { label: 'Work', id: 'work' },
  { label: 'Craft', id: 'craft' },
  { label: 'Contact', id: 'closing' },
]

/**
 * Minimal top nav. Transparent over the hero, frosts in once scrolled. Links
 * smooth-scroll through Lenis (native fallback under reduced motion).
 */
export function Nav() {
  const lenis = useLenis()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -40 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="pre-bloom fixed inset-x-0 top-0 z-[55] transition-all duration-500"
      style={{
        backdropFilter: scrolled ? 'blur(20px) saturate(180%) brightness(1.05)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%) brightness(1.05)' : 'none',
        background: scrolled ? 'rgba(255,255,255,0.045)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
        boxShadow: scrolled ? 'inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 24px -12px rgba(0,0,0,0.6)' : 'none',
      }}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 lg:pl-16">
        <button
          onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0 }))}
          aria-label="Sairaj Patil — back to top"
          className="group flex items-center gap-2.5"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-md font-display text-[13px] font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--color-aurora-violet), var(--color-aurora-cyan))',
              color: '#07070b',
            }}
          >
            S
          </span>
          <span className="t-primary hidden font-display text-sm font-semibold tracking-tight sm:block">
            {personal.name}
          </span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-1 hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="nav-link rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <a href={personal.cv} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 !text-[11px]">
            CV
          </a>
        </div>
      </nav>
    </header>
  )
}
