const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { 
  validateRegistration, 
  validateLogin, 
  handleValidationErrors 
} = require('../middleware/validation');

// Public routes
router.post(
  '/register', 
  validateRegistration, 
  handleValidationErrors, 
  authController.register
);

router.post(
  '/login', 
  validateLogin, 
  handleValidationErrors, 
  authController.login
);

// Protected route
router.get(
  '/profile', 
  verifyToken, 
  authController.getProfile
);

module.exports = router;
