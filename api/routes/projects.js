const express = require("express");

const ProjectsController = require("../controllers/projects");
const tokenChecker = require("../middleware/tokenChecker");
const router = express.Router();

router.put("/new", tokenChecker, ProjectsController.createProject);

module.exports = router;
