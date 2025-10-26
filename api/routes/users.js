const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");
const router = express.Router();

router.post("/", UsersController.create);
router.get("/", tokenChecker, UsersController.getUserById);
router.get("/email", UsersController.getUserByEmail);
router.get("/portfolio/:slug", UsersController.getUserBySlug);
router.put("/edit", tokenChecker, UsersController.editUser);
router.put("/visibility", tokenChecker, UsersController.toggleVisibility);
router.get("/search", UsersController.getUserByName);

module.exports = router;
