const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const UploadController = require("../controllers/upload");

router.put("/profile-image", tokenChecker, UploadController.upload.single("image"), UploadController.uploadProfileImage);
router.post("/cv", tokenChecker, UploadController.upload.single("file"), UploadController.uploadCV);
router.post("/thumbnail/:id", tokenChecker, UploadController.upload.single("image"), UploadController.uploadThumbnail);

module.exports = router;