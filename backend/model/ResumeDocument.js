const mongoose = require('mongoose');

const ResumeDocumentSchema = new mongoose.Schema(
  {
    studentProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile',
      required: true,
    },
    templateId: {
      type: String,
      enum: ['classic-ats', 'modern-minimal', 'creative-rnw', 'developer-tech', 'fresher-academic'],
      default: 'creative-rnw',
    },
    accentColor: {
      type: String,
      default: '#C8102E', // Red & White Primary
    },
    fontFamily: {
      type: String,
      default: 'Inter',
    },
    spacingDensity: {
      type: String,
      enum: ['compact', 'standard', 'relaxed'],
      default: 'standard',
    },
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Under Review', 'Needs Changes', 'Approved', 'Rejected'],
      default: 'Draft',
    },
    version: {
      type: Number,
      default: 1,
    },
    fileUrl: {
      type: String,
      default: '',
    },
    submissionDate: {
      type: Date,
    },
    reviewedAt: {
      type: Date,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewerName: {
      type: String,
      default: '',
    },
    adminNotes: {
      type: String,
      default: '',
    },
    snapshotData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResumeDocument', ResumeDocumentSchema);
