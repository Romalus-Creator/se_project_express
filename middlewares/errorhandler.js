const { INCORRECT_USER_ERROR_MESSAGE } = require("../utils/errorCodes");

module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode).send({ message: err.message });
};
