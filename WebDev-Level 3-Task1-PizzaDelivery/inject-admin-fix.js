const fs = require('fs');

const files = fs.readdirSync('client/src/pages/admin').filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const file = `client/src/pages/admin/${f}`;
  let content = fs.readFileSync(file, 'utf8');

  // Replace for AdminLogin and AdminRegister
  const regex = /<div className="auth-visual__brand">PIZZA<span>DEV<\/span> \/ OPERATIONS<\/div>/g;
  
  if (regex.test(content)) {
    content = content.replace(
      regex,
      '<div className="auth-visual__brand flex items-center mb-6"><img src={mainLogo} alt="PizzaDev Logo" className="h-14 w-auto rounded object-contain max-h-[56px] mix-blend-screen" /><span className="ml-2">/ OPERATIONS</span></div>'
    );
    fs.writeFileSync(file, content);
  }
});
