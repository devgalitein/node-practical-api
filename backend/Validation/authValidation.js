const joi = require("joi");

exports.checkSignUpData = joi.object({
  first_name: joi.string().required().min(3).max(25).messages({
    "string.base": "First Name should be String",
    "string.empty": "First Name is required",
    "string.base": "First Name should be minimun 3 character",
    "string.base": "First Name should be minimun 8 character",
  }),
  last_name: joi.string().required().min(3).max(25).messages({
    "string.base": "Last Name should be String",
    "string.empty": "Last Name is required",
    "string.base": "Last Name should be minimun 3 character",
    "string.base": "Last Name should be minimun 8 character",
  }),
  email: joi.string().required().email().messages({
    "string.email.base": "email should be String",
    "string.email.empty": "email is required",
    "string.email.required": "email is required",
    "string.email.message": "email must be a valid email",
  }),
  password: joi.string().required().min(8).messages({
    "string.base": "password should be String",
    "string.empty": "password is required",
    "string.base": "password should be minimun 8 character",
    "any.required": "password is required",
  }),
  cpassword: joi.string().required().min(8).messages({
    "string.base": "password should be String",
    "string.empty": "password is required",
    "string.base": "password should be minimun 8 character",
    "any.required": "password is required",
  }),
});

exports.checkSignInData = joi.object({
  email: joi.string().required().email().messages({
    "string.email.base": "email should be String",
    "string.email.empty": "email is required",
    "string.email.required": "email is required",
    "string.email.message": "email must be a valid email",
  }),
  password: joi.string().required().min(8).messages({
    "string.base": "password should be String",
    "string.empty": "password is required",
    "string.base": "password should be minimun 8 character",
    "any.required": "password is required",
  }),
});
