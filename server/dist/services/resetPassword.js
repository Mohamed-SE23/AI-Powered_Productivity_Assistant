"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const resetPassword = async (userId, {
  currentPassword,
  newPassword
}) => {
  try {
    // Validate user ID
    const user = await _User.default.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    // Validate current password
    const isMatch = await _bcryptjs.default.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect.');
    }

    // Hash the new password
    const salt = await _bcryptjs.default.genSalt(10);
    const hashedPassword = await _bcryptjs.default.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();
    return {
      message: 'Password updated successfully.'
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.resetPassword = resetPassword;