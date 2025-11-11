const User = require('../models/User');
const Property = require('../models/Property');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.'
      });
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get users',
      error: error.message
    });
  }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.'
      });
    }

    const totalUsers = await User.countDocuments();
    const buyers = await User.countDocuments({ role: 'buyer' });
    const sellers = await User.countDocuments({ role: 'seller' });
    const totalProperties = await Property.countDocuments();

    res.json({
      success: true,
      stats: {
        totalUsers,
        buyers,
        sellers,
        totalProperties
      }
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics',
      error: error.message
    });
  }
};

