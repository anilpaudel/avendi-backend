const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const { EXTENSION_STATUS } = require('../constants/guestExtension');

const Joi = BaseJoi.extend(Extension);

const create = Joi.object({
  requestType: Joi.string().label('request type').trim().min(1).optional(),
  extendedTo: Joi.date().label('Extended to').required(),
  status: Joi.string()
    .label('Status')
    .valid(...Object.keys(EXTENSION_STATUS).map((key) => EXTENSION_STATUS[key]))
    .optional(),
  rateId: Joi.string().label('Rate id').trim().required(),
  assignedTo: Joi.string().label('Assigned To').optional(),
});

const update = Joi.object({
  requestType: Joi.string().label('request type').trim().min(1).optional(),
  extendedTo: Joi.date().label('Extended to').optional(),
  rateId: Joi.string().label('Rate id').trim().optional(),
  status: Joi.string().label('Status').optional(),
});

module.exports = {
  create,
  update,
};
