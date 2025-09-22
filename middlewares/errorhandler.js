const { INCORRECT_USER_ERROR_MESSAGE } = require("../utils/errorCodes");

module.exports = (err, req, res, next) => {
  if (err.name === "DocumentNotFoundError") {
    console.error(err);
    return res.status(err.statusCode).send(err.message);
  } else if (err.name === "CastError") {
    console.error(err);
    return res.status(err.statusCode).send(err.message);
  } else if (err.name === "ValidationError") {
    console.error(err);
    return res.status(err.statusCode).send(err.message);
  } else if (err.message === INCORRECT_USER_ERROR_MESSAGE) {
    console.error(err);
    return res.status(err.statusCode).send(err.message);
  }
  //catch any remaining errors
  else {
    console.error(err);
    return res.status(500).send({ message: "An error occurred on the server" });
  }
};
