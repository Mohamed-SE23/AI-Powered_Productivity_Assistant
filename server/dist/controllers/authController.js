"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.signin = exports.deleteUserController = void 0;
var _authService = require("../services/authService.js");
// Creating a new user
const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;
    const profilePic = req.file ? `/uploads/${req.file.filename.replace(/\\/g, '/')}` : null; // Create public URL

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters.'
      });
    }

    // Create user
    const user = await (0, _authService.createUser)({
      username,
      email,
      password,
      profile_pic: profilePic
    });

    // Respond with success
    return res.status(201).json({
      message: 'User created successfully.',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile_pic: user.profile_pic
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// User sign in controller
exports.signup = signup;
const signin = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }

    // Authenticate user and get the token
    const {
      token,
      user
    } = await (0, _authService.loginUser)({
      email,
      password
    });

    // Respond with the token and user info
    return res.status(200).json({
      message: 'Login successful.',
      user: {
        token,
        id: user._id,
        username: user.username,
        email: user.email,
        profile_pic: user.profile_pic
      }
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

// ********************************* Delete account ***************************************************
exports.signin = signin;
const deleteUserController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware adds user info to req.user

    // Call the service to delete the user
    await (0, _authService.deleteUser)(userId);
    return res.status(200).json({
      message: 'Account deleted successfully.'
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
exports.deleteUserController = deleteUserController;