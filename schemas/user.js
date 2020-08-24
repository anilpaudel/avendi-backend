const { USER_TYPE } = require('../constants/user');
const { createSchema } = require('../schemas/index');

module.exports = createSchema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  type: {
    type: String,
    required: true,
    enum: Object.keys(USER_TYPE).map((key) => USER_TYPE[key]),
  },
  currency: { type: String },
  imageUrl: { type: String },
});
