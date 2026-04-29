import Issue from '../models/issue.model.js'

// helper — build a timeline event object
const makeEvent = (type, note = '', extra = {}) => ({
  type,
  note,
  ...extra,
})

// ─────────────────────────────────────────────
// GET /api/issues
// Supports query params: status, category, severity, pinned
// ─────────────────────────────────────────────
export const getAllIssues = async (req, res) => {
  try {
    const { status, category, severity, pinned } = req.query
    const filter = {}
    if (status)   filter.status   = status
    if (category) filter.category = category
    if (severity) filter.severity = severity
    if (pinned !== undefined) filter.pinned = pinned === 'true'

    const issues = await Issue.find(filter).sort({ pinned: -1, createdAt: -1 })
    res.json({ success: true, count: issues.length, data: issues })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ─────────────────────────────────────────────
// GET /api/issues/:id
// ─────────────────────────────────────────────
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })
    res.json({ success: true, data: issue })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ─────────────────────────────────────────────
// POST /api/issues
// ─────────────────────────────────────────────
export const createIssue = async (req, res) => {
  try {
    const { title, description, category, severity, media = [] } = req.body

    const issue = await Issue.create({
      title,
      description,
      category,
      severity,
      media,
      timeline: [makeEvent('created', 'Issue reported')],
    })

    res.status(201).json({ success: true, data: issue })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message)
      return res.status(400).json({ success: false, message: messages.join(', ') })
    }
    res.status(500).json({ success: false, message: err.message })
  }
}

// ─────────────────────────────────────────────
// PATCH /api/issues/:id
// General field update (title, description, category, severity, media)
// ─────────────────────────────────────────────
export const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })

    const allowedFields = ['title', 'description', 'category', 'severity', 'media']
    const updates = {}
    allowedFields.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f] })

    // Log severity change in timeline
    if (updates.severity && updates.severity !== issue.severity) {
      issue.timeline.push(makeEvent('severity_changed', `Severity changed to ${updates.severity}`))
    }

    Object.assign(issue, updates)
    await issue.save()

    res.json({ success: true, data: issue })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message)
      return res.status(400).json({ success: false, message: messages.join(', ') })
    }
    res.status(500).json({ success: false, message: err.message })
  }
}

// ─────────────────────────────────────────────
// PATCH /api/issues/:id/status
// Change status (open / in_progress) — NOT close
// ─────────────────────────────────────────────
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!['open', 'in_progress'].includes(status)) {
      return res.status(400).json({ success: false, message: "Use /close to close an issue. Valid values: 'open', 'in_progress'" })
    }

    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })
    if (issue.status === 'closed') {
      return res.status(400).json({ success: false, message: 'Closed issues cannot be reopened via this endpoint — use PATCH /status directly with status: open' })
    }

    const label = status.replace('_', ' ')
    issue.timeline.push(makeEvent('status_changed', `Status changed to ${label}`, { status }))
    issue.status = status
    await issue.save()

    res.json({ success: true, data: issue })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ─────────────────────────────────────────────
// PATCH /api/issues/:id/close
// Close an issue with a required resolution note
// ─────────────────────────────────────────────
export const closeIssue = async (req, res) => {
  try {
    const { closureNote, closureProof = [] } = req.body
    if (!closureNote || !closureNote.trim()) {
      return res.status(400).json({ success: false, message: 'closureNote is required to close an issue' })
    }

    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })
    if (issue.status === 'closed') {
      return res.status(400).json({ success: false, message: 'Issue is already closed' })
    }

    if (closureProof.length > 0) {
      issue.timeline.push(makeEvent('proof_uploaded', 'Closure proof uploaded'))
    }
    issue.timeline.push(makeEvent('closed', closureNote.trim()))

    issue.status      = 'closed'
    issue.closedAt    = new Date()
    issue.closureNote = closureNote.trim()
    issue.closureProof = closureProof

    await issue.save()
    res.json({ success: true, data: issue })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ─────────────────────────────────────────────
// PATCH /api/issues/:id/pin
// Toggle pin
// ─────────────────────────────────────────────
export const togglePin = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })

    issue.pinned = !issue.pinned
    await issue.save()

    res.json({ success: true, pinned: issue.pinned, data: issue })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ─────────────────────────────────────────────
// DELETE /api/issues/:id
// ─────────────────────────────────────────────
export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })
    res.json({ success: true, message: 'Issue deleted', id: req.params.id })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ─────────────────────────────────────────────
// GET /api/issues/stats
// Summary counts — used by the Insights panel
// ─────────────────────────────────────────────
export const getStats = async (req, res) => {
  try {
    const [statusCounts, severityCounts, categoryCounts] = await Promise.all([
      Issue.aggregate([{ $group: { _id: '$status',   count: { $sum: 1 } } }]),
      Issue.aggregate([{ $group: { _id: '$severity', count: { $sum: 1 } } }]),
      Issue.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
    ])

    const toMap = (arr) => arr.reduce((acc, { _id, count }) => { acc[_id] = count; return acc }, {})

    res.json({
      success: true,
      data: {
        total: await Issue.countDocuments(),
        byStatus:   toMap(statusCounts),
        bySeverity: toMap(severityCounts),
        byCategory: toMap(categoryCounts),
      },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
