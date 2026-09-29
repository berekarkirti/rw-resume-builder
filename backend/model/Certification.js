const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema(
  {
    studentProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile',
      required: true,
    },
    title: {
      type: String,
      default: '',
      trim: true,
    },
    issuer: {
      type: String,
      default: 'Red & White Skill Education',
      trim: true,
    },
    issueDate: {
      type: String,
      default: '',
    },
    credentialUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certification', CertificationSchema);
