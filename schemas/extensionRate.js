const { createSchema } = require('.');

module.exports = createSchema({
  name: { type: String, required: true },
  price: { type: String, required: true },
});
