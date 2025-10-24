const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const UploadController = require("../controllers/upload");

// POST /api/upload/profile
router.put(
  "/profile-image",
  tokenChecker,                     // ✅ Verifies JWT and sets req.user_id
  UploadController.upload,          // ✅ Parses multipart/form-data
  UploadController.uploadProfileImage // ✅ Handles S3 + DB logic
);


module.exports = router;