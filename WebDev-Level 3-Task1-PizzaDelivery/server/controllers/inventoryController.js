const Inventory = require('../models/Inventory');
const Order = require('../models/Order');

const present = (item) => ({
  id: item._id,
  name: item.name,
  category: item.category,
  stock: item.quantity,
  threshold: item.lowStockThreshold,
  updatedAt: item.updatedAt
});

const getInventory = async (req, res, next) => {
  try {
    const items = await Inventory.find({}).sort({ category: 1, name: 1 });
    res.json({ success: true, inventory: items.map(present) });
  } catch (error) {
    next(error);
  }
};

const updateInventory = async (req, res, next) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Inventory item not found' });

    if (req.body.stock !== undefined) item.quantity = Number(req.body.stock);
    if (req.body.threshold !== undefined) item.lowStockThreshold = Number(req.body.threshold);
    if (req.body.quantity !== undefined) item.quantity = Number(req.body.quantity);
    if (req.body.lowStockThreshold !== undefined) item.lowStockThreshold = Number(req.body.lowStockThreshold);

    if (!Number.isFinite(item.quantity) || item.quantity < 0 || !Number.isFinite(item.lowStockThreshold) || item.lowStockThreshold < 0) {
      return res.status(400).json({ success: false, message: 'Stock values must be non-negative numbers' });
    }

    await item.save();
    res.json({ success: true, item: present(item) });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ paymentStatus: { $in: ["SUCCESS", "PAID"] } })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const allowed = ['ORDER_RECEIVED', 'IN_KITCHEN', 'SENT_TO_DELIVERY', 'DELIVERED'];
    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ success: false, message: 'Invalid order status' });
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

module.exports = { getInventory, updateInventory, getAllOrders, updateOrderStatus };
