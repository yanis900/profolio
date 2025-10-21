const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");
const router = express.Router();

router.post("/", UsersController.create);
router.get("/", tokenChecker, UsersController.getUserById)
router.get("/portfolio/:slug", UsersController.getUserBySlug)

module.exports = router;
