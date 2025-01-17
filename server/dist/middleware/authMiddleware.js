"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.authenticateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Access denied. No token provided.'
    });
  }
  try {
    const verified = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add user data to the request object
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Invalid or expired token.'
    });
  }
};

// ------------------------- protect middleware ---------------------------
exports.authenticateToken = authenticateToken;
const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, please login!"
      });
    }
    const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    const user = await _User.default.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found!"
      });
    }
    req.user = user;
    req.token = token; // Attach token to the request
    console.log("Authenticated user:", req.user); // Debugging log
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      message: "Not authorized, token failed!"
    });
  }
};
exports.protect = protect;