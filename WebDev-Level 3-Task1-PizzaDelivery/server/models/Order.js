const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: String,
  customerEmail: String,
  items: [{
    base: Object,
    sauce: Object,
    cheese: Object,
    veggies: Array,
    price: Number,
    quantity: Number
  }],
  pricing: {
    subtotal: Number,
    deliveryFee: Number,
    total: Number
  },
  totalAmount: { type: Number, required: true }, // Keep for backward compatibility
  paymentStatus: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED', 'PAID'], default: 'PENDING' },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  orderStatus: { type: String, enum: ['ORDER_RECEIVED', 'IN_KITCHEN', 'SENT_TO_DELIVERY', 'DELIVERED'], default: 'ORDER_RECEIVED' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
