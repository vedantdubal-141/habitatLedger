import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import useIssueStore from '../store/useIssueStore'
import * as api from '../api/issueApi'

export default function CloseIssueModal({ issue, onClose }) {
  const closeIssue = useIssueStore((s) => s.closeIssue)
  const [note, setNote] = useState('')
  const [proof, setProof] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const type = file.type.startsWith('image/') ? 'image'
                 : file.type.startsWith('video/') ? 'video'
                 : 'document'

      let previewUrl = null
      if (type === 'image') previewUrl = URL.createObjectURL(file)

      setProof((prev) => [
        ...prev,
        { 
          id: crypto.randomUUID(), 
          type, 
          name: file.name, 
          size: file.size, 
          url: previewUrl,
          file: file 
        },
      ])
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!note.trim()) return
    setSubmitting(true)
    
    try {
      let finalProof = [...proof]
      const filesToUpload = finalProof.filter(p => p.file)
      
      if (filesToUpload.length > 0) {
        const formData = new FormData()
        filesToUpload.forEach(p => formData.append('files', p.file))
        
        const uploadRes = await api.uploadFiles(formData)
        const uploadedItems = uploadRes.data.data
        
        let uploadIndex = 0
        finalProof = finalProof.map(p => {
          if (p.file) return uploadedItems[uploadIndex++]
          return p
        })
      }

      await closeIssue(issue._id, note.trim(), finalProof)
      onClose()
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="close-modal-title"
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 id="close-modal-title">✅ Close Issue</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Dismiss">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="close-modal-issue-ref">
              <span className="text-xs text-muted">Closing issue:</span>
              <p className="font-semibold" style={{ marginTop: '4px', color: 'var(--c-text)' }}>
                {issue.title}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label required" htmlFor="closure-note">
                What was done to resolve this?
              </label>
              <textarea
                id="closure-note"
                className="form-textarea"
                placeholder="Describe the resolution — who fixed it, what was replaced, any follow-up needed…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                required
              />
              <span className="form-hint">This note will appear in the issue timeline.</span>
            </div>

            <div className="form-group">
              <label className="form-label">Proof of Resolution (Optional)</label>
              <div
                {...getRootProps()}
                className={`dropzone dropzone-compact${isDragActive ? ' dropzone-active' : ''}`}
              >
                <input {...getInputProps()} />
                <span aria-hidden="true">📎</span>
                <span className="text-sm">
                  {isDragActive ? 'Drop files here…' : 'Attach photos or documents as proof'}
                </span>
              </div>

              {proof.length > 0 && (
                <div className="media-upload-preview">
                  {proof.map((p) => (
                    <div key={p.id} className="media-upload-item">
                      {p.type === 'image' && p.url ? (
                        <img src={p.url} alt={p.name} className="media-thumb-sm" />
                      ) : (
                        <div className="media-icon-sm">{p.type === 'video' ? '🎬' : '📄'}</div>
                      )}
                      <span className="media-name">{p.name}</span>
                      <button
                        type="button"
                        className="media-remove"
                        onClick={() => setProof((prev) => prev.filter((x) => x.id !== p.id))}
                        aria-label={`Remove ${p.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              id="confirm-close-btn"
              className="btn btn-primary"
              disabled={!note.trim() || submitting}
            >
              {submitting ? 'Saving…' : 'Mark as Resolved'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
// proof file formData upload implemented
