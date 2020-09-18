const ExtensionRate = require('../models/extension-rate');
const NotFoundError = require('../lib/errors/notFoundError');
const { filterPaginationLabels } = require('../utils/pagination');

exports.createExtensionRate = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return ExtensionRate().save(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = async (filter) => {
  const rate = await ExtensionRate().fetchAll(filter);

  return filterPaginationLabels(rate)
};

exports.fetchById = async (extensionRateId) => {
  const extensionRate = await ExtensionRate().fetchById(extensionRateId);

  if (!extensionRate) {
    throw new NotFoundError();
  }

  return extensionRate;
};

exports.updateExtensionRate = async (extensionRateId, updateData) => {
  const extensionRate = await ExtensionRate().updateById(
    extensionRateId,
    updateData
  );

  if (!extensionRate) {
    throw new NotFoundError();
  }

  return extensionRate;
};

exports.deleteExtensionRate = async (extensionRateId) => {
  const extensionRate = await ExtensionRate().deleteById(extensionRateId);

  if (!extensionRate) {
    throw new NotFoundError();
  }

  return extensionRate;
};
