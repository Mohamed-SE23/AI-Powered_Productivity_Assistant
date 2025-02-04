import { sendOtp, verifyOtp } from "../services/otpService.js";
import User from "../models/User.js";
import { createUser, deleteUser, loginUser } from '../services/authService.js';
import jwt from "jsonwebtoken";

// Creating a new user
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const profilePic = req.file ? `/uploads/${req.file.filename.replace(/\\/g, '/')}` : null; // Create public URL

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // Create user
    const user = await createUser({ username, email, password, profile_pic: profilePic });

    // Respond with success
    return res.status(201).json({
      message: 'User created successfully.',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile_pic: user.profile_pic,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// User sign in controller
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Authenticate user and get the token
    const { token, user } = await loginUser({ email, password });

    // Respond with the token and user info
    return res.status(200).json({
      message: 'Login successful.',
      user: { token, id: user._id, username: user.username, email: user.email, profile_pic: user.profile_pic },
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

// ********************************* Reset password via otp ***************************************************
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    await sendOtp(email);
    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// verify otp
export const verifyOtpAndResetPassword = async (req, res) => {
  try {
    const { email, otpCode } = req.body;

    // Verify OTP
    await verifyOtp(email, otpCode);

    // Fetch user data
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    // Generate a token (JWT)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "15m", // Token valid for 15 minutes
    });

    return res.status(200).json({
      message: "OTP verified successfully.",
      user: {
        token,
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ********************************* Delete account ***************************************************
export const deleteUserController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware adds user info to req.user

    // Call the service to delete the user
    await deleteUser(userId);

    return res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
