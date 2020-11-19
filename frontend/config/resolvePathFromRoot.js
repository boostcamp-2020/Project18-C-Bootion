const path = require('path');

const resolvePathFromRoot = (...pathSegments) =>
  path.resolve(__dirname, '..', ...pathSegments);

module.exports = resolvePathFromRoot;
