const fs = require('fs');
let code = fs.readFileSync('src/pages/user/PizzaBuilder.jsx', 'utf8');

code = code.replace(
  `const pizza = { base: selectedBase, sauce: selectedSauce, cheese: selectedCheese, veggies: selectedVeggies, price: calculateTotal(), quantity: 1 };
      if (editCartItemId) {
        updateCartItem(editCartItemId, pizza);`,
  `let existingQty = 1;
      if (editCartItemId) {
        const existingItem = cartItems.find(i => i.id === editCartItemId);
        if (existingItem) existingQty = existingItem.quantity || 1;
      }
      const pizza = { base: selectedBase, sauce: selectedSauce, cheese: selectedCheese, veggies: selectedVeggies, price: calculateTotal(), quantity: existingQty };
      
      if (editCartItemId) {
        updateCartItem(editCartItemId, pizza);`
);

fs.writeFileSync('src/pages/user/PizzaBuilder.jsx', code);
