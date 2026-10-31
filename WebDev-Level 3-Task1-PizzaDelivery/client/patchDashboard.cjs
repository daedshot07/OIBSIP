const fs = require('fs');
let code = fs.readFileSync('src/pages/user/Dashboard.jsx', 'utf8');

const target = `{order.items && order.items.length > 0 ? \`\${order.items[0].base?.name} • \${order.items[0].sauce?.name} • \${order.items[0].cheese?.name}\` : 'Custom Pizza'}`;

const replace = `{order.items && order.items.length > 0 ? (order.items.length === 1 ? \`\${order.items[0].base?.name} • \${order.items[0].sauce?.name}\` : \`\${order.items.reduce((a,b)=>a+(b.quantity||1),0)} Pizzas\`) : 'Custom Pizza'}`;

code = code.replace(target, replace);
fs.writeFileSync('src/pages/user/Dashboard.jsx', code);
