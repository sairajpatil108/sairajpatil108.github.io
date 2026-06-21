import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'
import { onFx } from '../../lib/effects'

/**
 * Aurora effect canvas — renders the effect-bus light moments on a single canvas
 * layered inside the ambient `.aurora-field` (so it inherits the cold-open bloom
 * fade and stays behind the frosted glass, like light caught under it):
 *
 * - `pulse` ripples a ring; `supernova` detonates a white bloom + expanding
 *   shockwaves + a radial particle burst.
 *
 * It used to also track the pointer (a glow easing toward the cursor, leaving a
 * luminous wake) plus an idle drift — but that read as a distracting cursor
 * animation, so the field now stays calm until an effect fires. Everything is
 * white on near-black (monochrome house palette) and additive-blended. Particles
 * are drawn from a pre-rendered offscreen sprite via drawImage (no per-particle
 * gradient allocation), DPR-aware, paused when the tab is hidden, and skipped
 * under reduced motion.
 */

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number }
type Ring = { x: number; y: number; t: number; dur: number; max: number; w: number }

const easeOut = (k: number) => 1 - Math.pow(1 - k, 3)

// A soft white radial dot, rendered once and reused (drawImage-scaled) for every
// particle — far cheaper than createRadialGradient per frame.
function makeSprite(): HTMLCanvasElement {
  const size = 64
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const g = c.getContext('2d')
  if (g) {
    const half = size / 2
    const grad = g.createRadialGradient(half, half, 0, half, half, half)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.5, 'rgba(255,255,255,0.4)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, size, size)
  }
  return c
}

export function LivingAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const sprite = makeSprite()
    let W = window.innerWidth
    let H = window.innerHeight
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = []
    const rings: Ring[] = []
    let flash = 0 // supernova white flash, 1 → 0

    const burst = (n: number, cx: number, cy: number, speed: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2
        const s = speed * (0.3 + Math.random() * 0.9)
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(a) * s, vy: Math.sin(a) * s,
          life: 0, max: 0.8 + Math.random() * 1.5, r: 8 + Math.random() * 22,
        })
      }
    }
    const supernova = () => {
      const cx = W / 2
      const cy = H * 0.42
      flash = 1
      const reach = Math.hypot(W, H)
      rings.push({ x: cx, y: cy, t: 0, dur: 1.6, max: reach * 0.78, w: 3 })
      rings.push({ x: cx, y: cy, t: -0.14, dur: 1.8, max: reach * 0.95, w: 1.5 })
      burst(120, cx, cy, 540)
    }
    const pulse = () => rings.push({ x: W / 2, y: H * 0.42, t: 0, dur: 1.1, max: 340, w: 2 })
    const offSupernova = onFx('supernova', supernova)
    const offPulse = onFx('pulse', pulse)

    let raf = 0
    let prev = performance.now()
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now

      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      // Burst particles (supernova only) — sprite scaled per particle, alpha by life.
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += dt
        const k = p.life / p.max
        if (k >= 1) {
          particles.splice(i, 1)
          continue
        }
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.vx *= 0.96
        p.vy *= 0.96
        const r = p.r * (0.7 + k * 0.8)
        ctx.globalAlpha = (1 - k) * 0.5
        ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2)
      }
      ctx.globalAlpha = 1

      // Shockwave / pulse rings.
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i]
        ring.t += dt
        if (ring.t < 0) continue
        const k = ring.t / ring.dur
        if (k >= 1) {
          rings.splice(i, 1)
          continue
        }
        ctx.strokeStyle = `rgba(255,255,255,${(1 - k) * 0.5})`
        ctx.lineWidth = ring.w
        ctx.beginPath()
        ctx.arc(ring.x, ring.y, ring.max * easeOut(k), 0, Math.PI * 2)
        ctx.stroke()
      }

      // Supernova flash (only allocates while decaying).
      if (flash > 0) {
        flash = Math.max(0, flash - dt * 2.2)
        const cx = W / 2
        const cy = H * 0.42
        const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.6)
        fg.addColorStop(0, `rgba(255,255,255,${0.5 * flash})`)
        fg.addColorStop(0.4, `rgba(255,255,255,${0.12 * flash})`)
        fg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = fg
        ctx.fillRect(0, 0, W, H)
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf) {
        prev = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(tick)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      offSupernova()
      offPulse()
    }
  }, [])

  if (prefersReducedMotion) return null
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
}
