const ExtensionRate = require('../models/extension-rate');

exports.createExtensionRate = function (payload) {
  try {
    const data = {
      ...payload,
    };

    return ExtensionRate.save(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = () => ExtensionRate.fetchAll();

exports.fetchById = (extensionRateId) =>
  ExtensionRate.fetchById(extensionRateId);

exports.updateExtensionRate = (extensionRateId, updateData) =>
  ExtensionRate.updateById(extensionRateId, updateData);

exports.deleteExtensionRate = (extensionRateId) =>
  Room.deleteById(extensionRateId);
