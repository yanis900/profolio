const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const User = require("../models/user");

// Multer config — store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Debug log for environment variables (masked for safety)
console.log("🧩 AWS CONFIG:");
console.log("AWS_REGION:", process.env.AWS_REGION || "❌ MISSING");
console.log(
  "AWS_ACCESS_KEY_ID:",
  process.env.AWS_ACCESS_KEY_ID ? "✅ SET" : "❌ MISSING"
);
console.log(
  "AWS_SECRET_ACCESS_KEY:",
  process.env.AWS_SECRET_ACCESS_KEY ? "✅ SET" : "❌ MISSING"
);
console.log(
  "AWS_S3_BUCKET:",
  process.env.AWS_S3_BUCKET || "❌ MISSING"
);

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
  console.log("✅ S3 client initialized successfully.");
} catch (err) {
  console.error("❌ Failed to initialize S3 client:", err);
}

/**
 * Upload profile image to S3 and update the user document.
 */
async function uploadProfileImage(req, res) {
  console.log("📥 Incoming upload request...");

  try {
    const userId = req.user_id;
    console.log("🆔 User ID from request:", userId);

    const file = req.file;
    if (!file) {
      console.warn("⚠️ No file uploaded in request.");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📸 File received:");
    console.log(" - Original name:", file.originalname);
    console.log(" - Mime type:", file.mimetype);
    console.log(" - Size:", file.size, "bytes");

    if (!process.env.AWS_S3_BUCKET) {
      console.error("❌ Missing AWS_S3_BUCKET environment variable!");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const key = `${userId}/profile-picture`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      // ACL: "public-read",
      ContentType: file.mimetype,
    };

    console.log("🚀 Starting upload to S3...");
    console.log("   Bucket:", uploadParams.Bucket);
    console.log("   Key:", uploadParams.Key);

    const parallelUpload = new Upload({
      client: s3,
      params: uploadParams,
    });

    // Optional progress listener
    parallelUpload.on("httpUploadProgress", (progress) => {
      console.log(
        `📤 Uploading... ${progress.loaded}/${progress.total || "?"} bytes`
      );
    });

    const result = await parallelUpload.done();
    console.log("✅ Upload complete!");
    console.log("🌐 S3 URL:", result.Location);

    console.log("🧾 Updating MongoDB user document...");
    const user = await User.findByIdAndUpdate(
      userId,
      { image: result.Location },
      { new: true }
    );

    if (!user) {
      console.warn("⚠️ No user found with that ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ MongoDB user updated successfully.");

    return res.status(200).json({
      message: "Profile image uploaded successfully!",
      imageUrl: result.Location,
      user,
    });
  } catch (error) {
    console.error("💥 Error uploading image:", error);
    return res.status(500).json({
      message: "Error uploading image",
      error: error.message,
    });
  }
}

async function uploadCV(req, res) {
  // console.log("📥 Incoming uploadCV request...");

  try {
    const userId = req.user_id;
    // console.log("🆔 User ID from request:", userId);

    const file = req.file;
    if (!file) {
      console.warn("⚠️ No file uploaded in request.");
      return res.status(400).json({ message: "No file uploaded" });
    }

    // console.log("📸 File received:");
    // console.log(" - Original name:", file.originalname);
    // console.log(" - Mime type:", file.mimetype);
    // console.log(" - Size:", file.size, "bytes");

    if (!process.env.AWS_S3_BUCKET) {
      console.error("❌ Missing AWS_S3_BUCKET environment variable!");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const key = `${userId}/cv`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      // ACL: "public-read",
      ContentType: file.mimetype,
    };

    // console.log("🚀 Starting upload to S3...");
    // console.log("   Bucket:", uploadParams.Bucket);
    // console.log("   Key:", uploadParams.Key);

    const parallelUpload = new Upload({
      client: s3,
      params: uploadParams,
    });

    // Optional progress listener
    parallelUpload.on("httpUploadProgress", (progress) => {
      console.log(
        `📤 Uploading... ${progress.loaded}/${progress.total || "?"} bytes`
      );
    });

    const result = await parallelUpload.done();
    console.log("✅ Upload complete!");
    console.log("🌐 S3 URL:", result.Location);

    console.log("🧾 Updating MongoDB user document...");
    const user = await User.findByIdAndUpdate(
      userId,
      { cv: result.Location },
      { new: true }
    );

    if (!user) {
      console.warn("⚠️ No user found with that ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ MongoDB user updated successfully.");

    return res.status(200).json({
      message: "CV uploaded successfully!",
      imageUrl: result.Location,
      user,
    });
  } catch (error) {
    console.error("💥 Error uploading image:", error);
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
};

module.exports = UploadController;
