const fs = require('fs');

const pages = [
  'client/src/pages/admin/OrderManagement.jsx',
  'client/src/pages/admin/InventoryManagement.jsx',
  'client/src/pages/admin/AdminManagement.jsx'
];

for (const file of pages) {
  let content = fs.readFileSync(file, 'utf8');

  // Add Link import if not exists
  if (!content.includes('import { Link } from \'react-router-dom\'')) {
    content = content.replace('import {', 'import { Link } from \'react-router-dom\';\nimport {');
  }

  // Insert back link right before the heading
  const regex = /<div className="ops-heading">/;
  const newBlock = `<div className="mb-6"><Link to="/admin/dashboard" className="text-[var(--theme-highlight)] hover:text-[var(--theme-accent)] transition-colors font-medium flex items-center gap-2 text-sm uppercase tracking-wider w-fit"><span>&larr;</span> Back to Dashboard</Link></div>\n      <div className="ops-heading">`;
  
  if (!content.includes('Back to Dashboard')) {
    content = content.replace(regex, newBlock);
  }

  fs.writeFileSync(file, content);
}
