const mongoose = require('../config/database');

const Model = require('./base_model');
const roomSchema = require('../schemas/room');
const { collectionNames, createSchema } = require('../schemas/index');

class Room extends Model {
  constructor() {
    const model = mongoose.model(
      collectionNames.ROOM,
      createSchema(roomSchema, { timestamps: true })
    );

    super(model);
  }
}

module.exports = new Room();
