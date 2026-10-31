const fs = require('fs');

const fixFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace text colors
  content = content.replace(/#9e9184/g, 'color-mix(in srgb, var(--theme-text) 60%, transparent)');
  content = content.replace(/#bcb0a2/g, 'color-mix(in srgb, var(--theme-text) 75%, transparent)');
  
  // Replace border colors
  content = content.replace(/#39302a/g, 'color-mix(in srgb, var(--theme-text) 15%, transparent)');

  // Replace any rgba dark colors
  content = content.replace(/rgba\(20, 18, 16, 0\.9\)/g, 'color-mix(in srgb, var(--theme-bg) 90%, transparent)');

  // Hover states
  content = content.replace(/#1c1917/g, 'color-mix(in srgb, var(--theme-text) 5%, transparent)');

  // Error state bg
  content = content.replace(/#d65a3a33/g, 'color-mix(in srgb, var(--theme-accent) 20%, transparent)');

  fs.writeFileSync(file, content);
};

['client/src/styles/admin.css', 'client/src/styles/dashboard.css', 'client/src/styles/auth.css'].forEach(file => {
  if (fs.existsSync(file)) {
    fixFile(file);
  }
});
