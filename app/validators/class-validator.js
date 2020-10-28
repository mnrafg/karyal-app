var Joi = require('joi');

const classSchema = Joi.object({
  course: Joi.string()
    .required()
    .alphanum(),
  instructor: Joi.string()
    .required()
    .alphanum(),
  fees: Joi.number()
    .required()
    .min(0)
    .max(5000),
  timing: Joi.number()
    .required()
    .min(0)
    .max(1439),
  startedAt: Joi.date()
    .timestamp()
    .required()
    .min(Date.now()),
  endingAt: Joi.date()
    .timestamp()
    .optional()
    .min(Date.now())
});

module.exports = data => classSchema.validate(data)
