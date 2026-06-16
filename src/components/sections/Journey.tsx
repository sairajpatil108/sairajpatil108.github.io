import { Chapter } from './Chapter'
import { journey, personal } from '../../data/portfolio'

/**
 * The career as a film — three pinned chapters in chronological order. The
 * outcome compounds: a faster team, a faster launch, then the company-defining
 * pivot that raised the round (the emotional peak, in gold).
 */
export function Journey() {
  return (
    <div id="journey">
      <Chapter
        index={1}
        role={journey[0]}
        tone="violet"
        portrait={personal.avatar}
        metric={{ to: 40, suffix: '%', label: 'development time reduced' }}
      />
      <Chapter
        index={2}
        role={journey[1]}
        tone="cyan"
        portrait={personal.avatar}
        metric={{ to: 2, prefix: '<', suffix: ' mo', label: 'from empty repo to Play Store launch' }}
      />
      <Chapter
        index={3}
        role={journey[2]}
        tone="gold"
        portrait={personal.avatar}
        peak
        metric={{ to: 1, label: 'funding round, supported by the pivot I led' }}
        extraStats={[
          { value: '3×', label: 'operations scaled' },
          { value: '3', label: 'national products' },
        ]}
      />
    </div>
  )
}
