const User = require("../models/user");

function create(req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ firstname, lastname, email, password });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
}

async function getUserById(req, res) {
  const userId = req.user_id
  console.log(userId)
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findById(userId).select("-password");
  console.log(user)
   if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    user: user
  });
}

async function getUserByEmail(req, res) {
  const email = req.query.email;

  const user = await User.findOne({ email: email }, "_id firstname lastname");


  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const safeUser = user.toObject();
  delete safeUser.password;

  res.status(200).json({ user: safeUser });
}

async function getUserBySlug(req, res) {
  const slug = req.params.slug;
  if (!slug) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const query = slug.split("-");

  const user = await User.findOne({
    firstname: { $regex: query[0], $options: "i" },
    lastname: { $regex: query[1], $options: "i" } 
  }).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (query[2].length === 6 && user.id.endsWith(query[2])) {
    res.status(200).json({ user: user });
  } else {
    return res.status(404).json({ message: "Id doesn't match" });
  }
}

const UsersController = {
  create: create,
  getUserById: getUserById,
  getUserBySlug: getUserBySlug,
  getUserByEmail: getUserByEmail
};

module.exports = UsersController;
