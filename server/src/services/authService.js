import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import redisClient from '../config/redis.js';

export const createUser = async ({ username, email, password, profile_pic }) => {
  try {
    // Check if user already exists in the cache
    const cachedUser = await redisClient.get(email);
    if (cachedUser) {
      throw new Error('User already exists.');
    }

    // Check if user exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists.');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      profile_pic: profile_pic || undefined, // Use default if not provided
    });

    const savedUser = await user.save();

    // Cache the user data
    await redisClient.set(email, JSON.stringify(savedUser), { EX: 3600 }); // Cache for 1 hour

    return savedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// user login 
export const loginUser = async ({ email, password }) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found.');
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials.');
    }

    // Generate a JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token valid for 1 hour
    );

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is missing in environment variables');
    }

    return { token, user };
  } catch (error) {
    throw new Error(error.message);
  }
};
