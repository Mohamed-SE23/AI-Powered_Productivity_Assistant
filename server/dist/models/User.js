"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Function to generate a random avatar
const generateAvatar = () => {
  const randomSeed = Math.random().toString(36).substring(2, 10); // Generate a random seed
  return `https://avatars.dicebear.com/api/identicon/${randomSeed}.svg`; // DiceBear URL
};
const userSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String,
    default: generateAvatar // Call the function to set the default value
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var _default = exports.default = _mongoose.default.model('User', userSchema);