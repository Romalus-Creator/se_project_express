const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const {
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
} = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingitems");

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) =>
  res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_ERROR_MESSAGE })
);

module.exports = router;
