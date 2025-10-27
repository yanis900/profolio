const User = require("../models/user");
const { link, get } = require("../routes/users");

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
  const github = req.body.github

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
        github: github
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
      {
        $expr: {
          $regexMatch: { input: { $toString: "$_id" }, regex: `${partialId}$` },
        },
      },
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

async function getUserByName(req, res) {
  const name = req.query.name;

  const users = await User.find({
    $and: [
      {
        $or: [
          { firstname: { $regex: name, $options: "i" } },
          { lastname: { $regex: name, $options: "i" } },
        ],
      },
      { visibility: true },
    ],
  }).select("-password");

  if (users.length === 0) {
    return res.status(404).json({ message: "No user found with this name" });
  }

  res.status(200).json({ users: users });
}

async function toggleVisibility(req, res) {
  const userId = req.user_id;
  const visibility = req.body.visibility;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { visibility: visibility } },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: user, message: "Visibility updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating visibility" });
  }
}


async function getUserBadge(req, res) {
  const userId = req.user_id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compute badges on the fly
    const totalViews = user.analytics.views.length;
    const badges = [];

    if (totalViews >= 100) badges.push("100_views");
    if (totalViews >= 200) badges.push("200_views");
    // if (user.emailsSent >= 10) badges.push("10_emails");
    if (user.projects.length >= 5) badges.push("5_projects");
    if (user.cv) badges.push("cv_uploaded");

    // Return badges
    res.status(200).json({ badges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getUserBadge };




const UsersController = {
  create: create,
  editUser: editUser,
  getUserById: getUserById,
  getUserBySlug: getUserBySlug,
  getUserByEmail: getUserByEmail,
  getUserByName: getUserByName,
  toggleVisibility: toggleVisibility,
  getUserBadge: getUserBadge,
};

module.exports = UsersController;
