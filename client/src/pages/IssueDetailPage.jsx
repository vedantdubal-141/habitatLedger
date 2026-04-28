// edit issue route — prefill from existing issue data
// status change → timeline event wiring
// IssueDetailPage — full timeline and action sidebar
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import useIssueStore from '../store/useIssueStore'
import { CATEGORIES, SEVERITIES, STATUSES } from '../data/constants'
import Timeline from '../components/Timeline'
import MediaSection from '../components/MediaSection'
import CloseIssueModal from '../components/CloseIssueModal'

export default function IssueDetailPage() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const issues      = useIssueStore((s) => s.issues)
  const togglePin   = useIssueStore((s) => s.togglePin)
  const updateStatus= useIssueStore((s) => s.updateStatus)
  const deleteIssue = useIssueStore((s) => s.deleteIssue)

  const [showCloseModal, setShowCloseModal] = useState(false)

  const issue = issues.find((i) => i._id === id)

  if (!issue) {
    return (
      <div className="container fade-in" style={{ paddingTop: '40px' }}>
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Issue not found</h3>
          <p>This issue may have been deleted or the link is invalid.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '8px' }}>Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  const cat = CATEGORIES.find((c) => c.id === issue.category)
  const sev = SEVERITIES.find((s) => s.id === issue.severity)
  const sta = STATUSES.find((s)  => s.id === issue.status)
  const statusClass = issue.status === 'in_progress' ? 'progress' : issue.status

  const handleDelete = async () => {
    if (window.confirm('Delete this issue? This cannot be undone.')) {
      await deleteIssue(issue._id)
      navigate('/')
    }
  }

  return (
    <>
      <div className="issue-detail-page container fade-in">
        {/* Back */}
        <div className="issue-detail-back">
          <Link to="/" className="btn btn-ghost btn-sm">← Dashboard</Link>
        </div>

        {/* Header card */}
        <div className="card issue-detail-header">
          <div className="issue-detail-header-inner">
            <div className="issue-detail-meta-row">
              {cat && (
                <span className="badge" style={{ background: cat.bg, color: cat.color, borderColor: `${cat.color}55` }}>
                  {cat.icon} {cat.label}
                </span>
              )}
              {sev && <span className={`badge badge-${issue.severity}`}>{sev.label}</span>}
              <span className={`badge badge-${statusClass}`}>{sta?.label}</span>
            </div>

            <div className="issue-detail-title-row">
              <h1 className="issue-detail-title">{issue.title}</h1>
              <button
                className={`btn btn-icon btn-ghost pin-btn${issue.pinned ? ' pinned' : ''}`}
                onClick={() => togglePin(issue._id)}
                aria-label={issue.pinned ? 'Unpin issue' : 'Pin issue'}
              >
                {issue.pinned ? '⭐' : '☆'}
              </button>
            </div>

            <div className="issue-detail-dates">
              <span>Reported: {dayjs(issue.createdAt).format('MMMM D, YYYY')}</span>
              {issue.updatedAt !== issue.createdAt && (
                <span>Last updated: {dayjs(issue.updatedAt).format('MMMM D, YYYY')}</span>
              )}
              {issue.closedAt && (
                <span>Resolved: {dayjs(issue.closedAt).format('MMMM D, YYYY')}</span>
              )}
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="issue-detail-layout">
          {/* Left — Content */}
          <div className="issue-detail-main">
            <div className="card issue-detail-section">
              <h4 className="section-label">Description</h4>
              <p className="issue-detail-description">{issue.description}</p>
            </div>

            {issue.status === 'closed' && issue.closureNote && (
              <div className="card issue-detail-section closure-section">
                <h4 className="section-label">✅ Resolution Note</h4>
                <p className="issue-detail-description">{issue.closureNote}</p>
                {issue.closureProof?.length > 0 && (
                  <>
                    <hr className="divider" style={{ margin: 'var(--sp-4) 0' }} />
                    <h4 className="section-label">Proof of Resolution</h4>
                    <MediaSection media={issue.closureProof} />
                  </>
                )}
              </div>
            )}

            <div className="card issue-detail-section">
              <h4 className="section-label">
                Media
                {issue.media?.length > 0 && (
                  <span className="section-count">{issue.media.length}</span>
                )}
              </h4>
              <MediaSection media={issue.media || []} />
            </div>

            <div className="card issue-detail-section">
              <h4 className="section-label">
                Timeline
                <span className="section-count">{issue.timeline?.length || 0} events</span>
              </h4>
              <Timeline events={issue.timeline || []} />
            </div>
          </div>

          {/* Right — Actions sidebar */}
          <div className="issue-detail-sidebar">
            <div className="card issue-detail-actions-card">
              <h4 className="section-label" style={{ marginBottom: '0' }}>Actions</h4>

              {issue.status !== 'closed' && (
                <div className="detail-action-group">
                  <p className="text-muted text-sm">Change status</p>
                  <div className="detail-status-btns">
                    {issue.status !== 'open' && (
                      <button className="btn btn-outline w-full" onClick={() => updateStatus(issue._id, 'open')}>
                        🟠 Mark as Open
                      </button>
                    )}
                    {issue.status !== 'in_progress' && (
                      <button className="btn btn-outline w-full" onClick={() => updateStatus(issue._id, 'in_progress')}>
                        🔵 Mark In Progress
                      </button>
                    )}
                    <button
                      id="close-issue-btn"
                      className="btn btn-primary w-full"
                      onClick={() => setShowCloseModal(true)}
                    >
                      ✅ Close Issue
                    </button>
                  </div>
                </div>
              )}

              {issue.status === 'closed' && (
                <div className="detail-closed-badge">✅ Issue Resolved</div>
              )}

              <hr className="divider" />

              <div className="detail-action-group">
                <Link to={`/issue/${issue._id}/edit`} className="btn btn-outline w-full">
                  ✏️ Edit Details
                </Link>
                <button
                  id="delete-issue-btn"
                  className="btn btn-danger w-full"
                  onClick={handleDelete}
                >
                  🗑️ Delete Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCloseModal && (
        <CloseIssueModal issue={issue} onClose={() => setShowCloseModal(false)} />
      )}
    </>
  )
}
