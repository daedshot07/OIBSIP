const fs = require('fs');
let code = fs.readFileSync('client/src/App.jsx', 'utf8');
code = code.replace(
  "import AdminLogin from './pages/admin/AdminLogin';",
  "import AdminLogin from './pages/admin/AdminLogin';\nimport AdminRegister from './pages/admin/AdminRegister';"
);
code = code.replace(
  '<Route path="/admin/login" element={<AdminLogin/>}/>',
  '<Route path="/admin/register" element={<AdminRegister/>}/><Route path="/admin/login" element={<AdminLogin/>}/>'
);
fs.writeFileSync('client/src/App.jsx', code);
