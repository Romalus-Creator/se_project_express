const router = require("express").Router();
const {
  createClothingItem,
  getClothingItems,
  getClothingItemById,
  updateClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingitems");

router.get("/", getClothingItems);
router.get("/:itemId", getClothingItemById);
router.post("/", createClothingItem);
router.put("/:itemId", updateClothingItem);
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
