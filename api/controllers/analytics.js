const User = require("../models/user");

async function updateViewCount(req, res) {
  const viewerId = req.user_id || req.ip;
  const slug = req.params.slug;

  const deviceType = req.useragent.isMobile
    ? "Mobile"
    : req.useragent.isTablet
    ? "Tablet"
    : "Desktop";

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

  if (viewerId.toString() === user._id.toString()) {
  return res.status(400).json({ message: "You can't view your own profile." });
}

  const alreadyViewed = user.analytics.views.find(
    (view) => view.userId?.toString() === viewerId
  );

  if (alreadyViewed) {
    return res
      .status(200)
      .json({ message: "User already viewed", viewed: true });
  }

  user.analytics.views.push({
    userId: viewerId,
    viewedAt: new Date(),
    device: deviceType,
  });
  await user.save();

  res.status(200).json({
    message: "View recorded",
    totalViews: user.analytics.views.length,
  });
}

async function getViewCount(req, res) {
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
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user);

  res.status(200).json({
    totalViews: user.analytics.views.length,
    views: user.analytics.views
  });
}

const AnalyticsController = {
  updateViewCount: updateViewCount,
  getViewCount: getViewCount,
};

module.exports = AnalyticsController;
