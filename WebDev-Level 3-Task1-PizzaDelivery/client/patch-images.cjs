const fs = require('fs');
const file = 'src/pages/user/Dashboard.jsx';
let code = fs.readFileSync(file, 'utf8');

// Add image imports
code = code.replace(
  "import mainLogo from '../../assets/logo.jpg';",
  "import mainLogo from '../../assets/logo.jpg';\nimport margheritaImg from '../../assets/margherita.jpg';\nimport smokedGardenImg from '../../assets/smoked-garden.jpg';\nimport spicyDiavolaImg from '../../assets/spicy-diavola.jpg';"
);

// Update pizzas array image properties
code = code.replace(
  "image: '🍕',",
  "image: margheritaImg,"
);
code = code.replace(
  "image: '🍕',",
  "image: smokedGardenImg,"
);
code = code.replace(
  "image: '🍕',",
  "image: spicyDiavolaImg,"
);

// Update JSX to render an img tag instead of text
code = code.replace(
  '<div className="pizza-card__image" aria-hidden="true">{p.image}</div>',
  '<div className="pizza-card__image" aria-hidden="true" style={{ padding: 0, overflow: "hidden" }}><img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Fixed Dashboard images');
