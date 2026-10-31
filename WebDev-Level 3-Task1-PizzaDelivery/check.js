const mongoose = require('mongoose');
const Order = require('./server/models/Order');
require('dotenv').config({ path: './server/.env' });

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const latestOrder = await Order.findOne().sort({ createdAt: -1 });
  console.log(JSON.stringify(latestOrder, null, 2));
  process.exit(0);
});
