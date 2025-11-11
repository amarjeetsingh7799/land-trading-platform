const { body, validationResult } = require('express-validator');

// Registration validation
exports.validateRegistration = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2-50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
  
  body('phone')
    .optional()
    .isMobilePhone('any').withMessage('Invalid phone number'),
  
  body('role')
    .optional()
    .isIn(['buyer', 'seller']).withMessage('Role must be buyer or seller')
];

// Login validation
exports.validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Property validation
exports.validateProperty = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 10, max: 100 }).withMessage('Title must be between 10-100 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 50 }).withMessage('Description must be at least 50 characters'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ min: 1 }).withMessage('Price must be greater than 0'),
  
  body('area')
    .notEmpty().withMessage('Area is required')
    .isNumeric().withMessage('Area must be a number')
    .isFloat({ min: 1 }).withMessage('Area must be greater than 0'),
  
  body('location.city')
    .trim()
    .notEmpty().withMessage('City is required'),
  
  body('location.state')
    .trim()
    .notEmpty().withMessage('State is required')
];

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};
