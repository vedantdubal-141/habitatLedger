import { CATEGORIES, STATUSES } from '../data/constants'

export default function Filters({ search, setSearch, category, setCategory, status, setStatus }) {
  const hasFilters = search || category || status

  return (
    <div className="filters-bar" role="search" aria-label="Filter issues">
      <div className="filters-search">
        <span className="filters-search-icon" aria-hidden="true">🔍</span>
        <input
          id="filter-search"
          type="search"
          className="form-input filters-input"
          placeholder="Search issues by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search issues"
        />
      </div>

      <div className="filters-right">
        <select
          id="filter-category"
          className="form-select filters-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>

        <select
          id="filter-status"
          className="form-select filters-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            id="filter-clear"
            className="btn btn-ghost btn-sm"
            onClick={() => { setSearch(''); setCategory(''); setStatus('') }}
            aria-label="Clear all filters"
          >
            Clear ✕
          </button>
        )}
      </div>
    </div>
  )
}
