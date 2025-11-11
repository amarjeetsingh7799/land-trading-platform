const express = require('express');
const router = express.Router();
const { verifyToken, authorize } = require('../middleware/auth');
const { validateProperty, handleValidationErrors } = require('../middleware/validation');
const { uploadFields, handleUploads } = require('../middleware/upload');
const ctrl = require('../controllers/propertyController');

// Public routes
router.get('/', ctrl.getProperties);
router.get('/:id', ctrl.getPropertyById);

// Protected routes
router.get('/me/list', verifyToken, authorize('seller', 'admin'), ctrl.getMyProperties);

router.post(
  '/',
  verifyToken,
  authorize('seller', 'admin'),
  uploadFields,
  handleUploads,
  validateProperty,
  handleValidationErrors,
  ctrl.createProperty
);

router.put(
  '/:id',
  verifyToken,
  authorize('seller', 'admin'),
  uploadFields,
  handleUploads,
  ctrl.updateProperty
);

router.delete(
  '/:id',
  verifyToken,
  authorize('seller', 'admin'),
  ctrl.deleteProperty
);

module.exports = router;


