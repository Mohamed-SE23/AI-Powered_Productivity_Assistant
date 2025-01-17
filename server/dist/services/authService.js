"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.deleteUser = exports.createUser = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User.js"));
var _redis = _interopRequireDefault(require("../config/redis.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createUser = async ({
  username,
  email,
  password,
  profile_pic
}) => {
  try {
    // Check if user already exists in the cache
    const cachedUser = await _redis.default.get(email);
    if (cachedUser) {
      throw new Error('User already exists.');
    }

    // Check if user exists in the database
    const existingUser = await _User.default.findOne({
      email
    });
    if (existingUser) {
      throw new Error('User already exists.');
    }

    // Hash the password
    const salt = await _bcryptjs.default.genSalt(10);
    const hashedPassword = await _bcryptjs.default.hash(password, salt);

    // Create the user
    const user = new _User.default({
      username,
      email,
      password: hashedPassword,
      profile_pic: profile_pic || undefined // Use default if not provided
    });
    const savedUser = await user.save();

    // Cache the user data
    await _redis.default.set(email, JSON.stringify(savedUser), {
      EX: 3600
    }); // Cache for 1 hour

    return savedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// user login 
exports.createUser = createUser;
const loginUser = async ({
  email,
  password
}) => {
  try {
    // Find the user by email
    const user = await _User.default.findOne({
      email
    });
    if (!user) {
      throw new Error('User not found.');
    }

    // Compare the provided password with the hashed password
    const isMatch = await _bcryptjs.default.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials.');
    }

    // Generate a JWT
    const token = _jsonwebtoken.default.sign({
      id: user._id,
      username: user.username,
      email: user.email
    }, process.env.JWT_SECRET);
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is missing in environment variables');
    }
    return {
      token,
      user
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ************** delete account *************************
exports.loginUser = loginUser;
const deleteUser = async userId => {
  const user = await _User.default.findByIdAndDelete(userId);
  if (!user) {
    throw new Error('User not found.');
  }
  await _redis.default.del(user.email);
  return user;
};
exports.deleteUser = deleteUser;