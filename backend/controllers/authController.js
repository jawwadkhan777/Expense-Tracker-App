const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' }
    );
};

// Controller functions (to be implemented)
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body || {};
    // Implementation for registering a user goes here
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // Create new user
        const user = await User.create({ fullName, email, password, profileImageUrl });
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Controller function to login user
exports.loginUser = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "Please provide email and password"});
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // password verification 
        const passwordMatch = await user.matchPassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if(!user || !passwordMatch) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};

// Controller function to get user information
exports.getUserInfo = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Controller function to handle image upload
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
};

// module.exports = {
//     generateToken
// };