const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");
const slugChecker = require("../middleware/slugChecker");
const router = express.Router();

router.post("/", UsersController.create);
router.get("/", tokenChecker, UsersController.getUserById);
router.get("/email", UsersController.getUserByEmail);
router.get("/portfolio/:slug", slugChecker, UsersController.getUserBySlug);
router.put("/edit", tokenChecker, UsersController.editUser);
router.put("/visibility", tokenChecker, UsersController.toggleVisibility);
router.get("/search", UsersController.getUserByName);
router.get("/badge/:slug", slugChecker, UsersController.getUserBadge);
router.post("/email/:slug", slugChecker, UsersController.sendEmail);

module.exports = router;
