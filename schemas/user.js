// can add/change the user types as required.
const USER_TYPE = {
  SUPER_ADMIN: 'superAdmin',
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
};

module.exports = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  type: {
    type: String,
    required: true,
    default: USER_TYPE.EMPLOYEE,
    enum: Object.keys(USER_TYPE).map((key) => USER_TYPE[key]),
  },
  department: { type: String, required: true }, // can be used enum too to make sure only predefined departments are entered
  currency: { type: String },
};
