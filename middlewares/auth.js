const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_USER_ERROR_MESSAGE } = require("../utils/errorCodes");
const UnauthorizedUserError = require("../errors/unauthorizedusererr");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new UnauthorizedUserError(UNAUTHORIZED_USER_ERROR_MESSAGE));
  }
  try {
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedUserError(UNAUTHORIZED_USER_ERROR_MESSAGE));
  }
};
