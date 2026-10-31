const fs = require('fs');

const invFile = 'server/controllers/inventoryController.js';
let inv = fs.readFileSync(invFile, 'utf8');
inv = inv.replace('Order.find({})', 'Order.find({ paymentStatus: { $in: [\\"SUCCESS\\", \\"PAID\\"] } })');
fs.writeFileSync(invFile, inv);

const ordFile = 'server/controllers/orderController.js';
let ord = fs.readFileSync(ordFile, 'utf8');
ord = ord.replace('Order.find({ user: req.user._id })', 'Order.find({ user: req.user._id, paymentStatus: { $in: [\\"SUCCESS\\", \\"PAID\\"] } })');
fs.writeFileSync(ordFile, ord);
