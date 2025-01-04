import express from 'express';
import multer from 'multer';
import { signup, signin } from '../controllers/authController.js';

const router = express.Router();
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 20 * 1024 * 1024 }, // 2 MB limit
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

export default router;
