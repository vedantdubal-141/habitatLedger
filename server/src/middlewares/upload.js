import multer from 'multer'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const VALID_CATEGORIES = ['water', 'electrical', 'hvac', 'pest', 'structural', 'appliances', 'security', 'maintenance']

// Define storage location and dynamic filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Route files into category-specific subfolders
    // The category comes from a form field or query param
    const category = req.body.category || req.query.category || 'maintenance'
    const safeCategory = VALID_CATEGORIES.includes(category) ? category : 'maintenance'
    const dest = path.join(__dirname, '../../uploads', safeCategory)

    // Ensure the directory exists (in case it was deleted manually)
    fs.mkdirSync(dest, { recursive: true })
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    // Generate a secure, random filename to prevent collisions and overwrites
    // e.g., a8f3d1-1714214567.jpg
    const uniqueSuffix = crypto.randomBytes(6).toString('hex')
    cb(null, uniqueSuffix + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Export the middleware configured to accept files up to 10MB
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB per file limit
})
