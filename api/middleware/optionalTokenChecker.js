const JWT = require("jsonwebtoken");

function optionalTokenChecker(req, res, next) {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.user_id = null;
    return next(); // no token, continue
  }

  const token = authHeader.slice(7);

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user_id = payload.sub || null;
  } catch (err) {
    console.log("Invalid token, continuing anonymously:", err.message);
    req.user_id = null; // invalid token, treat as anonymous
  }

  next();
}

module.exports = optionalTokenChecker;
