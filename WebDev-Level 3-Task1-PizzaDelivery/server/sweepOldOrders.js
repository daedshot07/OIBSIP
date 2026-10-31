const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config({ path: './.env' });

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB for sweeping old orders...");
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
    
    console.log(`Successfully updated ${result.modifiedCount} old orders to DELIVERED.`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
