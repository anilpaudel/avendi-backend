const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const { REQUEST_STATUS } = require('../constants/guestRequest');

const Joi = BaseJoi.extend(Extension);

const create = Joi.object({
  type: Joi.string().label('Type').trim().min(1).required(),
  requestType: Joi.string().label('Request Type').min(1).trim().required(),
  details: Joi.string().label('Details').required().min(1).max(500),
  completionBy: Joi.string().label('Completion By').required().min(1),
  status: Joi.string()
    .label('Status')
    .valid(...Object.keys(REQUEST_STATUS).map((key) => REQUEST_STATUS[key]))
    .optional(),
  assignedTo: Joi.string().label('Assigned To').optional(),
});

const update = Joi.object({
  type: Joi.string().label('Type').trim().min(1),
  requestType: Joi.string().label('Request Type').min(1).trim(),
  details: Joi.string().label('Details').min(1).max(500),
  completionBy: Joi.string().label('Completion By').min(1),
  status: Joi.string()
    .label('Status')
    .valid(...Object.keys(REQUEST_STATUS).map((key) => REQUEST_STATUS[key])),
});

module.exports = {
  create,
  update,
};
