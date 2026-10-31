const fs = require('fs');
let code = fs.readFileSync('src/pages/user/OrderSuccess.jsx', 'utf8');

const targetLabel = `<span className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] font-medium block mb-2 uppercase text-xs tracking-wider">Your Pizza</span>`;
const replaceLabel = `<span className="text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] font-medium block mb-2 uppercase text-xs tracking-wider">{order.items?.reduce((a,b)=>a+(b.quantity||1),0)} PIZZAS ORDERED</span>`;

code = code.replace(targetLabel, replaceLabel);

const pizzaDetailsTarget = `<div className="font-bold text-[var(--theme-highlight)]">Pizza {idx + 1} (x{item.quantity || 1})</div>
                  <div>Base: {item.base?.name}</div>`;
const pizzaDetailsReplace = `<div className="font-bold text-[var(--theme-highlight)] flex justify-between">
                    <span>Pizza {idx + 1} &mdash; {item.base?.name}</span>
                    <span className="text-[var(--theme-text)]">Total: ₹{item.price * (item.quantity || 1)}</span>
                  </div>
                  <div className="text-xs">Quantity: {item.quantity || 1}</div>
                  <div>Base: {item.base?.name}</div>`;
                  
code = code.replace(pizzaDetailsTarget, pizzaDetailsReplace);

fs.writeFileSync('src/pages/user/OrderSuccess.jsx', code);
