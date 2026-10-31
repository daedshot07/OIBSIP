const fs = require('fs');
const file = 'src/pages/user/Dashboard.jsx';
const lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{order.totalAmount}')) {
    lines[i] = '                  <strong>₹{order.totalAmount}</strong>';
  }
}

fs.writeFileSync(file, lines.join('\n'));
console.log('Fixed line entirely');
