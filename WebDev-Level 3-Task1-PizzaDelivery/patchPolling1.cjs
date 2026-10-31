const fs = require('fs');

// 1. Fix OrderTracking.jsx
let ot = fs.readFileSync('client/src/pages/user/OrderTracking.jsx', 'utf8');
ot = ot.replace('order.orderStatus === "SENT_TO_DELIVERY"', 'order.orderStatus === "DELIVERED"');
fs.writeFileSync('client/src/pages/user/OrderTracking.jsx', ot);

// 2. Fix Dashboard.jsx (User Dashboard)
let db = fs.readFileSync('client/src/pages/user/Dashboard.jsx', 'utf8');
const dbTarget = `  useEffect(() => {
    const fetchOrders = async () => {`;
const dbReplace = `  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Remove the old useEffect entirely
  /* `;
const dbEndTarget = `    };
    fetchOrders();
  }, []);`;
const dbEndReplace = `*/`;

db = db.replace(dbTarget, dbReplace);
db = db.replace(dbEndTarget, dbEndReplace);
// Wait, replacing with a block comment is messy if the text inside changes. Let's do it cleaner.
