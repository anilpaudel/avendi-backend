const mongoose = require('../config/database');

const Model = require('./base_model');
const { collectionNames, createSchema } = require('../schemas/index');
const schema = require('../schemas/tenant');

class Tenant extends Model {
  constructor() {
    const model = mongoose.model('tenant', schema);

    super(model);
  }

  fetchAll() {
    return this.model.find();
  }

  fetchByName(tenant) {
    return this.model.findOne({ tenant: tenant });
  }

  updateByTenantName(tenant, payload) {
    return this.model.findOneAndUpdate({ tenant: tenant }, payload, {
      new: true,
    });
  }

  deleteByTenantName(tenant) {
    return this.model.findOneAndDelete({ tenant: tenant });
  }
}

const modelClass = new Tenant();

module.exports = () => modelClass;
