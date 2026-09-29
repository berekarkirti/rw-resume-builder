const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['Student', 'Placement Admin', 'Branch Admin', 'Super Admin'],
      default: 'Student',
    },
    studentId: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      default: 'Surat - Katargam',
    },
    course: {
      type: String,
      default: 'Master in Full Stack Web Development',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
