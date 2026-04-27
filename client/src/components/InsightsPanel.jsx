// CSS-only charts — replaced initial Recharts dependency for zero-bundle rendering
import { useMemo } from 'react'
import dayjs from 'dayjs'
import useIssueStore from '../store/useIssueStore'
import { CATEGORIES, SEVERITIES } from '../data/constants'

export default function InsightsPanel() {
  const issues = useIssueStore((s) => s.issues)

  const stats = useMemo(() => {
    const total      = issues.length
    const open       = issues.filter((i) => i.status === 'open').length
    const inProgress = issues.filter((i) => i.status === 'in_progress').length
    const closed     = issues.filter((i) => i.status === 'closed').length
    const critical   = issues.filter((i) => i.severity === 'critical' && i.status !== 'closed').length

    const byCat = CATEGORIES
      .map((cat) => ({ ...cat, count: issues.filter((i) => i.category === cat.id).length }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count)
    const maxCat = byCat.length > 0 ? byCat[0].count : 1

    const closedWithDates = issues.filter((i) => i.status === 'closed' && i.closedAt && i.createdAt)
    const avgDays = closedWithDates.length > 0
      ? Math.round(closedWithDates.reduce((acc, i) => acc + dayjs(i.closedAt).diff(dayjs(i.createdAt), 'day'), 0) / closedWithDates.length)
      : null

    return { total, open, inProgress, closed, critical, byCat, maxCat, avgDays }
  }, [issues])

  if (issues.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📊</div>
        <h3>No data yet</h3>
        <p>Log some issues to see insights about your property.</p>
      </div>
    )
  }

  return (
    <div className="insights-panel fade-in">
      {/* Stat chips */}
      <div className="insights-stats-row">
        {[
          { label: 'Total',      value: stats.total,      color: 'var(--c-primary)' },
          { label: 'Open',       value: stats.open,       color: 'var(--c-open)' },
          { label: 'In Progress',value: stats.inProgress, color: 'var(--c-progress)' },
          { label: 'Resolved',   value: stats.closed,     color: 'var(--c-closed)' },
          ...(stats.critical > 0
            ? [{ label: 'Critical 🚨', value: stats.critical, color: 'var(--c-critical)' }]
            : []),
          ...(stats.avgDays !== null
            ? [{ label: 'Avg. Resolution', value: `${stats.avgDays}d`, color: 'var(--c-primary)' }]
            : []),
        ].map((s) => (
          <div key={s.label} className="insights-stat">
            <span className="insights-stat-value" style={{ color: s.color }}>{s.value}</span>
            <span className="insights-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="insights-grid">
        {/* Category bar chart */}
        <div className="card insights-card">
          <h4 className="insights-card-title">Issues by Category</h4>
          <div className="cat-bar-chart" role="list">
            {stats.byCat.map((cat) => (
              <div key={cat.id} className="cat-bar-row" role="listitem">
                <div className="cat-bar-label">
                  <span aria-hidden="true">{cat.icon}</span>
                  <span className="cat-bar-name">{cat.label}</span>
                </div>
                <div className="cat-bar-track" role="progressbar" aria-valuenow={cat.count} aria-valuemax={stats.maxCat}>
                  <div
                    className="cat-bar-fill"
                    style={{ width: `${(cat.count / stats.maxCat) * 100}%`, background: cat.color }}
                  />
                </div>
                <span className="cat-bar-count" style={{ color: cat.color }}>{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Severity breakdown */}
        <div className="card insights-card">
          <h4 className="insights-card-title">Severity Breakdown</h4>
          <div className="severity-breakdown" role="list">
            {SEVERITIES.map((sev) => {
              const count = issues.filter((i) => i.severity === sev.id).length
              const pct   = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
              return (
                <div key={sev.id} className="sev-breakdown-row" role="listitem">
                  <div className="sev-breakdown-label">
                    <span className="severity-dot" style={{ background: sev.color }} />
                    <span>{sev.label}</span>
                  </div>
                  <div className="sev-bar-track" role="progressbar" aria-valuenow={pct} aria-valuemax={100}>
                    <div className="sev-bar-fill" style={{ width: `${pct}%`, background: sev.color }} />
                  </div>
                  <div className="sev-breakdown-meta">
                    <span style={{ color: sev.color }}>{count}</span>
                    <span className="text-muted text-xs">({pct}%)</span>
                  </div>
                </div>
              )
            })}
          </div>
          {stats.critical > 0 && (
            <div className="insights-alert-box">
              🚨 <strong>{stats.critical} critical</strong> issue{stats.critical > 1 ? 's' : ''} needing immediate attention
            </div>
          )}
        </div>
      </div>

      {/* Highlight most frequent */}
      {stats.byCat.length > 0 && (
        <div className="card insights-highlight">
          <span className="insights-highlight-icon" aria-hidden="true">{stats.byCat[0].icon}</span>
          <div>
            <h4>{stats.byCat[0].label}</h4>
            <p className="text-muted text-sm">
              Most frequent category with {stats.byCat[0].count} issue{stats.byCat[0].count !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
