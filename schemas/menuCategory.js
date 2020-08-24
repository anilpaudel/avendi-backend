const { createSchema } = require('.');

module.exports = createSchema({
  name: { type: String, required: true, unique: true },
});
