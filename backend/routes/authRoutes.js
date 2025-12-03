const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');

const { registerUser, loginUser, getUserInfo, uploadImage } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

// Route to register a new user
router.post('/register', registerUser); 

// Route to login a user
router.post('/login', loginUser);

// Route to get user information (protected route)
router.get('/getUser', protect, getUserInfo);

// Route to upload profile image
router.post('/upload-image', upload.single('image'), uploadImage);

module.exports = router;