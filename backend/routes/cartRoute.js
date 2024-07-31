const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, updateQuantity,deletefromCart } = require('../controllers/cartController');

router.post('/add-to-cart', addToCart);
router.route('/cart/:userId').get(getCartItems);
router.put('/cart/:userId/:productId', updateQuantity);
router.delete('/cart/:userId/:productId', deletefromCart);

module.exports = router;