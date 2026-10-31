const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

async function adminProtect(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Admin authentication required' });
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    if (payload.role !== 'admin' || !payload.adminId) return res.status(403).json({ success: false, message: 'Admin access required' });
    const admin = await Admin.findById(payload.adminId).select('-password');
    if (!admin || admin.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' });
    req.admin = admin; next();
  } catch { return res.status(401).json({ success: false, message: 'Invalid or expired admin token' }); }
}
module.exports = { adminProtect };
