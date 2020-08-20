const Joi = require('@hapi/joi');

const create = Joi.object({
  price: Joi.string().label('Price').trim().min(1).max(500).required(),
  description: Joi.string()
    .label('Description')
    .trim()
    .min(1)
    .max(500)
    .required(),
  name: Joi.string().label('Name').trim().min(1).max(500).required(),
  categoryId: Joi.array().label('type').items(Joi.string()).min(1).required(),
});

const update = Joi.object({
  price: Joi.string().label('Price').trim().min(1).max(500).optional(),
  description: Joi.string()
    .label('Description')
    .trim()
    .min(1)
    .max(500)
    .optional(),
  name: Joi.string().label('Name').trim().min(1).max(500).optional(),
  categoryId: Joi.array().label('type').items(Joi.string()).min(1).optional(),
});

module.exports = {
  create,
  update,
};
