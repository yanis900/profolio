const User = require("../models/user");

async function slugChecker(req, res, next) {
  const slug = req.params.slug;

  if (!slug) {
    return res.status(400).json({ message: "Invalid page" });
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
  req.user = user
  next();
}

module.exports = slugChecker;
