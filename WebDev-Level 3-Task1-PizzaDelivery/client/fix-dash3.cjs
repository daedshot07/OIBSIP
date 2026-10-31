const fs = require('fs');
const file = 'src/pages/user/Dashboard.jsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/<strong>.*?\{order\.totalAmount\}<\/strong>/g, '<strong>₹{order.totalAmount}</strong>');

fs.writeFileSync(file, code);
console.log('Fixed using robust regex');
