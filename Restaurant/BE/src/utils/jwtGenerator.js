const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, username, email) {
  const payload = {
    user_id,
    username,
    email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
