const jwt = require("jsonwebtoken");
require("dotenv").config();
const logWritter = require("../utils/logWritter");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      logWritter(` Unauthorized request on route ${req.path}`);

      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.user_id) {
      logWritter(` Unauthorized request on route ${req.path}`);

      return res.status(401).json({
        message: "Authorization denied, invalid token",
      });
    }

    req.user_id = decoded.user_id;

    logWritter(`Authorized as user ${req.user_id} for route ${req.path}`);

    return next();
  } catch (err) {
    logWritter(`Unauthorized request on route ${req.path}`);

    return res.status(401).send("Not authorized");
  }
};
