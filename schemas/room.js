const { ROOM_TYPES } = require('../constants/room');

module.exports = {
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
  type: {
    type: String,
    required: true,
    enum: Object.keys(ROOM_TYPES).map((key) => ROOM_TYPES[key]),
  },
};
