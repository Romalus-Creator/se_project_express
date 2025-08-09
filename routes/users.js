const router = require("express").Router();
const { getUsers, getUserById, createUser } = require("../controllers/users");

// TODO - WILL MOST LIKELY NEED TO DELETE THIS ONE.
// router.get("/", getUsers);
// router.get("/:userId", getUserById);
// router.post("/", createUser);

module.exports = router;
