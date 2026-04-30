// validation and error state added
// react-dropzone wired for file and image attachments
import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { CATEGORIES, SEVERITIES } from '../data/constants'
import useIssueStore from '../store/useIssueStore'
import * as api from '../api/issueApi'

const EMPTY = { title: '', description: '', category: '', severity: '' }

export default function IssueForm({ edit = false }) {
  const navigate = useNavigate()
  const { id }   = useParams()
  const issues      = useIssueStore((s) => s.issues)
  const addIssue    = useIssueStore((s) => s.addIssue)
  const updateIssue = useIssueStore((s) => s.updateIssue)

  const [form, setForm]         = useState(EMPTY)
  const [media, setMedia]       = useState([])
  const [errors, setErrors]     = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Populate form on edit mode
  useEffect(() => {
    if (edit && id) {
      const issue = issues.find((i) => i._id === id)
      if (issue) {
        setForm({ title: issue.title, description: issue.description, category: issue.category, severity: issue.severity })
        setMedia(issue.media || [])
      }
    }
  }, [edit, id]) // eslint-disable-line

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const type = file.type.startsWith('image/') ? 'image'
                 : file.type.startsWith('video/') ? 'video'
                 : 'document'
                 
      let previewUrl = null
      if (type === 'image') previewUrl = URL.createObjectURL(file)

      setMedia((p) => [
        ...p,
        { 
          id: crypto.randomUUID(), 
          type, 
          name: file.name, 
          size: file.size, 
          url: previewUrl, 
          mimeType: file.type, 
          file: file // <--- store actual file for Multer
        },
      ])
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [], 'application/pdf': [] },
    maxSize: 10 * 1024 * 1024,
  })

  const validate = () => {
    const e = {}
    if (!form.title.trim())       e.title       = 'Title is required'
    if (!form.category)           e.category    = 'Please select a category'
    if (!form.severity)           e.severity    = 'Please select a severity level'
    if (!form.description.trim()) e.description = 'Description is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length > 0) { setErrors(validation); return }
    setSubmitting(true)
    try {
      let finalMedia = [...media]
      const filesToUpload = finalMedia.filter(m => m.file)
      
      // If we have actual raw Files, upload them to Multer first
      if (filesToUpload.length > 0) {
        const formData = new FormData()
        filesToUpload.forEach(m => formData.append('files', m.file))
        
        const uploadRes = await api.uploadFiles(formData, form.category)
        const uploadedItems = uploadRes.data.data
        
        // Swap local preview files with the permanent server-hosted versions
        let uploadIndex = 0
        finalMedia = finalMedia.map(m => {
          if (m.file) return uploadedItems[uploadIndex++]
          return m
        })
      }

      if (edit && id) await updateIssue(id, { ...form, media: finalMedia })
      else            await addIssue({ ...form, media: finalMedia })
      navigate('/')
    } catch {
      setSubmitting(false)
    }
  }

  const severityHints = {
    critical: '🚨 Health or safety risk — needs immediate action',
    high:     '⚠️ Urgent — should be fixed very soon',
    medium:   '📋 Moderate — fix within a reasonable timeframe',
    low:      '✅ Minor — non-urgent, schedule when convenient',
  }

  return (
    <form className="issue-form" onSubmit={handleSubmit} noValidate>
      <div className="issue-form-grid">
        {/* ── Left column ── */}
        <div className="issue-form-main">
          <div className="form-group">
            <label className="form-label required" htmlFor="issue-title">Issue Title</label>
            <input
              id="issue-title"
              name="title"
              type="text"
              className={`form-input${errors.title ? ' form-input-error' : ''}`}
              placeholder="e.g. Water leak under kitchen sink"
              value={form.title}
              onChange={handleChange}
              maxLength={120}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label required" htmlFor="issue-desc">Description</label>
            <textarea
              id="issue-desc"
              name="description"
              className={`form-textarea${errors.description ? ' form-input-error' : ''}`}
              placeholder="Describe the issue in detail — when it started, how bad it is, what you've already tried…"
              value={form.description}
              onChange={handleChange}
              rows={6}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Photos, Videos, or Documents</label>
            <div
              {...getRootProps()}
              className={`dropzone${isDragActive ? ' dropzone-active' : ''}`}
              id="media-dropzone"
            >
              <input {...getInputProps()} />
              <div className="dropzone-content">
                <span className="dropzone-icon" aria-hidden="true">📎</span>
                {isDragActive ? (
                  <p>Drop files here…</p>
                ) : (
                  <>
                    <p><strong>Drag & drop files</strong> or click to browse</p>
                    <span className="form-hint">Images, videos, PDFs — max 10 MB each</span>
                  </>
                )}
              </div>
            </div>
            {media.length > 0 && (
              <div className="media-upload-preview">
                {media.map((m) => (
                  <div key={m.id} className="media-upload-item">
                    {m.type === 'image' && m.url ? (
                      <img src={m.url} alt={m.name} className="media-thumb-sm" />
                    ) : (
                      <div className="media-icon-sm">{m.type === 'video' ? '🎬' : '📄'}</div>
                    )}
                    <span className="media-name">{m.name}</span>
                    <button
                      type="button"
                      className="media-remove"
                      onClick={() => setMedia((p) => p.filter((x) => x.id !== m.id))}
                      aria-label={`Remove ${m.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right column (sidebar) ── */}
        <div className="issue-form-sidebar">
          <div className="form-group">
            <label className="form-label required">Category</label>
            {errors.category && <span className="form-error">{errors.category}</span>}
            <div className="category-grid" role="group" aria-label="Select category">
              {CATEGORIES.map((cat) => {
                const selected = form.category === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    id={`cat-${cat.id}`}
                    className={`category-option${selected ? ' selected' : ''}`}
                    onClick={() => {
                      setForm((p) => ({ ...p, category: cat.id }))
                      if (errors.category) setErrors((p) => ({ ...p, category: '' }))
                    }}
                    style={selected ? { background: cat.bg, borderColor: cat.color, color: cat.color } : {}}
                    aria-pressed={selected}
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label required">Severity Level</label>
            {errors.severity && <span className="form-error">{errors.severity}</span>}
            <div className="severity-options" role="group" aria-label="Select severity">
              {SEVERITIES.map((sev) => {
                const selected = form.severity === sev.id
                return (
                  <button
                    key={sev.id}
                    type="button"
                    id={`sev-${sev.id}`}
                    className={`severity-option${selected ? ' selected' : ''}`}
                    onClick={() => {
                      setForm((p) => ({ ...p, severity: sev.id }))
                      if (errors.severity) setErrors((p) => ({ ...p, severity: '' }))
                    }}
                    style={selected ? { background: sev.bg, borderColor: sev.color, color: sev.color } : {}}
                    aria-pressed={selected}
                  >
                    <span className="severity-dot" style={{ background: sev.color }} aria-hidden="true" />
                    {sev.label}
                  </button>
                )
              })}
            </div>
            {form.severity && (
              <p className="form-hint" style={{ marginTop: 'var(--sp-2)' }}>
                {severityHints[form.severity]}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="issue-form-actions">
        <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button type="submit" id="submit-issue-btn" className="btn btn-primary btn-lg" disabled={submitting}>
          {submitting ? 'Saving…' : edit ? 'Update Issue' : '+ Log Issue'}
        </button>
      </div>
    </form>
  )
}
// formData file upload mechanism implemented
