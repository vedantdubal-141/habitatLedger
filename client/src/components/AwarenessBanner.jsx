import { useState } from 'react'

export default function AwarenessBanner() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="awareness-banner" style={{
      background: 'var(--c-surface)',
      borderRadius: 'var(--r-md)',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--c-border)',
      marginBottom: 'var(--sp-6)',
      overflow: 'hidden',
    }}>
      {/* HEADER Toggler */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--sp-4) var(--sp-5)',
          background: isOpen ? 'var(--c-primary-light)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: isOpen ? 'var(--c-primary-dark)' : 'var(--c-text-2)',
          fontWeight: 600,
          fontSize: 'var(--text-base)',
          transition: 'var(--t-base)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚖️</span>
          Housing Quality & Legal Awareness
        </span>
        <span style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform var(--t-base)',
          opacity: 0.6 
        }}>
          ▼
        </span>
      </button>

      {/* EXPANDABLE CONTENT */}
      {isOpen && (
        <div style={{ padding: 'var(--sp-5)', borderTop: '1px solid var(--c-border-light)' }}>
          {/* Disclaimer */}
          <div style={{
            background: 'var(--c-medium-bg)',
            color: 'var(--c-medium)',
            padding: 'var(--sp-3) var(--sp-4)',
            borderRadius: 'var(--r-sm)',
            border: '1px solid var(--c-medium-bdr)',
            fontSize: 'var(--text-sm)',
            marginBottom: 'var(--sp-5)',
            display: 'flex',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <div>
              <strong>Disclaimer (Informational Only)</strong><br />
              This section is for general awareness. RentTrack does not provide legal advice, enforcement, or services. Users should consult qualified professionals or real estate attorneys for legal matters.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-5)' }}>
            
            {/* Context 1: Quality Decline */}
            <div className="awareness-card" style={cardStyle}>
              <h4 style={h4Style}>🏗️ Declining Construction Quality</h4>
              <ul style={ulStyle}>
                <li><strong>Rushed Timelines:</strong> Modern developments are often accelerated, leading to 4-day structural framing and ignored concrete curing times.</li>
                <li><strong>Cosmetics over Structure:</strong> Builders frequently prioritize visible finishes (quartz, paint) over skeletal integrity or superior HVAC systems.</li>
                <li><strong>Diminishing Returns:</strong> Despite record-high premium pricing, new homes are shrinking in lot size while defects rise.</li>
              </ul>
            </div>

            {/* Context 2: Defects & Systems */}
            <div className="awareness-card" style={cardStyle}>
              <h4 style={h4Style}>🧱 Common Critical Defects</h4>
              <ul style={ulStyle}>
                <li><strong>Water Infiltration:</strong> Missing vapor barriers, improper roof flashing, and failed wet-area membranes cause severe rot and mold.</li>
                <li><strong>Foundation Cracking:</strong> Often caused by skipped curing times, poor soil compaction, or uneven "differential settlement".</li>
                <li><strong>MEP Failures:</strong> Undersized AC units, incorrect underlying plumbing slopes causing sewer gas, and ungrounded electrical systems.</li>
              </ul>
            </div>

            {/* Context 3: Inspection Restrictions */}
            <div className="awareness-card" style={cardStyle}>
              <h4 style={h4Style}>🔍 Inspection Limitations</h4>
              <ul style={ulStyle}>
                <li><strong>Builder Restrictions:</strong> Developers frequently deny "Phase 1 & 2" independent inspections to hide foundational and hidden-in-wall defects.</li>
                <li><strong>Regulatory Capture:</strong> States like Florida allow builders to hire their own "private providers" for municipal code compliance, yielding heavy conflicts of interest.</li>
                <li><strong>Virtual Approvals:</strong> Use of asynchronous video software allows critical flaws to be easily hidden off-camera.</li>
              </ul>
            </div>

            {/* Context 4: Contractual Protections */}
            <div className="awareness-card" style={cardStyle}>
              <h4 style={h4Style}>🛡️ Strategic Protections</h4>
              <ul style={ulStyle}>
                <li><strong>Escrow Holdbacks:</strong> The most effective leverage during a closing is withholding 150% of punch-list repair costs in escrow until work is completed.</li>
                <li><strong>Liability Erosion:</strong> Be aware of local laws (e.g., FL SB 360) that drastically shorten the time consumers have to sue for hidden latent defects.</li>
                <li><strong>Texas RCLA:</strong> Requires formal written notice and gives the builder the right to inspect and cure the defect before litigation can begin.</li>
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

const cardStyle = {
  background: 'var(--c-surface-2)',
  padding: 'var(--sp-4)',
  borderRadius: 'var(--r-sm)',
  border: '1px solid var(--c-border-light)'
}

const h4Style = {
  fontSize: 'var(--text-sm)',
  color: 'var(--c-text-2)',
  marginBottom: 'var(--sp-2)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.04em'
}

const ulStyle = {
  paddingLeft: 'var(--sp-4)',
  fontSize: 'var(--text-sm)',
  color: 'var(--c-text)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--sp-2)'
}
