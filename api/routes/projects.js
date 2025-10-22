const express = require("express");

const ProjectsController = require("../controllers/projects");
const tokenChecker = require("../middleware/tokenChecker");
const router = express.Router();

router.put("/new", tokenChecker, ProjectsController.createProject);
router.delete("/delete-one", tokenChecker, ProjectsController.deleteProject);
router.put("/edit", tokenChecker, ProjectsController.editProject);

module.exports = router;
