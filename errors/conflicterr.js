const { CONFLICT_ERROR_CODE } = require("../utils/errorCodes");

class ConflictError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

module.exports = ConflictError;
