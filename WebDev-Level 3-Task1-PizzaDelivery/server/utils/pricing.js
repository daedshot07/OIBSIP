const BASES = [
  { id: 'b1', name: 'Thin Crust', aliases: ['thin-crust', 'thin crust'], price: 100 },
  { id: 'b2', name: 'Thick Crust', aliases: ['thick-crust', 'thick crust', 'hand-tossed', 'classic hand tossed'], price: 120 },
  { id: 'b3', name: 'Cheese Burst', aliases: ['cheese-burst', 'cheese burst'], price: 200 },
  { id: 'b4', name: 'Wheat Crust', aliases: ['wheat-crust', 'wheat crust', 'whole-wheat', 'whole wheat'], price: 130 },
  { id: 'b5', name: 'Gluten-Free', aliases: ['gluten-free', 'gluten free', 'multigrain'], price: 150 },
];

const SAUCES = [
  { id: 's1', name: 'Tomato Basil', aliases: ['tomato-basil', 'classic-tomato', 'classic tomato', 'tomato basil'], price: 20 },
  { id: 's2', name: 'Garlic Parmesan', aliases: ['garlic-parmesan', 'garlic-sauce', 'garlic sauce', 'garlic parmesan'], price: 30 },
  { id: 's3', name: 'BBQ Sauce', aliases: ['bbq-sauce', 'bbq sauce'], price: 40 },
  { id: 's4', name: 'Spicy Sriracha', aliases: ['spicy-sriracha', 'spicy-marinara', 'spicy marinara', 'spicy sriracha'], price: 25 },
  { id: 's5', name: 'Pesto Sauce', aliases: ['pesto-sauce', 'pesto', 'pesto sauce'], price: 50 },
];

const CHEESES = [
  { id: 'c1', name: 'Mozzarella', aliases: ['mozzarella'], price: 50 },
  { id: 'c2', name: 'Cheddar', aliases: ['cheddar'], price: 60 },
  { id: 'c3', name: 'Parmesan', aliases: ['parmesan'], price: 70 },
  { id: 'c4', name: 'Vegan Cheese', aliases: ['vegan-cheese', 'vegan cheese', 'cheese-blend', 'cheese blend'], price: 90 },
];

const TOPPINGS = [
  { id: 'v1', name: 'Onions', aliases: ['onion', 'onions'], price: 15 },
  { id: 'v2', name: 'Tomatoes', aliases: ['tomato', 'tomatoes', 'basil'], price: 15 },
  { id: 'v3', name: 'Bell Peppers', aliases: ['bell-peppers', 'bell peppers', 'capsicum', 'roasted peppers'], price: 20 },
  { id: 'v4', name: 'Mushrooms', aliases: ['mushroom', 'mushrooms'], price: 30 },
  { id: 'v5', name: 'Olives', aliases: ['olive', 'olives'], price: 35 },
  { id: 'v6', name: 'Jalapenos', aliases: ['jalapeno', 'jalapeño', 'jalapenos', 'calabrian chilli'], price: 25 },
  { id: 'v7', name: 'Sweet Corn', aliases: ['corn', 'sweet-corn', 'sweet corn', 'spinach', 'garden herbs'], price: 20 },
  { id: 'n1', name: 'Chicken Tikka', aliases: ['chicken-tikka', 'chicken tikka'], price: 50 },
  { id: 'n2', name: 'Pepperoni', aliases: ['pepperoni'], price: 60 },
  { id: 'n3', name: 'Bacon', aliases: ['bacon'], price: 70 },
  { id: 'n4', name: 'Grilled Chicken', aliases: ['grilled-chicken', 'grilled chicken'], price: 55 },
];

function findItem(list, target) {
  if (!target) return null;
  const targetId = (target.id || '').toString().toLowerCase().trim();
  const targetName = (target.name || (typeof target === 'string' ? target : '')).toString().toLowerCase().trim();

  return list.find(item => {
    const itemId = item.id.toLowerCase();
    const itemName = item.name.toLowerCase();
    if (targetId && (itemId === targetId || item.aliases?.includes(targetId))) return true;
    if (targetName && (itemName === targetName || item.aliases?.includes(targetName))) return true;
    return false;
  });
}

const calculateOrderTotal = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return { subtotal: 0, deliveryFee: 40, total: 40 };
  }

  let subtotal = 0;

  for (const item of items) {
    let itemTotal = 0;

    const base = findItem(BASES, item.base);
    if (base) itemTotal += base.price;

    const sauce = findItem(SAUCES, item.sauce);
    if (sauce) itemTotal += sauce.price;

    const cheese = findItem(CHEESES, item.cheese);
    if (cheese) itemTotal += cheese.price;

    if (Array.isArray(item.veggies)) {
      for (const veg of item.veggies) {
        const vegetable = findItem(TOPPINGS, veg);
        if (vegetable) itemTotal += vegetable.price;
      }
    }

    const providedPrice = Number(item.price);
    let finalUnitPrice = 0;

    if (!isNaN(providedPrice) && providedPrice > 0) {
      finalUnitPrice = providedPrice;
    } else if (itemTotal > 0) {
      finalUnitPrice = itemTotal;
    }

    item.price = finalUnitPrice;
    const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
    subtotal += finalUnitPrice * qty;
  }

  const deliveryFee = 40; // Flat delivery fee
  const total = subtotal + deliveryFee;

  return { subtotal, deliveryFee, total };
};

module.exports = { calculateOrderTotal, BASES, SAUCES, CHEESES, TOPPINGS };
