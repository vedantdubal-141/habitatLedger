import { NavLink, Link } from 'react-router-dom'
import useIssueStore from '../store/useIssueStore'

export default function Navbar() {
  const issues = useIssueStore((s) => s.issues)
  const openCount = issues.filter((i) => i.status === 'open').length

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="RentTrack home">
          <span className="navbar-brand-icon">🌿</span>
          <span className="navbar-brand-name">RentTrack</span>
        </Link>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            id="nav-dashboard"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
          >
            Dashboard
            {openCount > 0 && (
              <span className="navbar-badge" aria-label={`${openCount} open issues`}>
                {openCount}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/awareness"
            id="nav-awareness"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
          >
            Awareness
          </NavLink>
          <NavLink
            to="/legal"
            id="nav-legal"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
          >
            Legal
          </NavLink>
          <Link to="/new" id="nav-new-issue" className="btn btn-primary btn-sm">
            + New Issue
          </Link>
        </div>
      </div>
    </nav>
  )
}
