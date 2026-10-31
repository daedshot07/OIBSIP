const fs = require('fs');
const file = 'src/components/landing/IngredientSections.jsx';
let code = fs.readFileSync(file, 'utf8');

const newImports = `
import spinachImg from '../../assets/spinach.jpg';
import mushroomImg from '../../assets/mushroom.jpg';
`;

code = code.replace(
  "import pepperoniImg from '../../assets/pepperoni.jpg';",
  "import pepperoniImg from '../../assets/pepperoni.jpg';" + newImports
);

const newMappings = `
  spinach: spinachImg,
  mushroom: mushroomImg,
`;

code = code.replace(
  "pepperoni: pepperoniImg,",
  "pepperoni: pepperoniImg,\n" + newMappings
);

fs.writeFileSync(file, code, 'utf8');
console.log('Added spinach and mushroom');
