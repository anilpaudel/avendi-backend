const mongoose = require('../config/database');

const Model = require('./base_model');
const userSchema = require('../schemas/user');
const { collectionNames, createSchema } = require('../schemas/index');

class SuperUser extends Model {
  constructor() {
    const schema = createSchema(userSchema);

    schema.set('toJSON', {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    });

    const model = mongoose.model('superuser', schema);

    super(model);
  }

  fetchAll() {
    return this.model.find();
  }

  fetchByEmail(email) {
    return this.model.findOne({ email });
  }
}
const modelClass = new SuperUser();
module.exports = () => modelClass;
