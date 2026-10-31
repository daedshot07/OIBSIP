const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: ['user'], default: 'user', immutable: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetToken: String,
  resetTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

userSchema.pre('save', async function save() { if (!this.isModified('password')) return; this.password = await bcrypt.hash(this.password, 12); });
userSchema.methods.matchPassword = function matchPassword(enteredPassword) { return bcrypt.compare(enteredPassword, this.password); };
module.exports = mongoose.model('User', userSchema);
