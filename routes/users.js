const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  modifyCurrentUser,
  createUser,
} = require("../controllers/users");

// TODO - WILL MOST LIKELY NEED TO DELETE THIS ONE.
// router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", modifyCurrentUser);
// router.post("/", createUser);

module.exports = router;
