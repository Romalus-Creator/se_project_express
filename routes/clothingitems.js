const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitems");
const { celebrate, Joi } = require("celebrate");
const { validateURL, validateItemId } = require("../middlewares/validation");

// get clothing item by ID
router.get(
  "/",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().hex().required().length(24).messages({
        "string.max": 'The maximum length of the "id" field is 24',
        "string.empty": 'The "id" field must be filled in',
      }),
    }),
  }),
  getClothingItems
);

//create clothing item
router.post(
  "/",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
    }),
  }),
  createClothingItem
);
router.delete("/:itemId", auth, validateItemId(), deleteClothingItem);

//  Routes for Likes on Clothing Items
router.put("/:itemId/likes", auth, validateItemId(), likeItem);
router.delete("/:itemId/likes", auth, validateItemId(), dislikeItem);

module.exports = router;
