//  400 - invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.
const INVALID_DATA_ERROR_CODE = 400;
const INVALID_DATA_ERROR_MESSAGE = "Invalid data";

//  401 - incorrect email and password combination OR when an unauthorized user tries to access protected routes
const UNAUTHORIZED_USER_ERROR_CODE = 401;
const UNAUTHORIZED_USER_ERROR_MESSAGE =
  "The user is unauthorized to complete this action";
const UNAUTHORIZED_USER_LOGIN_MESSAGE =
  "The email and password combination is incorrect";

//  403 - user _id does not match the owner of this clothing item
const INCORRECT_USER_ERROR_CODE = 403;
const INCORRECT_USER_ERROR_MESSAGE = "Access denied for this action";

//  404 — there is no user or clothing item with the requested id, or the request was sent to a non-existent address.
const NOT_FOUND_ERROR_CODE = 404;
const NOT_FOUND_ERROR_MESSAGE = "Data not found";

//  409 - conflict error - for email
const CONFLICT_ERROR_CODE = 409;
const CONFLICT_ERROR_MESSAGE = "Conflict error";
const CONFLICT_EMAIL_ERROR_MESSAGE = "This email or username is already used";

//  500 - default error. Accompanied by the message: "An error has occurred on the   server."
const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = "An error has occurred on the server";

module.exports = {
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
};
