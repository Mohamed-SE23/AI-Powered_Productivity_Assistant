import { createUser } from '../services/authService.js';

export const signup = async (req, res) => {
  try {
    const { username, email, password, profile_pic } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // Create user
    const user = await createUser({ username, email, password, profile_pic });

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
