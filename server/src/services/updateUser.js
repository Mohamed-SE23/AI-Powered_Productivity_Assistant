import User from '../models/User.js';

export const updateUser = async (userId, { username, email, profile_pic }) => {
    try {
      // Validate user ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found.');
      }
  
      // Check for email uniqueness if the email is being updated
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
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
  