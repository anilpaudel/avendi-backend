/**
 * Create pagination filter.
 *
 * @param {Object} filter
 * @returns {Object}
 */
exports.buildPageParams = function (filter) {
  const page = filter.page ? parseInt(filter.page) : 1;
  const limit = filter.size ? parseInt(filter.size) : 10;

  return { page, limit };
};

/**
 * Filter pagination object keys.
 *
 * @param {Object} param
 * @param {Array} param.docs
 * @param {Number} param.totalDocs
 * @param {Number} param.limit
 * @param {Number} param.size
 */
exports.filterPaginationLabels = function({ docs, totalDocs, limit, page }) {
  return { data: docs, meta: { total: totalDocs, size: limit, page } };
}