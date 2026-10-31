const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { calculateOrderTotal } = require('../utils/pricing');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_placeholder',
});

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    
    // Calculate final payable amount securely on the backend
    const { subtotal, deliveryFee, total: calculatedTotal } = calculateOrderTotal(items);

    const orderOptions = {
      amount: Math.round(calculatedTotal * 100), // Razorpay uses paise
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    const rzpOrder = await razorpay.orders.create(orderOptions);

    const order = await Order.create({
      user: req.user._id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      items,
      pricing: { subtotal, deliveryFee, total: calculatedTotal },
      totalAmount: calculatedTotal,
      razorpayOrderId: rzpOrder.id
    });

    res.json({
      id: rzpOrder.id,
      currency: rzpOrder.currency,
      amount: rzpOrder.amount,
      receipt: order._id,
      pricing: { subtotal, deliveryFee, total: calculatedTotal }
    });
  } catch (error) {
    console.error('Razorpay Error:', error);
    const msg = error.error ? error.error.description : error.message;
    res.status(500).json({ message: msg || 'Failed to create Razorpay order' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_placeholder')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'PAID';
        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        await order.save();

        // DECREMENT INVENTORY
        for (const item of order.items) {
            const qty = item.quantity || 1;
            if (item.base?.name) await Inventory.findOneAndUpdate({ name: item.base.name }, { $inc: { quantity: -qty } });
            if (item.sauce?.name) await Inventory.findOneAndUpdate({ name: item.sauce.name }, { $inc: { quantity: -qty } });
            if (item.cheese?.name) await Inventory.findOneAndUpdate({ name: item.cheese.name }, { $inc: { quantity: -qty } });
            if (Array.isArray(item.veggies)) {
                for (const v of item.veggies) {
                    if (v?.name) await Inventory.findOneAndUpdate({ name: v.name }, { $inc: { quantity: -qty } });
                }
            }
        }

        res.json({ message: 'Payment verified successfully' });

        // Simulate real-time kitchen and delivery workflow (2 minutes per stage)
        const simulateKitchen = async () => {
            try {
                // 1. IN KITCHEN (after 2 minutes)
                await new Promise(resolve => setTimeout(resolve, 120000));
                await Order.findByIdAndUpdate(orderId, { orderStatus: 'IN_KITCHEN' });
                
                // 2. SENT TO DELIVERY (after 2 more minutes)
                await new Promise(resolve => setTimeout(resolve, 120000));
                await Order.findByIdAndUpdate(orderId, { orderStatus: 'SENT_TO_DELIVERY' });

                // 3. DELIVERED (after 2 more minutes)
                await new Promise(resolve => setTimeout(resolve, 120000));
                await Order.findByIdAndUpdate(orderId, { orderStatus: 'DELIVERED' });
            } catch (err) {
                console.error("Simulation error:", err);
            }
        };
        
        // Start simulation in background without blocking response
        simulateKitchen();
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderTracker = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order && order.user.toString() === req.user._id.toString()) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id, paymentStatus: { $in: ["SUCCESS", "PAID"] } }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, verifyPayment, getOrderTracker, getUserOrders };
