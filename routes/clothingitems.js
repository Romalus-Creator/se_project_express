const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitems");
const {
  validateItemId,
  validateClothingCreation,
  validateGetClothingItem,
} = require("../middlewares/validation");

//  get clothing item by ID
router.get("/", validateGetClothingItem(), getClothingItems);

//  create clothing item
router.post("/", auth, validateClothingCreation(), createClothingItem);
router.delete("/:itemId", auth, validateItemId(), deleteClothingItem);

//  Routes for Likes on Clothing Items
router.put("/:itemId/likes", auth, validateItemId(), likeItem);
router.delete("/:itemId/likes", auth, validateItemId(), dislikeItem);

module.exports = router;
