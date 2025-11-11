const User = require('../models/User');
const Property = require('../models/Property');

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('favorites');
    res.json({ success: true, items: user.favorites || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch favorites', error: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });

    const user = await User.findById(req.user.userId);
    if (!user.favorites) user.favorites = [];
    if (!user.favorites.find((p) => p.toString() === propertyId)) {
      user.favorites.push(propertyId);
      await user.save();
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add favorite', error: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const user = await User.findById(req.user.userId);
    user.favorites = (user.favorites || []).filter((p) => p.toString() !== propertyId);
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove favorite', error: error.message });
  }
};


