const {
  INVALID_DATA_ERROR_CODE,
  INVALID_DATA_ERROR_MESSAGE,
  INCORRECT_USER_ERROR_CODE,
  INCORRECT_USER_ERROR_MESSAGE,
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
} = require("../utils/errorCodes");

class IncorrectUserError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = INCORRECT_USER_ERROR_CODE;
  }
}

module.exports = IncorrectUserError;
