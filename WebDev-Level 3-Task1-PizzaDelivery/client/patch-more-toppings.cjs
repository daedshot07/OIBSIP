const fs = require('fs');
const file = 'src/components/landing/IngredientSections.jsx';
let code = fs.readFileSync(file, 'utf8');

// The code already has an imports block for toppingImages
// Let's find it and inject the new imports and mappings

const newImports = `
import grilledChickenImg from '../../assets/grilled-chicken.jpg';
import chickenTikkaImg from '../../assets/chicken-tikka.jpg';
import baconImg from '../../assets/bacon.png';
import jalapenoImg from '../../assets/jalapeno.jpg';
import pepperoniImg from '../../assets/pepperoni.jpg';
`;

code = code.replace(
  "import oliveImg from '../../assets/olive.png';",
  "import oliveImg from '../../assets/olive.png';" + newImports
);

const newMappings = `
  'grilled-chicken': grilledChickenImg,
  'chicken-tikka': chickenTikkaImg,
  bacon: baconImg,
  jalapeno: jalapenoImg,
  pepperoni: pepperoniImg,
`;

code = code.replace(
  "olive: oliveImg",
  "olive: oliveImg,\n" + newMappings
);

fs.writeFileSync(file, code, 'utf8');
console.log('Added more topping images to mapping');
