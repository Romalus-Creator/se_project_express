const router = require("express").Router();
const { getCurrentUser, modifyCurrentUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", modifyCurrentUser);

module.exports = router;
