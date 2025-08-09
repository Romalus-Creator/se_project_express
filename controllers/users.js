const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");
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

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .sendStatus(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  console.log(`userID: ${userId}`);
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        console.error(err);
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: NOT_FOUND_ERROR_MESSAGE });
      }
      if (err.name === "CastError") {
        console.error(err);
        return res
          .status(INVALID_DATA_ERROR_CODE)
          .send({ message: INVALID_DATA_ERROR_MESSAGE });
      }
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const createUser = (req, res) => {
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
        console.error(err);
        return res
          .status(INVALID_DATA_ERROR_CODE)
          .send({ message: INVALID_DATA_ERROR_MESSAGE });
      }
      if (err.name === "MongoServerError") {
        console.error(err);
        return res
          .status(CONFLICT_ERROR_CODE)
          .send({ message: CONFLICT_EMAIL_ERROR_MESSAGE });
      }
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const login = (req, res) => {
  //  get email & pass from createUser (the request).
  const { email, password } = req.body;

  console.log(`email: ${email}, password: ${password}.`);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res;
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (email === undefined || password === undefined) {
        console.error(err);
        return res
          .status(INVALID_DATA_ERROR_CODE)
          .send({ message: INVALID_DATA_ERROR_MESSAGE });
      }
      console.error(err);
      return res
        .status(UNAUTHORIZED_USER_ERROR_CODE)
        .send({ message: UNAUTHORIZED_USER_LOGIN_MESSAGE });
    });
  //  if email & pass are good, create a JWT with one week expiration
  //  on the JWT, write user._id into the token payload.
  //  Send JWT to the client as JSON Body.
  //  if email & pass are NOT good, return 401 error.
};
module.exports = { getUsers, getUserById, createUser, login };
