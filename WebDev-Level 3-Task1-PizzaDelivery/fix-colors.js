const fs = require('fs');

// 1. Fix JSX files in user pages
const userPages = fs.readdirSync('client/src/pages/user').filter(f => f.endsWith('.jsx'));
userPages.forEach(f => {
  const file = `client/src/pages/user/${f}`;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/text-\[rgba\(246,240,232,0\.8\)\]/g, 'text-[var(--theme-text)]/80');
  content = content.replace(/text-\[rgba\(246,240,232,0\.6\)\]/g, 'text-[var(--theme-text)]/60');
  content = content.replace(/text-\[rgba\(246,240,232,0\.4\)\]/g, 'text-[var(--theme-text)]/40');
  content = content.replace(/text-\[rgba\(246,240,232,0\.3\)\]/g, 'text-[var(--theme-text)]/30');
  fs.writeFileSync(file, content);
});

// 2. Fix dashboard.css
const cssFile = 'client/src/styles/dashboard.css';
let css = fs.readFileSync(cssFile, 'utf8');
css = css.replace(/color: rgba\(246, 240, 232, 0\.8\);/g, 'color: var(--theme-text);\n    opacity: 0.8;');
css = css.replace(/color: rgba\(246, 240, 232, 0\.7\);/g, 'color: var(--theme-text);\n    opacity: 0.7;');
css = css.replace(/color: rgba\(246, 240, 232, 0\.5\);/g, 'color: var(--theme-text);\n    opacity: 0.5;');
css = css.replace(/background: rgba\(20, 18, 16, 0\.9\);/g, 'background: var(--theme-bg);');
fs.writeFileSync(cssFile, css);
