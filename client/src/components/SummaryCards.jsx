import useIssueStore from '../store/useIssueStore'

const CARDS = [
  { key: 'total',       label: 'Total',      icon: '📋', color: 'var(--c-primary)', bg: 'var(--c-primary-light)', filter: '' },
  { key: 'open',        label: 'Open',       icon: '🔴', color: 'var(--c-open)',    bg: 'var(--c-open-bg)',       filter: 'open' },
  { key: 'in_progress', label: 'In Progress',icon: '🔵', color: 'var(--c-progress)',bg: 'var(--c-progress-bg)',  filter: 'in_progress' },
  { key: 'closed',      label: 'Resolved',   icon: '✅', color: 'var(--c-closed)',  bg: 'var(--c-closed-bg)',    filter: 'closed' },
]

export default function SummaryCards({ setStatusFilter }) {
  const issues = useIssueStore((s) => s.issues)

  const counts = {
    total:       issues.length,
    open:        issues.filter((i) => i.status === 'open').length,
    in_progress: issues.filter((i) => i.status === 'in_progress').length,
    closed:      issues.filter((i) => i.status === 'closed').length,
  }
  const criticalOpen = issues.filter((i) => i.severity === 'critical' && i.status !== 'closed').length

  return (
    <div className="summary-cards" role="group" aria-label="Issue summary">
      {CARDS.map((card) => (
        <button
          key={card.key}
          id={`summary-card-${card.key}`}
          className="summary-card card"
          onClick={() => setStatusFilter && setStatusFilter(card.filter)}
          style={{ '--card-color': card.color, '--card-bg': card.bg }}
          aria-label={`${counts[card.key]} ${card.label} issues — click to filter`}
        >
          <div className="summary-card-icon">{card.icon}</div>
          <div className="summary-card-body">
            <span className="summary-card-count">{counts[card.key]}</span>
            <span className="summary-card-label">{card.label}</span>
          </div>
          {card.key === 'open' && criticalOpen > 0 && (
            <div className="summary-card-alert">🚨 {criticalOpen} critical</div>
          )}
        </button>
      ))}
    </div>
  )
}
