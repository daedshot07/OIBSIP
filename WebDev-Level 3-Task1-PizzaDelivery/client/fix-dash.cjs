const fs = require('fs');
const file = 'src/pages/user/Dashboard.jsx';
let code = fs.readFileSync(file, 'utf8');

// Using regex to replace the specific line
code = code.replace(/<strong>.*?\{order.totalAmount\}<\/strong>/, '<strong>₹{order.totalAmount}</strong>');

fs.writeFileSync(file, code);
console.log('Fixed totalAmount in Dashboard.jsx');
