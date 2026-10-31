const fs = require('fs');
let content = fs.readFileSync('client/src/pages/user/OrderSummary.jsx', 'utf8');

const regex = /<h2 className="text-3xl font-bold mb-8 text-\[var\(--theme-text\)\] border-b border-\[var\(--theme-card\)\] pb-4">Order Summary<\/h2>/;

const newBlock = `<div className="mb-6"><Link to="/dashboard" className="text-[var(--theme-highlight)] hover:text-[var(--theme-accent)] transition-colors font-medium flex items-center gap-2 text-sm uppercase tracking-wider w-fit"><span>&larr;</span> Back to Dashboard</Link></div><h2 className="text-3xl font-bold mb-8 text-[var(--theme-text)] border-b border-[var(--theme-card)] pb-4">Order Summary</h2>`;

content = content.replace(regex, newBlock);

if (!content.includes('import { Link } from \'react-router-dom\'')) {
  content = content.replace('import { useNavigate } from \'react-router-dom\'', 'import { useNavigate, Link } from \'react-router-dom\'');
}

// Fix ,1
content = content.replace(/,1/g, '₹');

fs.writeFileSync('client/src/pages/user/OrderSummary.jsx', content);
