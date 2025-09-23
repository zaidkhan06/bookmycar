// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization")?.split(" ")[1]; // Expect: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");
    req.user = {id: decoded.id}; // { id: userId }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
