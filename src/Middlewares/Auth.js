const jwt = require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({
      message: "Unauthorized: JWT Token is required",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      message: "Unauthorized: Token is missing",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized: JWT Token is invalid or expired",
    });
  }
};

module.exports = { ensureAuthenticated };
