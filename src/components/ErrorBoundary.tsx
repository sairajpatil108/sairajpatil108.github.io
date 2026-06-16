import { Component } from 'react'
import type { ReactNode } from 'react'
import { personal, contact } from '../data/portfolio'

/**
 * Last-resort safety net. If any section throws at runtime, the visitor still
 * sees who this is and how to reach them — never a blank screen.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Portfolio render error:', error)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="relative z-10 grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <p className="eyebrow mb-4">Product Manager · Tech Advisor</p>
          <h1 className="display t-primary" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
            {personal.name}
          </h1>
          <p className="body-copy mx-auto mt-4">Something went wrong loading the full experience.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${contact.email}`} className="btn-primary">
              Email me
            </a>
            <a href={personal.cv} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Download CV
            </a>
          </div>
        </div>
      </div>
    )
  }
}
