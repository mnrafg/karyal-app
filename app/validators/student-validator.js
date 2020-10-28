var Joi = require('joi');

const studentSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .min(3)
    .max(20),
  lastName: Joi.string()
    .optional()
    .min(3)
    .max(20),
  email: Joi.string()
    .email()
    .min(5)
    .max(255),
  password: Joi.string()
    .required()
    .min(5)
});

module.exports = data => studentSchema.validate(data)
