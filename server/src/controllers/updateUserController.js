import { updateUser } from "../services/updateUser.js";

export const updateUserController = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming authentication middleware adds user info to req.user
      const { username, email } = req.body;
      const profile_pic = req.file?.path; // Handle uploaded profile picture
  
      const updatedUser = await updateUser(userId, { username, email, profile_pic });

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
  