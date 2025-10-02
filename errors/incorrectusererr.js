const { INCORRECT_USER_ERROR_CODE } = require("../utils/errorCodes");

class IncorrectUserError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = INCORRECT_USER_ERROR_CODE;
  }
}

module.exports = IncorrectUserError;
