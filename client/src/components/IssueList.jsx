import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import IssueCard from './IssueCard'

export default function IssueList({ issues, search, category, status }) {
  const filtered = useMemo(() => {
    return issues
      .filter((issue) => {
        if (search && !issue.title.toLowerCase().includes(search.toLowerCase())) return false
        if (category && issue.category !== category) return false
        if (status && issue.status !== status) return false
        return true
      })
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1
        if (!a.pinned && b.pinned) return 1
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
  }, [issues, search, category, status])

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🌿</div>
        <h3>No issues found</h3>
        <p>
          {search || category || status
            ? 'Try adjusting your filters.'
            : 'Your property is clear! Log an issue to start tracking.'}
        </p>
        {!search && !category && !status && (
          <Link to="/new" className="btn btn-primary" style={{ marginTop: '8px' }}>
            + Log First Issue
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="issue-list" role="list" aria-label="Issues list">
      {filtered.map((issue, i) => (
        <div
          key={issue.id}
          className="issue-list-item"
          style={{ animationDelay: `${i * 40}ms` }}
          role="listitem"
        >
          <IssueCard issue={issue} />
        </div>
      ))}
    </div>
  )
}
