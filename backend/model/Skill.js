const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    studentProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile',
      required: true,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'UI/UX & Graphics', 'Database', 'Tools & Cloud', 'Soft Skills', 'Other'],
      default: 'Frontend',
    },
    name: {
      type: String,
      default: '',
      trim: true,
    },
    proficiencyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Advanced',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', SkillSchema);
