const clothingItem = require("../models/clothingitem");
const ClothingItem = require("../models/clothingitem");
const {
  INVALID_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/errors");

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log("Full req.user object in controller:", req.user);
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id }) // add _id to the array if it's not there yet
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error(err);
        return res
          .status(INVALID_DATA_ERROR_CODE)
          .send({ message: err.message });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      console.error(err);
      return res.sendStatus(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

const getClothingItemById = (req, res) => {
  const { clothingItemId } = req.params;
  console.log(`clothingItemID: ${clothingItemId}`);
  ClothingItem.findById(clothingItemId)
    .orFail()
    .then((clothingItem) => {
      res.status(200).send(clothingItem);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        console.error(err);
        return res
          .status(INVALID_DATA_ERROR_CODE)
          .send({ message: err.message });
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

const updateClothingItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;
  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      console.error(err);
      return res.sendStatus(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch();
};

//Controllers for Likes on Clothing Items
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(201).send(clothingItem))
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

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
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

module.exports = {
  createClothingItem,
  getClothingItems,
  getClothingItemById,
  updateClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
