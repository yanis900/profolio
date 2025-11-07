const express = require("express");
const router = express.Router();
const UploadController = require("../controllers/upload");

router.put("/profile-image", UploadController.upload.single("image"), UploadController.uploadProfileImage);
router.post("/cv", UploadController.upload.single("file"), UploadController.uploadCV);
router.post("/thumbnail/:id", UploadController.upload.single("image"), UploadController.uploadThumbnail);

module.exports = router;