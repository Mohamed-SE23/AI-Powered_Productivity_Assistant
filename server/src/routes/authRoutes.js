import express from 'express';
import multer from 'multer';
import path from 'path';
import { signup, signin, deleteUserController } from '../controllers/authController.js';
import { updateUserController } from '../controllers/updateUserController.js';
import { resetOtpPasswordController, resetPasswordController } from '../controllers/resetPasswordController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  requestPasswordReset,
  verifyOtpAndResetPassword,
} from "../controllers/authController.js";

const router = express.Router();

const __dirname = path.resolve();

const upload = multer({
    dest: path.join(__dirname, 'uploads/'),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
  });

router.post('/signup', upload.single('profile_pic'),signup);
router.post('/signin', signin);
router.put('/update-user', protect, upload.single('profile_pic'), updateUserController);
router.put('/reset-password', protect, resetPasswordController);
router.post("/request-reset", requestPasswordReset); // Request OTP
router.post("/verify-otp", verifyOtpAndResetPassword); // Verify OTP & Reset Password
router.put('/reset-otp-password', protect, resetOtpPasswordController);

router.delete('/delete-account', protect, deleteUserController);

export default router;
