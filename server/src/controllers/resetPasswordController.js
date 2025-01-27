import { resetPassword, resetOtpPassword } from "../services/resetPassword.js";

export const resetPasswordController = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming authentication middleware adds user info to req.user
      const { currentPassword, newPassword } = req.body;
  
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Current and new password are required.' });
      }
  
      const response = await resetPassword(userId, { currentPassword, newPassword });
  
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
  // *************** otp password reset ******************
  export const resetOtpPasswordController = async (req, res) => {
    try {
      const { newPassword } = req.body;
  
      // Extract user ID from the JWT token (middleware should verify the token beforehand)
      const userId = req.user.id;
  
      if (!newPassword) {
        return res.status(400).json({ message: "New password is required." });
      }
  
      // Reset password using the service
      const response = await resetOtpPassword(userId, newPassword);
  
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };