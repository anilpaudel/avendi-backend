const mongoose = require('../config/database');

const Model = require('./baseModel');
const userSchema = require('../schemas/user');
const { collectionNames, createSchema } = require('../schemas/index');

class User extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.USER,
      createSchema(userSchema, { timestamps: true })
    );

    super(model);
  }
}

module.exports = new User();
