const { UNAUTHORIZED_USER_ERROR_CODE } = require("../utils/errorCodes");

class UnauthorizedUserError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = UNAUTHORIZED_USER_ERROR_CODE;
  }
}

module.exports = UnauthorizedUserError;
