const fs = require('fs');
let content = fs.readFileSync('client/src/pages/user/PizzaBuilder.jsx', 'utf8');
content = content.replace('disabled={step === 1}', '');
content = content.replace('disabled:opacity-30 disabled:hover:bg-transparent ', '');
fs.writeFileSync('client/src/pages/user/PizzaBuilder.jsx', content);
