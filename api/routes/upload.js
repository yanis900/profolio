const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const UploadController = require("../controllers/upload");

router.put(
  "/profile-image",
  tokenChecker,                     // ✅ Verifies JWT and sets req.user_id
  UploadController.upload.single("image"),          // ✅ Parses multipart/form-data
  UploadController.uploadProfileImage // ✅ Handles S3 + DB logic
);

router.post("/cv", tokenChecker, UploadController.upload.single("file"), UploadController.uploadCV);

module.exports = router;