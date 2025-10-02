const { INVALID_DATA_ERROR_CODE } = require("../utils/errorCodes");

class InvalidDataError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = INVALID_DATA_ERROR_CODE;
  }
}

module.exports = InvalidDataError;
