const { NOT_FOUND_ERROR_CODE } = require("../utils/errorCodes");

class NotFoundError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

module.exports = NotFoundError;
