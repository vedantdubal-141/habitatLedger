import { Link, useParams } from 'react-router-dom'
import IssueForm from '../components/IssueForm'
import useIssueStore from '../store/useIssueStore'

export default function NewIssuePage({ edit = false }) {
  const { id }   = useParams()
  const issues   = useIssueStore((s) => s.issues)
  const existing = edit && id ? issues.find((i) => i._id === id) : null

  return (
    <div className="new-issue-page container fade-in">
      <div className="page-header">
        <Link to={edit ? `/issue/${id}` : '/'} className="btn btn-ghost btn-sm back-btn">
          ← Back
        </Link>
        <h1>{edit ? 'Edit Issue' : 'Log a New Issue'}</h1>
        <p>
          {edit
            ? `Updating: ${existing?.title || 'issue'}`
            : 'Document a property issue. Be specific — every detail helps.'}
        </p>
      </div>

      <div className="new-issue-form-wrap card">
        <IssueForm edit={edit} />
      </div>
    </div>
  )
}
