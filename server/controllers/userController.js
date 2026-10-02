const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load profile' });
  }
};

// @desc    Update user profile (name only)
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Name cannot be empty' });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({ success: false, message: 'Name cannot exceed 100 characters' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to update profile' });
  }
};

module.exports = { getProfile, updateProfile };
