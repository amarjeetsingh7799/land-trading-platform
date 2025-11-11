const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null for global chat
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }, // null for global chat
  message: { type: String, required: true },
  type: { type: String, enum: ['property', 'global'], default: 'property' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);

