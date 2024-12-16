import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_pic: {
    type: String,
    default: 'https://example.com/default-profile-pic.jpg', // Default profile picture URL
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
