const fs = require('fs');
let code = fs.readFileSync('server/controllers/orderController.js', 'utf8');

const target = `res.json({ message: 'Payment verified successfully' });`;
const replace = `res.json({ message: 'Payment verified successfully' });

        // Simulate real-time kitchen and delivery workflow (2 minutes per stage)
        const simulateKitchen = async () => {
            try {
                // 1. IN KITCHEN (after 2 minutes)
                await new Promise(resolve => setTimeout(resolve, 120000));
                await Order.findByIdAndUpdate(orderId, { orderStatus: 'IN_KITCHEN' });
                
                // 2. SENT TO DELIVERY (after 2 more minutes)
                await new Promise(resolve => setTimeout(resolve, 120000));
                await Order.findByIdAndUpdate(orderId, { orderStatus: 'SENT_TO_DELIVERY' });

                // 3. DELIVERED (after 2 more minutes)
                await new Promise(resolve => setTimeout(resolve, 120000));
                await Order.findByIdAndUpdate(orderId, { orderStatus: 'DELIVERED' });
            } catch (err) {
                console.error("Simulation error:", err);
            }
        };
        
        // Start simulation in background without blocking response
        simulateKitchen();`;

code = code.replace(target, replace);
fs.writeFileSync('server/controllers/orderController.js', code);
