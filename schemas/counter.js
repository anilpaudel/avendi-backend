const { COUNTER_NAME } = require('../constants/counter');
const { createSchema } = require('.');

module.exports = createSchema({
  counterName: {
    type: String,
    required: true,
    unique: true,
    enum: Object.keys(COUNTER_NAME).map((key) => COUNTER_NAME[key]),
  },
  count: { type: Number, default: 1, required: true },
});
