const fs = require('fs');
const file = 'server/utils/pricing.js';
let content = fs.readFileSync(file, 'utf8');

const oldVeg = `const VEGETABLES = [
  { id: 'v1', name: 'Onions', price: 15 },
  { id: 'v2', name: 'Tomatoes', price: 15 },
  { id: 'v3', name: 'Bell Peppers', price: 20 },
  { id: 'v4', name: 'Mushrooms', price: 30 },
  { id: 'v5', name: 'Olives', price: 35 },
  { id: 'v6', name: 'Jalapenos', price: 25 },
  { id: 'v7', name: 'Sweet Corn', price: 20 },
];`;

const newVeg = `const TOPPINGS = [
  { id: 'v1', name: 'Onions', price: 15 },
  { id: 'v2', name: 'Tomatoes', price: 15 },
  { id: 'v3', name: 'Bell Peppers', price: 20 },
  { id: 'v4', name: 'Mushrooms', price: 30 },
  { id: 'v5', name: 'Olives', price: 35 },
  { id: 'v6', name: 'Jalapenos', price: 25 },
  { id: 'v7', name: 'Sweet Corn', price: 20 },
  { id: 'n1', name: 'Chicken Tikka', price: 50 },
  { id: 'n2', name: 'Pepperoni', price: 60 },
  { id: 'n3', name: 'Bacon', price: 70 },
  { id: 'n4', name: 'Grilled Chicken', price: 55 },
];`;

content = content.replace(oldVeg, newVeg);

content = content.replace(
`    if (Array.isArray(item.veggies)) {
      for (const veg of item.veggies) {
        const vegetable = VEGETABLES.find(v => v.id === veg.id);
        if (vegetable) itemTotal += vegetable.price;
      }
    }`,
`    if (Array.isArray(item.veggies)) {
      for (const veg of item.veggies) {
        const vegetable = TOPPINGS.find(v => v.id === veg.id);
        if (vegetable) itemTotal += vegetable.price;
      }
    }`
);

fs.writeFileSync(file, content);
