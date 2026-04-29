import { Router } from 'express'
import {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  updateStatus,
  closeIssue,
  togglePin,
  deleteIssue,
  getStats,
} from '../controllers/issue.controller.js'

const router = Router()

// Stats — must be before /:id to avoid "stats" being treated as an id
router.get('/stats', getStats)

// Core CRUD
router.get('/',     getAllIssues)
router.get('/:id',  getIssueById)
router.post('/',    createIssue)
router.patch('/:id',         updateIssue)    // general field edits
router.patch('/:id/status',  updateStatus)   // open ↔ in_progress
router.patch('/:id/close',   closeIssue)     // requires closureNote
router.patch('/:id/pin',     togglePin)      // toggle pin
router.delete('/:id',        deleteIssue)

export default router
