const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');

const { getCurrentTenant } = require('../utils/storage');

const Model = require('./base_model');
const userSchema = require('../schemas/user');
const { collectionNames, createSchema } = require('../schemas/index');
const { buildPageParams } = require('../utils/pagination');

class User extends Model {
  constructor(dbConnection) {
    const schema = userSchema;

    schema.set('toJSON', {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    });

    const model = dbConnection.model(
      collectionNames.USER,
      schema.plugin(mongoosePaginate)
    );

    super(model);
  }

  fetchAll(filter) {
    const option = { ...buildPageParams(filter) };

    return this.model.paginate({}, option);
  }

  fetchByEmail(email) {
    return this.model.findOne({ email });
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();
  if (!tenantConnection) {
    return new User(mongoose);
  }
  return new User(tenantConnection);
};
