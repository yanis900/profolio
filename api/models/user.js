const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  jobtitle: { type: String },
  opentowork: { type: Boolean, default: false },
  visibility: { type: Boolean, default: true },
  location: { type: String },
  github: { type: String },
  links: { type: Array },
  image: { type: String, default: "https://profolio-project-dev-project-3.s3.eu-west-2.amazonaws.com/default+profile.png"},
  cv: {type: String},
  projects: [
    {
      title: { type: String },
      description: { type: String },
      links: { type: Array },
      tags: { type: [String], default: [] },
      thumbnail: {type: String, default: "https://profolio-project-dev-project-3.s3.eu-west-2.amazonaws.com/default+thumbnail.png"}
    },
  ],
  analytics: {
    views: [
      {
        userId: { type: mongoose.Schema.Types.Mixed }, // can store ObjectId or String (IP)
        viewedAt: { type: Date, default: Date.now },
        device: {
          type: String,
          enum: ["Desktop", "Mobile", "Tablet", "Unknown"],
          default: "Unknown",
        },
      },
    ],
    emails: [
      {
        userId: { type: mongoose.Schema.Types.Mixed },
        sentAt: { type: Date, default: Date.now },
      }
    ]
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
