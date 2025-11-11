const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const ctrl = require('../controllers/favoritesController');

router.get('/', verifyToken, ctrl.getFavorites);
router.post('/:id', verifyToken, ctrl.addFavorite);
router.delete('/:id', verifyToken, ctrl.removeFavorite);

module.exports = router;


