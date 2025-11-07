const User = require("../models/user");

async function updateViewCount(req, res) {
  const viewerId = req.user_id || req.ip;
  console.log(viewerId)
  const user = req.user

  const deviceType = req.useragent.isMobile
    ? "Mobile"
    : req.useragent.isTablet
      ? "Tablet"
      : "Desktop";

  if (viewerId.toString() === user._id.toString()) {
    return res
      .status(400)
      .json({ message: "You can't view your own profile." });
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
  const user = req.user

  res.status(200).json({
    totalViews: user.analytics.views.length,
    views: user.analytics.views,
  });
}

async function updateEmailCount(req, res) {
  const senderId = req.user_id || req.ip;
  const user = req.user

  if (senderId.toString() === user._id.toString()) {
    return res.status(400).json({ message: "You can't email yourself." });
  }

  user.analytics.emails.push({
    userId: senderId,
    sentAt: new Date(),
  });
  await user.save();

  res.status(200).json({
    message: "Email sent logged",
    totalEmails: user.analytics.emails.length,
  });
}

async function getEmailCount(req, res) {
  const user = req.user
  
  res.status(200).json({
    totalEmails: user.analytics.emails.length,
    emails: user.analytics.emails,
  });
}

const AnalyticsController = {
  updateViewCount,
  getViewCount,
  updateEmailCount,
  getEmailCount,
};

module.exports = AnalyticsController;
