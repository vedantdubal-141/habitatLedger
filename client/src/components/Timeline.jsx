import dayjs from 'dayjs'

const EVENT_CONFIG = {
  created:          { icon: '🟢', label: 'Issue Reported' },
  status_changed:   { icon: '🔵', label: 'Status Updated' },
  severity_changed: { icon: '🟡', label: 'Severity Changed' },
  proof_uploaded:   { icon: '📎', label: 'Proof Uploaded' },
  closed:           { icon: '✅', label: 'Issue Resolved' },
  updated:          { icon: '📝', label: 'Updated' },
}

export default function Timeline({ events = [] }) {
  if (events.length === 0) {
    return <p className="text-muted text-sm" style={{ padding: '8px 0' }}>No events recorded yet.</p>
  }

  return (
    <div className="timeline" role="list" aria-label="Issue timeline">
      {events.map((event, index) => {
        const config = EVENT_CONFIG[event.type] || { icon: '⚪', label: 'Event' }
        const isLast = index === events.length - 1

        return (
          <div key={event.id} className={`timeline-item${isLast ? ' last' : ''}`} role="listitem">
            <div className="timeline-icon-col">
              <div className="timeline-dot" aria-hidden="true">{config.icon}</div>
              {!isLast && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-event-label">{config.label}</span>
                <span className="timeline-date">
                  {dayjs(event.timestamp).format('MMM D, YYYY [at] h:mm A')}
                </span>
              </div>
              {event.note && <p className="timeline-note">{event.note}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
