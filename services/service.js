
const Service = require('../models/service');

exports.createService = function (payload) {
  try {
    const serviceData = {
      ...payload,
    };

    return Service().save(serviceData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.fetchAll = () => Service().fetchAll();

exports.fetchById = (serviceId) => Service().fetchById(serviceId);

exports.updateService = (serviceId, updateData) =>
  Service().updateById(serviceId, updateData);

exports.deleteService = (serviceId) => Service().deleteById(serviceId)
