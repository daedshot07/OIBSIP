const fs = require('fs');

const replaceInFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('mix-blend-screen')) {
    content = content.replace(/mix-blend-screen/g, '');
    fs.writeFileSync(file, content);
  }
};

const dirs = [
  'client/src/components',
  'client/src/components/landing',
  'client/src/pages/admin',
  'client/src/pages/auth',
  'client/src/pages/user'
];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
    files.forEach(f => {
      replaceInFile(`${dir}/${f}`);
    });
  }
});
