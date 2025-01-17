"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = void 0;
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const updateUser = async (userId, {
  username,
  email,
  profile_pic
}) => {
  try {
    // Validate user ID
    const user = await _User.default.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    // Check for email uniqueness if the email is being updated
    if (email && email !== user.email) {
      const emailExists = await _User.default.findOne({
        email
      });
      if (emailExists) {
        throw new Error('Email already in use.');
      }
    }

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.profile_pic = profile_pic || user.profile_pic;

    // Save updated user to the database
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.updateUser = updateUser;