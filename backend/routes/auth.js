const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Please provide username, email, and password'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({
                    message: 'Email already registered'
                });
            }
            if (existingUser.username === username) {
                return res.status(400).json({
                    message: 'Username already taken'
                });
            }
        }

        // Create new user
        const user = new User({
            username,
            email,
            password
        });

        await user.save();

        // Return user data (without password)
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Registration error:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: Object.values(error.errors).map(e => e.message).join(', ')
            });
        }

        res.status(500).json({
            message: 'Server error during registration'
        });
    }
});

// Login route (for future use)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password'
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Server error during login'
        });
    }
});

module.exports = router;
