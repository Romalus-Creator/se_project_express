const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  INVALID_DATA_ERROR_CODE,
  INVALID_DATA_ERROR_MESSAGE,
  INCORRECT_USER_ERROR_CODE,
  INCORRECT_USER_ERROR_MESSAGE,
  UNAUTHORIZED_USER_ERROR_CODE,
  UNAUTHORIZED_USER_ERROR_MESSAGE,
  UNAUTHORIZED_USER_LOGIN_MESSAGE,
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
  CONFLICT_ERROR_CODE,
  CONFLICT_ERROR_MESSAGE,
  CONFLICT_EMAIL_ERROR_MESSAGE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
} = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(UNAUTHORIZED_USER_ERROR_CODE)
      .send({ message: UNAUTHORIZED_USER_ERROR_MESSAGE });
  }
  const token = authorization.replace("Bearer ", "");

  payload = jwt.verify(token, JWT_SECRET);

  req.user = payload;
  next();
};
