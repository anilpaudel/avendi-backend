const Joi = require('@hapi/joi');

const USER_TYPE = require('../constants/user').USER_TYPE;

const create = Joi.object({
  firstName: Joi.string().label('First Name').trim().min(1).required(),
  lastName: Joi.string().label('Last Name').trim().min(1).required(),
  email: Joi.string().email().label('Email').required(),
  password: Joi.string().label('Password').required(),
  phone: Joi.number().label('Phone').positive().integer(),
  type: Joi.string()
    .label('type')
    .valid(...Object.keys(USER_TYPE).map((key) => USER_TYPE[key]))
    .required(),
  department: Joi.string().label('Department').when('type', {
    is: USER_TYPE.GUEST,
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  currency: Joi.string().label('Currency'),
  staffId: Joi.number().label('Staff Id').when('type', {
    is: USER_TYPE.GUEST,
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
});

const update = Joi.object({
  firstName: Joi.string().label('First Name').trim().min(1),
  lastName: Joi.string().label('Last Name').trim().min(1),
  email: Joi.string().email().label('Email'),
  phone: Joi.number().label('Phone').positive().integer(),
  type: Joi.string()
    .label('type')
    .valid(...Object.keys(USER_TYPE).map((key) => USER_TYPE[key])),
  department: Joi.string().label('Department'),
  currency: Joi.string().label('Currency'),
  staffId: Joi.number().label('Staff Id'),
});

module.exports = {
  create,
  update,
};
