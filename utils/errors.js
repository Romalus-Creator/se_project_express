// 400 — invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.
const INVALID_DATA_ERROR_CODE = 400;

// 404 — there is no user or clothing item with the requested id, or the request was sent to a non-existent address.
const NOT_FOUND_ERROR_CODE = 404;

// 500 — default error. Accompanied by the message: "An error has occurred on the server."
const DEFAULT_ERROR_CODE = 500;

module.exports = {
  INVALID_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
};
