const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const User = require("../models/user");

// Multer config — store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize S3 client
let s3;
try {
  s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
} catch (err) {
  console.error(err);
}

/**
 * Upload profile image to S3 and update the user document.
 */
async function uploadProfileImage(req, res) {
  try {
    const userId = req.user_id;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!process.env.AWS_S3_BUCKET) {
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const key = `${userId}/profile-picture`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const parallelUpload = new Upload({
      client: s3,
      params: uploadParams,
    });

    const result = await parallelUpload.done();

    const user = await User.findByIdAndUpdate(
      userId,
      { image: result.Location },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile image uploaded successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading image",
      error: error.message,
    });
  }
}

async function uploadCV(req, res) {
  try {
    const userId = req.user_id;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!process.env.AWS_S3_BUCKET) {
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const key = `${userId}/cv`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const parallelUpload = new Upload({
      client: s3,
      params: uploadParams,
    });

    const result = await parallelUpload.done();

    const user = await User.findByIdAndUpdate(
      userId,
      { cv: result.Location },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "CV uploaded successfully!",
      imageUrl: result.Location,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading image",
      error: error.message,
    });
  }
}

async function uploadThumbnail(req, res) {
  try {
    const userId = req.user_id;
    const projectId = req.params.id;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!process.env.AWS_S3_BUCKET) {
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const key = `${userId}/${projectId}-thumbnail`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const parallelUpload = new Upload({
      client: s3,
      params: uploadParams,
    });

    const result = await parallelUpload.done();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = user.projects.id(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.thumbnail = result.Location;
    await user.save();

    return res.status(200).json({
      message: "Thumbnail uploaded successfully!",
      imageUrl: result.Location,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading image",
      error: error.message,
    });
  }
}

const UploadController = {
  upload,
  uploadProfileImage,
  uploadCV,
  uploadThumbnail,
};

module.exports = UploadController;
