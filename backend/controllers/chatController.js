const Chat = require('../models/Chat');

// Send property-specific message
exports.sendPropertyMessage = async (req, res) => {
  try {
    const { propertyId, receiverId, message } = req.body;
    const senderId = req.user.userId;

    const chat = new Chat({
      sender: senderId,
      receiver: receiverId,
      property: propertyId,
      message,
      type: 'property'
    });

    await chat.save();
    await chat.populate('sender', 'name email');
    await chat.populate('receiver', 'name email');
    await chat.populate('property', 'title');

    res.json({
      success: true,
      message: chat
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};

// Send global message
exports.sendGlobalMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.user.userId;

    const chat = new Chat({
      sender: senderId,
      message,
      type: 'global'
    });

    await chat.save();
    await chat.populate('sender', 'name email role');

    res.json({
      success: true,
      message: chat
    });
  } catch (error) {
    console.error('Error sending global message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};

// Get property messages
exports.getPropertyMessages = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const messages = await Chat.find({
      property: propertyId,
      type: 'property'
    })
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ createdAt: 1 })
      .limit(100);

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get messages',
      error: error.message
    });
  }
};

// Get global messages
exports.getGlobalMessages = async (req, res) => {
  try {
    const messages = await Chat.find({
      type: 'global'
    })
      .populate('sender', 'name email role')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      messages: messages.reverse() // Show oldest first
    });
  } catch (error) {
    console.error('Error getting global messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get messages',
      error: error.message
    });
  }
};

