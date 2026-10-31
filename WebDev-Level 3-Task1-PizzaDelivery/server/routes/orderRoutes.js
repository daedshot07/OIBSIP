const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getOrderTracker, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/tracking/:id', protect, getOrderTracker);
router.get('/', protect, getUserOrders);

module.exports = router;
