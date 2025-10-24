const express = require("express");

const AnalyticsController = require("../controllers/analytics");
const tokenChecker = require("../middleware/tokenChecker");
const router = express.Router();

router.put("/view/:slug", tokenChecker, AnalyticsController.updateViewCount);

module.exports = router;
