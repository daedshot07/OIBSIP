require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

(async () => { try { if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required for secure admin seeding.'); await connectDB(); const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL }); if (existing) { console.log('Admin already exists.'); } else { await Admin.create({ name: process.env.ADMIN_NAME || 'Pizza Delivery Admin', email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, role: 'admin' }); console.log('Admin created from environment configuration.'); } await mongoose.disconnect(); } catch (error) { console.error(error.message); process.exitCode = 1; } })();
