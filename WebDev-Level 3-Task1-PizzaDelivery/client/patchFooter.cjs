const fs = require('fs');
let code = fs.readFileSync('src/pages/user/PizzaBuilder.jsx', 'utf8');

const target = `<div className="border-t border-[var(--theme-text)]/10 pt-6 flex justify-between items-end mt-4">
          <span className="font-bold text-lg text-[color-mix(in_srgb,var(--theme-text)_70%,transparent)] mb-1">
            Total
          </span>
          <span className="font-extrabold text-3xl text-[var(--theme-highlight)] tracking-tight">
            ₹{calculateTotal()}
          </span>
        </div>`;

const replace = `<div className="border-t border-[var(--theme-text)]/10 pt-6 flex justify-between items-end mt-4">
          <span className="font-bold text-sm text-[color-mix(in_srgb,var(--theme-text)_70%,transparent)] mb-1 uppercase tracking-wider">
            Current Pizza
          </span>
          <span className="font-extrabold text-3xl text-[var(--theme-highlight)] tracking-tight">
            ₹{calculateTotal()}
          </span>
        </div>
        {cartItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[var(--theme-text)]/10 text-center">
             <div className="text-xs font-bold text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] uppercase tracking-wider mb-1">Cart Subtotal</div>
             <div className="font-bold text-xl text-[var(--theme-text)]">₹{cartTotal + (editCartItemId ? 0 : calculateTotal())}</div>
             <button onClick={() => navigate('/summary')} className="mt-4 w-full text-xs font-bold uppercase tracking-wider py-2 border border-[var(--theme-highlight)] text-[var(--theme-highlight)] rounded hover:bg-[var(--theme-highlight)] hover:text-black transition">View Full Cart</button>
          </div>
        )}`;

code = code.replace(target, replace);
fs.writeFileSync('src/pages/user/PizzaBuilder.jsx', code);
