// category indent and connector lines — terminal tree style
import { useState, useMemo } from 'react'
import { CATEGORIES, STATUSES, SEVERITIES } from '../data/constants'
import useIssueStore from '../store/useIssueStore'
import IssueCard from './IssueCard'

// Per-status visual config
const STATUS_CONFIG = {
  open:        { icon: '🟠', color: 'var(--c-open)',     bg: 'var(--c-open-bg)',     label: 'Open' },
  in_progress: { icon: '🔵', color: 'var(--c-progress)', bg: 'var(--c-progress-bg)', label: 'In Progress' },
  closed:      { icon: '✅', color: 'var(--c-closed)',   bg: 'var(--c-closed-bg)',   label: 'Resolved' },
}

export default function IssueExplorer() {
  const issues = useIssueStore((s) => s.issues)

  // Which status branch is expanded (only one open at a time, like a tree)
  const [openStatus, setOpenStatus] = useState(null)
  // Which {status, category} is selected (shows results on right)
  const [selection,  setSelection]  = useState(null) // { status, category }

  // Counts per status
  const statusCounts = useMemo(() => ({
    open:        issues.filter((i) => i.status === 'open').length,
    in_progress: issues.filter((i) => i.status === 'in_progress').length,
    closed:      issues.filter((i) => i.status === 'closed').length,
  }), [issues])

  // Counts per (status, category)
  const catCounts = useMemo(() => {
    const map = {}
    issues.forEach((i) => {
      const key = `${i.status}::${i.category}`
      map[key] = (map[key] || 0) + 1
    })
    return map
  }, [issues])

  // Categories present for a given status (sorted by count desc)
  const catsForStatus = (status) =>
    CATEGORIES
      .map((cat) => ({ ...cat, count: catCounts[`${status}::${cat.id}`] || 0 }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count)

  // Issues shown on the right
  const filtered = useMemo(() => {
    if (!selection) return []
    return issues
      .filter((i) => i.status === selection.status && i.category === selection.category)
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1
        if (!a.pinned && b.pinned) return 1
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
  }, [issues, selection])

  const handleStatusClick = (statusId) => {
    if (openStatus === statusId) {
      // Collapse — also clear selection if it was under this status
      setOpenStatus(null)
      if (selection?.status === statusId) setSelection(null)
    } else {
      setOpenStatus(statusId)
    }
  }

  const handleCatClick = (statusId, catId) => {
    if (selection?.status === statusId && selection?.category === catId) {
      setSelection(null) // deselect same
    } else {
      setSelection({ status: statusId, category: catId })
    }
  }

  // Breadcrumb path display
  const selectedStatus = selection ? STATUS_CONFIG[selection.status] : null
  const selectedCat    = selection ? CATEGORIES.find((c) => c.id === selection.category) : null

  return (
    <div className="issue-explorer" aria-label="Issue explorer">

      {/* ── Left tree panel ── */}
      <nav className="explorer-tree" aria-label="Filter by status and category">
        <div className="explorer-tree-header">Issues</div>

        {STATUSES.map((sta) => {
          const cfg      = STATUS_CONFIG[sta.id]
          const count    = statusCounts[sta.id] || 0
          const expanded = openStatus === sta.id
          const cats     = catsForStatus(sta.id)

          return (
            <div key={sta.id} className="tree-status-node">
              {/* Status row — clickable to expand/collapse */}
              <button
                id={`explorer-status-${sta.id}`}
                className={`tree-status-btn${expanded ? ' active' : ''}`}
                onClick={() => handleStatusClick(sta.id)}
                aria-expanded={expanded}
                aria-controls={`explorer-cats-${sta.id}`}
              >
                <span aria-hidden="true">{cfg.icon}</span>
                {cfg.label}

                {/* Count badge */}
                <span
                  className="tree-status-count"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {count}
                </span>

                {/* Chevron — only show if there are children */}
                {count > 0 && (
                  <em className={`tree-chevron${expanded ? ' open' : ''}`} aria-hidden="true">▶</em>
                )}
              </button>

              {/* Categories — children indented right */}
              {expanded && cats.length > 0 && (
                <div
                  id={`explorer-cats-${sta.id}`}
                  className="tree-children"
                  role="group"
                  aria-label={`${cfg.label} categories`}
                >
                  <div className="tree-child-indent">
                    {cats.map((cat) => {
                      const isActive =
                        selection?.status === sta.id && selection?.category === cat.id
                      return (
                        <button
                          key={cat.id}
                          id={`explorer-cat-${sta.id}-${cat.id}`}
                          className={`tree-cat-btn${isActive ? ' active' : ''}`}
                          onClick={() => handleCatClick(sta.id, cat.id)}
                          aria-pressed={isActive}
                          title={`${cat.label} — ${cat.count} issue${cat.count !== 1 ? 's' : ''}`}
                        >
                          <span aria-hidden="true">{cat.icon}</span>
                          {cat.label}
                          <span className="tree-cat-count" style={{ color: cat.color }}>
                            {cat.count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* ── Right content panel ── */}
      <div className="explorer-content">
        {/* Breadcrumb path — looks like a terminal directory path */}
        {selection ? (
          <div className="explorer-breadcrumb" aria-label="Current path">
            <span className="explorer-breadcrumb-seg dim">issues</span>
            <span className="explorer-breadcrumb-sep">/</span>
            <span className="explorer-breadcrumb-seg" style={{ color: selectedStatus?.color }}>
              {selectedStatus?.icon} {selectedStatus?.label?.toLowerCase()}
            </span>
            <span className="explorer-breadcrumb-sep">/</span>
            <span className="explorer-breadcrumb-seg">
              {selectedCat?.icon} {selectedCat?.label}
            </span>
          </div>
        ) : (
          <div className="explorer-breadcrumb" aria-label="No selection">
            <span className="explorer-breadcrumb-seg dim">issues</span>
            <span className="explorer-breadcrumb-sep"> /</span>
            <span className="explorer-breadcrumb-seg dim">
              {openStatus
                ? `${STATUS_CONFIG[openStatus]?.icon} ${STATUS_CONFIG[openStatus]?.label?.toLowerCase()} / …`
                : '…'}
            </span>
          </div>
        )}

        {/* Results */}
        {!selection ? (
          <div className="explorer-placeholder">
            <div className="explorer-placeholder-icon" aria-hidden="true">
              {openStatus ? '📂' : '🗂️'}
            </div>
            <p>
              {openStatus
                ? 'Select a category to view issues'
                : 'Select a status to expand its categories'}
            </p>
          </div>
        ) : (
          <>
            <div className="explorer-result-header">
              <div className="explorer-result-title">
                <span aria-hidden="true">{selectedCat?.icon}</span>
                {selectedCat?.label}
                <span style={{ color: selectedStatus?.color }}>
                  · {selectedStatus?.label}
                </span>
              </div>
              <span className="explorer-result-count">
                {filtered.length} issue{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="explorer-placeholder">
                <div className="explorer-placeholder-icon" aria-hidden="true">🌿</div>
                <p>No issues here</p>
              </div>
            ) : (
              <div className="issue-list" role="list">
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
            )}
          </>
        )}
      </div>
    </div>
  )
}
