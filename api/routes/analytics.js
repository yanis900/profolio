const express = require("express");

const AnalyticsController = require("../controllers/analytics");
const tokenChecker = require("../middleware/tokenChecker");
const router = express.Router();

router.put("/view/:slug", tokenChecker, AnalyticsController.updateViewCount);
router.get("/view/:slug", tokenChecker, AnalyticsController.getViewCount);

module.exports = router;
