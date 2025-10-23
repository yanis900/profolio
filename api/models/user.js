const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  jobtitle: { type: String },
  opentowork:{type: Boolean, default: false},
  location:{type: String},
  links: { type: Array },
  image: { type: String, default: "https://profile-image-software-dev-project3.s3.eu-west-2.amazonaws.com/default+profile.png"},
  projects: [
    {
      title: { type: String },
      description: { type: String },
      links: { type: Array },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
