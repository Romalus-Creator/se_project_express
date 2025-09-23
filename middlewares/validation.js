const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateItemId = () => {
  return celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().alphanum().length(24).messages({
        "string.length": "Item Id must be 24 characters long.",
        "string.alphanum": "Item Id must contain only numbers and letters.",
      }),
    }),
  });
};

const validateUserId = () => {
  return celebrate({
    params: Joi.object().keys({
      _id: Joi.string().alphanum().length(24).messages({
        "string.length": "User Id must be 24 characters long.",
        "string.alphanum": "User Id must contain only numbers and letters.",
      }),
    }),
  });
};

const validateClothingCreation = () => {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
      weather: Joi.string().required().valid("hot", "warm", "cold").messages({
        "string.empty": "A weather option must be selected.",
      }),
    }),
  });
};

const validateGetClothingItem = () => {
  return celebrate({
    body: Joi.object().keys({
      _id: Joi.string().hex().required().length(24).messages({
        "string.max": 'The maximum length of the "id" field is 24',
        "string.empty": 'The "id" field must be filled in',
      }),
    }),
  });
};

const validateSignIn = () => {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required().min(2).messages({
        "string.min": 'The minimum length of the "email" field is 2',
        "string.empty": 'The "email" field must be filled in',
      }),
      password: Joi.string().required().min(2).messages({
        "string.min": 'The minimum length of the "password" field is 2',
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  });
};

const validateSignUp = () => {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string()
        .uri()
        .required()
        .min(2)
        .custom(validateURL)
        .messages({
          "string.empty": 'The "avatar" field must be filled in',
          "string.uri": 'the "avatar" field must be a valid url',
        }),
      email: Joi.string().email().required().min(2).messages({
        "string.min": 'The minimum length of the "email" field is 2',
        "string.empty": 'The "email" field must be filled in',
      }),
      password: Joi.string().required().min(2).messages({
        "string.min": 'The minimum length of the "password" field is 2',
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  });
};

module.exports = {
  validateURL,
  validateItemId,
  validateUserId,
  validateClothingCreation,
  validateGetClothingItem,
  validateSignIn,
  validateSignUp,
};
