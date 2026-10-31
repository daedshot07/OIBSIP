const fs = require('fs');
let code = fs.readFileSync('server/server.js', 'utf8');

const target = `connectDB().then(() => console.log('MongoDB connected')).catch((error) => console.error(\`MongoDB connection failed: \${error.message}\`));`;

const replace = `connectDB().then(() => {
    console.log('MongoDB connected');
    const autoSweepOldOrders = require('./utils/sweepOldOrders');
    autoSweepOldOrders(); // Run once on startup
    setInterval(autoSweepOldOrders, 5 * 60 * 1000); // Run every 5 minutes
  }).catch((error) => console.error(\`MongoDB connection failed: \${error.message}\`));`;

code = code.replace(target, replace);
fs.writeFileSync('server/server.js', code);
