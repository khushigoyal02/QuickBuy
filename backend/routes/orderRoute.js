const express = require('express');
const { createOrder, getUserOrders, getAllOrders} = require('../controllers/orderController'); 
const router = express.Router();

router.post('/place-order', createOrder);
router.get('/user-orders/:userId', getUserOrders);
router.get('/all-orders', getAllOrders);

module.exports = router;