const fs = require('fs');
let code = fs.readFileSync('src/pages/user/PizzaBuilder.jsx', 'utf8');

const targetLogic = `const pizza = { base: selectedBase, sauce: selectedSauce, cheese: selectedCheese, veggies: selectedVeggies, price: calculateTotal(), quantity: 1 };
    if (editCartItemId) {
      updateCartItem(editCartItemId, pizza);`;

const replaceLogic = `let existingQty = 1;
    if (editCartItemId) {
      const existingItem = cartItems.find(i => i.id === editCartItemId);
      if (existingItem) existingQty = existingItem.quantity || 1;
    }
    const pizza = { base: selectedBase, sauce: selectedSauce, cheese: selectedCheese, veggies: selectedVeggies, price: calculateTotal(), quantity: existingQty };
    
    if (editCartItemId) {
      updateCartItem(editCartItemId, pizza);`;

code = code.replace(targetLogic, replaceLogic);
code = code.replace(targetLogic, replaceLogic); // apply twice (once for handleAddAnother, once for handleReviewOrder)

fs.writeFileSync('src/pages/user/PizzaBuilder.jsx', code);
