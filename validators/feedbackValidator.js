const Joi = require('@hapi/joi');

const create = Joi.object({
  rating: Joi.number().label('Rating').valid(1, 2, 3, 4, 5).required(),
  comment: Joi.string().label('comment').trim().min(1).max(500).required(),
  staffId: Joi.string().label('Staff Id').required(),
  type: Joi.string().label('type').trim().min(1).optional(),
});

const update = Joi.object({
  rating: Joi.number().label('Rating').valid(1, 2, 3, 4, 5).optional(),
  comment: Joi.string().label('comment').trim().min(1).max(500).optional(),
  type: Joi.string().label('type').trim().min(1).optional(),
});

module.exports = {
  create,
  update,
};
