const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Pizza Bases', 'Sauces', 'Cheeses', 'Vegetables'], required: true },
  quantity: { type: Number, required: true, default: 0, min: 0 },
  lowStockThreshold: { type: Number, required: true, default: 10 },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
