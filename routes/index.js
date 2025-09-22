const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const {
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
} = require("../utils/errorCodes");
const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../middlewares/validation");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingitems");

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);
//sign in
router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required().min(2).messages({
        "string.min": 'The minimum length of the "email" field is 2',
        "string.empty": 'The "email" field must be filled in',
      }),
      password: Joi.string().required().min(2).messages({
        "string.min": 'The minimum length of the "password" field is 2',
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  }),
  login
);

//create user
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string()
        .uri()
        .required()
        .min(2)
        .custom(validateURL)
        .messages({
          "string.empty": 'The "avatar" field must be filled in',
          "string.uri": 'the "avatar" field must be a valid url',
        }),
      email: Joi.string().email().required().min(2).messages({
        "string.min": 'The minimum length of the "email" field is 2',
        "string.empty": 'The "email" field must be filled in',
      }),
      password: Joi.string().required().min(2).messages({
        "string.min": 'The minimum length of the "password" field is 2',
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  }),
  createUser
);

router.use((req, res) =>
  res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_ERROR_MESSAGE })
);

module.exports = router;
