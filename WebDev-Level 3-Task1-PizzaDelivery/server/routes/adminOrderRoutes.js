const express = require('express');
const { getAllOrders, updateOrderStatus } = require('../controllers/inventoryController');
const { adminProtect } = require('../middleware/adminMiddleware');
const router = express.Router();
router.get('/', adminProtect, getAllOrders);
router.put('/:id/status', adminProtect, updateOrderStatus);
module.exports = router;
