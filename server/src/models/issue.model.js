import mongoose from 'mongoose'

// A single timeline event embedded in the issue
const timelineEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['created', 'status_changed', 'severity_changed', 'proof_uploaded', 'closed', 'updated'],
      required: true,
    },
    note: { type: String, default: '' },
    status: { type: String },      // populated on status_changed
  },
  { timestamps: { createdAt: 'timestamp', updatedAt: false } }
)

// An attached media file (image / video / document)
const mediaFileSchema = new mongoose.Schema({
  type:     { type: String, enum: ['image', 'video', 'document'], required: true },
  name:     { type: String, required: true },
  size:     { type: Number },
  url:      { type: String },       // data-url (base64) or future CDN url
  mimeType: { type: String },
})

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['water', 'electrical', 'hvac', 'pest', 'structural', 'appliances', 'security', 'maintenance'],
    },
    severity: {
      type: String,
      required: [true, 'Severity is required'],
      enum: ['critical', 'high', 'medium', 'low'],
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'closed'],
      default: 'open',
    },
    pinned:       { type: Boolean, default: false },

    // Closure fields
    closedAt:     { type: Date, default: null },
    closureNote:  { type: String, default: null },
    closureProof: { type: [mediaFileSchema], default: [] },

    // Embedded arrays
    media:    { type: [mediaFileSchema],    default: [] },
    timeline: { type: [timelineEventSchema], default: [] },
  },
  {
    timestamps: true,   // adds createdAt + updatedAt
    versionKey: false,
  }
)

// Index for common query patterns
issueSchema.index({ status: 1, category: 1 })
issueSchema.index({ severity: 1 })
issueSchema.index({ createdAt: -1 })

const Issue = mongoose.model('Issue', issueSchema)

export default Issue
