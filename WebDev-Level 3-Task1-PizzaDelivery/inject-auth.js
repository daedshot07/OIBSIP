const fs = require('fs');

const files = fs.readdirSync('client/src/pages/auth').filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const file = `client/src/pages/auth/${f}`;
  let content = fs.readFileSync(file, 'utf8');

  if (!content.includes('logo.jpg')) {
    content = content.replace('import { Link', 'import mainLogo from \'../../assets/logo.jpg\';\nimport { Link');
    
    // Some use import { Link ...
    // Some use import { useState ...
    if (!content.includes('import mainLogo')) {
      content = 'import mainLogo from \'../../assets/logo.jpg\';\n' + content;
    }

    content = content.replace(
      /<div className="auth-visual__brand">PIZZA<span>DEV<\/span><\/div>/g,
      '<div className="auth-visual__brand flex items-center mb-6"><img src={mainLogo} alt="PizzaDev Logo" className="h-14 w-auto rounded object-contain max-h-[56px] mix-blend-screen" /></div>'
    );

    fs.writeFileSync(file, content);
  }
});
