const fs = require('fs');
let content = fs.readFileSync('client/src/pages/user/OrderTracking.jsx', 'utf8');

// Replace top container
const regex = /<div className="bg-\[var\(--theme-card\)\] p-8 rounded shadow-sm border border-\[var\(--theme-card\)\] text-center">/;

const newBlock = `<div className="mb-6"><Link to="/dashboard" className="text-[var(--theme-highlight)] hover:text-[var(--theme-accent)] transition-colors font-medium flex items-center gap-2 text-sm uppercase tracking-wider"><span>&larr;</span> Back to Dashboard</Link></div><div className="bg-[var(--theme-card)] p-8 rounded shadow-sm border border-[var(--theme-card)] text-center">`;

content = content.replace(regex, newBlock);

// Also fix the import to include Link if not there
if (!content.includes('Link } from \'react-router-dom\'')) {
  content = content.replace('useParams } from \'react-router-dom\'', 'useParams, Link } from \'react-router-dom\'');
}

// And fix the ₹ symbol
content = content.replace(',1{order.totalAmount}', '₹{order.totalAmount}');
content = content.replace(',1{order.totalAmount}', '₹{order.totalAmount}');

fs.writeFileSync('client/src/pages/user/OrderTracking.jsx', content);
