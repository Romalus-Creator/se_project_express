const ClothingItem = require("../models/clothingitem");
const {
  INVALID_DATA_ERROR_CODE,
  INVALID_DATA_ERROR_MESSAGE,
  INCORRECT_USER_ERROR_CODE,
  INCORRECT_USER_ERROR_MESSAGE,
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
} = require("../utils/errors");

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id }) // add id to the array if it's not there yet
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error(err);
        return res
          .status(INVALID_DATA_ERROR_CODE)
          .send({ message: INVALID_DATA_ERROR_MESSAGE });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((clothingItem) => {
      Promise((resolve, reject) => {
        if (
          JSON.stringify(clothingItem.owner) === JSON.stringify(req.user._id)
        ) {
          return resolve(ClothingItem.findByIdAndDelete(req.params.itemId));
        }
        return reject(new Error(INCORRECT_USER_ERROR_MESSAGE));
      });
    })
    .then((clothingItem) => {
      res.status(200).send(clothingItem);
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
      if (err.message === INCORRECT_USER_ERROR_MESSAGE) {
        console.error(err);
        return res
          .status(INCORRECT_USER_ERROR_CODE)
          .send({ message: INCORRECT_USER_ERROR_MESSAGE });
      }
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

//  Controllers for Likes on Clothing Items
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, //  Add id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(201).send(clothingItem))
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
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, //  Remove id from the array
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
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
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
