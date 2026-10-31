const fs = require('fs');
let content = fs.readFileSync('client/src/components/GlobalBackButton.jsx', 'utf8');
content = content.replace('bottom-6 left-6', 'top-24 left-6');
fs.writeFileSync('client/src/components/GlobalBackButton.jsx', content);
