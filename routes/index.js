const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateSignIn, validateSignUp } = require("../middlewares/validation");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND_ERROR_MESSAGE } = require("../utils/errorCodes");

const NotFoundError = require("../errors/notfounderr");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingitems");

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);

//  sign in
router.post("/signin", validateSignIn(), login);

//  create user
router.post("/signup", validateSignUp(), createUser);

router.use((req, res) => next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE)));

module.exports = router;
