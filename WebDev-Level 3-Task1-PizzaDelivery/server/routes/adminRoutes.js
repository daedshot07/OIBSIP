const express = require('express');
const { adminLogin, adminMe, adminRegister, listAdmins } = require('../controllers/adminController');
const { adminProtect } = require('../middleware/adminMiddleware');
const router = express.Router();
router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.get('/me', adminProtect, adminMe);
router.get('/list', adminProtect, listAdmins);
module.exports = router;
