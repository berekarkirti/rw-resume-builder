const mongoose = require('mongoose');

const ReviewCommentSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResumeDocument',
      required: true,
    },
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewerName: {
      type: String,
      required: true,
      default: 'Placement Officer',
    },
    reviewerRole: {
      type: String,
      default: 'Placement Admin',
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    statusTag: {
      type: String,
      enum: ['Comment', 'Needs Changes', 'Approved', 'Rejected'],
      default: 'Comment',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReviewComment', ReviewCommentSchema);
