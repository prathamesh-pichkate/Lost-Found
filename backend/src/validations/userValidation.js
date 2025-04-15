import Joi from "joi";

export const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  fullname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.string().optional(),
  profession: Joi.string().optional(),
});
