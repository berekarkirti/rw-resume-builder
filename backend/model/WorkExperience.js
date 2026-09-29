const mongoose = require('mongoose');

const WorkExperienceSchema = new mongoose.Schema(
  {
    studentProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile',
      required: true,
    },
    employmentType: {
      type: String,
      enum: ['Full-time Job', 'Internship', 'Freelance', 'Part-time Job', 'Contract'],
      default: 'Internship',
    },
    companyName: {
      type: String,
      default: '',
      trim: true,
    },
    designation: {
      type: String,
      default: '',
      trim: true,
    },
    location: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    isCurrentlyWorking: {
      type: Boolean,
      default: false,
    },
    responsibilities: [
      {
        type: String,
      },
    ],
    achievements: {
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

module.exports = mongoose.model('WorkExperience', WorkExperienceSchema);
