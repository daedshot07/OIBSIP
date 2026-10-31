const fs = require('fs');
const file = 'src/pages/user/Dashboard.jsx';
let code = fs.readFileSync(file, 'utf8');

// Using split/join to replace all occurrences of the corrupted currency
code = code.split(',1').join('₹');

fs.writeFileSync(file, code);
console.log('Fixed totalAmount in Dashboard.jsx again');
