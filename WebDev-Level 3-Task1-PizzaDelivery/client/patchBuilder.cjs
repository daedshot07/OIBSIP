const fs = require('fs');

let code = fs.readFileSync('src/pages/user/PizzaBuilder.jsx', 'utf8');

// 1. Imports
code = code.replace(
  "import { useNavigate } from 'react-router-dom';",
  "import { useNavigate, useLocation } from 'react-router-dom';"
);
code = code.replace(
  "const { addToCart } = useContext(CartContext);",
  "const { addToCart, cartItems, updateCartItem, cartTotal } = useContext(CartContext);"
);

// 2. Edit logic
const editLogic = `
  const location = useLocation();
  const editCartItemId = location.state?.editCartItemId;

  useEffect(() => {
    if (editCartItemId && cartItems.length > 0) {
      const item = cartItems.find(i => i.id === editCartItemId);
      if (item) {
        setSelectedBase(item.base);
        setSelectedSauce(item.sauce);
        setSelectedCheese(item.cheese);
        setSelectedVeggies(item.veggies || []);
      }
    }
  }, [editCartItemId, cartItems]);
`;
code = code.replace(
  "const [selectedVeggies, setSelectedVeggies] = useState([]);",
  "const [selectedVeggies, setSelectedVeggies] = useState([]);" + editLogic
);

// 3. New handlers
const buttonLogic = `
  const handleAddAnother = () => {
    if (!selectedBase || !selectedSauce || !selectedCheese) {
      return toast.error("Please complete all steps");
    }
    const pizza = { base: selectedBase, sauce: selectedSauce, cheese: selectedCheese, veggies: selectedVeggies, price: calculateTotal(), quantity: 1 };
    if (editCartItemId) {
      updateCartItem(editCartItemId, pizza);
      toast.success("Pizza updated!");
    } else {
      addToCart(pizza);
      toast.success("Pizza added to order!");
    }
    setStep(1);
    setSelectedBase(null);
    setSelectedSauce(null);
    setSelectedCheese(null);
    setSelectedVeggies([]);
    navigate('/build-pizza', { replace: true, state: {} });
  };

  const handleReviewOrder = () => {
    if (selectedBase && selectedSauce && selectedCheese) {
      const pizza = { base: selectedBase, sauce: selectedSauce, cheese: selectedCheese, veggies: selectedVeggies, price: calculateTotal(), quantity: 1 };
      if (editCartItemId) {
        updateCartItem(editCartItemId, pizza);
      } else {
        addToCart(pizza);
      }
    } else if (cartItems.length === 0) {
      return toast.error("Please build a pizza first");
    }
    navigate("/summary");
  };
`;
code = code.replace(
  "const handleFinish = () => {",
  buttonLogic + "\n  const handleFinish = () => {"
);

// 4. Update the buttons
const oldButton = `
            ) : (
              <button
                onClick={handleFinish}
                className="px-8 py-2.5 rounded-lg bg-[var(--theme-accent)] text-[var(--theme-text)] font-bold hover:bg-[var(--theme-highlight)] hover:text-[var(--theme-bg)] transition-all duration-300 shadow-[0_4px_20px_rgba(214,90,58,0.4)] hover:shadow-[0_4px_25px_rgba(229,138,69,0.5)] transform hover:-translate-y-0.5"
              >
                Add to Order
              </button>
            )}
`;
const newButtons = `
            ) : (
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handleAddAnother}
                  className="px-6 py-2.5 rounded-lg border-2 border-[var(--theme-accent)] text-[var(--theme-accent)] font-bold hover:bg-[var(--theme-accent)]/10 transition-all duration-300 uppercase tracking-wide text-sm"
                >
                  + Add Another Pizza
                </button>
                <button
                  onClick={handleReviewOrder}
                  className="px-8 py-2.5 rounded-lg bg-[var(--theme-accent)] text-[var(--theme-text)] font-bold hover:bg-[var(--theme-highlight)] hover:text-[var(--theme-bg)] transition-all duration-300 shadow-[0_4px_20px_rgba(214,90,58,0.4)] uppercase tracking-wide text-sm"
                >
                  Review Order
                </button>
              </div>
            )}
`;
code = code.replace(oldButton.trim(), newButtons.trim());

// 5. Add "MY PIZZAS (2)" to the header
const headerTarget = '<h1 className="text-3xl font-black tracking-tight text-[var(--theme-text)]">';
const newHeader = headerTarget + `
        {cartItems.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--theme-card)] border border-[var(--theme-accent)] rounded-md cursor-pointer hover:bg-[var(--theme-accent)]/10 transition-colors" onClick={() => navigate('/summary')}>
            <span className="text-[var(--theme-accent)] font-bold text-sm tracking-wider uppercase">My Pizzas ({cartItems.length})</span>
          </div>
        )}
`;
code = code.replace(headerTarget, newHeader);

// 6. Add Current Pizza vs Cart Subtotal in the Preview panel
const totalTarget = '<span className="font-bold text-lg text-[color-mix(in_srgb,var(--theme-text)_70%,transparent)] mb-1">Total</span>';
const newTotal = totalTarget.replace('Total', 'Current Pizza Total');
code = code.replace(totalTarget, newTotal);

const cartSubtotalTarget = '<span className="font-extrabold text-3xl text-[var(--theme-highlight)] tracking-tight">₹{calculateTotal()}</span>';
const newCartSubtotal = cartSubtotalTarget + `
        </div>
        {cartItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[var(--theme-text)]/10 text-center">
             <div className="text-sm font-medium text-[color-mix(in_srgb,var(--theme-text)_60%,transparent)] uppercase tracking-wider mb-1">Cart Subtotal</div>
             <div className="font-bold text-xl text-[var(--theme-text)]">₹{cartTotal + (editCartItemId ? 0 : calculateTotal())}</div>
             <button onClick={() => navigate('/summary')} className="mt-3 w-full text-xs font-bold uppercase tracking-wider py-2 border border-[var(--theme-highlight)] text-[var(--theme-highlight)] rounded hover:bg-[var(--theme-highlight)] hover:text-black transition">View Full Cart</button>
          </div>
        )}
        <div className="hidden">
`;
// Wait, replacing and leaving an unclosed div? No, I'll just find the exact closing div.
// Let's replace the whole footer of the preview panel.
const previewFooterTarget = `        <div className="border-t border-[var(--theme-text)]/10 pt-6 flex justify-between items-end mt-4">
          <span className="font-bold text-lg text-[color-mix(in_srgb,var(--theme-text)_70%,transparent)] mb-1">
            Total
          </span>
          <span className="font-extrabold text-3xl text-[var(--theme-highlight)] tracking-tight">
            ₹{calculateTotal()}
          </span>
        </div>`;
const newPreviewFooter = `        <div className="border-t border-[var(--theme-text)]/10 pt-6 flex justify-between items-end mt-4">
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

// It's safer to just regex replace the Total block
fs.writeFileSync('src/pages/user/PizzaBuilder.jsx', code);
