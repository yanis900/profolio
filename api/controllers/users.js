const User = require("../models/user");
const { link } = require("../routes/users");

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

async function editUser(req, res) {
  const userId = req.user_id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const bio = req.body.bio;
  const jobtitle = req.body.jobtitle;
  const opentowork = req.body.opentowork;
  const location = req.body.location;
  const links = req.body.links;

  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        firstname: firstname,
        lastname: lastname,
        bio: bio,
        jobtitle: jobtitle,
        opentowork: opentowork,
        location: location,
        links: links,
      },
    },
    { new: true }
  );
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    user: user,
  });
}

async function getUserById(req, res) {
  const userId = req.user_id;
  console.log(userId);
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findById(userId).select("-password");
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    user: user,
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
  const partialId = query[2].slice(-6);

  const user = await User.findOne({
    $and: [
      { firstname: { $regex: query[0], $options: "i" } },
      { lastname: { $regex: query[1], $options: "i" } },
      { $expr: { $regexMatch: { input: { $toString: "$_id" }, regex: `${partialId}$` } } },
    ],
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
  editUser: editUser,
  getUserById: getUserById,
  getUserBySlug: getUserBySlug,
  getUserByEmail: getUserByEmail,
};

module.exports = UsersController;
