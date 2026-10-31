const fs = require('fs');
let code = fs.readFileSync('src/pages/user/OrderSummary.jsx', 'utf8');

const targetButtons = `<button onClick={() => removeFromCart(item.id)} className="text-sm text-[var(--theme-highlight)] hover:underline font-medium">Remove</button>
                </div>`;
const replaceButtons = `<div className="flex items-center gap-4">
                      <button onClick={() => navigate('/build-pizza', { state: { editCartItemId: item.id } })} className="text-sm text-[var(--theme-text)] hover:text-[var(--theme-highlight)] font-medium">Edit</button>
                      <button onClick={() => removeFromCart(item.id)} className="text-sm text-[var(--theme-highlight)] hover:underline font-medium">Remove</button>
                    </div>
                </div>`;
code = code.replace(targetButtons, replaceButtons);

const oldBottom = `            <div>
               <button onClick={() => navigate('/build-pizza')} className="px-6 py-2 rounded border border-[var(--theme-accent)] text-[var(--theme-text)] bg-transparent hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)] transition">
                 Edit Pizza
               </button>
            </div>`;
const newBottom = `            <div className="flex justify-center mt-6">
               <button onClick={() => navigate('/build-pizza')} className="px-6 py-3 rounded-lg border-2 border-[var(--theme-accent)] text-[var(--theme-accent)] font-bold hover:bg-[var(--theme-accent)]/10 transition uppercase tracking-wide text-sm w-full md:w-auto">
                 + Add Another Pizza
               </button>
            </div>`;
code = code.replace(oldBottom, newBottom);

// The user also mentioned "Total Pizzas: 3"
// Let's add that to the Price Details
const totalPizzasTarget = `            <div className="space-y-4 mb-6 text-[color-mix(in_srgb,var(--theme-text)_80%,transparent)]">
              <div className="flex justify-between">`;
const totalPizzasReplace = `            <div className="space-y-4 mb-6 text-[color-mix(in_srgb,var(--theme-text)_80%,transparent)]">
              <div className="flex justify-between">
                <span>Total Pizzas</span>
                <span className="font-medium text-[var(--theme-text)]">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">`;
code = code.replace(totalPizzasTarget, totalPizzasReplace);

fs.writeFileSync('src/pages/user/OrderSummary.jsx', code);
