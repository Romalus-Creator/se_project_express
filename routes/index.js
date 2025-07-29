const router = require("express").Router();
const {
  INVALID_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingitems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  console.error(err);
  return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
});

module.exports = router;
