const fs = require('fs');

const userPages = fs.readdirSync('client/src/pages/user').filter(f => f.endsWith('.jsx'));
userPages.forEach(f => {
  const file = `client/src/pages/user/${f}`;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/text-\[var\(--theme-text\)\/(\d+)\]/g, 'text-[color-mix(in_srgb,var(--theme-text)_$1%,transparent)]');
  content = content.replace(/text-\[var\(--theme-text\)\]\/(\d+)/g, 'text-[color-mix(in_srgb,var(--theme-text)_$1%,transparent)]');
  fs.writeFileSync(file, content);
});
