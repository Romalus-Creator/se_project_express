const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  UNAUTHORIZED_USER_ERROR_CODE,
  UNAUTHORIZED_USER_ERROR_MESSAGE,
} = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(UNAUTHORIZED_USER_ERROR_CODE)
      .send({ message: UNAUTHORIZED_USER_ERROR_MESSAGE });
  }
  const token = authorization.replace("Bearer ", "");

  const payload = jwt.verify(token, JWT_SECRET);

  req.user = payload;
  next();
};
