const fs = require('fs');
let code = fs.readFileSync('src/pages/user/OrderSummary.jsx', 'utf8');

// 1. Replace the Remove button with Edit and Remove
code = code.replace(
  /<button[\s\S]*?onClick=\{\(\) => removeFromCart\(item\.id\)\}[\s\S]*?>[\s\S]*?Remove[\s\S]*?<\/button>/,
  `<div className="flex items-center gap-4">
                      <button onClick={() => navigate('/build-pizza', { state: { editCartItemId: item.id } })} className="text-sm text-[var(--theme-text)] hover:text-[var(--theme-highlight)] font-medium">Edit</button>
                      <button onClick={() => removeFromCart(item.id)} className="text-sm text-[var(--theme-highlight)] hover:underline font-medium">Remove</button>
                    </div>`
);

// 2. Replace the bottom Edit Pizza button with + Add Another Pizza
code = code.replace(
  /<button[\s\S]*?onClick=\{\(\) => navigate\(['"]\/build-pizza['"]\)\}[\s\S]*?>[\s\S]*?Edit Pizza[\s\S]*?<\/button>/,
  `<button onClick={() => navigate('/build-pizza')} className="px-6 py-3 rounded-lg border-2 border-[var(--theme-accent)] text-[var(--theme-accent)] font-bold hover:bg-[var(--theme-accent)]/10 transition uppercase tracking-wide text-sm w-full md:w-auto">
                 + Add Another Pizza
               </button>`
);

// 3. Add Total Pizzas to the Price Details
code = code.replace(
  /<div className="flex justify-between">\s*<span>Subtotal<\/span>/,
  `<div className="flex justify-between">
                <span>Total Pizzas</span>
                <span className="font-medium text-[var(--theme-text)]">{cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>`
);

fs.writeFileSync('src/pages/user/OrderSummary.jsx', code);
