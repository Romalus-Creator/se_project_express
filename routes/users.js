const router = require("express").Router();
const { getCurrentUser, modifyCurrentUser } = require("../controllers/users");
const { validateModifiedUser } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateModifiedUser(), modifyCurrentUser);

module.exports = router;
