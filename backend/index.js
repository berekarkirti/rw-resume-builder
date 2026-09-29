const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./db');
const studentRoutes = require('./routes/studentRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const seedDatabase = require('./seed');
const StudentProfile = require('./model/StudentProfile');
const { ensureInstituteCatalog } = require('./utils/ensureCatalog');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(morgan('dev'));

// Connect DB and auto-seed if needed
connectDB().then(async () => {
  try {
    await ensureInstituteCatalog();
    const count = await StudentProfile.countDocuments();
    if (count === 0) {
      console.log('No student records found. Automatically seeding sample data...');
      await seedDatabase(false);
    }
  } catch (err) {
    console.log('Auto-seed check note:', err.message);
  }
});

// API Routes
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/resume', resumeRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    institute: 'Red & White Multimedia Institute',
    portal: 'Resume Builder & Placement Review Portal',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(` Red & White Resume Builder API server running on http://localhost:${PORT}`);
});
