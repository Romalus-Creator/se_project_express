const User = require("../models/user");
const {
  INVALID_DATA_ERROR_CODE,
  INVALID_DATA_ERROR_MESSAGE,
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
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
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
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

module.exports = { getUsers, getUserById, createUser };
