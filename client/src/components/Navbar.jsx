import { NavLink, Link } from 'react-router-dom'
import useIssueStore from '../store/useIssueStore'

const DashboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
)
const AwarenessIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
)
const LegalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"></path><path d="m16 16 6-6"></path><path d="m8 8 6-6"></path><path d="m9 7 8 8"></path><path d="m21 11-8-8"></path></svg>
)
const IssuesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 10h6"></path><path d="M9 18h6"></path></svg>
)
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
)

export default function Navbar() {
  const issues = useIssueStore((s) => s.issues)
  const openCount = issues.filter((i) => i.status === 'open').length

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand" aria-label="RentTrack home">
            <span className="navbar-brand-icon">🌿</span>
            <span className="navbar-brand-name mobile-brand-name">RentTrack</span>
          </Link>

          <div className="navbar-links desktop-only">
            <NavLink to="/" end id="nav-dashboard" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
              Dashboard
              {openCount > 0 && <span className="navbar-badge" aria-label={`${openCount} open issues`}>{openCount}</span>}
            </NavLink>
            <NavLink to="/awareness" id="nav-awareness" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
              Awareness
            </NavLink>
            <NavLink to="/legal" id="nav-legal" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
              Legal
            </NavLink>
            <Link to="/new" id="nav-new-issue" className="btn btn-primary btn-sm">
              + New Issue
            </Link>
          </div>

          {/* Mobile Right Action */}
          <div className="mobile-only">
            <button className="mobile-search-btn" aria-label="Search">
              <SearchIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Fixed Bottom Navigation (Mobile Only) */}
      <div className="mobile-bottom-nav">
        <NavLink to="/" end className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <div className="icon-wrapper"><DashboardIcon /></div>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/awareness" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <div className="icon-wrapper"><AwarenessIcon /></div>
          <span>Awareness</span>
        </NavLink>
        <NavLink to="/legal" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <div className="icon-wrapper"><LegalIcon /></div>
          <span>Legal</span>
        </NavLink>
        <NavLink to="/new" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <div className="icon-wrapper">
            <IssuesIcon />
            {openCount > 0 && <span className="bottom-nav-badge">{openCount}</span>}
          </div>
          <span>Issues</span>
        </NavLink>
      </div>
    </>
  )
}
