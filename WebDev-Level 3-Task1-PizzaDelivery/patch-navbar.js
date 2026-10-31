const fs = require('fs');

let code = fs.readFileSync('client/src/components/landing/LandingNavbar.jsx', 'utf8');

code = code.replace(
  "import { ArrowUpRight, Menu, Pizza, X } from 'lucide-react';",
  "import { ArrowUpRight, Menu, Pizza, Shield, X } from 'lucide-react';"
);

code = code.replace(
  '<div className="landing-nav__mobile-account">',
  `<div className="landing-nav__mobile-account">\n            <Link to="/admin/login" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={14} /> Admin Portal</Link>`
);

code = code.replace(
  '<div className="landing-nav__account">',
  `<div className="landing-nav__account">\n          <Link to="/admin/login" className="landing-nav__admin-icon" title="Admin Portal" aria-label="Admin Portal"><Shield size={16} strokeWidth={1.8} /></Link>`
);

fs.writeFileSync('client/src/components/landing/LandingNavbar.jsx', code);
