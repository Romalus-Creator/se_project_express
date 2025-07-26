const router = require("express").Router();
const {
  createClothingItem,
  getClothingItems,
  getClothingItemById,
  updateClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitems");

router.get("/", getClothingItems);
router.get("/:itemId", getClothingItemById);
router.post("/", createClothingItem);
router.put("/:itemId", updateClothingItem);
router.delete("/:itemId", deleteClothingItem);

//Routes for Likes on Clothing Items
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
