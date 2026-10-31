const fs = require('fs');
let content = fs.readFileSync('client/src/pages/user/OrderSuccess.jsx', 'utf8');

const regex = /<div className="bg-\[var\(--theme-bg\)\] p-6 rounded-md text-left mb-8 space-y-4 border border-\[var\(--theme-card\)\]">[\s\S]*?<\/div>\s*<div className="flex flex-col sm:flex-row justify-center gap-4">/;

const newBlock = `<div className="bg-[var(--theme-bg)] p-6 rounded-md text-left mb-8 space-y-4 border border-[var(--theme-card)]">
            <div className="flex justify-between border-b border-[var(--theme-card)] pb-3">
              <span className="text-[rgba(246,240,232,0.6)] font-medium">Order ID:</span>
              <span className="font-bold text-[var(--theme-text)]">#{order._id}</span>
            </div>
            
            <div className="border-b border-[var(--theme-card)] pb-3 space-y-2">
              <span className="text-[rgba(246,240,232,0.6)] font-medium block mb-2 uppercase text-xs tracking-wider">Your Pizza</span>
              {order.items && order.items.map((item, idx) => (
                <div key={idx} className="bg-[var(--theme-card)] p-3 rounded text-sm space-y-1">
                  <div className="font-bold text-[var(--theme-highlight)]">Pizza {idx + 1} (x{item.quantity || 1})</div>
                  <div>Base: {item.base?.name}</div>
                  <div>Sauce: {item.sauce?.name}</div>
                  <div>Cheese: {item.cheese?.name}</div>
                  <div>Toppings: {item.veggies?.length > 0 ? item.veggies.map(v => v.name).join(', ') : 'None'}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-b border-[var(--theme-card)] pb-3">
              <span className="text-[rgba(246,240,232,0.6)] font-medium">Payment:</span>
              <span className="font-bold text-[var(--theme-highlight)] uppercase">{order.paymentStatus === 'SUCCESS' ? 'PAID' : order.paymentStatus}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--theme-card)] pb-3">
              <span className="text-[rgba(246,240,232,0.6)] font-medium">Status:</span>
              <span className="font-bold text-[var(--theme-text)]">{order.orderStatus.replace(/_/g, ' ')}</span>
            </div>
            {order.pricing && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-[rgba(246,240,232,0.6)] font-medium">Subtotal:</span>
                  <span className="text-[var(--theme-text)]">₹{order.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--theme-card)] pb-3 text-sm">
                  <span className="text-[rgba(246,240,232,0.6)] font-medium">Delivery:</span>
                  <span className="text-[var(--theme-text)]">₹{order.pricing.deliveryFee}</span>
                </div>
              </>
            )}
            <div className="flex justify-between pt-2">
              <span className="text-[rgba(246,240,232,0.6)] font-medium">Total Paid:</span>
              <span className="font-bold text-[var(--theme-accent)] text-lg">₹{order.totalAmount}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">`;

content = content.replace(regex, newBlock);
fs.writeFileSync('client/src/pages/user/OrderSuccess.jsx', content);
