const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema(
  {
    studentProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile',
      required: true,
    },
    qualification: {
      type: String,
      default: '',
      trim: true,
    },
    specialization: {
      type: String,
      default: '',
      trim: true,
    },
    institute: {
      type: String,
      required: true,
      trim: true,
    },
    boardOrUniversity: {
      type: String,
      default: '',
      trim: true,
    },
    startYear: {
      type: String,
      default: '',
    },
    endYear: {
      type: String,
      default: '',
    },
    isPursuing: {
      type: Boolean,
      default: false,
    },
    gradeOrPercentage: {
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

module.exports = mongoose.model('Education', EducationSchema);
