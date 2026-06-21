import { Chapter } from './Chapter'
import { journey, personal } from '../../data/portfolio'

/**
 * The career as a film — three pinned chapters in chronological order. The
 * outcome compounds: a faster team, a faster launch, then the company-defining
 * services-to-product pivot (the emotional peak, in gold).
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
        metric={{ to: 2, prefix: '<', suffix: ' mo', label: 'to ship both apps to a live alpha' }}
      />
      <Chapter
        index={3}
        role={journey[2]}
        tone="gold"
        portrait={personal.avatar}
        peak
        metric={{ to: 10, suffix: 'K+', label: 'installs in 30 days — the product I proposed' }}
        extraStats={[
          { value: '3→25', label: 'gov centres scaled' },
          { value: '5×', label: 'cheaper to acquire' },
        ]}
      />
    </div>
  )
}
