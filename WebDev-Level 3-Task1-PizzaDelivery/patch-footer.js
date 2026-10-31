const fs = require('fs');

let code = fs.readFileSync('client/src/components/landing/LandingFooter.jsx', 'utf8');

code = code.replace(
  '<Link className="landing-footer__admin" to="/admin/login">Admin Portal</Link>',
  ''
);

fs.writeFileSync('client/src/components/landing/LandingFooter.jsx', code);
