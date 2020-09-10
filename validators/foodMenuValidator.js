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
  categories: Joi.string().label('Categories').min(1).required(),
  dietaryRestrictions: Joi.string().label('Dietary Restrictions').min(1),
  menuType: Joi.string().label('Menu Type').min(1),
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
  categories: Joi.string().label('categories').min(1).optional(),
  dietaryRestrictions: Joi.string().label('Dietary Restrictions').min(1),
  menuType: Joi.string().label('Menu Type').min(1),
});

module.exports = {
  create,
  update,
};
