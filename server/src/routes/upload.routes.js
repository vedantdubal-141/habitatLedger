import { Router } from 'express'
import { upload } from '../middlewares/upload.js'

const router = Router()

/**
 * POST /api/upload?category=water
 * Accepts a 'files' array in a multipart/form-data request.
 * The `category` query param or form field determines the subfolder.
 * Saves the physical files to disk, and returns the normalized
 * JSON metadata arrays required by the Issue schema.
 */
router.post('/', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' })
    }

    // Convert the raw Multer file metadata into the shape expected by our Issue DB schema
    const fileData = req.files.map(file => {
      let type = 'document'
      if (file.mimetype.startsWith('image/')) type = 'image'
      if (file.mimetype.startsWith('video/')) type = 'video'

      // Build the public URL by extracting the path segment after 'uploads/'
      // Multer now writes to an absolute path, so we extract the relative portion
      const normalizedPath = file.path.replace(/\\/g, '/')
      const uploadsIndex = normalizedPath.indexOf('/uploads/')
      const relativePath = uploadsIndex !== -1 
        ? normalizedPath.substring(uploadsIndex + 1)  // "uploads/water/abc123.jpg"
        : file.filename
      return {
        type,
        name: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        url: `http://localhost:5000/${relativePath}`
      }
    })

    res.status(200).json({ success: true, data: fileData })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router
