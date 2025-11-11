const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, authorize } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.get('/users', verifyToken, authorize('admin'), adminController.getAllUsers);
router.get('/stats', verifyToken, authorize('admin'), adminController.getUserStats);

module.exports = router;

