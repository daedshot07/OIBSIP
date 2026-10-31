require('dotenv').config();
const mongoose = require('mongoose');
const Inventory = require('./models/Inventory');
const connectDB = require('./config/db');

const items = [
  ['Thin Crust', 'Pizza Bases'], ['Thick Crust', 'Pizza Bases'], ['Cheese Burst', 'Pizza Bases'], ['Wheat Crust', 'Pizza Bases'], ['Gluten-Free', 'Pizza Bases'],
  ['Tomato Basil', 'Sauces'], ['Garlic Parmesan', 'Sauces'], ['BBQ Sauce', 'Sauces'], ['Spicy Sriracha', 'Sauces'], ['Pesto Sauce', 'Sauces'],
  ['Mozzarella', 'Cheeses'], ['Cheddar', 'Cheeses'], ['Parmesan', 'Cheeses'], ['Vegan Cheese', 'Cheeses'],
  ['Onions', 'Vegetables'], ['Tomatoes', 'Vegetables'], ['Bell Peppers', 'Vegetables'], ['Mushrooms', 'Vegetables'], ['Olives', 'Vegetables'], ['Jalapenos', 'Vegetables'], ['Sweet Corn', 'Vegetables'],
  ['Chicken Tikka', 'Non-Veg'], ['Pepperoni', 'Non-Veg'], ['Bacon', 'Non-Veg'], ['Grilled Chicken', 'Non-Veg']
];

(async () => { try { await connectDB(); for (const [name, category] of items) await Inventory.updateOne({ name }, { $setOnInsert: { name, category, quantity: 100, lowStockThreshold: 10 } }, { upsert: true }); console.log('Inventory seed complete. Use npm run seed:admin with ADMIN_EMAIL and ADMIN_PASSWORD to provision an admin.'); await mongoose.disconnect(); } catch (error) { console.error(`Seed failed: ${error.message}`); process.exitCode = 1; } })();
