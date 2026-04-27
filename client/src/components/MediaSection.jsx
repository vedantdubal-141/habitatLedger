import { useState } from 'react'

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaSection({ media = [] }) {
  const [lightbox, setLightbox] = useState(null)

  if (media.length === 0) {
    return (
      <div className="media-empty">
        <span aria-hidden="true">📷</span>
        <p>No media attached to this issue.</p>
      </div>
    )
  }

  const images = media.filter((m) => m.type === 'image')
  const others = media.filter((m) => m.type !== 'image')

  return (
    <div className="media-section">
      {images.length > 0 && (
        <div className="media-image-grid">
          {images.map((img) => (
            <div
              key={img.id}
              className="media-image-thumb"
              onClick={() => setLightbox(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setLightbox(img)}
              aria-label={`View image: ${img.name}`}
            >
              <img src={img.url} alt={img.name} loading="lazy" />
              <div className="media-image-overlay" aria-hidden="true">🔍</div>
            </div>
          ))}
        </div>
      )}

      {others.length > 0 && (
        <div className="media-files-list">
          {others.map((file) => (
            <div key={file.id} className="media-file-item">
              <span className="media-file-icon" aria-hidden="true">
                {file.type === 'video' ? '🎬' : '📄'}
              </span>
              <div className="media-file-info">
                <span className="media-file-name">{file.name}</span>
                <span className="text-xs text-muted">{formatSize(file.size)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="modal-backdrop"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.name} />
            <div className="lightbox-footer">
              <span>{lightbox.name}</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setLightbox(null)}>
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
