const express = require('express');
const { getInventory, updateInventory } = require('../controllers/inventoryController');
const { adminProtect } = require('../middleware/adminMiddleware');
const router = express.Router();
router.get('/', adminProtect, getInventory);
router.put('/:id', adminProtect, updateInventory);
module.exports = router;
