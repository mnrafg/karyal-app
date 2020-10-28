var Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required().min(3).max(20),
  lastName: Joi.string().optional().min(3).max(20),
  email: Joi.string().email().min(5).max(255),
  password: Joi.string().required().min(5),
  // photo: Joi.object().required(),
});

module.exports = (data) => userSchema.validate(data);
