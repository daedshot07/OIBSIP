const fs = require('fs');
const file = 'src/pages/user/Dashboard.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add imports
code = code.replace(
  "import { AuthContext } from '../../context/AuthContext';",
  "import { AuthContext } from '../../context/AuthContext';\nimport { CartContext } from '../../context/CartContext';\nimport { useNavigate } from 'react-router-dom';\nimport toast from 'react-hot-toast';"
);

// 2. Fix pizzas array to include cartItem objects for ordering
const newPizzas = `const pizzas = [
  { 
    name: 'Margherita Classic', 
    desc: 'San Marzano tomato, basil, fior di latte', 
    price: '₹320', 
    rating: '4.9', 
    image: '🍕',
    cartItem: {
      base: { name: 'Classic Hand Tossed' },
      sauce: { name: 'Classic Tomato' },
      cheese: { name: 'Mozzarella' },
      veggies: [{ name: 'Basil' }],
      price: 320,
      quantity: 1,
      name: 'Margherita Classic'
    }
  },
  { 
    name: 'Smoked Garden', 
    desc: 'Roasted peppers, smoked cheese, garden herbs', 
    price: '₹410', 
    rating: '4.8', 
    image: '🍕',
    cartItem: {
      base: { name: 'Thin Crust' },
      sauce: { name: 'Pesto' },
      cheese: { name: 'Cheese Blend' },
      veggies: [{ name: 'Roasted Peppers' }, { name: 'Garden Herbs' }],
      price: 410,
      quantity: 1,
      name: 'Smoked Garden'
    }
  },
  { 
    name: 'Spicy Diavola', 
    desc: 'Calabrian chilli, pepperoni, hot honey', 
    price: '₹460', 
    rating: '4.9', 
    image: '🍕',
    cartItem: {
      base: { name: 'Classic Hand Tossed' },
      sauce: { name: 'Spicy Marinara' },
      cheese: { name: 'Mozzarella' },
      veggies: [{ name: 'Pepperoni' }, { name: 'Calabrian Chilli' }],
      price: 460,
      quantity: 1,
      name: 'Spicy Diavola'
    }
  }
];`;

// We find the old pizzas array and replace it.
const pizzasStart = code.indexOf('const pizzas = [');
const pizzasEnd = code.indexOf('];', pizzasStart) + 2;
code = code.slice(0, pizzasStart) + newPizzas + code.slice(pizzasEnd);

// 3. Add hooks inside Dashboard component
code = code.replace(
  "const { user, logout } = useContext(AuthContext);",
  "const { user, logout } = useContext(AuthContext);\n  const { addToCart } = useContext(CartContext);\n  const navigate = useNavigate();\n\n  const handleOrderPreset = (preset) => {\n    addToCart(preset.cartItem);\n    toast.success(`${preset.name} added to order!`);\n    navigate('/summary');\n  };"
);

// 4. Update the button
code = code.replace(
  /<button type="button">Order<\/button>/g,
  '<button type="button" onClick={() => handleOrderPreset(p)}>Order</button>'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Fixed Dashboard to support ordering preset pizzas!');
