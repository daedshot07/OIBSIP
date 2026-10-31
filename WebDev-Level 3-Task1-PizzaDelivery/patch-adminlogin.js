const fs = require('fs');

let code = fs.readFileSync('client/src/pages/admin/AdminLogin.jsx', 'utf8');

code = code.replace(
  `<div className="auth-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}><span>Need an admin account? <Link to="/admin/register">Create one</Link></span><Link to="/login">← Back to customer login</Link></div>`,
  `<div className="auth-links"><Link to="/login">← Back to customer login</Link></div>`
);

fs.writeFileSync('client/src/pages/admin/AdminLogin.jsx', code);
