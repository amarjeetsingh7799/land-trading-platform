const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { verifyToken } = require('../middleware/auth');

// Get property messages (public for property, but requires auth to see full details)
router.get('/property/:propertyId', verifyToken, chatController.getPropertyMessages);

// Get global messages
router.get('/global', verifyToken, chatController.getGlobalMessages);

// Send property message
router.post('/send', verifyToken, chatController.sendPropertyMessage);

// Send global message
router.post('/send-global', verifyToken, chatController.sendGlobalMessage);

module.exports = router;

