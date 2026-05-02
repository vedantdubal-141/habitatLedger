// health check endpoint added
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import issueRoutes from './routes/issue.routes.js'
import uploadRoutes from './routes/upload.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// ── Middlewares ──────────────────────────────
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))
app.use(express.json({ limit: '20mb' }))     // 20 MB for base64 media payloads
app.use(express.urlencoded({ extended: true }))

// ── Routes & Static Files ───────────────────
// Makes the physical /uploads directory publicly accessible via http://localhost:5000/uploads/...
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/api/issues', issueRoutes)
app.use('/api/upload', uploadRoutes)

// ── Health check ────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'renttrack-api', timestamp: new Date().toISOString() })
})

// ── 404 handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` })
})

// ── Global error handler ────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('🔥 Unhandled error:', err)
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' })
})

export default app
