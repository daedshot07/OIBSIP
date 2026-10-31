const mongoose = require('mongoose');

async function connectDB() {
  if (!process.env.MONGO_URI || process.env.MONGO_URI === 'your_mongodb_connection_string') throw new Error('MONGO_URI is missing or still uses the placeholder value.');
  return mongoose.connect(process.env.MONGO_URI);
}
module.exports = connectDB;
