const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt
});

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide name, email and password' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide a valid email address' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'An account with this email already exists' });
    }

    const user = await User.create({ name: name.trim(), email, password });
    const token = generateToken(user._id);

    res.status(201).json({ success: true, token, user: formatUser(user) });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: 'An account with this email already exists' });
    }
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({ success: true, token, user: formatUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.json({ success: true, user: formatUser(req.user) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { register, login, getMe };
