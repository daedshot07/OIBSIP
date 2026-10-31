const fs = require('fs');
const file = 'src/components/landing/IngredientSections.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add imports at the top
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

code = code.replace(
  "import { TOPPINGS } from './landingData';",
  "import { TOPPINGS } from './landingData';" + importsToAdd
);

// 2. Change the span to have an inline style if the image exists
code = code.replace(
  /<span className=\{`topping-chip__image topping-chip__image--\$\{topping\.color\}`\} aria-hidden="true"><\/span>/g,
  '<span className={`topping-chip__image topping-chip__image--${topping.color}`} aria-hidden="true" style={toppingImages[topping.id] ? { backgroundImage: `url(${toppingImages[topping.id]})` } : {}}></span>'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Fixed toppings images');
