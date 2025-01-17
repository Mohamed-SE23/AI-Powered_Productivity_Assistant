"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserController = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _updateUser = require("../services/updateUser.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const updateUserController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware adds user info to req.user
    const {
      username,
      email
    } = req.body;
    const newProfilePic = req.file ? `/uploads/${req.file.filename.replace(/\\/g, '/')}` : null;

    // Get the current user to access the existing profile picture
    const currentUser = await (0, _updateUser.updateUser)(userId, {}); // Fetch the current user without updating

    // Delete the old profile picture if a new one is uploaded
    if (newProfilePic && currentUser.profile_pic) {
      const oldImagePath = _path.default.join(_path.default.resolve(), currentUser.profile_pic);
      if (_fs.default.existsSync(oldImagePath)) {
        _fs.default.unlinkSync(oldImagePath); // Delete the old image file
      }
    }

    // Update user data
    const updatedUser = await (0, _updateUser.updateUser)(userId, {
      username,
      email,
      profile_pic: newProfilePic
    });
    return res.status(200).json({
      message: 'User updated successfully.',
      user: {
        id: userId,
        username: updatedUser.username,
        email: updatedUser.email,
        profile_pic: updatedUser.profile_pic,
        token: req.token
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
exports.updateUserController = updateUserController;