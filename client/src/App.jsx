import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import NewIssuePage from './pages/NewIssuePage'
import IssueDetailPage from './pages/IssueDetailPage'
import AwarenessPage from './pages/AwarenessPage'
import LegalPage from './pages/LegalPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<NewIssuePage />} />
            <Route path="/issue/:id" element={<IssueDetailPage />} />
            <Route path="/issue/:id/edit" element={<NewIssuePage edit />} />
            <Route path="/awareness" element={<AwarenessPage />} />
            <Route path="/legal" element={<LegalPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
