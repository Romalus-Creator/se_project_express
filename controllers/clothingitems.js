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
} = require("../utils/errorCodes");

const ConflictError = require("../errors/conflicterr");
const IncorrectUserError = require("../errors/incorrectusererr");
const InvalidDataError = require("../errors/invaliddataerr");
const NotFoundError = require("../errors/notfounderr");
const UnauthorizedUserError = require("../errors/unauthorizedusererr");

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id }) // add id to the array if it's not there yet
    .then((clothingItem) => {
      if (!clothingItem) {
        throw new InvalidDataError(INVALID_DATA_ERROR_MESSAGE);
      }
      res.status(200).send(clothingItem);
    })
    .catch(next);
};

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => {
      if (!clothingItems) {
        throw new InvalidDataError(INVALID_DATA_ERROR_MESSAGE);
      }
      res.status(200).send(clothingItems);
    })
    .catch(next);
};

const deleteClothingItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then(
      (clothingItem) =>
        new Promise((resolve, reject) => {
          if (
            JSON.stringify(clothingItem.owner) === JSON.stringify(req.user._id)
          ) {
            resolve(ClothingItem.findByIdAndDelete(req.params.itemId));
          }
          reject(new IncorrectUserError(INCORRECT_USER_ERROR_CODE));
        })
    )
    .then((clothingItem) => {
      res.status(200).send(clothingItem);
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
      next(err);
    });
};

//  Controllers for Likes on Clothing Items
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, //  Add id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      console.log(`err name: ${err.name}`);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
      }
      if (err.name === "CastError") {
        return next(new InvalidDataError(INVALID_DATA_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, //  Remove id from the array
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
      }
      if (err.name === "CastError") {
        return next(new InvalidDataError(INVALID_DATA_ERROR_MESSAGE));
      }
      next(err);
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
