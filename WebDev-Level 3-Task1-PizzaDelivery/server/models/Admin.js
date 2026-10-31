const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, password: { type: String, required: true, select: false }, role: { type: String, enum: ['admin'], default: 'admin', immutable: true } }, { timestamps: true });
adminSchema.pre('save', async function save() { if (!this.isModified('password')) return; this.password = await bcrypt.hash(this.password, 12); });
adminSchema.methods.matchPassword = function matchPassword(enteredPassword) { return bcrypt.compare(enteredPassword, this.password); };
module.exports = mongoose.model('Admin', adminSchema);
