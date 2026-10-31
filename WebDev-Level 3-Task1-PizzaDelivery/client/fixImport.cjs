const fs = require('fs');
let code = fs.readFileSync('src/pages/user/PizzaBuilder.jsx', 'utf8');

code = code.replace(
  /import { useNavigate } from "react-router-dom";/g,
  `import { useNavigate, useLocation } from "react-router-dom";`
);

fs.writeFileSync('src/pages/user/PizzaBuilder.jsx', code);
