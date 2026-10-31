require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Pizza Delivery API is running' }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/inventory', require('./routes/inventoryRoutes'));
app.use('/api/admin/orders', require('./routes/adminOrderRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  const server = app.listen(PORT, () => console.log(`Pizza Delivery API listening on ${PORT}`));
  connectDB().then(() => {
    console.log('MongoDB connected');
    const autoSweepOldOrders = require('./utils/sweepOldOrders');
    autoSweepOldOrders(); // Run once on startup
    setInterval(autoSweepOldOrders, 5 * 60 * 1000); // Run every 5 minutes
  }).catch((error) => console.error(`MongoDB connection failed: ${error.message}`));
  process.on('SIGTERM', () => server.close(() => process.exit(0)));
}
module.exports = app;
