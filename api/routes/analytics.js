const express = require("express");

const AnalyticsController = require("../controllers/analytics");
const slugChecker = require("../middleware/slugChecker");
const router = express.Router();

router.put("/view/:slug", slugChecker, AnalyticsController.updateViewCount);
router.get("/view/:slug", slugChecker, AnalyticsController.getViewCount);
router.put("/email/:slug", slugChecker, AnalyticsController.updateEmailCount)
router.get("/email/:slug", slugChecker, AnalyticsController.getEmailCount)

module.exports = router;
