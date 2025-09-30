const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const {
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
} = require("../utils/errorCodes");
const { celebrate, Joi } = require("celebrate");
const {
  validateURL,
  validateSignIn,
  validateSignUp,
} = require("../middlewares/validation");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingitems");

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);

//sign in
router.post("/signin", validateSignIn(), login);

//create user
router.post("/signup", validateSignUp(), createUser);

router.use((req, res) =>
  res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_ERROR_MESSAGE })
);

module.exports = router;
