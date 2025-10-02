const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");
const {
  INVALID_DATA_ERROR_MESSAGE,
  INCORRECT_USER_ERROR_CODE,
  INCORRECT_USER_ERROR_MESSAGE,
  UNAUTHORIZED_USER_LOGIN_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  CONFLICT_EMAIL_ERROR_MESSAGE,
} = require("../utils/errorCodes");

const ConflictError = require("../errors/conflicterr");
const IncorrectUserError = require("../errors/incorrectusererr");
const InvalidDataError = require("../errors/invaliddataerr");
const NotFoundError = require("../errors/notfounderr");
const UnauthorizedUserError = require("../errors/unauthorizedusererr");

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
      }
      if (err.name === "CastError") {
        return next(new InvalidDataError(INVALID_DATA_ERROR_MESSAGE));
      }
      if (err.message === INCORRECT_USER_ERROR_MESSAGE) {
        return next(new IncorrectUserError(INCORRECT_USER_ERROR_CODE));
      }
      return next(err);
    });
};

const modifyCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const updateObject = {};
  function updateNameFunc(object) {
    const blankObject = object;
    if (req.body.name && req.body.name !== "" && req.body.name !== undefined) {
      blankObject.name = req.body.name;
      return blankObject;
    }
    return blankObject;
  }

  function updateAvatarFunc(object) {
    const blankObject = object;
    if (
      req.body.avatar &&
      req.body.avatar !== "" &&
      req.body.avatar !== undefined
    ) {
      blankObject.avatar = req.body.avatar;
      return blankObject;
    }
    return blankObject;
  }

  updateNameFunc(updateObject);
  updateAvatarFunc(updateObject);
  User.findByIdAndUpdate(
    userId,
    { $set: updateObject },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new InvalidDataError(INVALID_DATA_ERROR_MESSAGE));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
      }
      if (err.name === "CastError") {
        return next(new InvalidDataError(INVALID_DATA_ERROR_MESSAGE));
      }
      if (err.message === INCORRECT_USER_ERROR_MESSAGE) {
        return next(new IncorrectUserError(INCORRECT_USER_ERROR_CODE));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email: req.body.email,
        password: hash,
      })
    )
    .then(() => res.status(201).send({ name, email, avatar }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new InvalidDataError(INVALID_DATA_ERROR_MESSAGE));
      }
      if (err.name === "MongoServerError") {
        return next(new ConflictError(CONFLICT_EMAIL_ERROR_MESSAGE));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  //  get email & pass from createUser (the request).
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      const { name } = user.name;
      res.status(200).send({ token, name });
    })
    .catch((err) => {
      if (email === undefined || password === undefined) {
        return next(new InvalidDataError(INVALID_DATA_ERROR_MESSAGE));
      }
      if (err.message.includes("Incorrect email or password")) {
        return next(new UnauthorizedUserError(UNAUTHORIZED_USER_LOGIN_MESSAGE));
      }
      return next(err);
    });
  //  if email & pass are good, create a JWT with one week expiration
  //  on the JWT, write user._id into the token payload.
  //  Send JWT to the client as JSON Body.
  //  if email & pass are NOT good, return 401 error.
};

module.exports = {
  getCurrentUser,
  modifyCurrentUser,
  createUser,
  login,
};
