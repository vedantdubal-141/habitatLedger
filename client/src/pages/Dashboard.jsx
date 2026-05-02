// Explorer tab wired into Dashboard
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useIssueStore from '../store/useIssueStore'
import SummaryCards from '../components/SummaryCards'
import Filters from '../components/Filters'
import IssueList from '../components/IssueList'
import IssueExplorer from '../components/IssueExplorer'
import InsightsPanel from '../components/InsightsPanel'

const TABS = [
  { id: 'explorer',  label: '🗂️ Issues',     subtitle: 'Browse by status & category' },
  { id: 'all',       label: '📋 All Issues',  subtitle: 'Full list with search & filter' },
  { id: 'insights',  label: '📊 Insights',    subtitle: null },
]

export default function Dashboard() {
  const issues     = useIssueStore((s) => s.issues)
  const loading    = useIssueStore((s) => s.loading)
  const error      = useIssueStore((s) => s.error)
  const loadIssues = useIssueStore((s) => s.loadIssues)
  const clearError = useIssueStore((s) => s.clearError)
  const [search,    setSearch]    = useState('')
  const [category,  setCategory]  = useState('')
  const [status,    setStatus]    = useState('')
  const [activeTab, setActiveTab] = useState('explorer')

  // Load from backend on first render
  useEffect(() => { loadIssues() }, []) // eslint-disable-line

  const openCount = issues.filter((i) => i.status === 'open').length
  const allCount  = issues.length

  return (
    <div className="dashboard container fade-in">
      {/* Free hosting notice */}
      <div style={{
        background: 'rgba(25, 118, 210, 0.08)', color: '#1976d2',
        border: '1px solid rgba(25, 118, 210, 0.2)', borderRadius: 'var(--r-md)',
        padding: 'var(--sp-2) var(--sp-4)', marginBottom: 'var(--sp-4)',
        fontSize: 'var(--text-xs)', fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        <span>💡</span>
        <span>Hosted on a free server. If you just opened the link, please wait up to 60 seconds for the backend to wake up!</span>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{
          background: 'var(--c-critical-bg)', color: 'var(--c-critical)',
          border: '1px solid var(--c-critical-bdr)', borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3) var(--sp-4)', marginBottom: 'var(--sp-4)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 'var(--text-sm)',
        }}>
          <span>⚠️ {error}</span>
          <button onClick={clearError} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'1rem' }}>✕</button>
        </div>
      )}
      <div className="page-header dashboard-header">
        <div>
          <h1>My Property Issues</h1>
          <p>Track, document, and resolve rental issues with clarity.</p>
        </div>
      </div>

      <SummaryCards
        setStatusFilter={(val) => {
          setStatus(val)
          setActiveTab('all')
        }}
      />

      {/* Tab bar */}
      <div className="tab-bar" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === 'all' && (
              <span style={{ marginLeft: '5px', opacity: 0.55, fontSize: 'var(--text-xs)' }}>
                ({allCount})
              </span>
            )}
            {tab.id === 'explorer' && openCount > 0 && (
              <span
                style={{
                  marginLeft: '5px',
                  fontSize: '10px', fontWeight: 700,
                  background: 'var(--c-open-bg)', color: 'var(--c-open)',
                  padding: '1px 5px', borderRadius: '9999px',
                }}
              >
                {openCount} open
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab contents */}
      {activeTab === 'explorer' && <IssueExplorer />}

      {activeTab === 'all' && (
        <>
          <Filters
            search={search}     setSearch={setSearch}
            category={category} setCategory={setCategory}
            status={status}     setStatus={setStatus}
          />
          <IssueList issues={issues} search={search} category={category} status={status} />
        </>
      )}

      {activeTab === 'insights' && <InsightsPanel />}
    </div>
  )
}
