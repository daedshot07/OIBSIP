const Order = require('../models/Order');

const autoSweepOldOrders = async () => {
    try {
        const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
        
        // Find all paid orders older than 10 minutes that aren't DELIVERED
        const result = await Order.updateMany(
            {
                paymentStatus: { $in: ['PAID', 'SUCCESS'] },
                createdAt: { $lt: tenMinsAgo },
                orderStatus: { $ne: 'DELIVERED' }
            },
            {
                $set: { orderStatus: 'DELIVERED' }
            }
        );
        
        if (result.modifiedCount > 0) {
            console.log(`[Sweep] Auto-advanced ${result.modifiedCount} abandoned orders to DELIVERED.`);
        }
    } catch (err) {
        console.error("[Sweep] Failed to auto-sweep orders:", err);
    }
};

module.exports = autoSweepOldOrders;
