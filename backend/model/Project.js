const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
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
    projectType: {
      type: String,
      enum: ['Academic Capstone', 'Client Project', 'Personal Project', 'Hackathon / Competition', 'Open Source'],
      default: 'Academic Capstone',
    },
    role: {
      type: String,
      default: 'Lead Developer',
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    liveDemoUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
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

module.exports = mongoose.model('Project', ProjectSchema);
