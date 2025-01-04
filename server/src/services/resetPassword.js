import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const resetPassword = async (userId, { currentPassword, newPassword }) => {
    try {
      // Validate user ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found.');
      }
  
      // Validate current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        throw new Error('Current password is incorrect.');
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update password
      user.password = hashedPassword;
      await user.save();
  
      return { message: 'Password updated successfully.' };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  