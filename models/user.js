const mongoose = require('../config/database');

const Model = require('./base_model');
const userSchema = require('../schemas/user');
const { collectionNames, createSchema } = require('../schemas/index');

class User extends Model {
  constructor() {
    const schema = createSchema(userSchema);

    schema.set('toJSON', {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    });

    const model = mongoose.model(collectionNames.USER, schema);

    super(model);
  }

  fetchAll() {
    return this.model.find();
  }

  fetchByEmail(email) {
    return this.model.findOne({ email });
  }
}

module.exports = new User();
