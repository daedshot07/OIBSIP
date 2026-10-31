const fs = require('fs');
const file = 'src/pages/user/OrderSummary.jsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  '<h4 className="font-bold text-xl text-[var(--theme-text)]">Custom Pizza {index + 1}</h4>',
  '<h4 className="font-bold text-xl text-[var(--theme-text)]">{item.name || `Custom Pizza ${index + 1}`}</h4>'
);

code = code.replace(
  /<div className="font-bold text-\[var\(--theme-accent\)\]">.*?\{item\.price \* item\.quantity\}<\/div>/g,
  '<div className="font-bold text-[var(--theme-accent)]">₹{item.price * item.quantity}</div>'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Fixed OrderSummary.jsx to show preset names and fixed currency');
