const router = require("express").Router();
const {
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
} = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingitems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  return res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: NOT_FOUND_ERROR_MESSAGE });
});

module.exports = router;
