const Service = require('../models/service');
const NotFoundError = require('../lib/errors/notFoundError');

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

exports.fetchById = async (serviceId) => {
  const service = await Service().fetchById(serviceId);
  if (!service) {
    throw new NotFoundError();
  }

  return service;
};

exports.updateService = async (serviceId, updateData) => {
  const service = await Service().updateById(serviceId, updateData);

  if (!service) {
    throw new NotFoundError();
  }

  return service;
};

exports.deleteService = async (serviceId) => {
  const service = await Service().deleteById(serviceId);

  if (!service) {
    throw new NotFoundError();
  }
};
