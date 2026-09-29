const InstituteCatalog = require('../model/InstituteCatalog');
const { RNW_BRANCHES, RNW_COURSES, TARGET_ROLES } = require('../data/instituteCatalog');

const ensureInstituteCatalog = async () => {
  const catalog = await InstituteCatalog.findOneAndUpdate(
    { key: 'default' },
    {
      key: 'default',
      branches: RNW_BRANCHES,
      courses: RNW_COURSES,
      targetRoles: TARGET_ROLES,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return catalog;
};

module.exports = { ensureInstituteCatalog };
