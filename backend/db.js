const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rw_resume_builder';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 20000,
      family: 4,
    });
    console.log(` MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Retrying MongoDB connection in 5s...');
    await new Promise((r) => setTimeout(r, 5000));
    return connectDB();
  }
};

module.exports = connectDB;
