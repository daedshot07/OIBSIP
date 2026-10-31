const fs = require('fs');
let c = fs.readFileSync('src/pages/auth/Login.jsx', 'utf8');
c = c.replace(/\\nconst submit=async/g, '\nconst submit=async');
fs.writeFileSync('src/pages/auth/Login.jsx', c);
