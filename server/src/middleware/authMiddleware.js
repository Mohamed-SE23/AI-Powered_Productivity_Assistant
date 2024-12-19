import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add user data to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// ------------------------- protect middleware ---------------------------
export const protect = async (req, res, next) => {
  try {
    // check if user is logged in
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      // 401 Unauthorized
      res.status(401).json({ message: "Not authorized, please login!" });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user details from the token ----> exclude password
    const user = await User.findById(decoded.id).select("-password");

    // check if user exists
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    // set user details in the request object
    req.user = user;

    next();
  } catch (error) {
    // 401 Unauthorized
    res.status(401).json({ message: "Not authorized, token failed!" });
  }
};
