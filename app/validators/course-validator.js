var Joi = require("joi");

const courseSchema = Joi.object({
  title: Joi.string().required().min(2).max(30),
  description: Joi.string().required().min(10),
  intro: Joi.string().required().min(10),
  icon: Joi.string().required(),
  // thumbnail: Joi.string().required(),
});

module.exports = (data) => courseSchema.validate(data);
