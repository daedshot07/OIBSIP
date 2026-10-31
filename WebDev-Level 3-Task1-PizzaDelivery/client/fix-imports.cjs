const fs = require('fs');
const file = 'src/components/landing/IngredientSections.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add imports at the top properly
const importsToAdd = `
import onionImg from '../../assets/onion.png';
import capsicumImg from '../../assets/capsicum.png';
import tomatoImg from '../../assets/tomato.jpg';
import cornImg from '../../assets/corn.jpg';
import oliveImg from '../../assets/olive.png';

const toppingImages = {
  onion: onionImg,
  capsicum: capsicumImg,
  tomato: tomatoImg,
  corn: cornImg,
  olive: oliveImg
};
`;

if (!code.includes('import onionImg')) {
  code = code.replace(
    "import { BASES, CHEESES, SAUCES, TOPPINGS } from './landingData';",
    "import { BASES, CHEESES, SAUCES, TOPPINGS } from './landingData';\n" + importsToAdd
  );
  fs.writeFileSync(file, code, 'utf8');
  console.log('Fixed imports!');
} else {
  console.log('Already fixed!');
}
