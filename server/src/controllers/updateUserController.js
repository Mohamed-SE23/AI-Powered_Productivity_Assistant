import fs from 'fs';
import path from 'path';
import { updateUser } from "../services/updateUser.js";

export const updateUserController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware adds user info to req.user
    const { username, email } = req.body;
    const newProfilePic = req.file ? `/uploads/${req.file.filename.replace(/^\\/g, '/')}` : null;

    // Get the current user to access the existing profile picture
    const currentUser = await updateUser(userId, {}); // Fetch the current user without updating

    // Delete the old profile picture if a new one is uploaded
    if (newProfilePic && currentUser.profile_pic) {
      const oldImagePath = path.join(path.resolve(), currentUser.profile_pic.replace(/^\//, ''));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image file
      }
    }

    // Update user data
    const updatedUser = await updateUser(userId, { username, email, profile_pic: newProfilePic });

    return res.status(200).json({
      message: 'User updated successfully.',
      user: {
        id: userId,
        username: updatedUser.username,
        email: updatedUser.email,
        profile_pic: updatedUser.profile_pic,
        token: req.token,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
