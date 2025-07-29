// 400 — invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.
const INVALID_DATA_ERROR_CODE = 400;
const INVALID_DATA_ERROR_MESSAGE = "Invalid data";

// 404 — there is no user or clothing item with the requested id, or the request was sent to a non-existent address.
const NOT_FOUND_ERROR_CODE = 404;
const NOT_FOUND_ERROR_MESSAGE = "Data not found";

// 500 — default error. Accompanied by the message: "An error has occurred on the server."
const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = "An error has occurred on the server";

module.exports = {
  INVALID_DATA_ERROR_CODE,
  INVALID_DATA_ERROR_MESSAGE,
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
};
