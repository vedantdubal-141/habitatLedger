// _id field migration from uuid
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CATEGORIES, SEVERITIES, STATUSES } from '../data/constants'
import useIssueStore from '../store/useIssueStore'
import CloseIssueModal from './CloseIssueModal'

dayjs.extend(relativeTime)

export default function IssueCard({ issue }) {
  const navigate = useNavigate()
  const togglePin    = useIssueStore((s) => s.togglePin)
  const updateStatus = useIssueStore((s) => s.updateStatus)
  const deleteIssue  = useIssueStore((s) => s.deleteIssue)

  const [showCloseModal, setShowCloseModal] = useState(false)
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  const cat = CATEGORIES.find((c) => c.id === issue.category)
  const sev = SEVERITIES.find((s) => s.id === issue.severity)
  const sta = STATUSES.find((s) => s.id === issue.status)

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm('Delete this issue? This cannot be undone.')) deleteIssue(issue._id)
  }

  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation()
    setShowStatusMenu(false)
    if (newStatus === 'closed') { setShowCloseModal(true) }
    else updateStatus(issue._id, newStatus)
  }

  const statusClass = issue.status === 'in_progress' ? 'progress' : issue.status

  return (
    <>
      <div
        className={`issue-card card card-clickable${issue.pinned ? ' issue-card-pinned' : ''}${issue.status === 'closed' ? ' issue-card-closed' : ''}`}
        onClick={() => navigate(`/issue/${issue._id}`)}
        role="article"
        aria-label={`Issue: ${issue.title}`}
      >
        {/* Header row */}
        <div className="issue-card-header">
          <div className="issue-card-badges">
            {cat && (
              <span className="badge" style={{ background: cat.bg, color: cat.color, borderColor: `${cat.color}55` }}>
                {cat.icon} {cat.label}
              </span>
            )}
            {sev && <span className={`badge badge-${issue.severity}`}>{sev.label}</span>}
          </div>
          <div className="issue-card-actions-top" onClick={(e) => e.stopPropagation()}>
            <button
              className={`btn btn-icon btn-ghost pin-btn${issue.pinned ? ' pinned' : ''}`}
              onClick={() => togglePin(issue._id)}
              aria-label={issue.pinned ? 'Unpin issue' : 'Pin issue'}
              title={issue.pinned ? 'Unpin' : 'Pin to top'}
            >
              {issue.pinned ? '⭐' : '☆'}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="issue-card-title">{issue.title}</h3>

        {/* Description preview */}
        {issue.description && <p className="issue-card-desc">{issue.description}</p>}

        {/* Footer */}
        <div className="issue-card-footer">
          <div className="issue-card-meta">
            <span className={`badge badge-${statusClass}`}>{sta?.label}</span>
            <span className="issue-card-date">{dayjs(issue.createdAt).fromNow()}</span>
          </div>

          <div className="issue-card-actions" onClick={(e) => e.stopPropagation()}>
            {issue.status !== 'closed' && (
              <div className="status-menu-wrap">
                <button
                  id={`status-btn-${issue._id}`}
                  className="btn btn-outline btn-sm"
                  onClick={(e) => { e.stopPropagation(); setShowStatusMenu((p) => !p) }}
                  aria-haspopup="true"
                  aria-expanded={showStatusMenu}
                >
                  Status ▾
                </button>
                {showStatusMenu && (
                  <div className="status-dropdown" role="menu">
                    {issue.status !== 'open' && (
                      <button className="status-option" role="menuitem" onClick={(e) => handleStatusChange(e, 'open')}>🟠 Mark as Open</button>
                    )}
                    {issue.status !== 'in_progress' && (
                      <button className="status-option" role="menuitem" onClick={(e) => handleStatusChange(e, 'in_progress')}>🔵 In Progress</button>
                    )}
                    <button className="status-option status-option-close" role="menuitem" onClick={(e) => handleStatusChange(e, 'closed')}>✅ Close Issue</button>
                  </div>
                )}
              </div>
            )}
            <button
              className="btn btn-ghost btn-sm btn-icon"
              onClick={handleDelete}
              aria-label="Delete issue"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      {showCloseModal && (
        <CloseIssueModal issue={issue} onClose={() => setShowCloseModal(false)} />
      )}
    </>
  )
}
