const cron = require('node-cron');
const Inventory = require('../models/Inventory');
const sendEmail = require('../utils/sendEmail');

const startCron = () => {
  // Check every hour or customize as needed
  cron.schedule('0 * * * *', async () => {
    try {
      const items = await Inventory.find({});
      const lowStockItems = items.filter(item => item.quantity < item.lowStockThreshold);

      if (lowStockItems.length > 0) {
        let message = 'The following items are running low on stock:\n\n';
        lowStockItems.forEach(item => {
          message += `- ${item.name} (${item.category}): ${item.quantity} remaining (Threshold: ${item.lowStockThreshold})\n`;
        });

        await sendEmail({
          email: process.env.ADMIN_EMAIL,
          subject: 'LOW STOCK ALERT - Pizza Delivery',
          message
        });

        console.log('Low stock email alert sent.');
      }
    } catch (error) {
      console.error('Error in inventory cron job:', error);
    }
  });
};

module.exports = startCron;
