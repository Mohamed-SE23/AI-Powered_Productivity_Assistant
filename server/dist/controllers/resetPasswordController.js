"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPasswordController = void 0;
var _resetPassword = require("../services/resetPassword.js");
const resetPasswordController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware adds user info to req.user
    const {
      currentPassword,
      newPassword
    } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Current and new password are required.'
      });
    }
    const response = await (0, _resetPassword.resetPassword)(userId, {
      currentPassword,
      newPassword
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
exports.resetPasswordController = resetPasswordController;