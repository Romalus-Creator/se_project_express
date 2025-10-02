const { DEFAULT_ERROR_CODE } = require("../utils/errorCodes");

module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    return next(new Error(DEFAULT_ERROR_CODE));
  }
  console.error(err);
  res.status(err.statusCode).send({ message: err.message });
};
