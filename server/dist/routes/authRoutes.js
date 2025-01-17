"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _authController = require("../controllers/authController.js");
var _updateUserController = require("../controllers/updateUserController.js");
var _resetPasswordController = require("../controllers/resetPasswordController.js");
var _authMiddleware = require("../middleware/authMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
const _dirname = _path.default.resolve();
const upload = (0, _multer.default)({
  dest: _path.default.join(_dirname, 'uploads/'),
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  // 20 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});
router.post('/signup', upload.single('profile_pic'), _authController.signup);
router.post('/signin', _authController.signin);
router.put('/update-user', _authMiddleware.protect, upload.single('profile_pic'), _updateUserController.updateUserController);
router.put('/reset-password', _authMiddleware.protect, _resetPasswordController.resetPasswordController);
router.delete('/delete-account', _authMiddleware.protect, _authController.deleteUserController);
var _default = exports.default = router;