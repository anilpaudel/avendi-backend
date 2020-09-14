const { createSchema } = require('.');

module.exports = createSchema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
});
