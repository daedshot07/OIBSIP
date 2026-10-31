const fs = require('fs');
let content = fs.readFileSync('client/src/pages/user/Dashboard.jsx', 'utf8');
content = content.replace('<strong>,1{order.totalAmount}</strong>', '<strong>₹{order.totalAmount}</strong>');
fs.writeFileSync('client/src/pages/user/Dashboard.jsx', content);
