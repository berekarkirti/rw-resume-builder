const mongoose = require('mongoose');

const InstituteCatalogSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'default',
      unique: true,
    },
    branches: {
      type: [String],
      default: [],
    },
    courses: {
      type: [String],
      default: [],
    },
    targetRoles: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('InstituteCatalog', InstituteCatalogSchema);
