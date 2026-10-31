const fs = require('fs');
let c = fs.readFileSync('src/pages/user/OrderSummary.jsx', 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$/g, '$');
fs.writeFileSync('src/pages/user/OrderSummary.jsx', c);
