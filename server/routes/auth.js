const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'hayati-secret-key-change-in-production';

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, whatsappNumber, birthYear, gender, hobbies, preferredTheme } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Validate WhatsApp number if provided
    if (whatsappNumber && !/^\+?[1-9]\d{1,14}$/.test(whatsappNumber)) {
      return res.status(400).json({ message: 'Please enter a valid WhatsApp number' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique userId
    const userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

    // Create new user with additional fields
    const newUser = new User({
      userId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      whatsappNumber: whatsappNumber || null,
      birthYear: birthYear || null,
      gender: gender || null,
      hobbies: hobbies || [],
      preferredTheme: preferredTheme || 'modern',
      uiMode: 'normal',
      storyCompleted: false,
      eisenhowerCompleted: false
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.userId, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      userId: newUser.userId,
      name: newUser.name,
      email: newUser.email,
      preferredTheme: newUser.preferredTheme
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('--- [AUTH] /login called ---', { time: new Date().toISOString() });
    console.log('Request body keys:', Object.keys(req.body));
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Update last login
    user.lastUpdated = new Date();
    await user.save();

    console.log('--- [AUTH] /login successful for userId=', user.userId);
    res.json({
      message: 'Login successful',
      token,
      userId: user.userId,
      name: user.name,
      email: user.email,
      storyCompleted: user.storyCompleted,
      eisenhowerCompleted: user.eisenhowerCompleted,
      preferredTheme: user.preferredTheme || 'modern'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Verify Token (middleware)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Get current user (protected route)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId }).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Logout (client-side token removal, but we can track it)
router.post('/logout', verifyToken, async (req, res) => {
  // In a more complex setup, you might want to blacklist the token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
module.exports.verifyToken = verifyToken;
