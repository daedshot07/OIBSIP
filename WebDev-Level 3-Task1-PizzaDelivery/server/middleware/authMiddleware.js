const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Authentication required' });
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    if (payload.role !== 'user' || !payload.userId) return res.status(401).json({ success: false, message: 'Invalid user token' });
    const user = await User.findById(payload.userId).select('-password');
    if (!user) return res.status(401).json({ success: false, message: 'User no longer exists' });
    req.user = user; next();
  } catch { return res.status(401).json({ success: false, message: 'Invalid or expired token' }); }
}
module.exports = { protect };
