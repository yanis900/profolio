const express = require("express");

const ProjectsController = require("../controllers/projects");
const tokenChecker = require("../middleware/tokenChecker");
const router = express.Router();

router.put("/new", tokenChecker, ProjectsController.createProject);
router.delete("/delete-one/:id", tokenChecker, ProjectsController.deleteProject);
router.put("/edit/:id", tokenChecker, ProjectsController.editProject);
router.get("/search", ProjectsController.getProjectByTags);

module.exports = router;
