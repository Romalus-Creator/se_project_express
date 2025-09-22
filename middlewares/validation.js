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

module.exports = { validateURL, validateItemId, validateUserId };
