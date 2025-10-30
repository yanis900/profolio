const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

/**
 * This function is used to generate a JWT authentication
 * token for a specific user.
 * Learn about JWTs: https://jwt.io/introduction
 * JWTs in 100 Seconds: https://www.youtube.com/watch?v=UBUNrFtufWo
 */
function generateToken(user_id, admin = false) {
  // Set to 365 days (essentially unlimited for development)
  const durationSecs = 365 * 24 * 60 * 60; // 1 year
  const issuedAtTime = Math.floor(Date.now() / 1000);
  const expiryTime = issuedAtTime + durationSecs;

  // Learn about different claims here:
  // https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
  const claims = {
    sub: user_id,
    iat: issuedAtTime,
    exp: expiryTime,
  };

  return JWT.sign(claims, secret);
}

function decodeToken(token) {
  return JWT.decode(token, secret);
}

module.exports = { generateToken, decodeToken };
