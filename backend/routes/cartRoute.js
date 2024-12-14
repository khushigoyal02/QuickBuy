const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, updateQuantity,deletefromCart } = require('../controllers/cartController');

router.post('/add-to-cart', addToCart);
router.get('/cart/:userId', getCartItems);
router.route('/cart/:userId/:productId').put(updateQuantity).delete(deletefromCart);

module.exports = router;