const User = require("../models/user");
const {
  INVALID_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.sendStatus(DEFAULT_ERROR_CODE).send({ message: err.message });
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
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else if (err.name === "CastError") {
        console.error(err);
        return res
          .status(INVALID_DATA_ERROR_CODE)
          .send({ message: err.message });
      }
      console.error(err);
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
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
          .send({ message: err.message });
      }
      console.error(err);
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

module.exports = { getUsers, getUserById, createUser };
