const mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    photoPositionX: {
      type: Number,
      default: 50,
    },
    photoPositionY: {
      type: Number,
      default: 50,
    },
    mobileNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      default: 'Surat',
    },
    state: {
      type: String,
      default: 'Gujarat',
    },
    country: {
      type: String,
      default: 'India',
    },
    linkedinUrl: {
      type: String,
      default: '',
    },
    portfolioUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    behanceUrl: {
      type: String,
      default: '',
    },
    dribbbleUrl: {
      type: String,
      default: '',
    },
    // Career Profile
    targetRole: {
      type: String,
      default: 'Full Stack MERN Developer',
    },
    professionalSummary: {
      type: String,
      default: '',
    },
    preferredLocation: {
      type: String,
      default: 'Surat / Ahmedabad / Remote',
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'],
      default: 'Full-time',
    },
    availability: {
      type: String,
      enum: ['Immediate', 'Within 15 Days', 'Within 1 Month', 'Within 2 Months'],
      default: 'Immediate',
    },
    // Academic metadata
    branch: {
      type: String,
      default: 'Surat - Katargam',
    },
    course: {
      type: String,
      default: 'Master in Full Stack Web Development',
    },
    batch: {
      type: String,
      default: '2025-2026 (Batch B4)',
    },
    // Languages & Soft Skills
    languages: [
      {
        language: { type: String, required: true },
        proficiency: { type: String, enum: ['Basic', 'Conversational', 'Fluent', 'Native'], default: 'Fluent' },
        canSpeak: { type: Boolean, default: true },
        canRead: { type: Boolean, default: true },
        canWrite: { type: Boolean, default: true },
      },
    ],
    softSkills: [
      {
        type: String,
      },
    ],
    completionPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentProfile', StudentProfileSchema);
